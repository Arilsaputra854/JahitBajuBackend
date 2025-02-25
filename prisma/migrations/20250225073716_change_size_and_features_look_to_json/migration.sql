/*
  Warnings:

  - You are about to alter the column `features` on the `look` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.
  - You are about to alter the column `size` on the `look` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Json`.

*/
-- AlterTable
ALTER TABLE `look` MODIFY `features` JSON NULL,
    MODIFY `size` JSON NULL;
