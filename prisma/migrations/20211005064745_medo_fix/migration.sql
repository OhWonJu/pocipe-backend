/*
  Warnings:

  - You are about to drop the column `captin` on the `MeDo` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `MeDo` table. All the data in the column will be lost.
  - Added the required column `originalId` to the `MeDo` table without a default value. This is not possible if the table is not empty.
  - Made the column `isTimer` on table `MeDo` required. This step will fail if there are existing NULL values in that column.
  - Made the column `step` on table `MeDo` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "MeDo" DROP COLUMN "captin",
DROP COLUMN "title",
ADD COLUMN     "memo" TEXT,
ADD COLUMN     "originalId" TEXT NOT NULL,
ALTER COLUMN "isTimer" SET NOT NULL,
ALTER COLUMN "step" SET NOT NULL;
