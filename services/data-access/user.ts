"use server";

import prisma from "@/lib/prisma";

export type User = {
  id: string;
  image: string | null;
  handle: string | null;
  about: string | null;
  onboardingCompleted: boolean;
};

const selectFields: Record<keyof User, true> = {
  id: true,
  image: true,
  handle: true,
  about: true,
  onboardingCompleted: true,
};

export const getUser = async (email: string): Promise<User | null> => {
  return await prisma.user.findUnique({
    select: selectFields,
    where: {
      email: email,
    },
  });
};

export const getUserByHandle = async (handle: string): Promise<User | null> => {
  return await prisma.user.findUnique({
    select: selectFields,
    where: {
      handle: handle,
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
