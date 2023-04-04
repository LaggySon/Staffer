/*
  Warnings:

  - You are about to drop the `UserOnEvent` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserOnEvent" DROP CONSTRAINT "UserOnEvent_eventId_fkey";

-- DropForeignKey
ALTER TABLE "UserOnEvent" DROP CONSTRAINT "UserOnEvent_userId_fkey";

-- DropTable
DROP TABLE "UserOnEvent";

-- CreateTable
CREATE TABLE "UserOnPosition" (
    "positionId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserOnPosition_pkey" PRIMARY KEY ("positionId","userId")
);

-- AddForeignKey
ALTER TABLE "UserOnPosition" ADD CONSTRAINT "UserOnPosition_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOnPosition" ADD CONSTRAINT "UserOnPosition_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
