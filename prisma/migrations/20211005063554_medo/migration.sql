/*
  Warnings:

  - You are about to drop the column `file` on the `MeDo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "MeDo" DROP COLUMN "file",
ALTER COLUMN "title" DROP NOT NULL,
ALTER COLUMN "isTimer" DROP NOT NULL,
ALTER COLUMN "step" DROP NOT NULL;
