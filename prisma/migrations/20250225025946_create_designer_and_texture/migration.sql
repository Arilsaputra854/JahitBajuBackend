-- CreateTable
CREATE TABLE `Designer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Look` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `designer_id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `features` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `size` VARCHAR(191) NULL,
    `lastUpdate` DATETIME(3) NOT NULL,
    `sold` INTEGER NOT NULL DEFAULT 0,
    `seen` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `look_textures` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `look_id` INTEGER NOT NULL,
    `texture_id` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Look` ADD CONSTRAINT `Look_designer_id_fkey` FOREIGN KEY (`designer_id`) REFERENCES `Designer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `look_textures` ADD CONSTRAINT `look_textures_look_id_fkey` FOREIGN KEY (`look_id`) REFERENCES `Look`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `look_textures` ADD CONSTRAINT `look_textures_texture_id_fkey` FOREIGN KEY (`texture_id`) REFERENCES `textures`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
