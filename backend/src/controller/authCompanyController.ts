import { ICompanyDatabase } from "./../models/companyDatabase";
import { NextFunction, Request, Response } from "express";
// import bcrypt from "bcrypt"; // changed from "bcryptjs"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import CompanyDatabase from "../models/companyDatabase";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

export const postCompanyLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { companyId, password } = req.body;
  const secret = process.env.COMPANY_JWT_SECRET as string;
  try {
    if (!mongoose.Types.ObjectId.isValid(companyId)) {
      res.status(400).json({ message: "Invalid Company Id" });
      return;
    }

    const company = (await CompanyDatabase.findById(
      companyId
    )) as ICompanyDatabase;

    if (!company) {
      res.status(404).json({ message: "Company not found!" });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, company.password);

    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid password!" });
      return;
    }

    // Generate JWT token
    const token = jwt.sign({ companyId: company._id }, secret, {
      expiresIn: "24h",
    });

    res.cookie("company_auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ companyName: company.name, dbURI: company.dbURI });
  } catch (error) {
    next(error);
  }
};

export const postCompanyLogout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(200).json({ message: "Company logged out", token: "" });
  } catch (error) {
    next(error);
  }
};

export const createCompany = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { companyURI, password } = req.body;
  const saultRounds = bcrypt.genSaltSync(12);
  try {
    const hashedPassword = await bcrypt.hash(password, saultRounds);

    const company = new CompanyDatabase({
      dbURI: companyURI,
      password: hashedPassword,
    });
    await company.save();
    res.status(201).json({ message: "Company created successfully." });
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
    if (!req.company) {
      res.status(401).json({ message: "Not authenticated" });
      return;
    }

    const company = await CompanyDatabase.findById(
      req.company.companyId
    ).lean();
    if (!company) {
      res.status(404).json({ message: "Company not found" });
      return;
    }

    res.status(200).json({
      name: company.name,
      dbURI: company.dbURI,
    });
  } catch (error) {
    next(error);
  }
};
export const updateCompanyPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { companyId, newPassword } = req.body;
  if (!companyId || !newPassword) {
    res
      .status(400)
      .json({ message: "Company ID and new password are required" });
    return;
  }
  try {
    const saultRounds = bcrypt.genSaltSync(12);
    const hashedPassword = await bcrypt.hash(newPassword, saultRounds);

    const updatedCompany = await CompanyDatabase.findByIdAndUpdate(
      companyId,
      { password: hashedPassword },
      { new: true }
    );

    if (!updatedCompany) {
      res.status(404).json({ message: "Company not found" });
      return;
    }

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    next(error);
  }
};
