import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export const errorValidationService = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    next();
  } catch (error) {
    next(error);
  }
};
