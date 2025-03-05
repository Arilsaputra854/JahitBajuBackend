-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `address` TEXT NULL,
    `img_url` VARCHAR(100) NULL,
    `phone_number` VARCHAR(20) NULL,
    `token` VARCHAR(100) NULL,
    `refresh_token` VARCHAR(100) NULL,
    `email_verified` BOOLEAN NULL DEFAULT false,
    `custom_access` BOOLEAN NULL DEFAULT false,
    `role` VARCHAR(191) NULL DEFAULT 'User',

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `favorites` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` VARCHAR(191) NOT NULL,
    `product_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `products` (
    `id` VARCHAR(100) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `description` TEXT NOT NULL,
    `price` FLOAT NOT NULL,
    `stock` INTEGER NOT NULL,
    `sold` INTEGER NOT NULL DEFAULT 0,
    `seen` INTEGER NOT NULL DEFAULT 0,
    `favorite` INTEGER NOT NULL DEFAULT 0,
    `type` INTEGER NOT NULL,
    `designer_category` VARCHAR(191) NOT NULL DEFAULT 'Basic',
    `images_url` JSON NOT NULL,
    `tags` JSON NOT NULL,
    `category` JSON NOT NULL,
    `size` JSON NOT NULL,
    `materials` JSON NULL,
    `product_code` VARCHAR(100) NULL,
    `weight` INTEGER NULL DEFAULT 0,
    `colors` JSON NULL,
    `features` JSON NULL,
    `last_update` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `carts` (
    `id` VARCHAR(100) NOT NULL,
    `buyer_id` VARCHAR(100) NOT NULL,
    `total_price` FLOAT NOT NULL,
    `rtw_price` FLOAT NOT NULL DEFAULT 0,
    `custom_price` FLOAT NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cart_items` (
    `id` VARCHAR(100) NOT NULL,
    `cart_id` VARCHAR(100) NOT NULL,
    `product_id` VARCHAR(100) NULL,
    `look_id` VARCHAR(100) NULL,
    `quantity` INTEGER NOT NULL DEFAULT 1,
    `size` VARCHAR(10) NOT NULL,
    `price` FLOAT NOT NULL,
    `custom_design` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `shipping_methods` (
    `id` VARCHAR(100) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `img_url` VARCHAR(100) NOT NULL,
    `type` VARCHAR(100) NOT NULL,
    `price` FLOAT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `packagings` (
    `id` VARCHAR(100) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `description` VARCHAR(100) NOT NULL,
    `price` FLOAT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `orders` (
    `id` VARCHAR(191) NOT NULL,
    `buyer_id` VARCHAR(191) NOT NULL,
    `buyer_address` VARCHAR(191) NOT NULL DEFAULT '',
    `shipping_id` VARCHAR(191) NOT NULL,
    `packaging_id` VARCHAR(191) NOT NULL,
    `rtw_price` FLOAT NOT NULL DEFAULT 0,
    `custom_price` FLOAT NOT NULL DEFAULT 0,
    `shipping_price` FLOAT NOT NULL DEFAULT 0,
    `packaging_price` FLOAT NOT NULL DEFAULT 0,
    `total_price` FLOAT NOT NULL,
    `discount` FLOAT NOT NULL DEFAULT 0,
    `order_created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `order_status` VARCHAR(191) NOT NULL,
    `last_update` DATETIME(3) NOT NULL,
    `payment_url` VARCHAR(191) NOT NULL DEFAULT '',
    `expiry_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `resi` VARCHAR(191) NOT NULL DEFAULT '-',
    `description` VARCHAR(191) NULL,
    `xendit_status` VARCHAR(191) NULL,
    `payment_date` VARCHAR(191) NULL,
    `payment_method` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `order_items` (
    `id` VARCHAR(100) NOT NULL,
    `order_id` VARCHAR(100) NOT NULL,
    `product_id` VARCHAR(100) NULL,
    `look_id` VARCHAR(100) NULL,
    `quantity` INTEGER NOT NULL DEFAULT 1,
    `size` VARCHAR(10) NOT NULL,
    `price` FLOAT NOT NULL,
    `custom_design` VARCHAR(100) NULL,

    UNIQUE INDEX `order_items_custom_design_key`(`custom_design`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `otp` (
    `id` VARCHAR(100) NOT NULL,
    `userId` VARCHAR(100) NOT NULL,
    `otp` TEXT NOT NULL,
    `iv` VARCHAR(191) NOT NULL,
    `type` VARCHAR(30) NOT NULL DEFAULT 'EMAIL_VERIFICATION',
    `expiresAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `term_condition` (
    `id` VARCHAR(100) NOT NULL,
    `data` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product_terms` (
    `id` VARCHAR(100) NOT NULL,
    `color` TEXT NOT NULL,
    `texture` TEXT NOT NULL,
    `size` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `size_guide` (
    `id` VARCHAR(100) NOT NULL,
    `data` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `care_guide` (
    `id` VARCHAR(100) NOT NULL,
    `data` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `survei_custom` (
    `id` VARCHAR(100) NOT NULL,
    `user_id` VARCHAR(100) NOT NULL,
    `question_1` TEXT NOT NULL,
    `question_2` TEXT NOT NULL,
    `question_3` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `app_banner` (
    `id` VARCHAR(100) NOT NULL,
    `image_url` TEXT NOT NULL,
    `link` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product_note` (
    `id` VARCHAR(100) NOT NULL,
    `data` TEXT NOT NULL,
    `type` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `designers` (
    `id` VARCHAR(100) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `looks` (
    `id` VARCHAR(100) NOT NULL,
    `designer_id` VARCHAR(191) NOT NULL,
    `design_url` TEXT NULL,
    `name` VARCHAR(191) NOT NULL,
    `features` JSON NULL,
    `price` FLOAT NOT NULL DEFAULT 0,
    `look_price` FLOAT NOT NULL DEFAULT 0,
    `description` VARCHAR(191) NULL,
    `size` JSON NULL,
    `lastUpdate` DATETIME(3) NOT NULL,
    `sold` INTEGER NOT NULL DEFAULT 0,
    `seen` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `look_user_access` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `lookId` VARCHAR(191) NOT NULL,
    `purchased_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `look_textures` (
    `id` VARCHAR(100) NOT NULL,
    `look_id` VARCHAR(191) NOT NULL,
    `texture_id` VARCHAR(100) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `textures` (
    `id` VARCHAR(100) NOT NULL,
    `title` VARCHAR(100) NOT NULL,
    `url_texture` TEXT NULL,
    `hex` VARCHAR(7) NULL,
    `description` TEXT NULL,
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `app_feature` (
    `id` VARCHAR(100) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `price` FLOAT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_feature` (
    `id` VARCHAR(100) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `feature_id` VARCHAR(191) NOT NULL,
    `price_at_purchase` FLOAT NOT NULL,
    `purchased_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `favorites` ADD CONSTRAINT `favorites_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `favorites` ADD CONSTRAINT `favorites_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `carts` ADD CONSTRAINT `carts_buyer_id_fkey` FOREIGN KEY (`buyer_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cart_items` ADD CONSTRAINT `cart_items_cart_id_fkey` FOREIGN KEY (`cart_id`) REFERENCES `carts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_buyer_id_fkey` FOREIGN KEY (`buyer_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_shipping_id_fkey` FOREIGN KEY (`shipping_id`) REFERENCES `shipping_methods`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_packaging_id_fkey` FOREIGN KEY (`packaging_id`) REFERENCES `packagings`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order_items` ADD CONSTRAINT `order_items_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order_items` ADD CONSTRAINT `order_items_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `order_items` ADD CONSTRAINT `order_items_look_id_fkey` FOREIGN KEY (`look_id`) REFERENCES `looks`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `otp` ADD CONSTRAINT `otp_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `survei_custom` ADD CONSTRAINT `survei_custom_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `looks` ADD CONSTRAINT `looks_designer_id_fkey` FOREIGN KEY (`designer_id`) REFERENCES `designers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `look_user_access` ADD CONSTRAINT `look_user_access_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `look_user_access` ADD CONSTRAINT `look_user_access_lookId_fkey` FOREIGN KEY (`lookId`) REFERENCES `looks`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `look_textures` ADD CONSTRAINT `look_textures_look_id_fkey` FOREIGN KEY (`look_id`) REFERENCES `looks`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `look_textures` ADD CONSTRAINT `look_textures_texture_id_fkey` FOREIGN KEY (`texture_id`) REFERENCES `textures`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_feature` ADD CONSTRAINT `user_feature_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_feature` ADD CONSTRAINT `user_feature_feature_id_fkey` FOREIGN KEY (`feature_id`) REFERENCES `app_feature`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
