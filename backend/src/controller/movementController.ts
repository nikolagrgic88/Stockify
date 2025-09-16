import { NextFunction, Request, Response } from "express";
import Location, { ILocation } from "../models/location";
import Product, { IProduct } from "../models/product";
import { startSession, Types } from "mongoose";
import Movement from "../models/movement";
import { getPagination } from "../services/paginationService";
import User from "../models/user";

type Product = {
  productId: Types.ObjectId;
  quantity: number;
};

export const createMovement = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const session = await startSession();
  const {
    fromLocationId,
    toLocationId,
    items,
    userId,
  }: {
    fromLocationId: Types.ObjectId;
    toLocationId: Types.ObjectId;
    items: Product[];
    userId: Types.ObjectId;
  } = req.body;

  try {
    session.startTransaction();
    const location = (await Location.findById(fromLocationId)
      .populate({
        path: "products.productId",
      })
      .session(session)) as ILocation;

    if (!location) {
      res.status(404).json({ message: "Location not found!" });
      return;
    }
    if (location.products.length === 0) {
      res.status(404).json({ message: "No products found in the location!" });
      return;
    }

    const missingProducts = items.filter(
      (item) =>
        !location.products.some((product) => {
          console.log("PRODCUT INSIDE", product);

          return item.productId.toString() === product.productId._id.toString();
        })
    );

    if (missingProducts.length > 0) {
      res.status(400).json({
        message: "Some products do not exist in the location!",
        missingProducts,
      });
      return;
    }

    // Combine products with the same productId
    const combinedProducts = items.reduce((acc, product) => {
      const existingProduct = acc.find(
        (p) => p.productId.toString() === product.productId.toString()
      );
      if (existingProduct) {
        existingProduct.quantity += product.quantity;
      } else {
        acc.push(product);
      }
      return acc;
    }, [] as Product[]);

    const moveProduct: Product[] = [];

    const stayingProducts = location.products.map((movingProduct) => {
      let stay = movingProduct.quantity;
      combinedProducts.forEach((p) => {
        if (p.productId.toString() === movingProduct.productId._id.toString()) {
          stay = Math.max(0, movingProduct.quantity - p.quantity);
          const move = Math.min(movingProduct.quantity, p.quantity);

          if (
            moveProduct.some((product) => product.productId === p.productId)
          ) {
            moveProduct.find(
              (product) => product.productId === p.productId
            )!.quantity += move;
          } else {
            moveProduct.push({
              productId: new Types.ObjectId(p.productId),
              quantity: move,
            });
          }
        }
      });
      return { productId: movingProduct.productId, quantity: stay };
    });

    // UPDATING THE LOCATIONS
    //check
    const filteredStayingProducts = stayingProducts.filter(
      (product) => product.quantity > 0
    );
    const updatedLocation = await Location.findByIdAndUpdate(
      location._id,
      { $set: { products: filteredStayingProducts } },
      { new: true, runValidators: true, session }
    );
    if (!updatedLocation) {
      throw new Error("Failed to update the original location.");
    }

    const bulkUpdateNewLocation = moveProduct.map((product) => ({
      updateOne: {
        filter: { _id: toLocationId, "products.productId": product.productId },
        update: {
          $inc: {
            "products.$.quantity": product.quantity,
          },
        },
      },
    }));

    const bulkAddNewProductToLocation = moveProduct.map((product) => ({
      updateOne: {
        filter: {
          _id: toLocationId,
          "products.productId": { $ne: product.productId },
        },
        update: {
          $push: {
            products: {
              productId: product.productId,
              quantity: product.quantity,
            },
          },
        },
      },
    }));

    await Location.bulkWrite(
      [...bulkUpdateNewLocation, ...bulkAddNewProductToLocation],
      { session }
    );

    // UPDATING THE PRODUCTS

    const bulkOpsAdjustQuantities = moveProduct.map((product) => ({
      updateOne: {
        filter: {
          _id: product.productId,
          "locations.locationId": fromLocationId,
        },
        update: {
          $inc: {
            "locations.$.quantity": -product.quantity,
          },
        },
      },
    }));

    const bulkOpsAddToNewLocation = moveProduct.map((product) => ({
      updateOne: {
        filter: {
          _id: product.productId,
          "locations.locationId": toLocationId,
        },
        update: {
          $inc: {
            "locations.$.quantity": product.quantity,
          },
        },
      },
    }));

    const bulkOpsAddNewLocation = moveProduct.map((product) => ({
      updateOne: {
        filter: {
          _id: product.productId,
          "locations.locationId": { $ne: toLocationId },
        },
        update: {
          $addToSet: {
            locations: {
              locationId: toLocationId,
              quantity: product.quantity,
            },
          },
        },
      },
    }));

    // Execute the bulkWrite operations
    const resultAdjustQuantities = await Product.bulkWrite(
      bulkOpsAdjustQuantities,
      { session }
    );

    const resultAddToNewLocation = await Product.bulkWrite(
      bulkOpsAddToNewLocation,
      { session }
    );

    const resultAddNewLocation = await Product.bulkWrite(
      bulkOpsAddNewLocation,
      { session }
    );

    // FINAL VALIDATION: Ensure all operations were successful
    const totalModified =
      resultAdjustQuantities.modifiedCount +
      resultAddToNewLocation.modifiedCount +
      resultAddNewLocation.modifiedCount;

    if (totalModified < moveProduct.length) {
      throw new Error("Failed to update some products.");
    }

    // CREATING A NEW MOVEMENT

    const itemsMoved = await Promise.all(
      moveProduct.map(async ({ productId, quantity }) => {
        const productRef = location.products.find(
          (p) => p.productId._id.toString() === productId.toString()
        );

        if (!productRef) {
          throw new Error(
            `Product with ID ${productId} not found in location.`
          );
        }

        const product = await Product.findById(productRef.productId);

        if (!product) {
          throw new Error(
            `Product document not found for ID ${productRef.productId}`
          );
        }

        return { product, quantity };
      })
    );

    // Fetch only userName, _id, and email from User
    const user = await User.findById(userId, "userName _id email").lean();

    const [newMovement] = await Movement.create(
      [
      {
        itemsMoved,
        fromLocation: location,
        toLocation: await Location.findById(toLocationId).lean(),
        user, 
      },
      ],
      { session }
    );
    if (!newMovement) {
      throw new Error("Failed to create a new movement.");
    }

    const movement = await Movement.findById(newMovement._id);

    await session.commitTransaction();

    res.status(200).json({
      message: "Movement was successful",
      updatedLocation,
      newMovement: movement,
      success: true,
    });
  } catch (error) {
    await session.abortTransaction();
    next(error);
  } finally {
    session.endSession();
  }
};

