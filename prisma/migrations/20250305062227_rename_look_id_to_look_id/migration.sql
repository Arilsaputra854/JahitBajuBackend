/*
  Warnings:

  - You are about to drop the column `lookId` on the `look_user_access` table. All the data in the column will be lost.
  - Added the required column `look_id` to the `look_user_access` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `look_user_access` DROP FOREIGN KEY `look_user_access_lookId_fkey`;

-- DropIndex
DROP INDEX `look_user_access_lookId_fkey` ON `look_user_access`;

-- AlterTable
ALTER TABLE `look_user_access` DROP COLUMN `lookId`,
    ADD COLUMN `look_id` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `look_user_access` ADD CONSTRAINT `look_user_access_look_id_fkey` FOREIGN KEY (`look_id`) REFERENCES `looks`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
