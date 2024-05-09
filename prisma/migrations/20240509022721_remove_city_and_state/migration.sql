/*
  Warnings:

  - You are about to drop the column `city` on the `collect_points` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `collect_points` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "collect_points" DROP COLUMN "city",
DROP COLUMN "state";
