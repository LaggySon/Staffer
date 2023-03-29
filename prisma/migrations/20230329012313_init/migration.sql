-- AlterTable
ALTER TABLE "User" ADD COLUMN     "biography" TEXT,
ADD COLUMN     "contactInfo" TEXT,
ALTER COLUMN "role" SET DEFAULT 'user';

-- CreateTable
CREATE TABLE "Organization" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "contactInfo" TEXT NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Social" (
    "id" TEXT NOT NULL,
    "site" TEXT NOT NULL,
    "handle" TEXT NOT NULL,
    "organizationId" TEXT,

    CONSTRAINT "Social_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "compensation" TEXT NOT NULL,
    "filled" BOOLEAN NOT NULL,
    "eventId" TEXT,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Social" ADD CONSTRAINT "Social_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Role" ADD CONSTRAINT "Role_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;
