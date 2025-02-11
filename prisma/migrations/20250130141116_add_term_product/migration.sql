-- CreateTable
CREATE TABLE `product_terms` (
    `id` VARCHAR(100) NOT NULL,
    `color` TEXT NOT NULL,
    `texture` TEXT NOT NULL,
    `size` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
