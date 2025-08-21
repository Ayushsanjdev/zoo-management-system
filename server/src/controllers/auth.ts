import { Request, Response } from "express";
import * as AuthService from "../services/auth";

export const register = async (req: Request, res: Response) => {
  const user = await AuthService.registerUser(req.body);
  res.status(201).json(user);
};

export const login = async (req: Request, res: Response) => {
  const token = await AuthService.loginUser(req.body);
  res.json({ token });
};
