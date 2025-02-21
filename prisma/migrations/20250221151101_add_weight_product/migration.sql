-- AlterTable
ALTER TABLE `products` ADD COLUMN `weight` INTEGER NULL DEFAULT 0,
    MODIFY `product_code` VARCHAR(100) NULL;
