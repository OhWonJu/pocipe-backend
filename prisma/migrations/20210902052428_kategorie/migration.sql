-- CreateTable
CREATE TABLE "Kategorie" (
    "kategorieId" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    PRIMARY KEY ("kategorieId")
);

-- CreateTable
CREATE TABLE "_KategorieToRecipe" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_KategorieToRecipe_AB_unique" ON "_KategorieToRecipe"("A", "B");

-- CreateIndex
CREATE INDEX "_KategorieToRecipe_B_index" ON "_KategorieToRecipe"("B");

-- AddForeignKey
ALTER TABLE "_KategorieToRecipe" ADD FOREIGN KEY ("A") REFERENCES "Kategorie"("kategorieId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_KategorieToRecipe" ADD FOREIGN KEY ("B") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
