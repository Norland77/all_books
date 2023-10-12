/*
  Warnings:

  - Added the required column `bio` to the `Author` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `Author` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dateOfBirth` to the `Author` table without a default value. This is not possible if the table is not empty.
  - Added the required column `firstName` to the `Author` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Author` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Author` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Author" ADD COLUMN     "bio" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "dateOfBirth" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL;
