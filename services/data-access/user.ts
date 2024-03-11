"use server";

import prisma from "@/lib/prisma";

export type User = {
  id: string;
  handle: string | null;
  about: string | null;
};

const selectFields: Record<keyof User, true> = {
  id: true,
  handle: true,
  about: true,
};

export const getUser = async (email: string): Promise<User> => {
  return await prisma.user.findUniqueOrThrow({
    select: selectFields,
    where: {
      email: email,
    },
  });
};

export const setUserHandle = async (
  userId: string,
  handle: string
): Promise<void> => {
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      handle: handle,
    },
  });
};

export const setUserOnboarding = async (
  userId: string,
  onboardingCompleted: boolean
): Promise<void> => {
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      onboardingCompleted: onboardingCompleted,
    },
  });
};
