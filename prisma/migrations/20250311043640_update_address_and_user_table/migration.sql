/*
  Warnings:

  - You are about to drop the column `is_primary` on the `addresses` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `addresses` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[address_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `addresses` DROP FOREIGN KEY `addresses_userId_fkey`;

-- DropIndex
DROP INDEX `addresses_userId_fkey` ON `addresses`;

-- AlterTable
ALTER TABLE `addresses` DROP COLUMN `is_primary`,
    DROP COLUMN `userId`;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `address`,
    ADD COLUMN `address_id` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `users_address_id_key` ON `users`(`address_id`);

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_address_id_fkey` FOREIGN KEY (`address_id`) REFERENCES `addresses`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
