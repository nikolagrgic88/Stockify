import mongoose, { Schema } from "mongoose";

export interface IBarcode extends Document {
  barcode: string;
  productOrLocation: mongoose.Types.ObjectId;
  onModel: string;
}

const bardocdeSchema = new Schema<IBarcode>({
  barcode: { type: String, unique: true },
  productOrLocation: {
    type: Schema.Types.ObjectId,
    refPath: "onModel",
  },
  onModel: {
    type: String,
    required: true,
    enum: ["Product", "Location"],
  },
});
const Barcode = mongoose.model<IBarcode>("Barcode", bardocdeSchema);
export default Barcode;
//# sourceMappingURL=barcode.js.map
