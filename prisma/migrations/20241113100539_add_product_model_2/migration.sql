/*
  Warnings:

  - You are about to drop the column `image_url` on the `products` table. All the data in the column will be lost.
  - Added the required column `images_url` to the `products` table without a default value. This is not possible if the table is not empty.
  - Made the column `tags` on table `products` required. This step will fail if there are existing NULL values in that column.
  - Made the column `size` on table `products` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `products` DROP COLUMN `image_url`,
    ADD COLUMN `images_url` JSON NOT NULL,
    MODIFY `tags` JSON NOT NULL,
    MODIFY `size` JSON NOT NULL;
