/*
  Warnings:

  - You are about to drop the column `A51Decryptions` on the `GlobalStatistics` table. All the data in the column will be lost.
  - You are about to drop the column `A51Encryptions` on the `GlobalStatistics` table. All the data in the column will be lost.
  - You are about to drop the column `AESDecryptions` on the `GlobalStatistics` table. All the data in the column will be lost.
  - You are about to drop the column `AESEncryptions` on the `GlobalStatistics` table. All the data in the column will be lost.
  - You are about to drop the column `DESDecryptions` on the `GlobalStatistics` table. All the data in the column will be lost.
  - You are about to drop the column `DESEncryptions` on the `GlobalStatistics` table. All the data in the column will be lost.
  - You are about to drop the column `OTPDecryptions` on the `GlobalStatistics` table. All the data in the column will be lost.
  - You are about to drop the column `OTPEncryptions` on the `GlobalStatistics` table. All the data in the column will be lost.
  - You are about to drop the column `RC4Decryptions` on the `GlobalStatistics` table. All the data in the column will be lost.
  - You are about to drop the column `RC4Encryptions` on the `GlobalStatistics` table. All the data in the column will be lost.
  - You are about to drop the column `TEADecryptions` on the `GlobalStatistics` table. All the data in the column will be lost.
  - You are about to drop the column `TEAEncryptions` on the `GlobalStatistics` table. All the data in the column will be lost.
  - You are about to drop the column `VigenereDecryptions` on the `GlobalStatistics` table. All the data in the column will be lost.
  - You are about to drop the column `VigenereEncryptions` on the `GlobalStatistics` table. All the data in the column will be lost.
  - You are about to drop the column `caesarDecryptions` on the `GlobalStatistics` table. All the data in the column will be lost.
  - You are about to drop the column `caesarEncryptions` on the `GlobalStatistics` table. All the data in the column will be lost.
  - You are about to drop the column `substitutionDecryptions` on the `GlobalStatistics` table. All the data in the column will be lost.
  - You are about to drop the column `substitutionEncryptions` on the `GlobalStatistics` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cipher]` on the table `GlobalStatistics` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cipher` to the `GlobalStatistics` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GlobalStatistics" DROP COLUMN "A51Decryptions",
DROP COLUMN "A51Encryptions",
DROP COLUMN "AESDecryptions",
DROP COLUMN "AESEncryptions",
DROP COLUMN "DESDecryptions",
DROP COLUMN "DESEncryptions",
DROP COLUMN "OTPDecryptions",
DROP COLUMN "OTPEncryptions",
DROP COLUMN "RC4Decryptions",
DROP COLUMN "RC4Encryptions",
DROP COLUMN "TEADecryptions",
DROP COLUMN "TEAEncryptions",
DROP COLUMN "VigenereDecryptions",
DROP COLUMN "VigenereEncryptions",
DROP COLUMN "caesarDecryptions",
DROP COLUMN "caesarEncryptions",
DROP COLUMN "substitutionDecryptions",
DROP COLUMN "substitutionEncryptions",
ADD COLUMN     "cipher" TEXT NOT NULL,
ADD COLUMN     "count" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "GlobalStatistics_cipher_key" ON "GlobalStatistics"("cipher");
