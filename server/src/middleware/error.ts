import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    res.status(err.status).json({
      status: err.status,
      message: err.message,
      errors: err.errors,
    });
    return;
  }

  console.error("Unexpected error:", err);

  res.status(500).json({
    status: 500,
    message: "Internal Server Error",
    errors: [{ field: "unknown", message: "An unexpected error occurred" }],
  });
};
