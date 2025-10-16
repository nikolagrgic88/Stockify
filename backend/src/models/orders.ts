import { ICustomer } from "./customer";
import mongoose, { Schema, Document, Date, Types } from "mongoose";
import { IProduct } from "./product";
export interface IItemDetails {
  title: string;
  sku: number;
  size: string;
  barcode: number;
  description: string;
  color: string;
}

export interface IOrder {
  _id: mongoose.Types.ObjectId;
  // items: { productId: mongoose.Types.ObjectId; quantity: number }[];
  items: {
    itemDetails: IItemDetails;
    quantity: number;
    productId: mongoose.Types.ObjectId;
  }[];
  customer: ICustomer;
  orderStatus: "pending" | "actioned" | "picked" | "shipped" | "fulfilled";
  dateCreated: Date;
  dispatcher:
    | "auspost"
    | "startrack"
    | "tollgroup"
    | "couriersplease"
    | "aramex";
}

const orderSchema = new Schema<IOrder>({
  items: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      itemDetails: {
        title: { type: String },
        sku: { type: Number },
        size: { type: String },
        barcode: { type: Number },
        description: { type: String },
        color: { type: String },
      },
      quantity: { type: Number, required: true },
    },
  ],
  // items: [
  //   {
  //     productId: {
  //       type: Schema.Types.ObjectId,
  //       required: true,
  //       ref: "Product",
  //     },
  //     quantity: { type: Number, required: true },
  //   },
  // ],
  customer: {
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    shippingAddress: {
      streetName: { type: String, required: true },
      streetNumber: { type: Number, required: true },
      unitNumber: { type: Number, required: true },
      postCode: { type: Number, required: true },
      country: { type: String, required: true },
      state: { type: String, required: true },
      city: { type: String, required: true },
    },
    phoneNumber: { type: String, required: true },
  },
  orderStatus: {
    type: String,
    enum: ["pending", "actioned", "picked", "shipped", "fulfilled"],
    default: "pending",
  },
  dateCreated: { type: Date, required: true, default: Date.now },
  dispatcher: {
    type: String,
    required: true,
    enum: ["auspost", "startrack", "tollgroup", "couriersplease", "aramex"],
  },
});

const Order = mongoose.model<IOrder>("Order", orderSchema);

export default Order;
