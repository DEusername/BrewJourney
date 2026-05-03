/*
  Warnings:

  - Added the required column `summary` to the `Conversations` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BrewLogs" DROP CONSTRAINT "BrewLogs_grinderId_fkey";

-- AlterTable
ALTER TABLE "BrewLogs" ALTER COLUMN "grinderId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Conversations" ADD COLUMN     "summary" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "BrewLogs" ADD CONSTRAINT "BrewLogs_grinderId_fkey" FOREIGN KEY ("grinderId") REFERENCES "Grinders"("id") ON DELETE SET NULL ON UPDATE CASCADE;
