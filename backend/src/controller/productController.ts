import { NextFunction, Request, Response } from "express";
import Product, { IProduct } from "../models/product";
import Location from "../models/location";
import { Schema, Types } from "mongoose";
import { createDbBarcode, generateBarcode } from "../services/barcodeServices";

export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await Product.find().populate({
      path: "locations.locationId",
      model: "Location",
    });
    if (!products) {
      res.status(200).json({ message: "No Products Found!", products: [] });
      return;
    }
    res.status(200).json({ message: "Product found", products });
  } catch (error) {
    next(error);
  }
};
export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById({ _id: productId }).populate({
      path: "locations.locationId",
      model: "Location",
    });
    if (!product) {
      res.status(200).json({ message: "Product not found!" });
      return;
    }
    res.status(200).json({ message: "Product found", products: product });
  } catch (error) {
    next(error);
  }
};
export const createProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const session = await Product.startSession();
  try {
    session.startTransaction();
    const products: IProduct[] = req.body;

    const createdProducts = [];
    for (const productData of products) {
      const {
        title,
        sku,
        size,
        barcode,
        description,
        color,
        locations,
        category,
        totalQuantity,
        availableQuantity,
      } = productData;

      const productExists = await Product.findOne({ sku }).session(session);
      if (productExists) {
        res.status(409).json({
          message: `Product with SKU ${sku} already exists!`,
          product: productExists,
        });
        await session.abortTransaction();
        return;
      }

      let generetedBarcode = barcode;
      if (!generetedBarcode || generetedBarcode == 0) {
        generetedBarcode = await generateBarcode();
      }

      let availableQuant: number = availableQuantity;
      if (!availableQuantity) {
        availableQuant = totalQuantity;
      }

      const newProduct = new Product({
        title,
        sku,
        size,
        description,
        color,
        locations,
        category,
        totalQuantity,
        barcode: generetedBarcode,
        availableQuant,
      });

      const savedProduct = await newProduct.save({ session });
      const savedBarcode = await createDbBarcode(
        generetedBarcode,
        "Product",
        session
      );

      if (!savedProduct || !savedBarcode) {
        res.status(400).json({
          message: "Something went wrong!",
          details: `The product with SKU ${sku} could not be saved.`,
        });
        await session.abortTransaction();
        return;
      }

      if (locations) {
        for (const { locationId, quantity } of locations) {
          const existingLocation = await Location.findById({ _id: locationId });

          if (!existingLocation) {
            res.status(404).json({
              message: `Location with ID ${locationId} does not exist!`,
              details: `The product with SKU ${sku} could not be saved.`,
            });
            await session.abortTransaction();
            return;
          }

          existingLocation?.products.push({
            productId: savedProduct._id as Types.ObjectId,
            quantity,
          });

          await existingLocation?.save();
        }
      }

      createdProducts.push(savedProduct);
    }

    await session.commitTransaction();
    res.status(201).json({
      message: "Products successfully created!",
      products: createdProducts,
    });
  } catch (error) {
    await session.abortTransaction();
    next(error);
  } finally {
    session.endSession();
  }
};
export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const session = await Product.startSession();
  try {
    session.startTransaction();
    const {
      title,
      sku,
      size,
      barcode,
      description,
      color,
      locations,
      category,
      totalQuantity,
      availableQuantity,
    }: IProduct = req.body;
    const productExists = await Product.findOne({ sku }).session(session);
    if (productExists) {
      res
        .status(409)
        .json({ message: "Product already exists!", product: productExists });
      return;
    }

    let generetedBarcode = barcode;

    if (!generetedBarcode || generetedBarcode == 0) {
      generetedBarcode = await generateBarcode();
    }
    let availableQuant: number = availableQuantity;
    if (!availableQuantity) {
      availableQuant = totalQuantity;
    }

    const newProduct = new Product({
      title,
      sku,
      size,
      description,
      color,
      locations,
      category,
      totalQuantity,
      barcode: generetedBarcode,
      availableQuant,
    });

    const savedProduct = await newProduct.save({ session });
    const savedBarcode = await createDbBarcode(
      generetedBarcode,
      "Product",
      session
    );
    if (!savedProduct || !savedBarcode) {
      res.status(400).json({
        message: "Somethig went wrong!",
        details: "The product could not be saved.",
      });
      return;
    }
    if (locations) {
      for (const { locationId, quantity } of locations) {
        //checking if location exists
        const existingLocation = await Location.findById({
          _id: locationId,
        });

        if (!existingLocation) {
          res.status(404).json({
            message: "Location does not exist!",
            details: "The product could not be saved.",
          });
          //might break the code TODO
          return;
        }
        existingLocation?.products.push({
          productId: savedProduct._id as Types.ObjectId,
          quantity,
        });

        await existingLocation?.save();
      }
    }
    await session.commitTransaction();
    res.status(201).json({
      message: "Product successfully created!",
      product: newProduct,
    });
  } catch (error) {
    await session.abortTransaction();
    next(error);
  } finally {
    session.endSession();
  }
};

