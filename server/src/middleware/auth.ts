import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest, User } from "../types";
import { AppError } from "../utils/AppError";

const JWT_SECRET = process.env.JWT_SECRET!;

export function authenticateToken(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  if (!token)
    return next(
      new AppError(401, "Authentication failed", [
        { field: "auth", message: "Token not found" },
      ])
    );

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err)
      return next(
        new AppError(401, "Authentication failed", [
          { field: "auth", message: "Invalid or expired token" },
        ])
      );
    req.user = user as User;
    next();
  });
}

export const authorizeAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = (req as any).user;

  if (!user) {
    return next(
      new AppError(401, "Unauthorized", [
        { field: "auth", message: "User info missing in request" },
      ])
    );
  }

  if (user.role !== "ADMIN") {
    return next(
      new AppError(403, "Authorization failed", [
        { field: "auth", message: "Admin access required" },
      ])
    );
  }

  next();
};
