-- AlterTable
ALTER TABLE `orders` ALTER COLUMN `orderDate` DROP DEFAULT;

-- CreateTable
CREATE TABLE `shipping_methods` (
    `id` VARCHAR(100) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `price` FLOAT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
