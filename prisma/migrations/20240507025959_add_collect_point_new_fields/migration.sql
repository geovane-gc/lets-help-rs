/*
  Warnings:

  - Added the required column `city` to the `collect_points` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `collect_points` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `collect_points` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "collect_points" ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL;
