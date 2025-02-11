-- CreateTable
CREATE TABLE "Carosel" (
    "id" SERIAL NOT NULL,
    "fileName" TEXT NOT NULL,
    "originalName" TEXT NOT NULL,
    "s3Url" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Carosel_pkey" PRIMARY KEY ("id")
);
