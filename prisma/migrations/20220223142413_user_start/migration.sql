-- AlterTable
ALTER TABLE "User" ADD COLUMN     "starCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "startAverage" DOUBLE PRECISION NOT NULL DEFAULT 0;
