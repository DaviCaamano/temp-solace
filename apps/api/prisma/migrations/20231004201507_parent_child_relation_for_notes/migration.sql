-- AlterTable
ALTER TABLE "Note" ADD COLUMN     "parentId" TEXT,
ALTER COLUMN "content" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Note"("id") ON DELETE SET NULL ON UPDATE CASCADE;
