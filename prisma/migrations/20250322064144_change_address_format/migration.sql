-- AlterTable
ALTER TABLE `addresses` ADD COLUMN `district` VARCHAR(191) NULL,
    ADD COLUMN `village` VARCHAR(191) NULL,
    MODIFY `city` VARCHAR(191) NULL,
    MODIFY `province` VARCHAR(191) NULL;
