-- AlterTable
ALTER TABLE `orders` ALTER COLUMN `payment_date` DROP DEFAULT,
    ALTER COLUMN `payment_method` DROP DEFAULT,
    ALTER COLUMN `xendit_status` DROP DEFAULT;
