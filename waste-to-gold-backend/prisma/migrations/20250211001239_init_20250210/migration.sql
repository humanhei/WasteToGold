/*
  Warnings:

  - The primary key for the `Carosel` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Carosel" DROP CONSTRAINT "Carosel_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Carosel_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Carosel_id_seq";
