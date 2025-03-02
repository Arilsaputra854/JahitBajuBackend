/*
  Warnings:

  - You are about to drop the column `access_look_id` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `look` ADD COLUMN `look_price` FLOAT NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `access_look_id`;

-- CreateTable
CREATE TABLE `LookAccess` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `lookId` VARCHAR(191) NOT NULL,
    `purchasedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `LookAccess` ADD CONSTRAINT `LookAccess_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LookAccess` ADD CONSTRAINT `LookAccess_lookId_fkey` FOREIGN KEY (`lookId`) REFERENCES `look`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
