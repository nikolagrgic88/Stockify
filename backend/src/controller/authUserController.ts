// import bcrypt from "bcrypt";
import bcrypt from "bcryptjs";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/user";
import { verifyCompanyToken } from "../middleware/authMiddleware";
import dotenv from "dotenv";
dotenv.config();

export const postUserLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  const secret = process.env.USER_JWT_SECRET as string;
  try {
    const user = (await User.findOne({ email })) as IUser;
    if (!user) {
      res.status(404).json({ message: "User not found!" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid password!" });
      return;
    }
    const token = jwt.sign({ userId: user._id }, secret, { expiresIn: "1h" });

    res.cookie("user_auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      path: "/",
      maxAge: 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "User logged in successfully",
      email: user.email,
      userName: user.userName,
      auth: user.auth,
      position: user.position,
      userId: user.id,
    });
  } catch (error) {
    next(error);
  }
};
export const postUserLogout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // clear the cookie
    res.clearCookie("user_auth_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      path: "/",
    });

    res.status(200).json({ message: "User logged out" });
  } catch (error) {
    next(error);
  }
};
export const getCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const decodedUser = req.user;

    if (!decodedUser) {
      res.status(401).json({ message: "Unauthorized: No valid token" });
      return;
    }

    const user = await User.findById(decodedUser.userId);
    console.log("USER", user);

    if (!user) {
      console.log("not FOund");

      res.status(404).json({ message: "User not found!" });
      return;
    }

    res.status(200).json({ message: "User found", user });
  } catch (error) {
    next(error);
  }
};
