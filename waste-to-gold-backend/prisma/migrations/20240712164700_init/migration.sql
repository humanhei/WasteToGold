/*
  Warnings:

  - You are about to drop the column `sellId` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the `Request` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Sell` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `listingId` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Request" DROP CONSTRAINT "Request_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Request" DROP CONSTRAINT "Request_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_sellId_fkey";

-- DropForeignKey
ALTER TABLE "Sell" DROP CONSTRAINT "Sell_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Sell" DROP CONSTRAINT "Sell_categoryId_fkey";

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "sellId",
ADD COLUMN     "listingId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Request";

-- DropTable
DROP TABLE "Sell";

-- CreateTable
CREATE TABLE "Listing" (
    "id" TEXT NOT NULL,
    "sell" BOOLEAN NOT NULL DEFAULT true,
    "title_en" TEXT,
    "title_zh" TEXT,
    "categoryId" TEXT,
    "condition" TEXT,
    "brand" TEXT,
    "description" TEXT,
    "free" BOOLEAN NOT NULL DEFAULT false,
    "price" DECIMAL(65,30),
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3),
    "authorId" TEXT NOT NULL,

    CONSTRAINT "Listing_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Listing" ADD CONSTRAINT "Listing_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Listing" ADD CONSTRAINT "Listing_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
