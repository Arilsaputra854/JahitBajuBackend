/*
  Warnings:

  - You are about to drop the column `custom_design` on the `order_items` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `order_items` DROP COLUMN `custom_design`,
    ADD COLUMN `custom_design_url` LONGTEXT NULL;

-- AlterTable
ALTER TABLE `orders` ADD COLUMN `description` VARCHAR(191) NULL;
