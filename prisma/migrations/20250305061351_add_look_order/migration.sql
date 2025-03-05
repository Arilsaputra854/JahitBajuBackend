/*
  Warnings:

  - You are about to drop the `feature-orders` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `feature-orders` DROP FOREIGN KEY `feature-orders_buyer_id_fkey`;

-- DropForeignKey
ALTER TABLE `feature-orders` DROP FOREIGN KEY `feature-orders_feature_id_fkey`;

-- DropTable
DROP TABLE `feature-orders`;

-- CreateTable
CREATE TABLE `feature_orders` (
    `id` VARCHAR(191) NOT NULL,
    `buyer_id` VARCHAR(191) NOT NULL,
    `feature_id` VARCHAR(191) NOT NULL,
    `price` FLOAT NOT NULL,
    `order_created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `payment_status` VARCHAR(191) NOT NULL,
    `last_update` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `payment_url` VARCHAR(191) NULL,
    `expiry_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `description` VARCHAR(191) NULL,
    `payment_date` VARCHAR(191) NULL,
    `payment_method` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `look_orders` (
    `id` VARCHAR(191) NOT NULL,
    `buyer_id` VARCHAR(191) NOT NULL,
    `look_id` VARCHAR(191) NOT NULL,
    `price` FLOAT NOT NULL,
    `order_created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `payment_status` VARCHAR(191) NOT NULL,
    `last_update` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `payment_url` VARCHAR(191) NULL,
    `expiry_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `description` VARCHAR(191) NULL,
    `payment_date` VARCHAR(191) NULL,
    `payment_method` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `feature_orders` ADD CONSTRAINT `feature_orders_feature_id_fkey` FOREIGN KEY (`feature_id`) REFERENCES `app_feature`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `feature_orders` ADD CONSTRAINT `feature_orders_buyer_id_fkey` FOREIGN KEY (`buyer_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `look_orders` ADD CONSTRAINT `look_orders_look_id_fkey` FOREIGN KEY (`look_id`) REFERENCES `looks`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `look_orders` ADD CONSTRAINT `look_orders_buyer_id_fkey` FOREIGN KEY (`buyer_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
