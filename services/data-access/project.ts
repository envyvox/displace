"use server";

import prisma from "@/lib/prisma";

import { User } from "./user";

export type Project = {
  id: string;
  name: string;
  description: string;
  readMoreLink: string | null;
  stack: string[];
  owner: User;
};

export const getProjects = async (): Promise<Project[]> => {
  return await prisma.project.findMany({ include: { owner: true } });
};

export const getProject = async (id: string): Promise<Project | null> => {
  return await prisma.project.findUnique({
    where: {
      id: id,
    },
    include: {
      owner: true,
    },
  });
};

export const createProject = async (
  ownderId: string,
  name: string,
  description: string,
  stack: string[],
  readMoreLink?: string
): Promise<Project> => {
  return await prisma.project.create({
    data: {
      ownerId: ownderId,
      name: name,
      description: description,
      stack: stack,
      readMoreLink: readMoreLink,
    },
    include: {
      owner: true,
    },
  });
};
