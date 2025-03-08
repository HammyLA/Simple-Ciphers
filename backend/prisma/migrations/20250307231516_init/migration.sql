/*
  Warnings:

  - You are about to drop the column `count` on the `GlobalStatistics` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "GlobalStatistics" DROP COLUMN "count",
ADD COLUMN     "decrypts" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "encrypts" INTEGER NOT NULL DEFAULT 0;
