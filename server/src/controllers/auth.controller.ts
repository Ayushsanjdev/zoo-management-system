import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

const authService = new AuthService();

export class AuthController {
  async register(req: Request, res: Response) {
    const user = await authService.register(req.body);
    res.status(201).json(user);
  }

  async login(req: Request, res: Response) {
    const data = await authService.login(req.body);
    res.json(data);
  }
}
