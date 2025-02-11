/*
  Warnings:

  - Added the required column `iv` to the `otp` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `otp` ADD COLUMN `iv` VARCHAR(191) NOT NULL;
