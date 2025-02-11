/*
  Warnings:

  - You are about to drop the column `productId` on the `favorites` table. All the data in the column will be lost.
  - Added the required column `product_id` to the `favorites` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `favorites` DROP FOREIGN KEY `favorites_productId_fkey`;

-- AlterTable
ALTER TABLE `favorites` DROP COLUMN `productId`,
    ADD COLUMN `product_id` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `favorites` ADD CONSTRAINT `favorites_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
