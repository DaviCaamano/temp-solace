/*
  Warnings:

  - A unique constraint covering the columns `[zeroId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `zeroId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "zeroId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_zeroId_key" ON "User"("zeroId");
