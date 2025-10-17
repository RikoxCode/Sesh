/*
  Warnings:

  - You are about to drop the column `createdAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `posts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `profiles` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `abbreviation` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `first_name` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role_id` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."posts" DROP CONSTRAINT "posts_authorId_fkey";

-- DropForeignKey
ALTER TABLE "public"."profiles" DROP CONSTRAINT "profiles_userId_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "createdAt",
DROP COLUMN "name",
DROP COLUMN "updatedAt",
ADD COLUMN     "abbreviation" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "first_name" TEXT NOT NULL,
ADD COLUMN     "last_name" TEXT NOT NULL,
ADD COLUMN     "role_id" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "public"."posts";

-- DropTable
DROP TABLE "public"."profiles";

-- CreateTable
CREATE TABLE "roles" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_meta" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "meta_key" TEXT NOT NULL,
    "meta_value" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_meta_pkey" PRIMARY KEY ("id")
);

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

-- CreateTable
CREATE TABLE "time_blocks" (
    "id" TEXT NOT NULL,
    "project_id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "is_chore" BOOLEAN NOT NULL DEFAULT false,
    "start_time" TIMESTAMP(3) NOT NULL,
    "end_time" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "time_blocks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "glossary" (
    "id" TEXT NOT NULL,
    "project_id" TEXT NOT NULL,
    "term" TEXT NOT NULL,
    "definition" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "glossary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "criteria" (
    "id" CHAR(36) NOT NULL,
    "year_id" CHAR(36) NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "special_for_project_id" CHAR(36),

    CONSTRAINT "criteria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sub_criteria" (
    "id" CHAR(36) NOT NULL,
    "criteria_id" CHAR(36) NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "sub_criteria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_sub_criteria" (
    "id" CHAR(36) NOT NULL,
    "sub_criteria_id" CHAR(36) NOT NULL,
    "user_id" CHAR(36) NOT NULL,
    "is_fulfilled" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "user_sub_criteria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chapters" (
    "id" CHAR(36) NOT NULL,
    "project_id" CHAR(36) NOT NULL,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,

    CONSTRAINT "chapters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sections" (
    "id" CHAR(36) NOT NULL,
    "chapter_id" CHAR(36) NOT NULL,
    "parent_id" CHAR(36),
    "position" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "rating_checksum" TEXT,

    CONSTRAINT "sections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ai_ratings" (
    "id" CHAR(36) NOT NULL,
    "section_id" CHAR(36) NOT NULL,
    "rating" INTEGER NOT NULL,
    "rating_description" TEXT NOT NULL,
    "rating_checksum" TEXT NOT NULL,

    CONSTRAINT "ai_ratings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "text_blocks" (
    "id" CHAR(36) NOT NULL,
    "section_id" CHAR(36) NOT NULL,
    "position" INTEGER NOT NULL,
    "heading" TEXT,
    "text" TEXT NOT NULL,
    "source" TEXT,

    CONSTRAINT "text_blocks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "images" (
    "id" CHAR(36) NOT NULL,
    "section_id" CHAR(36) NOT NULL,
    "position" INTEGER NOT NULL,
    "image_data" BYTEA NOT NULL,
    "description" TEXT,
    "source" TEXT,

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tables" (
    "id" CHAR(36) NOT NULL,
    "section_id" CHAR(36) NOT NULL,
    "position" INTEGER NOT NULL,
    "heading" TEXT,
    "markdown_table" TEXT NOT NULL,
    "source" TEXT,

    CONSTRAINT "tables_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "roles_name_key" ON "roles"("name");

-- CreateIndex
CREATE INDEX "user_meta_user_id_idx" ON "user_meta"("user_id");

-- CreateIndex
CREATE INDEX "user_meta_meta_key_idx" ON "user_meta"("meta_key");

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

-- CreateIndex
CREATE INDEX "time_blocks_project_id_idx" ON "time_blocks"("project_id");

-- CreateIndex
CREATE INDEX "time_blocks_start_time_end_time_idx" ON "time_blocks"("start_time", "end_time");

-- CreateIndex
CREATE INDEX "glossary_project_id_idx" ON "glossary"("project_id");

-- CreateIndex
CREATE INDEX "glossary_term_idx" ON "glossary"("term");

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");

-- CreateIndex
CREATE INDEX "users_role_id_idx" ON "users"("role_id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_meta" ADD CONSTRAINT "user_meta_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_year_id_fkey" FOREIGN KEY ("year_id") REFERENCES "years"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "time_blocks" ADD CONSTRAINT "time_blocks_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "glossary" ADD CONSTRAINT "glossary_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "criteria" ADD CONSTRAINT "criteria_year_id_fkey" FOREIGN KEY ("year_id") REFERENCES "years"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "criteria" ADD CONSTRAINT "criteria_special_for_project_id_fkey" FOREIGN KEY ("special_for_project_id") REFERENCES "projects"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sub_criteria" ADD CONSTRAINT "sub_criteria_criteria_id_fkey" FOREIGN KEY ("criteria_id") REFERENCES "criteria"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_sub_criteria" ADD CONSTRAINT "user_sub_criteria_sub_criteria_id_fkey" FOREIGN KEY ("sub_criteria_id") REFERENCES "sub_criteria"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_sub_criteria" ADD CONSTRAINT "user_sub_criteria_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chapters" ADD CONSTRAINT "chapters_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sections" ADD CONSTRAINT "sections_chapter_id_fkey" FOREIGN KEY ("chapter_id") REFERENCES "chapters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sections" ADD CONSTRAINT "sections_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "sections"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ai_ratings" ADD CONSTRAINT "ai_ratings_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "sections"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "text_blocks" ADD CONSTRAINT "text_blocks_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "sections"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "sections"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tables" ADD CONSTRAINT "tables_section_id_fkey" FOREIGN KEY ("section_id") REFERENCES "sections"("id") ON DELETE CASCADE ON UPDATE CASCADE;
