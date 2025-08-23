import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../prisma/client";
import { AppError } from "../utils/AppError";
import { LoginInput, RegisterInput } from "../validation/auth";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function registerUser({
  name,
  email,
  password,
  role = "USER",
}: RegisterInput) {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new AppError(400, "User already exists", [
      { field: "email", message: "user with same email already exists" },
    ]);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword, role },
  });

  return user;
}

export async function loginUser({ email, password }: LoginInput) {
  const user = await prisma.user.findUnique({ where: { email } });
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
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  };
}
