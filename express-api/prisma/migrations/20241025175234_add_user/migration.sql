-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "description" DROP NOT NULL;

-- CreateTable
CREATE TABLE "User" (
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
