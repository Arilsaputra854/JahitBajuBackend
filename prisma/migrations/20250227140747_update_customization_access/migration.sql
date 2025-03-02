/*
  Warnings:

  - You are about to drop the `user_subscription` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `user_subscription` DROP FOREIGN KEY `user_subscription_customization_id_fkey`;

-- DropForeignKey
ALTER TABLE `user_subscription` DROP FOREIGN KEY `user_subscription_user_id_fkey`;

-- DropTable
DROP TABLE `user_subscription`;

-- CreateTable
CREATE TABLE `user_customization` (
    `id` VARCHAR(100) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `customization_id` VARCHAR(191) NOT NULL,
    `priceAtPurchase` FLOAT NOT NULL,
    `purchasedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_customization` ADD CONSTRAINT `user_customization_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_customization` ADD CONSTRAINT `user_customization_customization_id_fkey` FOREIGN KEY (`customization_id`) REFERENCES `customization_access`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
