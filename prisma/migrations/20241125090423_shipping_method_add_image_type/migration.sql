/*
  Warnings:

  - Added the required column `img_url` to the `shipping_methods` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipe` to the `shipping_methods` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `orders` ALTER COLUMN `orderDate` DROP DEFAULT;

-- AlterTable
ALTER TABLE `shipping_methods` ADD COLUMN `img_url` VARCHAR(100) NOT NULL,
    ADD COLUMN `tipe` VARCHAR(100) NOT NULL;
