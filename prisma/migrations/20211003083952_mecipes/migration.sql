-- CreateTable
CREATE TABLE "Mecipe" (
    "id" TEXT NOT NULL,
    "originalId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "chefId" TEXT NOT NULL,
    "memo" TEXT,
    "servings" INTEGER NOT NULL DEFAULT 1,
    "difficulty" INTEGER NOT NULL DEFAULT 1,
    "cookingTime" INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MeDo" (
    "id" TEXT NOT NULL,
    "mecipeId" TEXT NOT NULL,
    "file" TEXT,
    "title" TEXT NOT NULL,
    "captin" TEXT,
    "isTimer" BOOLEAN NOT NULL,
    "time" INTEGER DEFAULT 0,
    "step" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Mecipe" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MeDo" ADD FOREIGN KEY ("mecipeId") REFERENCES "Mecipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
