/*
  Warnings:

  - You are about to drop the column `role_id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `ai_ratings` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `chapters` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `criteria` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `glossary` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `images` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `projects` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `roles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sections` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sub_criteria` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tables` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `text_blocks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `time_blocks` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_meta` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_sub_criteria` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `years` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `roleId` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."ai_ratings" DROP CONSTRAINT "ai_ratings_section_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."chapters" DROP CONSTRAINT "chapters_project_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."criteria" DROP CONSTRAINT "criteria_special_for_project_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."criteria" DROP CONSTRAINT "criteria_year_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."glossary" DROP CONSTRAINT "glossary_project_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."images" DROP CONSTRAINT "images_section_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."projects" DROP CONSTRAINT "projects_owner_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."projects" DROP CONSTRAINT "projects_year_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."sections" DROP CONSTRAINT "sections_chapter_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."sections" DROP CONSTRAINT "sections_parent_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."sub_criteria" DROP CONSTRAINT "sub_criteria_criteria_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."tables" DROP CONSTRAINT "tables_section_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."text_blocks" DROP CONSTRAINT "text_blocks_section_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."time_blocks" DROP CONSTRAINT "time_blocks_project_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."user_meta" DROP CONSTRAINT "user_meta_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."user_sub_criteria" DROP CONSTRAINT "user_sub_criteria_sub_criteria_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."user_sub_criteria" DROP CONSTRAINT "user_sub_criteria_user_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."users" DROP CONSTRAINT "users_role_id_fkey";

-- DropIndex
DROP INDEX "public"."users_role_id_idx";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "role_id",
ADD COLUMN     "roleId" TEXT NOT NULL;

-- DropTable
DROP TABLE "public"."ai_ratings";

-- DropTable
DROP TABLE "public"."chapters";

-- DropTable
DROP TABLE "public"."criteria";

-- DropTable
DROP TABLE "public"."glossary";

-- DropTable
DROP TABLE "public"."images";

-- DropTable
DROP TABLE "public"."projects";

-- DropTable
DROP TABLE "public"."roles";

-- DropTable
DROP TABLE "public"."sections";

-- DropTable
DROP TABLE "public"."sub_criteria";

-- DropTable
DROP TABLE "public"."tables";

-- DropTable
DROP TABLE "public"."text_blocks";

-- DropTable
DROP TABLE "public"."time_blocks";

-- DropTable
DROP TABLE "public"."user_meta";

-- DropTable
DROP TABLE "public"."user_sub_criteria";

-- DropTable
DROP TABLE "public"."years";

-- CreateIndex
CREATE INDEX "users_roleId_idx" ON "users"("roleId");
