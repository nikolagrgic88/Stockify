import mongoose, { Schema, Document } from "mongoose";

export interface ILocation extends Document {
  _id: mongoose.Types.ObjectId;
  name?: string;
  aisle: string;
  section: string;
  sectionNumber: number;
  column: string;
  row: number;
  products: {
    productId: mongoose.Types.ObjectId;
    quantity: number;
  }[];
  sortKey: string;
  barcode?: string;
  remarks?: string;
}

const locationSchema = new Schema<ILocation>({
  name: { type: String, unique: true },
  aisle: { type: String, required: true },
  section: { type: String, required: true },
  sectionNumber: { type: Number, required: true },
  column: { type: String, required: true },
  row: { type: Number, required: true },
  products: {
    type: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
        quantity: { type: Number, required: true },
      },
    ],
    default: [],
  },
  sortKey: { type: String, required: true, unique: true },
  barcode: String,
  remarks: String,
});

const Location = mongoose.model<ILocation>("Location", locationSchema);
export default Location;
