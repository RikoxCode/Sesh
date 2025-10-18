/*
  Warnings:

  - You are about to drop the `Project` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Project" DROP CONSTRAINT "Project_owner_id_fkey";

-- DropTable
DROP TABLE "public"."Project";

-- CreateTable
CREATE TABLE "years" (
    "id" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "years_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projects" (
    "id" TEXT NOT NULL,
    "year_id" TEXT NOT NULL,
    "owner_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "start_date" DATE NOT NULL,
    "end_date" DATE NOT NULL,
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "years_year_key" ON "years"("year");

-- CreateIndex
CREATE INDEX "years_year_idx" ON "years"("year");

-- CreateIndex
CREATE INDEX "years_is_active_idx" ON "years"("is_active");

-- CreateIndex
CREATE INDEX "projects_year_id_idx" ON "projects"("year_id");

-- CreateIndex
CREATE INDEX "projects_owner_id_idx" ON "projects"("owner_id");

-- CreateIndex
CREATE INDEX "projects_start_date_end_date_idx" ON "projects"("start_date", "end_date");

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_year_id_fkey" FOREIGN KEY ("year_id") REFERENCES "years"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
