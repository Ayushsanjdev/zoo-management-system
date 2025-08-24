import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../prisma/client";
import { AppError } from "../utils/AppError";
import { LoginInput, RegisterInput } from "../validation/auth";
import { UserRepository } from "../repositories/user.repository";

const JWT_SECRET = process.env.JWT_SECRET!;

const userRepository = new UserRepository();

export class AuthService {
  async register({ name, email, password, role = "USER" }: RegisterInput) {
    const existingUser = await userRepository.findByEmail(email);
    if (existingUser) {
      throw new AppError(400, "User already exists", [
        { field: "email", message: "user with same email already exists" },
      ]);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, role },
    });

    return { ...user, password: undefined };
  }

  async login({ email, password }: LoginInput) {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      if (!user) throw new AppError(400, "Invalid credentials");
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      if (!user) throw new AppError(400, "Invalid credentials");
    }

    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: "12h",
    });

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }
}
