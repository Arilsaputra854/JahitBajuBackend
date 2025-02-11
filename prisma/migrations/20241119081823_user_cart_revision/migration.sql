/*
  Warnings:

  - You are about to drop the column `priceAtPurchase` on the `cart_items` table. All the data in the column will be lost.
  - Added the required column `price` to the `cart_items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cart_items` DROP COLUMN `priceAtPurchase`,
    ADD COLUMN `price` FLOAT NOT NULL;

-- AlterTable
ALTER TABLE `orders` ALTER COLUMN `orderDate` DROP DEFAULT;
