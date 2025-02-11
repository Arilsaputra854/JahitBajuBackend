-- CreateTable
CREATE TABLE `app_banner` (
    `id` VARCHAR(100) NOT NULL,
    `image_url` TEXT NOT NULL,
    `link` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
