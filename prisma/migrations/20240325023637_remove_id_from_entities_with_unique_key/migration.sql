/*
  Warnings:

  - The primary key for the `ProjectMembers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `ProjectMembers` table. All the data in the column will be lost.
  - The primary key for the `UserRole` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `UserRole` table. All the data in the column will be lost.
  - The primary key for the `UserSocial` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `UserSocial` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "ProjectMembers_projectId_userId_key";

-- DropIndex
DROP INDEX "UserRole_userId_roleId_key";

-- DropIndex
DROP INDEX "UserSocial_userId_social_key";

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "ProjectMembers" DROP CONSTRAINT "ProjectMembers_pkey",
DROP COLUMN "id",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD CONSTRAINT "ProjectMembers_pkey" PRIMARY KEY ("projectId", "userId");

-- AlterTable
ALTER TABLE "UserRole" DROP CONSTRAINT "UserRole_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "UserRole_pkey" PRIMARY KEY ("userId", "roleId");

-- AlterTable
ALTER TABLE "UserSocial" DROP CONSTRAINT "UserSocial_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "UserSocial_pkey" PRIMARY KEY ("userId", "social");