export const updateProductDetailsById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const productId: string = req.params.productId;

    const updates: Partial<IProduct> = req.body.updates;

    if (updates.locations && updates.locations.length > 0) {
      const locationMap = new Map<
        string,
        {
          locationId: Types.ObjectId;
          quantity: number;
          reservableQuantity: number;
        }
      >();

      for (const {
        locationId,
        quantity,
        reservableQuantity,
      } of updates.locations) {
        const idStr = locationId.toString();
        const existing = locationMap.get(idStr);

        if (existing) {
          existing.quantity += quantity;
          existing.reservableQuantity += reservableQuantity;
        } else {
          locationMap.set(idStr, {
            locationId,
            quantity,
            reservableQuantity,
          });
        }
      }

      updates.locations = Array.from(locationMap.values());
      // //TO DO FIX AVAILABLE QUANTITY
      // updates.locations = Array.from(locationMap.entries()).map(
      //   (locationId, quantity,reservedQuantity) => ({
      //     locationId,
      //     quantity,
      //     reservedQuantity,
      //   })
      // );
    }

    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      res.status(404).json({ message: "Product wasn't found" });
      return;
    }

    if (updates.totalQuantity !== undefined) {
      const quantityDifference =
        updates.totalQuantity - existingProduct.totalQuantity;
      updates.availableQuantity =
        existingProduct.availableQuantity + quantityDifference;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { $set: updates },
      { new: true, runValidators: true }
    );
    if (!updatedProduct) {
      res.status(404).json({ message: "Product wasn't found" });
      return;
    }
    if (updates.locations && updates.locations.length > 0) {
      for (const { locationId, quantity } of updates.locations) {
        try {
          const existingLocation = await Location.findById(locationId);

          if (existingLocation) {
            const productIndex = existingLocation.products.findIndex(
              (product) => product.productId.toString() === productId
            );

            if (productIndex !== -1) {
              // Update quantity if product already exists in the location
              existingLocation.products[productIndex].quantity = quantity;
            } else {
              // Add new product to the location
              existingLocation.products.push({
                productId: new Types.ObjectId(productId),
                quantity: quantity,
              });
            }

            await existingLocation.save();
          } else {
            console.error(`Location with ID ${locationId} not found.`);
          }
        } catch (err) {
          console.error(`Failed to update location ${locationId}:`, err);
        }
      }
    }
    console.log("UPDATED PRODUCT", updatedProduct);

    res.status(200).json({
      message: "Product successfully updated",
      product: updatedProduct,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const productId = req.params.productId;

    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

    if (deletedProduct.locations.length > 0) {
      for (const location of deletedProduct.locations) {
        try {
          await Location.findByIdAndUpdate(
            location.locationId,
            {
              $pull: { products: { productId: new Types.ObjectId(productId) } },
            },
            { new: true }
          );
        } catch (err) {
          console.error(
            `Failed to update location ${location.locationId}:`,
            err
          );
        }
      }
    }

    res.status(200).json({
      message: "Product successfully deleted",
      product: deletedProduct,
    });
  } catch (error) {
    next(error);
  }
};
export const getProductByFilter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, size, title, color, location } = req.body;
    const filter: any = {};

    if (id) filter._id = id;
    if (size) filter.size = size;
    if (title) filter.title = title;
    if (color) filter.color = color;
    if (location) filter["locations.locationId"] = location;

    const products = await Product.find(filter).populate({
      path: "locations.locationId",
      model: "Location",
    });

    if (!products || products.length === 0) {
      res.status(404).json({ message: "No Products Found!" });
      return;
    }

    res.status(200).json({ message: "Products found", products });
  } catch (error) {
    next(error);
  }
};
