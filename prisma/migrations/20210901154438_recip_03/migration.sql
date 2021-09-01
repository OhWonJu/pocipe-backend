/*
  Warnings:

  - You are about to drop the column `time` on the `Recipe` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "time",
ADD COLUMN     "cookingTime" INTEGER NOT NULL DEFAULT 0;
