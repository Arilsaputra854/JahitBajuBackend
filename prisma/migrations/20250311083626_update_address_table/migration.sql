/*
  Warnings:

  - You are about to alter the column `city` on the `addresses` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `Int`.
  - You are about to alter the column `province` on the `addresses` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `Int`.
  - You are about to alter the column `postal_code` on the `addresses` table. The data in that column could be lost. The data in that column will be cast from `VarChar(10)` to `Int`.

*/
-- AlterTable
ALTER TABLE `addresses` MODIFY `city` INTEGER NULL,
    MODIFY `province` INTEGER NULL,
    MODIFY `postal_code` INTEGER NULL;
