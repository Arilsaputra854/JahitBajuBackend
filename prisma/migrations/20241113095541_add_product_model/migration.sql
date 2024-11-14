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
    `image_url` VARCHAR(255) NOT NULL,
    `tags` TEXT NULL,
    `size` TEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
