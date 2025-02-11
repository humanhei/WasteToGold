/*
  Warnings:

  - You are about to drop the `Carosel` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Carosel";

-- CreateTable
CREATE TABLE "Carousel" (
    "id" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "s3Url" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "order" INTEGER,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Carousel_pkey" PRIMARY KEY ("id")
);
