-- CreateTable
CREATE TABLE `textures` (
    `id` VARCHAR(100) NOT NULL,
    `product_id` VARCHAR(100) NOT NULL,
    `judul` VARCHAR(100) NOT NULL,
    `url_texture` TEXT NULL,
    `hex` VARCHAR(7) NULL,
    `deskripsi` TEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `textures` ADD CONSTRAINT `textures_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
