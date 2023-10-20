/*
  Warnings:

  - A unique constraint covering the columns `[siblingId]` on the table `Note` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Note" ADD COLUMN     "siblingId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Note_siblingId_key" ON "Note"("siblingId");

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_siblingId_fkey" FOREIGN KEY ("siblingId") REFERENCES "Note"("id") ON DELETE SET NULL ON UPDATE CASCADE;
