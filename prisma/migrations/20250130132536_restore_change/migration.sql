/*
  Warnings:

  - You are about to drop the column `cartId` on the `cart_items` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `cart_items` table. All the data in the column will be lost.
  - You are about to drop the column `buyerId` on the `carts` table. All the data in the column will be lost.
  - You are about to drop the column `totalPrice` on the `carts` table. All the data in the column will be lost.
  - Added the required column `cart_id` to the `cart_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `cart_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `buyer_id` to the `carts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_price` to the `carts` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `cart_items` DROP FOREIGN KEY `cart_items_cartId_fkey`;

-- DropForeignKey
ALTER TABLE `carts` DROP FOREIGN KEY `carts_buyerId_fkey`;

-- AlterTable
ALTER TABLE `cart_items` DROP COLUMN `cartId`,
    DROP COLUMN `productId`,
    ADD COLUMN `cart_id` VARCHAR(100) NOT NULL,
    ADD COLUMN `product_id` VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE `carts` DROP COLUMN `buyerId`,
    DROP COLUMN `totalPrice`,
    ADD COLUMN `buyer_id` VARCHAR(100) NOT NULL,
    ADD COLUMN `total_price` FLOAT NOT NULL;

-- AddForeignKey
ALTER TABLE `carts` ADD CONSTRAINT `carts_buyer_id_fkey` FOREIGN KEY (`buyer_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cart_items` ADD CONSTRAINT `cart_items_cart_id_fkey` FOREIGN KEY (`cart_id`) REFERENCES `carts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
