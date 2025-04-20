/*
  Warnings:

  - You are about to drop the column `rt` on the `addresses` table. All the data in the column will be lost.
  - You are about to drop the column `rw` on the `addresses` table. All the data in the column will be lost.
  - You are about to drop the column `subdistrict` on the `addresses` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `addresses` DROP COLUMN `rt`,
    DROP COLUMN `rw`,
    DROP COLUMN `subdistrict`;
