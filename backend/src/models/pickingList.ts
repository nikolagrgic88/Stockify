import mongoose, { Schema } from "mongoose";
import { IItemDetails } from "./orders";

export interface IPickingList extends Document {
  _id: mongoose.Types.ObjectId;
  quantity: number;
  status: "unassigned" | "assigned" | "inProgress" | "completed";
  priority: "High" | "Medium" | "Low";
  createdAt: Date;
  updatedAt: Date;
  staff: mongoose.Types.ObjectId;
  listItems: {
    _id: mongoose.Types.ObjectId;
    orderId: mongoose.Types.ObjectId;
    locations: {
      location: mongoose.Types.ObjectId;
      quantityInLocation: number;
    }[];
    item: IItemDetails;
    itemId: mongoose.Types.ObjectId;
    quantity: number;
  }[];
  notes: string;
}
// location: ILocation; quantityInLocation: number
const pickingListSchema = new Schema<IPickingList>(
  {
    quantity: { type: Number, required: true },
    status: {
      type: String,
      required: true,
      default: "unassigned",
      enum: ["unassigned", "assigned", "inProgress", "completed"],
    },
    priority: {
      type: String,
      required: true,
      default: "Low",
      enum: ["High", "Low", "Medium"],
    },
    staff: { type: Schema.Types.ObjectId, ref: "User", required: false },
    listItems: [
      {
        locations: [
          {
            location: {
              type: Schema.Types.ObjectId,
              required: true,
              ref: "Location",
            },
            quantityInLocation: { type: Number, required: true },
          },
        ],
        orderId: { type: Schema.Types.ObjectId, required: true },
        itemId: { type: Schema.Types.ObjectId, required: true, ref: "Product" },
        item: {
          title: String,
          sku: Number,
          size: String,
          barcode: Number,
          description: String,
          color: String,
        },
        quantity: { type: Number, required: true },
      },
    ],
    notes: String,
  },
  { timestamps: true }
);

const PickingList = mongoose.model<IPickingList>(
  "PickingList",
  pickingListSchema
);

export default PickingList;
