"use server";

import { Social, UserSocial } from "@prisma/client";

import prisma from "@/lib/prisma";

export const getUserSocials = async (userId: string): Promise<UserSocial[]> => {
  return await prisma.userSocial.findMany({
    where: {
      userId: userId,
    },
  });
};

export const addUserSocial = async (
  userId: string,
  social: Social,
  link: string
): Promise<UserSocial> => {
  return await prisma.userSocial.create({
    data: {
      userId: userId,
      social: social,
      link: link,
    },
  });
};

export const removeUserSocial = async (
  userId: string,
  social: Social
): Promise<void> => {
  await prisma.userSocial.delete({
    where: {
      userId_social: {
        userId: userId,
        social: social,
      },
    },
  });
};
