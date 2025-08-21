import { Request, Response } from "express";
import * as AuthService from "../services/auth";
import { UserRole } from "../types";

export const register = async (req: Request, res: Response) => {
  const user = await AuthService.registerUser(req.body);
  res.status(201).json(user);
};

export const login = async (req: Request, res: Response) => {
  const token = await AuthService.loginUser(req.body);
  res.json({ token });
};

export const listUser = async (req: Request, res: Response) => {
  const user = await AuthService.getUser(req.params.id);
  res.json(user);
};

export const listUsers = async (req: Request, res: Response) => {
  const { role } = req.query as { role: UserRole };
  const users = await AuthService.getUsers(role);
  res.json(users);
};

export const deleteUser = async (req: Request, res: Response) => {
  await AuthService.removeUser(req.params.id);
  res.status(204).send();
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updated = await AuthService.updateUser(id, req.body);
  res.json(updated);
};
