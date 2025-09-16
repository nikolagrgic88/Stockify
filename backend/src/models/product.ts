import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  _id: mongoose.Types.ObjectId;
  title: string;
  sku: number;
  size: string;
  barcode: number;
  description: string;
  color: string;
  totalQuantity: number;
  availableQuantity: number;
  locations: {
    locationId: mongoose.Types.ObjectId;
    quantity: number;
    reservableQuantity: number;
  }[];
  category: string[];
}

const productSchema = new Schema<IProduct>({
  title: {
    type: String,
    required: true,
  },
  sku: {
    type: Number,
    required: true,
    unique: true,
  },
  size: {
    type: String,
    required: true,
  },
  totalQuantity: { type: Number, required: true, default: 0 },
  availableQuantity: { type: Number, required: true, default: 0 },
  barcode: {
    type: Number,
    required: true,
    unique: true,
  },
  description: { type: String, required: true },
  color: { type: String, required: true },
  locations: [
    {
      locationId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Location",
      },
      quantity: { type: Number, required: true },
      reservableQuantity: {
        type: Number,
        required: true,
        default: function (this: { quantity: number }) {
          return this.quantity;
        },
      },
    },
  ],
  category: [{ type: String, required: true }],
});

const Product = mongoose.model<IProduct>("Product", productSchema);

export default Product;
