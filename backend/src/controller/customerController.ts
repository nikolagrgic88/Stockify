import Order from "../models/orders";
import Customer, { ICustomer } from "../models/customer";
import { NextFunction, Request, Response } from "express";

export const getOrders = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customerId = req.params.customerId;
    const orders = await Order.find({ "customer.userId": customerId });
    if (!orders) {
      res.status(404).json({ message: "Orders not found!" });
      return;
    }
    res.status(200).json({ message: "Orders successfully found.", orders });
  } catch (error) {
    next(error);
  }
}; // Fetch all orders for a customer

export const getOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { customerId, orderId } = req.params;
    const order = await Order.findOne({ "customer.userId": customerId, _id: orderId });
    if (!order) {
      res.status(404).json({ message: "Order not found!" });
      return;
    }
    res.status(200).json({ message: "Order successfully found.", order });
  } catch (error) {
    next(error);
  }
}; // Fetch a specific order for a customer

export const createCustomer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, shippingAddress, phoneNumber }: ICustomer =
      req.body.customersData;

    const customer = new Customer({
      email,
      shippingAddress,
      phoneNumber,
    });
    const newCustomer = await customer.save();
    if (!newCustomer) {
      res.status(400).json({ message: "Unable to save the customer" });
    }
    res.status(201).json({
      message: "Customer successfully created",
      customer: newCustomer,
    });
  } catch (error) {
    next(error);
  }
};
