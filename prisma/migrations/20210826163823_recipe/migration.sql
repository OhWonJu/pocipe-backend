/*
  Warnings:

  - You are about to drop the column `thumbnails` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Recipe` table. All the data in the column will be lost.
  - Added the required column `chefId` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User.id_unique";

-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "thumbnails",
DROP COLUMN "type",
ADD COLUMN     "chefId" TEXT NOT NULL,
ADD COLUMN     "thumbNails" TEXT[],
ADD COLUMN     "totalStar" DOUBLE PRECISION NOT NULL DEFAULT 0,
ALTER COLUMN "servings" SET DEFAULT 1,
ALTER COLUMN "difficulty" SET DEFAULT 1,
ALTER COLUMN "time" SET DEFAULT 0;
