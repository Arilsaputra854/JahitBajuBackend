/*
  Warnings:

  - You are about to drop the column `external_id` on the `orders` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `orders` DROP COLUMN `external_id`;