export const getAllMovements = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { page, limit, skip } = getPagination(req);

  try {
    const movements = await Movement.find().skip(skip).limit(100);

    const totalMovements = await Movement.countDocuments();

    res.status(200).json({
      message:
        movements.length === 0
          ? "No Movements Found"
          : "Movements successfully found.",
      movements,
      totalPages: Math.ceil(totalMovements / limit),
      currentPage: page,
    });
  } catch (err) {
    next(err);
  }
};

export const getMovementByFilter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id as string;
  const {
    fromLocationId,
    toLocationId,
    startTime,
    endTime,
    quantity,
    userId,
    quantityMoreThan,
    quantityLessThan,
    quantityMoreAndEqual,
    quantityLessAndEqual,
  } = req.body;
  const { page, limit, skip } = getPagination(req);
  const filters: any = { "itemsMoved.productId": id };

  if (quantity) {
    filters["itemsMoved.quantity"] = quantity;
  } else {
    const rangeFilters: any = {};

    if (quantityMoreAndEqual) rangeFilters.$gte = quantityMoreAndEqual;
    if (quantityLessAndEqual) rangeFilters.$lte = quantityLessAndEqual;
    if (quantityMoreThan) rangeFilters.$gt = quantityMoreThan;
    if (quantityLessThan) rangeFilters.$lt = quantityLessThan;

    if (Object.keys(rangeFilters).length > 0) {
      filters["itemsMoved.quantity"] = rangeFilters;
    }
  }

  if (userId) filters.userId = userId;
  if (fromLocationId) filters.fromLocationId = fromLocationId;
  if (toLocationId) filters.toLocationId = toLocationId;

  if (startTime || endTime) {
    filters.createdAt = {};
    if (startTime) filters.createdAt.$gte = new Date(startTime);
    if (endTime) filters.createdAt.$lte = new Date(endTime);
  }

  try {
    const movements = await Movement.find(filters).skip(skip).limit(limit);

    const totalMovements = await Movement.countDocuments(filters);

    res.status(200).json({
      message:
        movements.length === 0
          ? "No movements matched your filters."
          : "Movements successfully found.",
      movements,
      totalPages: Math.ceil(totalMovements / limit),
      currentPage: page,
    });
  } catch (err) {
    next(err);
  }
};
