/*
  Warnings:

  - You are about to drop the `look_textures` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `look_textures` DROP FOREIGN KEY `look_textures_look_id_fkey`;

-- DropForeignKey
ALTER TABLE `look_textures` DROP FOREIGN KEY `look_textures_texture_id_fkey`;

-- DropTable
DROP TABLE `look_textures`;

-- CreateTable
CREATE TABLE `_LookToTexture` (
    `A` VARCHAR(100) NOT NULL,
    `B` VARCHAR(100) NOT NULL,

    UNIQUE INDEX `_LookToTexture_AB_unique`(`A`, `B`),
    INDEX `_LookToTexture_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_LookToTexture` ADD CONSTRAINT `_LookToTexture_A_fkey` FOREIGN KEY (`A`) REFERENCES `looks`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_LookToTexture` ADD CONSTRAINT `_LookToTexture_B_fkey` FOREIGN KEY (`B`) REFERENCES `textures`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
