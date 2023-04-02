/*
  Warnings:

  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_EventToRole` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_RoleToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_freelancer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_manager` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_EventToRole" DROP CONSTRAINT "_EventToRole_A_fkey";

-- DropForeignKey
ALTER TABLE "_EventToRole" DROP CONSTRAINT "_EventToRole_B_fkey";

-- DropForeignKey
ALTER TABLE "_RoleToUser" DROP CONSTRAINT "_RoleToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_RoleToUser" DROP CONSTRAINT "_RoleToUser_B_fkey";

-- DropForeignKey
ALTER TABLE "_freelancer" DROP CONSTRAINT "_freelancer_A_fkey";

-- DropForeignKey
ALTER TABLE "_freelancer" DROP CONSTRAINT "_freelancer_B_fkey";

-- DropForeignKey
ALTER TABLE "_manager" DROP CONSTRAINT "_manager_A_fkey";

-- DropForeignKey
ALTER TABLE "_manager" DROP CONSTRAINT "_manager_B_fkey";

-- DropTable
DROP TABLE "Role";

-- DropTable
DROP TABLE "_EventToRole";

-- DropTable
DROP TABLE "_RoleToUser";

-- DropTable
DROP TABLE "_freelancer";

-- DropTable
DROP TABLE "_manager";

-- CreateTable
CREATE TABLE "Position" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "compensation" TEXT NOT NULL,
    "filled" BOOLEAN NOT NULL,
    "eventId" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Position_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrgOnFreelancer" (
    "orgId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,

    CONSTRAINT "OrgOnFreelancer_pkey" PRIMARY KEY ("orgId","userId")
);

-- CreateTable
CREATE TABLE "OrgOnManager" (
    "orgId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,

    CONSTRAINT "OrgOnManager_pkey" PRIMARY KEY ("orgId","userId")
);

-- AddForeignKey
ALTER TABLE "Position" ADD CONSTRAINT "Position_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Position" ADD CONSTRAINT "Position_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrgOnFreelancer" ADD CONSTRAINT "OrgOnFreelancer_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrgOnFreelancer" ADD CONSTRAINT "OrgOnFreelancer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrgOnManager" ADD CONSTRAINT "OrgOnManager_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrgOnManager" ADD CONSTRAINT "OrgOnManager_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
