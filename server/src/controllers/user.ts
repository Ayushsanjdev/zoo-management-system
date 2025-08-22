import { Request, Response } from "express";
import * as UserService from "../services/user";
import { UserRole } from "../types";

export const listUser = async (req: Request, res: Response) => {
  const user = await UserService.getUser(req.params.id);
  res.json(user);
};

export const listUsers = async (req: Request, res: Response) => {
  const { role } = req.query as { role: UserRole };
  const users = await UserService.getUsers(role);
  res.json(users);
};

export const deleteUser = async (req: Request, res: Response) => {
  await UserService.removeUser(req.params.id);
  res.status(204).send();
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updated = await UserService.updateUser(id, req.body);
  res.json(updated);
};
