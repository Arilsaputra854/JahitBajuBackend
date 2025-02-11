-- AlterTable
ALTER TABLE `order_items` MODIFY `status` VARCHAR(50) NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE `orders` ALTER COLUMN `orderDate` DROP DEFAULT;

-- CreateTable
CREATE TABLE `carts` (
    `id` VARCHAR(100) NOT NULL,
    `buyerId` VARCHAR(100) NOT NULL,
    `totalPrice` FLOAT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cart_items` (
    `id` VARCHAR(100) NOT NULL,
    `cartId` VARCHAR(100) NOT NULL,
    `productId` VARCHAR(100) NOT NULL,
    `quantity` INTEGER NOT NULL DEFAULT 1,
    `priceAtPurchase` FLOAT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `carts` ADD CONSTRAINT `carts_buyerId_fkey` FOREIGN KEY (`buyerId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cart_items` ADD CONSTRAINT `cart_items_cartId_fkey` FOREIGN KEY (`cartId`) REFERENCES `carts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
