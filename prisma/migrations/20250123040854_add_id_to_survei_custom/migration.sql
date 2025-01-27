/*
  Warnings:

  - Added the required column `user_id` to the `survei_custom` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `survei_custom` ADD COLUMN `user_id` VARCHAR(100) NOT NULL;

-- AddForeignKey
ALTER TABLE `survei_custom` ADD CONSTRAINT `survei_custom_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
