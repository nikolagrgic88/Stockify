import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";

dotenv.config();
interface DecodedCompanyToken {
  companyId: string;
  iat: number;
  exp: number;
}

interface DecodedUserToken {
  userId: string;
  companyId: string;
  auth: "admin" | "manager" | "staff";
  iat: number;
  exp: number;
}

declare module "express-serve-static-core" {
  interface Request {
    company?: DecodedCompanyToken;
    user?: DecodedUserToken;
  }
}

export const jwtVerification = (userType: "company" | "user") => {
  return (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];

    const token =
      authHeader && authHeader.split(" ")[1]
        ? authHeader.split(" ")[1]
        : req.cookies[`${userType}_auth_token`]; // Check for cookies
    console.log("TOKEN,", token);

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" }); // 401 for missing token
    }

    const secret =
      userType === "company"
        ? process.env.COMPANY_JWT_SECRET
        : process.env.USER_JWT_SECRET;

    if (!secret) {
      return res.status(500).json({ message: "JWT secret is not defined." });
    }

    jwt.verify(token, secret, (err: jwt.VerifyErrors | null, decoded: any) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res
            .status(401)
            .json({ message: "Unauthorized: Token expired" });
        }
        return res.status(403).json({ message: "Forbidden: Invalid token" });
      }

      // Type-check and attach decoded data to req
      if (decoded && typeof decoded === "object") {
        if (userType === "company") {
          req.company = decoded as DecodedCompanyToken;
        } else {
          req.user = decoded as DecodedUserToken;
        }
      }

      next();
    });
  };
};
