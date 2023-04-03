/*
  Warnings:

  - The primary key for the `OrgOnManager` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `orgId` on the `OrgOnManager` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "OrgOnManager" DROP CONSTRAINT "OrgOnManager_pkey",
DROP COLUMN "orgId",
ADD CONSTRAINT "OrgOnManager_pkey" PRIMARY KEY ("organizationId", "userId");
