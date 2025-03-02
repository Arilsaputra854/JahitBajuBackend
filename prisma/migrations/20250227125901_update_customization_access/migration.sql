/*
  Warnings:

  - The primary key for the `customization_access` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `purchased_at` on the `customization_access` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `customization_access` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `customization_access` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(100)`.
  - You are about to alter the column `price` on the `customization_access` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - Added the required column `name` to the `customization_access` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `customization_access` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `customization_access` DROP FOREIGN KEY `customization_access_user_id_fkey`;

-- DropIndex
DROP INDEX `customization_access_user_id_key` ON `customization_access`;

-- AlterTable
ALTER TABLE `customization_access` DROP PRIMARY KEY,
    DROP COLUMN `purchased_at`,
    DROP COLUMN `user_id`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `description` VARCHAR(191) NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    MODIFY `id` VARCHAR(100) NOT NULL,
    MODIFY `price` FLOAT NOT NULL,
    ADD PRIMARY KEY (`id`);

-- CreateTable
CREATE TABLE `user_subscription` (
    `id` VARCHAR(100) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `customization_id` VARCHAR(191) NOT NULL,
    `priceAtPurchase` FLOAT NOT NULL,
    `purchasedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_subscription` ADD CONSTRAINT `user_subscription_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user_subscription` ADD CONSTRAINT `user_subscription_customization_id_fkey` FOREIGN KEY (`customization_id`) REFERENCES `customization_access`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
