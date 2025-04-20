/*
  Warnings:

  - You are about to drop the column `userId` on the `look_user_access` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `otp` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `look_user_access` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `otp` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `look_user_access` DROP FOREIGN KEY `look_user_access_userId_fkey`;

-- DropForeignKey
ALTER TABLE `otp` DROP FOREIGN KEY `otp_userId_fkey`;

-- DropIndex
DROP INDEX `look_user_access_userId_fkey` ON `look_user_access`;

-- DropIndex
DROP INDEX `otp_userId_fkey` ON `otp`;

-- AlterTable
ALTER TABLE `look_user_access` DROP COLUMN `userId`,
    ADD COLUMN `user_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `otp` DROP COLUMN `userId`,
    ADD COLUMN `user_id` VARCHAR(100) NOT NULL;

-- AddForeignKey
ALTER TABLE `otp` ADD CONSTRAINT `otp_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `look_user_access` ADD CONSTRAINT `look_user_access_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
