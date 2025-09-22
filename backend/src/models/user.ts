import mongoose, { Schema, Document, Date } from "mongoose";

export interface IUser extends Document {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userName: string;
  auth: "admin" | "manager" | "staff";
  position: string;
  phoneNumber: string;
  isActive: boolean;
  updates: { usersUpdates: Schema.Types.Mixed; updatedAt: Date }[];
}

const userSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true, minlength: 2 },
    lastName: { type: String, required: true, minlength: 2 },
    email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
    password: { type: String, required: true, minlength: 6 },
    userName: {
      type: String,
      required: true,
      unique: true,
      immutable: true,
      minlength: 3,
    },
    auth: {
      type: String,
      required: true,
      default: "staff",
      enum: ["admin", "manager", "staff"],
    },
    position: { type: String, required: true },
    phoneNumber: { type: String, required: true, match: /^\d{10}$/ },
    isActive: { type: Boolean, required: true, default: true },
    updates: [
      {
        usersUpdates: { type: Schema.Types.Mixed },
        updatedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;
