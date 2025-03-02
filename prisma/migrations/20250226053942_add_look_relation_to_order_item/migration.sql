-- DropForeignKey
ALTER TABLE `order_items` DROP FOREIGN KEY `order_items_product_id_fkey`;

-- DropIndex
DROP INDEX `order_items_product_id_fkey` ON `order_items`;

-- AlterTable
ALTER TABLE `order_items` MODIFY `product_id` VARCHAR(100) NULL;

-- AddForeignKey
ALTER TABLE `order_items` ADD CONSTRAINT `order_items_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order_items` ADD CONSTRAINT `order_items_look_id_fkey` FOREIGN KEY (`look_id`) REFERENCES `look`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
