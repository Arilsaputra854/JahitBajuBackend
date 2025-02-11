/*
  Warnings:

  - The primary key for the `orders` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `buyerId` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `orderDate` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `totalPrice` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the `order_items` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `buyer_id` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cart_Id` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order_status` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `packaging_Id` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shipping_Id` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_price` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `order_items` DROP FOREIGN KEY `order_items_orderId_fkey`;

-- DropForeignKey
ALTER TABLE `orders` DROP FOREIGN KEY `orders_buyerId_fkey`;

-- AlterTable
ALTER TABLE `orders` DROP PRIMARY KEY,
    DROP COLUMN `buyerId`,
    DROP COLUMN `createdAt`,
    DROP COLUMN `orderDate`,
    DROP COLUMN `status`,
    DROP COLUMN `totalPrice`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `buyer_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `cart_Id` VARCHAR(191) NOT NULL,
    ADD COLUMN `last_update` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `order_created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `order_status` VARCHAR(191) NOT NULL,
    ADD COLUMN `packaging_Id` VARCHAR(191) NOT NULL,
    ADD COLUMN `shipping_Id` VARCHAR(191) NOT NULL,
    ADD COLUMN `total_price` VARCHAR(191) NOT NULL,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- DropTable
DROP TABLE `order_items`;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `orders_buyer_id_fkey` FOREIGN KEY (`buyer_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
