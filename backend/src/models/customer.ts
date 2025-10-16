import mongoose, { Schema, Document } from "mongoose";

export interface ICustomer extends Document {
  email: string;
  shippingAddress: {
    streetName: string;
    streetNumber: number;
    unitNumber: number;
    postCode: number;
    country: string;
    state: string;
    city: string;
  };
  phoneNumber: string;
}

const customerSchema = new Schema<ICustomer>(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
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
  { timestamps: true }
);

const Customer = mongoose.model<ICustomer>("Customer", customerSchema);

export default Customer;
