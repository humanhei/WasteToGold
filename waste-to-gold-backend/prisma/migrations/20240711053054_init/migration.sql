/*
  Warnings:

  - You are about to drop the column `name` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Request` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Sell` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `SubCategory` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name_en]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name_zh]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name_en]` on the table `SubCategory` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name_zh]` on the table `SubCategory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name_en` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name_zh` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name_en` to the `SubCategory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name_zh` to the `SubCategory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Category" DROP COLUMN "name",
ADD COLUMN     "name_en" TEXT NOT NULL,
ADD COLUMN     "name_zh" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Request" DROP COLUMN "title",
ADD COLUMN     "title_en" TEXT,
ADD COLUMN     "title_zh" TEXT;

-- AlterTable
ALTER TABLE "Sell" DROP COLUMN "title",
ADD COLUMN     "title_en" TEXT,
ADD COLUMN     "title_zh" TEXT;

-- AlterTable
ALTER TABLE "SubCategory" DROP COLUMN "name",
ADD COLUMN     "name_en" TEXT NOT NULL,
ADD COLUMN     "name_zh" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_en_key" ON "Category"("name_en");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_zh_key" ON "Category"("name_zh");

-- CreateIndex
CREATE UNIQUE INDEX "SubCategory_name_en_key" ON "SubCategory"("name_en");

-- CreateIndex
CREATE UNIQUE INDEX "SubCategory_name_zh_key" ON "SubCategory"("name_zh");
