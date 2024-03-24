"use server";

import { Prisma, Role, UserRole } from "@prisma/client";

import prisma from "@/lib/prisma";

export type UserWithRole = {
  role: Role;
} & UserRole;

export const getRoles = async (): Promise<Role[]> => {
  return await prisma.role.findMany();
};

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

export const addUserRoles = async (
  userId: string,
  roleIds: string[]
): Promise<Prisma.BatchPayload> => {
  return await prisma.userRole.createMany({
    data: [
      ...roleIds.map((roleId) => ({
        userId: userId,
        roleId: roleId,
      })),
    ],
    skipDuplicates: true,
  });
};

export const removeUserRoles = async (
  userId: string,
  rolesId: string[]
): Promise<void> => {
  await prisma.userRole.deleteMany({
    where: {
      userId: userId,
      roleId: {
        in: rolesId,
      },
    },
  });
};
