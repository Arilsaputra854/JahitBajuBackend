-- AlterTable
ALTER TABLE `feature-orders` MODIFY `payment_url` VARCHAR(191) NULL,
    MODIFY `expiry_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
