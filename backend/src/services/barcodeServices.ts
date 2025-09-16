import { ClientSession } from "mongoose";
import Barcode from "../models/barcode";

export const generateBarcode = async (): Promise<number> => {
  let barcode: number = 0;
  let exists = true;

  while (exists) {
    barcode = Math.floor(100000000000 + Math.random() * 900000000000);
    const existingBc = await Barcode.exists({ barcode: barcode });
    if (!existingBc) {
      exists = false;
    }
  }

  //   await Barcode.create({ barcode: barcode, onModel: "Location" });
  return barcode;
};

export const createDbBarcode = async (
  barcode: number,
  onModel: string,
  session: ClientSession
) => {
  return await Barcode.create([{ barcode, onModel }], { session });
};
