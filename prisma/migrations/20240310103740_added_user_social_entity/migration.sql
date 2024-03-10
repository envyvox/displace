-- CreateEnum
CREATE TYPE "Social" AS ENUM ('Telegram', 'Discord', 'LinkedIn');

-- CreateTable
CREATE TABLE "UserSocial" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "social" "Social" NOT NULL,
    "link" TEXT NOT NULL,

    CONSTRAINT "UserSocial_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserSocial_userId_social_key" ON "UserSocial"("userId", "social");

-- AddForeignKey
ALTER TABLE "UserSocial" ADD CONSTRAINT "UserSocial_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
