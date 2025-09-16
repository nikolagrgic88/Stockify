import { NextFunction, Request, Response } from "express";
import User, { IUser } from "../models/user";
import bcrypts from "bcryptjs";
import { userUpdatesLogger } from "../services/userService";

export const getUserByFilter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.userId;
    const {
      createdAfter,
      createdBefore,
      updatedAfter,
      updatedBefore,
      auth,
      position,
      isActive,
      userName,
      firstName,
      lastName,
      email,
      phoneNumber,
      id,
    } = req.query;

    const filter: any = {};

    if (userId) {
      filter._id = userId;
    }
    if (id) {
      filter._id = id;
    }
    if (createdAfter) {
      filter.createdAt = {
        ...filter.createdAt,
        $gte: new Date(createdAfter as string),
      };
    }
    if (createdBefore) {
      filter.createdAt = {
        ...filter.createdAt,
        $lte: new Date(createdBefore as string),
      };
    }
    if (updatedAfter) {
      filter.updatedAt = {
        ...filter.updatedAt,
        $gte: new Date(updatedAfter as string),
      };
    }
    if (updatedBefore) {
      filter.updatedAt = {
        ...filter.updatedAt,
        $lte: new Date(updatedBefore as string),
      };
    }
    if (auth) {
      filter.auth = auth;
    }
    if (position) {
      filter.position = position;
    }
    if (isActive) {
      filter.isActive = isActive;
    }
    if (userName) {
      filter.userName = userName;
    }
    if (firstName) {
      filter.firstName = firstName;
    }
    if (lastName) {
      filter.lastName = lastName;
    }
    if (email) {
      filter.email = email;
    }
    if (phoneNumber) {
      filter.phoneNumber = phoneNumber;
    }

    const user = await User.find(filter);

    // const users = await User.find({
    //   $or: [
    //     { _id: filter._id },
    //     { createdAt: filter.createdAt },
    //     { updatedAt: filter.updatedAt },
    //     { auth: filter.auth },
    //     { position: filter.position },
    //     { isActive: filter.isActive },
    //     { userName: filter.userName },
    //     { firstName: filter.firstName },
    //     { lastName: filter.lastName },
    //     { email: filter.email },
    //     { phoneNumber: filter.phoneNumber },
    //   ].filter((condition) => Object.keys(condition).length > 0),
    // });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    const usersWithoutPassword = user.map((u: IUser) => {
      const { password, ...userWithoutPassword } = u.toObject();
      return userWithoutPassword;
    });
    res.status(200).json({
      message: "User successfully found",
      users: usersWithoutPassword,
    });
  } catch (error) {
    next(error);
  }
};
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    firstName,
    lastName,
    email,
    password,
    auth,
    position,
    phoneNumber,
    isAcitve,
  } = req.body;
  let userName = `${firstName}.${lastName}`;

  try {
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      res.status(409).json({ message: "Email already exists" });
      return;
    }

    let existingUser = await User.findOne({ userName });
    let randomNumber = 1;
    while (existingUser) {
      userName = `${firstName}.${lastName}.${randomNumber}`;
      existingUser = await User.findOne({ userName });
      randomNumber++;
    }
    const hashPassword = await bcrypts.hash(password, 12);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashPassword,
      userName,
      auth,
      position,
      phoneNumber,
      isAcitve,
    });

    const createdUser = await newUser.save();
    if (createdUser) {
      res
        .status(201)
        .json({ message: "User successfully create", user: newUser });
    }
  } catch (error) {
    next(error);
  }
};
export const updateUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.userId;
  const receivedData = req.body;
  const updatedData = { ...receivedData } as Partial<IUser>;

  try {
    // delete updatedData?.createdAt;
    delete updatedData?.userName;
    delete updatedData?.password;

    const currentTimestamp = Date.now();
    const updatedPayload = {
      usersUpdates: updatedData,
      updatedAt: currentTimestamp,
    };

    if (!updatedData) {
      res.status(400).json({ message: "Something went wrong!" });
      return;
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          updates: updatedPayload,
        },
        $set: { ...updatedData },
      },
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      res.status(404).json({ message: "User wasn`t found" });
      return;
    }

    // userUpdatesLogger(updatedData, userId)(req, res, next);

    res
      .status(201)
      .json({ message: "User successfully updated", user: updatedUser });
  } catch (error) {
    next(error);
  }
};
export const deleteUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.id;
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      res.status(404).json({ message: "User doesnt exist!" });
      return;
    }
    res.status(200).json({ message: "User successfully deleted!" });
  } catch (error) {
    next(error);
  }
};
export const updateUsersPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.userId;
  const { oldPassword, newPassword } = req.body;
  try {
    console.log("ID", userId);

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: "User not found!" });
      return;
    }
    // const isPasswordValid = await bcrypts.compare(oldPassword, user.password);
    // if (!isPasswordValid) {
    //   res.status(401).json({ message: "Invalid password!" });
    //   return;
    // }
    const hashPassword = await bcrypts.hash(newPassword, 12);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { password: hashPassword },
      { new: true }
    );
    if (!updatedUser) {
      res.status(400).json({ message: "Password not updated!" });
      return;
    }

    userUpdatesLogger({ password: hashPassword }, userId)(req, res, next);
    res.status(200).json({ message: "Password updated successfully!" });
  } catch (error) {
    next(error);
  }
};
