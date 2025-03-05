-- CreateTable
CREATE TABLE `feature-orders` (
    `id` VARCHAR(191) NOT NULL,
    `buyer_id` VARCHAR(191) NOT NULL,
    `feature_id` VARCHAR(191) NOT NULL,
    `price` FLOAT NOT NULL,
    `order_created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `payment_status` VARCHAR(191) NOT NULL,
    `last_update` DATETIME(3) NOT NULL,
    `payment_url` VARCHAR(191) NOT NULL,
    `expiry_date` DATETIME(3) NOT NULL,
    `description` VARCHAR(191) NULL,
    `payment_date` VARCHAR(191) NULL,
    `payment_method` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `feature-orders` ADD CONSTRAINT `feature-orders_feature_id_fkey` FOREIGN KEY (`feature_id`) REFERENCES `app_feature`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `feature-orders` ADD CONSTRAINT `feature-orders_buyer_id_fkey` FOREIGN KEY (`buyer_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
