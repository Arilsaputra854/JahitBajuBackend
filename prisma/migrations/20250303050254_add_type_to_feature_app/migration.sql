/*
  Warnings:

  - Added the required column `type` to the `app_feature` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `app_feature` ADD COLUMN `type` VARCHAR(191) NOT NULL;
