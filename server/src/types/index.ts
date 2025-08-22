import { Request } from "express";

export type UserRole = "ADMIN" | "STAFF" | "VET" | "USER";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface AuthRequest extends Request {
  user?: User;
}
