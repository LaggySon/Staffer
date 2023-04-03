/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Organization` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "_freelancer" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_manager" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_freelancer_AB_unique" ON "_freelancer"("A", "B");

-- CreateIndex
CREATE INDEX "_freelancer_B_index" ON "_freelancer"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_manager_AB_unique" ON "_manager"("A", "B");

-- CreateIndex
CREATE INDEX "_manager_B_index" ON "_manager"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Organization_name_key" ON "Organization"("name");

-- AddForeignKey
ALTER TABLE "_freelancer" ADD CONSTRAINT "_freelancer_A_fkey" FOREIGN KEY ("A") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_freelancer" ADD CONSTRAINT "_freelancer_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_manager" ADD CONSTRAINT "_manager_A_fkey" FOREIGN KEY ("A") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_manager" ADD CONSTRAINT "_manager_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
