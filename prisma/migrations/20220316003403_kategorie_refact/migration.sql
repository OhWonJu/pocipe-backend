/*
  Warnings:

  - The primary key for the `Kategorie` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `kategorieId` on the `Kategorie` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Kategorie` table. All the data in the column will be lost.
  - The required column `id` was added to the `Kategorie` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `kategorie` to the `Kategorie` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_KategorieToRecipe" DROP CONSTRAINT "_KategorieToRecipe_A_fkey";

-- AlterTable
ALTER TABLE "Kategorie" DROP CONSTRAINT "Kategorie_pkey",
DROP COLUMN "kategorieId",
DROP COLUMN "type",
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "kategorie" TEXT NOT NULL,
ADD PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "_KategorieToRecipe" ADD FOREIGN KEY ("A") REFERENCES "Kategorie"("id") ON DELETE CASCADE ON UPDATE CASCADE;
