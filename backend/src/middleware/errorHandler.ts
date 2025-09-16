import { Request, Response, NextFunction } from "express";

interface ErrorWithStatus extends Error {
  status?: number;
}

const errorHandler = (
  err: ErrorWithStatus,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.status || 500;

  if (process.env.NODE_ENV !== "production") {
    console.error(`[${new Date().toISOString()}] ${err.stack}`);
  }

  res.status(status).json({
    success: false,
    status,
    message: err.message || "Internal Server Error",
  });
};

export default errorHandler;
