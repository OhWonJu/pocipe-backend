/*
  Warnings:

  - A unique constraint covering the columns `[ingredient]` on the table `Ingredient` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[kategorie]` on the table `Kategorie` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Ingredient.ingredient_unique" ON "Ingredient"("ingredient");

-- CreateIndex
CREATE UNIQUE INDEX "Kategorie.kategorie_unique" ON "Kategorie"("kategorie");
