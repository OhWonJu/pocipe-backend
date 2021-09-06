/*
  Warnings:

  - Added the required column `isMain` to the `Hashtag` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Hashtag" ADD COLUMN     "isMain" BOOLEAN NOT NULL;
