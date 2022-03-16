/*
  Warnings:

  - You are about to drop the column `startAverage` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "startAverage",
ADD COLUMN     "totalStar" DOUBLE PRECISION NOT NULL DEFAULT 0;
