/*
  Warnings:

  - Added the required column `cipher` to the `Key` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Key" ADD COLUMN     "cipher" TEXT NOT NULL;
