import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "../generated/prisma";
import { UserRole } from "../types";
import { AppError } from "../utils/AppError";
import { LoginInput, RegisterInput, UpdateInput } from "../validation/auth";

const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET!;

export async function registerUser({
  name,
  email,
  password,
  role = "USER",
}: RegisterInput) {
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error("User already exists");
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
    throw new Error("Invalid credentials");
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, {
    expiresIn: "12h",
  });

  return {
    token,
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  };
}

export const getUser = async (id: string) => {
  return await prisma.user.findFirst({ where: { id } });
};

export const getUsers = async (role: UserRole) => {
  return await prisma.user.findMany({
    where: role ? { role } : {},
    orderBy: { createdAt: "asc" },
  });
};

export const removeUser = async (id: string) => {
  await prisma.user.delete({ where: { id } });
};

export const updateUser = async (id: string, data: UpdateInput) => {
  const user = await prisma.user.findUnique({ where: { id } });

  if (!user) {
    throw new AppError(404, "User not found");
  }

  if (data?.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }

  if (Object.keys(data).length === 0) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  const updated = await prisma.user.update({
    where: { id },
    data,
  });

  return {
    id: updated.id,
    name: updated.name,
    email: updated.email,
    role: updated.role,
    createdAt: updated.createdAt,
    updatedAt: updated.updatedAt,
  };
};
