/*
  Warnings:

  - A unique constraint covering the columns `[head]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_head_key" ON "User"("head");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_head_fkey" FOREIGN KEY ("head") REFERENCES "Note"("id") ON DELETE SET NULL ON UPDATE CASCADE;
