// import { createOrder } from "./orderController";
import { NextFunction, Request, Response } from "express";
import Order, { IOrder } from "../models/orders";
import Product from "../models/product";

export const getAllOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orders = await Order.find();
    if (!orders) {
      res.status(404).json({ message: "Orders not found!" });
      return;
    }
    res.status(200).json({ message: "Orders successfully found.", orders }); // Changed status code to 200
  } catch (error) {
    next(error);
  }
};

export const getOrdersByDispatcher = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const dispatcher = req.params.dispatcher;
    const orders = await Order.find({ dispatcher }); // Changed 'findOne' to 'find' and added 'await'
    if (!orders) {
      res.status(404).json({ message: "Orders for dispatcher not found!" });
      return;
    }
    res.status(200).json({ message: "Orders successfully found.", orders }); // Changed status code to 200
  } catch (error) {
    next(error);
  }
};

export const getOrderByFilter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const filter: any = {};

  if (req.query.customerId) {
    filter["customer.customerId"] = req.query.customerId;
  }
  if (req.query.email) {
    filter["customer.email"] = req.query.email;
  }
  if (req.query.orderStatus) {
    filter.orderStatus = req.query.orderStatus;
  }
  if (req.query.dispatcher) {
    filter.dispatcher = req.query.dispatcher;
  }
  if (req.query.dateCreated) {
    filter.dateCreated = req.query.dateCreated;
  }
  if (req.query.createdAfter) {
    filter.dateCreated = {
      ...filter.dateCreated,
      $gte: new Date(req.query.createdAfter as string),
    };
  }
  if (req.query.createdBefore) {
    filter.dateCreated = {
      ...filter.dateCreated,
      $lte: new Date(req.query.createdBefore as string),
    };
  }

  try {
    const order = await Order.find(filter);
    if (!order) {
      res.status(404).json({ message: "Order not found!" });
      return;
    }
    res.status(200).json({ message: "Order successfully found.", order });
  } catch (error) {
    next(error);
  }
}; // Fetch a specific order

export const createOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const session = await Product.startSession();
  session.startTransaction();
  try {
    const order: IOrder = req.body;
    const errors: string[] = [];
    // const createdOrder = await Order.create([order], { session });
    const populatedOrder: IOrder = {
      ...order,
      items: [],
    };

    for (const item of order.items) {
      //find item
      const product = await Product.findById(item.productId);
      item.itemDetails;
      //error if not found
      if (!product) {
        errors.push(`Product ${item.productId} not found`);
        continue;
      }

      //update item (reduce quantity)
      product.availableQuantity -= item.quantity;

      if (product.availableQuantity < 0) {
        errors.push(
          `Insufficient stock for product ${product.title || product._id}`
        );
        continue;
      }
      await product.save({ session });

      //Populate new order with item details
      populatedOrder.items.push({
        productId: product._id,
        itemDetails: {
          title: product.title,
          sku: product.sku,
          size: product.size,
          barcode: product.barcode,
          description: product.description,
          color: product.color,
        },
        quantity: item.quantity,
      });
    }
    //Create new Order
    const createdOrder = await Order.create([populatedOrder], { session });

    await session.commitTransaction();
    session.endSession();
    res.status(201).json({
      success: true,
      message: "Orders successfully saved",
      createdOrder,
      errors,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
}; // Create a new order

export const updateOrderById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orderId = req.params.id;
    const updateData = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(orderId, updateData, {
      new: true,
    });
    if (!updatedOrder) {
      res.status(404).json({ message: "Order not found!" });
      return;
    }
    res
      .status(200)
      .json({ message: "Order successfully updated.", order: updatedOrder });
  } catch (error) {
    next(error);
  }
}; // Update an order's status or details

export const deleteOrderById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const orderId = req.params.id;
    const deletedOrder = await Order.findByIdAndDelete(orderId);
    if (!deletedOrder) {
      res.status(404).json({ message: "Order not found!" });
      return;
    }
    res.status(200).json({ message: "Order successfully deleted." });
  } catch (error) {
    next(error);
  }
}; // Cancel or delete an order
