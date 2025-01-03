/*
  Warnings:

  - You are about to alter the column `total_price` on the `orders` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Float`.

*/
-- AlterTable
ALTER TABLE `orders` MODIFY `total_price` FLOAT NOT NULL;
