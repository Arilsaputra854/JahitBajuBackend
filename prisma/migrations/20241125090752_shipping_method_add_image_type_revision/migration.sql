/*
  Warnings:

  - You are about to drop the column `tipe` on the `shipping_methods` table. All the data in the column will be lost.
  - Added the required column `type` to the `shipping_methods` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `orders` ALTER COLUMN `orderDate` DROP DEFAULT;

-- AlterTable
ALTER TABLE `shipping_methods` DROP COLUMN `tipe`,
    ADD COLUMN `type` VARCHAR(100) NOT NULL;
