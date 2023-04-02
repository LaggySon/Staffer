/*
  Warnings:

  - The primary key for the `OrgOnFreelancer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `orgId` on the `OrgOnFreelancer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "OrgOnFreelancer" DROP CONSTRAINT "OrgOnFreelancer_pkey",
DROP COLUMN "orgId",
ADD CONSTRAINT "OrgOnFreelancer_pkey" PRIMARY KEY ("organizationId", "userId");
