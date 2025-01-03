-- AlterTable
ALTER TABLE `products` MODIFY `colors` JSON NULL,
    MODIFY `features` JSON NULL;

-- CreateTable
CREATE TABLE `otp` (
    `id` VARCHAR(100) NOT NULL,
    `userId` VARCHAR(100) NOT NULL,
    `otp` VARCHAR(6) NOT NULL,
    `expiresAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `otp` ADD CONSTRAINT `otp_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
