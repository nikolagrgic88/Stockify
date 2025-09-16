import { NextFunction, Request, Response } from "express";
import User, { IUser } from "../models/user";

export const userUpdatesLogger =
  (updatedData: Partial<IUser>, userId: string) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const currentTimestamp = Date.now();
    const updatedPayload = {
      usersUpdates: updatedData,
      updatedAt: currentTimestamp,
    };

    if (!updatedData) {
      next(new Error("Something went wrong!"));
      return;
    }

    await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          updates: updatedPayload,
        },
        $set: { updatedAt: currentTimestamp },
      },
      { new: true, runValidators: true }
    );

    next();
  };
