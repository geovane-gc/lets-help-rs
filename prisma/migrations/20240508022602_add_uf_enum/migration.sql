/*
  Warnings:

  - Changed the type of `state` on the `collect_points` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "brazilian_states" AS ENUM ('AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO');

-- AlterTable
ALTER TABLE "collect_points" DROP COLUMN "state",
ADD COLUMN     "state" "brazilian_states" NOT NULL;
