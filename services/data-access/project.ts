"use server";

import { ProjectMembers } from "@prisma/client";

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
  const project = await prisma.project.create({
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

  await addMemberToProject(project.id, ownderId);

  return project;
};

export const addMemberToProject = async (
  projectId: string,
  userId: string
): Promise<ProjectMembers> => {
  return await prisma.projectMembers.create({
    data: {
      projectId: projectId,
      userId: userId,
    },
  });
};

export const removeMemberFromProject = async (
  projectId: string,
  userId: string
): Promise<void> => {
  await prisma.projectMembers.delete({
    where: {
      projectId_userId: {
        projectId: projectId,
        userId: userId,
      },
    },
  });
};
