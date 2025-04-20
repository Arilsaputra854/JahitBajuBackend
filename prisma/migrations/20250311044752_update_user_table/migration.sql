/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `addresses` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `addresses` ADD COLUMN `user_id` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `addresses_user_id_key` ON `addresses`(`user_id`);
