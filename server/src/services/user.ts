import { UserRole } from "../types";
import { AppError } from "../utils/AppError";
import { UpdateInput } from "../validation/auth";
import bcrypt from "bcrypt";
import prisma from "../prisma/client";

export const getUser = async (id: string) => {
  return await prisma.user.findFirst({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

export const getUsers = async (role: UserRole) => {
  return await prisma.user.findMany({
    where: role ? { role } : {},
    orderBy: { createdAt: "asc" },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
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

  if (data?.email) {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });
    if (existingUser) {
      throw new AppError(400, "Email already exists");
    }
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
