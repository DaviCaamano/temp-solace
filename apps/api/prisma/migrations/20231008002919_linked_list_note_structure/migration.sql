/*
  Warnings:

  - You are about to drop the column `parentId` on the `Note` table. All the data in the column will be lost.
  - You are about to drop the column `siblingId` on the `Note` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[head]` on the table `Note` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[next]` on the table `Note` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Note" DROP CONSTRAINT "Note_parentId_fkey";

-- DropForeignKey
ALTER TABLE "Note" DROP CONSTRAINT "Note_siblingId_fkey";

-- DropIndex
DROP INDEX "Note_siblingId_key";

-- AlterTable
ALTER TABLE "Note" DROP COLUMN "parentId",
DROP COLUMN "siblingId",
ADD COLUMN     "head" TEXT,
ADD COLUMN     "next" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "head" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Note_head_key" ON "Note"("head");

-- CreateIndex
CREATE UNIQUE INDEX "Note_next_key" ON "Note"("next");

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_head_fkey" FOREIGN KEY ("head") REFERENCES "Note"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_next_fkey" FOREIGN KEY ("next") REFERENCES "Note"("id") ON DELETE SET NULL ON UPDATE CASCADE;
