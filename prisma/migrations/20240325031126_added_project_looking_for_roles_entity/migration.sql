/*
  Warnings:

  - You are about to drop the column `projectId` on the `Role` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Role" DROP CONSTRAINT "Role_projectId_fkey";

-- AlterTable
ALTER TABLE "Role" DROP COLUMN "projectId";

-- CreateTable
CREATE TABLE "ProjectLookingForRole" (
    "projectId" TEXT NOT NULL,
    "roleId" TEXT NOT NULL,

    CONSTRAINT "ProjectLookingForRole_pkey" PRIMARY KEY ("projectId","roleId")
);

-- AddForeignKey
ALTER TABLE "ProjectLookingForRole" ADD CONSTRAINT "ProjectLookingForRole_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectLookingForRole" ADD CONSTRAINT "ProjectLookingForRole_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
