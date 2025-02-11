/*
  Warnings:

  - You are about to drop the column `custom_design_id` on the `order_items` table. All the data in the column will be lost.
  - You are about to drop the `custom_design` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[custom_design]` on the table `order_items` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `order_items` DROP FOREIGN KEY `order_items_custom_design_id_fkey`;

-- DropIndex
DROP INDEX `order_items_custom_design_id_key` ON `order_items`;

-- AlterTable
ALTER TABLE `cart_items` MODIFY `custom_design` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `order_items` DROP COLUMN `custom_design_id`,
    ADD COLUMN `custom_design` VARCHAR(100) NULL;

-- DropTable
DROP TABLE `custom_design`;

-- CreateIndex
CREATE UNIQUE INDEX `order_items_custom_design_key` ON `order_items`(`custom_design`);
