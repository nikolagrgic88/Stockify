
import { Request, Response, NextFunction } from "express";
import Product from "../models/product";
import Location from "../models/location";
import { Types } from "mongoose";
import { clearInventoryById } from "../services/locationService";

type TProduct = {
  productId: Types.ObjectId;
  quantity: number;
};

export const getAllInventory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const inventory = await Location.find().populate({
      path: "products.productId",
      model: "Product",
    });

    if (!inventory) {
      res.status(404).json({ message: "No inventory found!" });
      return;
    }
    res
      .status(200)
      .json({ message: "Inventory successfully found.", inventory });
  } catch (error) {
    next(error);
  }
}; // For fetching all inventory records

export const getInventoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const locationId = req.params.locationId;

    const location = await Location.findById(locationId).populate({
      path: "products.productId",
    });

    if (!location) {
      res.status(404).json({ message: "Location not found!" });
      return;
    }
    console.log("LOCATION", location);

    res.status(201).json({ message: "Location successfully found!", location });
  } catch (error) {
    next(error);
  }
}; // For fetching inventory by location ID

export const addOrUpdateInventory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const inventoryData: TProduct[] = req.body.inventoryData;
    const locationId = req.params.locationId;

    const location = await Location.findById(locationId);
    if (!location) {
      res.status(404).json({ message: "Location doesn`t exist!" });
      return;
    }
    for (const { productId, quantity } of inventoryData) {
      const existingProduct = location.products.find(
        (storedProd) => storedProd.productId.toString() === productId.toString()
      );

      if (existingProduct) {
        const existingProdId = existingProduct.productId;
        existingProduct.quantity += quantity;

        await Product.findOneAndUpdate(
          { _id: existingProdId, "locations.locationId": locationId },
          {
            $inc: { "locations.$.quantity": quantity, totalQuantity: quantity },
          },
          { new: true }
        );
      } else {
        const newProduct = await Product.findByIdAndUpdate(
          productId,
          {
            $addToSet: {
              locations: { locationId, quantity },
            },
            $inc: {
              totalQuantity: quantity,
            },
          },
          { new: true }
        );

        if (newProduct) {
          location.products.push({ productId, quantity });
        }
      }
    }
    await location.save();
    res
      .status(201)
      .json({ message: "Location successfully updated", location });
  } catch (error) {
    next(error);
  }
}; // For adding or updating inventory at a location

export const updateInventoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const locationId = req.params.id; // Corrected parameter name
    const { productId, quantity } = req.body;

    const location = await Location.findById(locationId);
    if (!location) {
      res.status(404).json({ message: "Location doesn't exist!" });
      return;
    }

    const product = location.products.find(
      (prod) => prod.productId.toString() === productId.toString()
    );

    if (product) {
      product.quantity = quantity;
      await location.save();

      await Product.updateOne(
        { _id: productId, "locations.locationId": locationId },
        { $set: { "locations.$.quantity": quantity } }
      );

      res.status(200).json({ message: "Inventory updated successfully." });
    } else {
      res.status(404).json({ message: "Product not found in location!" });
    }
  } catch (error) {
    next(error);
  }
}; // For updating stock levels or location details

export const deleteInventoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const locationId = req.params.id;
    const location = await clearInventoryById(locationId);
    if (!location) {
      res.status(404).json({ message: "Location doesn't exist!" });
      return
    }
    res.status(200).json({
      message: "Products successfully deleted from location",
    });
  } catch (error) {
    next(error);
  }
}; // For removing inventory from a location

export const deleteProductFromInventory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId, locationId } = req.params;

    const location = await Location.findByIdAndUpdate(
      locationId,
      {
        $pull: { products: { productId: new Types.ObjectId(productId) } },
      },
      { new: false }
    );
    if (!location) {
      res.status(404).json({ message: "Location doesnt exist!" });
      return;
    }
    console.log("LOCATION BEFORE", location);

    const removedProduct = location?.products.find(
      (loc) => loc.productId.toString() === productId
    );

    const removedQuantity = removedProduct?.quantity ?? 0;

    const product = await Product.updateOne(
      { _id: productId },
      {
        $pull: { locations: { locationId: new Types.ObjectId(locationId) } },
        $inc: { totalQuantity: -removedQuantity },
      },
      { new: true }
    );
    console.log("UPDATED PRODUCT", product);

    if (product.modifiedCount === 0) {
      res.status(404).json({ message: "Product not found!" });
      return;
    }

    res.status(200).json({
      message: "Product successfully removed from location.",
      location,
    });
  } catch (error) {
    next(error);
  }
};
