-- AlterTable
ALTER TABLE `orders` ADD COLUMN `external_id` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `payment_date` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `payment_method` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `xendit_status` VARCHAR(191) NOT NULL DEFAULT '-';
