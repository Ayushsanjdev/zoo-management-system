import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";
import { AppError } from "../utils/AppError";

export const validate =
  (schema: ZodType, customMessage = "Validation failed") =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const errors = result.error.issues.map((e) => ({
        field: e.path.join(".") || "message",
        message: e.message,
      }));
      return next(new AppError(400, customMessage, errors));
    }

    req.body = result.data;
    next();
  };
