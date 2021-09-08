-- DropForeignKey
ALTER TABLE "Recipe" DROP CONSTRAINT "Recipe_userId_fkey";

-- AddForeignKey
ALTER TABLE "Recipe" ADD FOREIGN KEY ("chefId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
