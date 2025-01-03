/*
  Warnings:

  - Added the required column `size` to the `cart_items` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cart_items` ADD COLUMN `size` VARCHAR(5) NOT NULL;

-- AlterTable
ALTER TABLE `orders` ALTER COLUMN `orderDate` DROP DEFAULT;
