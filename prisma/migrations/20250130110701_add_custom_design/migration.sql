/*
  Warnings:

  - You are about to drop the column `custom_design_url` on the `order_items` table. All the data in the column will be lost.
  - You are about to drop the column `orderId` on the `order_items` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `order_items` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[custom_design_id]` on the table `order_items` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `order_id` to the `order_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `order_items` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `order_items` DROP FOREIGN KEY `order_items_orderId_fkey`;

-- DropForeignKey
ALTER TABLE `order_items` DROP FOREIGN KEY `order_items_productId_fkey`;

-- AlterTable
ALTER TABLE `order_items` DROP COLUMN `custom_design_url`,
    DROP COLUMN `orderId`,
    DROP COLUMN `productId`,
    ADD COLUMN `custom_design_id` VARCHAR(100) NULL,
    ADD COLUMN `order_id` VARCHAR(100) NOT NULL,
    ADD COLUMN `product_id` VARCHAR(100) NOT NULL;

-- CreateTable
CREATE TABLE `custom_design` (
    `id` VARCHAR(100) NOT NULL,
    `custom_design_url` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `order_items_custom_design_id_key` ON `order_items`(`custom_design_id`);

-- AddForeignKey
ALTER TABLE `order_items` ADD CONSTRAINT `order_items_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order_items` ADD CONSTRAINT `order_items_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order_items` ADD CONSTRAINT `order_items_custom_design_id_fkey` FOREIGN KEY (`custom_design_id`) REFERENCES `custom_design`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
