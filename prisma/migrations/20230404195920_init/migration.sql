-- DropForeignKey
ALTER TABLE "UserOnPosition" DROP CONSTRAINT "UserOnPosition_positionId_fkey";

-- AddForeignKey
ALTER TABLE "UserOnPosition" ADD CONSTRAINT "UserOnPosition_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "Position"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
