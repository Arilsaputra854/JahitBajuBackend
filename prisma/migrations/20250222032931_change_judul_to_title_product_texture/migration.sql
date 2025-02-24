/*
  Warnings:

  - You are about to drop the column `judul` on the `textures` table. All the data in the column will be lost.
  - Added the required column `title` to the `textures` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `textures` DROP COLUMN `judul`,
    ADD COLUMN `title` VARCHAR(100) NOT NULL;
