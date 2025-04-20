/*
  Warnings:

  - You are about to drop the column `user_id` on the `addresses` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `addresses_user_id_key` ON `addresses`;

-- AlterTable
ALTER TABLE `addresses` DROP COLUMN `user_id`;
