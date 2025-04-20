/*
  Warnings:

  - You are about to drop the `_LookToTexture` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_LookToTexture` DROP FOREIGN KEY `_LookToTexture_A_fkey`;

-- DropForeignKey
ALTER TABLE `_LookToTexture` DROP FOREIGN KEY `_LookToTexture_B_fkey`;

-- DropTable
DROP TABLE `_LookToTexture`;
