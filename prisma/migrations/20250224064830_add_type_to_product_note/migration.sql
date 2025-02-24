/*
  Warnings:

  - Added the required column `type` to the `product_note` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `product_note` ADD COLUMN `type` INTEGER NOT NULL;
