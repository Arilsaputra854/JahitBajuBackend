-- AlterTable
ALTER TABLE `cart_items` ADD COLUMN `look_id` VARCHAR(100) NULL,
    MODIFY `product_id` VARCHAR(100) NULL;
