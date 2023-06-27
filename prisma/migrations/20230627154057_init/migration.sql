-- DropIndex
DROP INDEX "Organization_name_key";

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "description" TEXT,
ALTER COLUMN "date" SET DATA TYPE DATE;
