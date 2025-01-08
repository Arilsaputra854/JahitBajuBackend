/*
  Warnings:

  - You are about to drop the column `custom_design` on the `products` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `cart_items` ADD COLUMN `custom_design` TEXT NULL;

-- AlterTable
ALTER TABLE `order_items` ADD COLUMN `custom_design` TEXT NULL;

-- AlterTable
ALTER TABLE `products` DROP COLUMN `custom_design`;
