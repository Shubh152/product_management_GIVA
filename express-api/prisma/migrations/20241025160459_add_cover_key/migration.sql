/*
  Warnings:

  - A unique constraint covering the columns `[cover_key]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cover_key` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "cover_key" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Product_cover_key_key" ON "Product"("cover_key");
