import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { jwtVerification } from "../services/authService";
import User from "../models/user";
import csrf from "csurf";

dotenv.config();

export const verifyCompanyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  jwtVerification("company")(req, res, next);
};

export const verifyUserToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  jwtVerification("user")(req, res, next);
};

export const authorize =
  (roles: Array<"admin" | "manager" | "staff">) =>
  (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) {
      res
        .status(401)
        .json({ message: "Unauthorized", error: "Authorisation Error" });
      return;
    }

    if (!roles.includes(user.auth)) {
      res
        .status(403)
        .json({ message: "Access denied", error: "Authorisation Error" });
      return;
    }

    next();
  };

// export const csrfProtection = csrf({
//   cookie: {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: "strict",
//   },
// });
