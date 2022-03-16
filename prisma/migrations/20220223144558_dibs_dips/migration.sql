/*
  Warnings:

  - You are about to drop the column `dibsCount` on the `Recipe` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "dibsCount",
ADD COLUMN     "dipsCount" INTEGER NOT NULL DEFAULT 0;
