/*
  Warnings:

  - You are about to drop the column `deskripsi` on the `textures` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `textures` DROP COLUMN `deskripsi`,
    ADD COLUMN `description` TEXT NULL;
