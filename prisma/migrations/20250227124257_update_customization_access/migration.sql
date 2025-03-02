/*
  Warnings:

  - You are about to drop the column `purchasedAt` on the `customization_access` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `customization_access` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `customization_access` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `customization_access` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `customization_access` DROP FOREIGN KEY `customization_access_userId_fkey`;

-- DropIndex
DROP INDEX `customization_access_userId_key` ON `customization_access`;

-- AlterTable
ALTER TABLE `customization_access` DROP COLUMN `purchasedAt`,
    DROP COLUMN `userId`,
    ADD COLUMN `purchased_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `user_id` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `customization_access_user_id_key` ON `customization_access`(`user_id`);

-- AddForeignKey
ALTER TABLE `customization_access` ADD CONSTRAINT `customization_access_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
