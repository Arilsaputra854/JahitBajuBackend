/*
  Warnings:

  - The primary key for the `look_textures` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `Designer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Look` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Look` DROP FOREIGN KEY `Look_designer_id_fkey`;

-- DropForeignKey
ALTER TABLE `look_textures` DROP FOREIGN KEY `look_textures_look_id_fkey`;

-- DropIndex
DROP INDEX `look_textures_look_id_fkey` ON `look_textures`;

-- AlterTable
ALTER TABLE `look_textures` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(100) NOT NULL,
    MODIFY `look_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- DropTable
DROP TABLE `Designer`;

-- DropTable
DROP TABLE `Look`;

-- CreateTable
CREATE TABLE `designers` (
    `id` VARCHAR(100) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `look` (
    `id` VARCHAR(100) NOT NULL,
    `designer_id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `features` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `size` VARCHAR(191) NULL,
    `lastUpdate` DATETIME(3) NOT NULL,
    `sold` INTEGER NOT NULL DEFAULT 0,
    `seen` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `look` ADD CONSTRAINT `look_designer_id_fkey` FOREIGN KEY (`designer_id`) REFERENCES `designers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `look_textures` ADD CONSTRAINT `look_textures_look_id_fkey` FOREIGN KEY (`look_id`) REFERENCES `look`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
