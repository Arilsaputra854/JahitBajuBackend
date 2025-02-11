-- AlterTable
ALTER TABLE `cart_items` MODIFY `size` VARCHAR(10) NOT NULL;

-- AlterTable
ALTER TABLE `orders` ALTER COLUMN `orderDate` DROP DEFAULT;
