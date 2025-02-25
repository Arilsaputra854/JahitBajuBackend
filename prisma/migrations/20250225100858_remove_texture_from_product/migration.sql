/*
  Warnings:

  - You are about to drop the column `product_id` on the `textures` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `textures` DROP FOREIGN KEY `textures_product_id_fkey`;

-- DropIndex
DROP INDEX `textures_product_id_fkey` ON `textures`;

-- AlterTable
ALTER TABLE `textures` DROP COLUMN `product_id`;
