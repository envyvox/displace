"use server";

import { Role, UserRole } from "@prisma/client";

import prisma from "@/lib/prisma";

export type UserWithRole = {
  role: Role;
} & UserRole;

export const getUserRoles = async (userId: string): Promise<UserWithRole[]> => {
  return await prisma.userRole.findMany({
    where: {
      userId: userId,
    },
    include: {
      role: true,
    },
  });
};

export const addUserRole = async (
  userId: string,
  roleId: string
): Promise<UserWithRole> => {
  return await prisma.userRole.create({
    data: {
      userId: userId,
      roleId: roleId,
    },
    include: {
      role: true,
    },
  });
};

export const removeUserRole = async (
  userId: string,
  roleId: string
): Promise<void> => {
  await prisma.userRole.delete({
    where: {
      userId_roleId: {
        userId: userId,
        roleId: roleId,
      },
    },
  });
};
