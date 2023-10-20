/*
  Warnings:

  - You are about to drop the column `head` on the `Note` table. All the data in the column will be lost.
  - You are about to drop the column `head` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Note" DROP CONSTRAINT "Note_head_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_head_fkey";

-- DropIndex
DROP INDEX "Note_head_key";

-- DropIndex
DROP INDEX "User_head_key";

-- AlterTable
ALTER TABLE "Note" DROP COLUMN "head",
ADD COLUMN     "parentId" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "head";

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Note"("id") ON DELETE SET NULL ON UPDATE CASCADE;
