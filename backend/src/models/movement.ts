import mongoose, { Schema, Document } from "mongoose";
import { IProduct } from "./product";
import { ILocation } from "./location";
import { IUser } from "./user";

interface IMovement extends Document {
  itemsMoved: { product: IProduct; quantity: number }[];
  fromLocation: ILocation;
  toLocation: ILocation;
  user: IUser;
}

const movementSchema = new Schema<IMovement>(
  {
    itemsMoved: [
      {
        product: {
          type: Schema.Types.Mixed,
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
    fromLocation: {
      type: Schema.Types.Mixed,
      required: true,
    },
    toLocation: {
      type: Schema.Types.Mixed,
      required: true,
    },
    user: {
      type: Schema.Types.Mixed,
      required: true,
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);
const Movement = mongoose.model<IMovement>("Movement", movementSchema);
export default Movement;
