-- AlterTable
ALTER TABLE `orders` MODIFY `payment_date` VARCHAR(191) NULL,
    MODIFY `payment_method` VARCHAR(191) NULL,
    MODIFY `xendit_status` VARCHAR(191) NULL;
