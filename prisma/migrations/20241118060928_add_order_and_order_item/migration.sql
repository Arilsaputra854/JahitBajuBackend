-- CreateTable
CREATE TABLE `orders` (
    `id` VARCHAR(100) NOT NULL,
    `buyerId` VARCHAR(100) NOT NULL,
    `orderDate` TIMESTAMP(6) NOT NULL,
    `totalPrice` FLOAT NOT NULL,
    `status` VARCHAR(50) NOT NULL DEFAULT 'pending',
    `createdAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` TIMESTAMP(6) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `order_items` (
    `id` VARCHAR(100) NOT NULL,
    `orderId` VARCHAR(100) NOT NULL,
    `productId` VARCHAR(100) NOT NULL,
    `quantity` INTEGER NOT NULL DEFAULT 1,
    `priceAtPurchase` FLOAT NOT NULL,
    `status` VARCHAR(50) NOT NULL DEFAULT 'pending',
    `createdAt` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` TIMESTAMP(6) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `order_items` ADD CONSTRAINT `order_items_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `orders`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
