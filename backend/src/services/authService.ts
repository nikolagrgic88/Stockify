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
    console.log("=== /me Request Debug ===");
    console.log("Headers:", req.headers);
    console.log("Cookies:", req.cookies); // <-- important
    console.log("Authorization header:", req.headers["authorization"]);

    if (!req.cookies || !req.cookies.company_auth_token) {
      return res.status(401).json({
        message: "Unauthorized: No token provided",
        debug: {
          cookies: req.cookies,
          headers: req.headers,
        },
      });
    }

    const authHeader = req.headers["authorization"];
    const token =
      authHeader && authHeader.split(" ")[1]
        ? authHeader.split(" ")[1]
        : req.cookies[`${userType}_auth_token`]; // Check for cookies

    if (!token) {
      res.status(401).json({ message: "Unauthorized: No token provided" }); // 401 for missing token
      return;
    }

    const secret =
      userType === "company"
        ? process.env.COMPANY_JWT_SECRET
        : process.env.USER_JWT_SECRET;

    if (!secret) {
      res.status(500).json({ message: "JWT secret is not defined." });
      return;
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
