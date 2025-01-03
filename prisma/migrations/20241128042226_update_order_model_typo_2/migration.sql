/*
  Warnings:

  - You are about to drop the column `cart_Id` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `packaging_Id` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `shipping_Id` on the `orders` table. All the data in the column will be lost.
  - Added the required column `cart_id` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `packaging_id` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shipping_id` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `orders` DROP COLUMN `cart_Id`,
    DROP COLUMN `packaging_Id`,
    DROP COLUMN `shipping_Id`,
    ADD COLUMN `cart_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `packaging_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `shipping_id` VARCHAR(191) NOT NULL;
