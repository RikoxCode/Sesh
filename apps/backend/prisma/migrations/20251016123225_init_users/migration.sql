/*
  Warnings:

  - A unique constraint covering the columns `[abbreviation]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "users_abbreviation_key" ON "users"("abbreviation");

-- CreateIndex
CREATE INDEX "users_abbreviation_idx" ON "users"("abbreviation");
