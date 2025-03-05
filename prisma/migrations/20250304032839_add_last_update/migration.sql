/*
  Warnings:

  - You are about to drop the column `updated_at` on the `app_feature` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `look_textures` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `look_user_access` table. All the data in the column will be lost.
  - You are about to drop the column `lastUpdate` on the `looks` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `otp` table. All the data in the column will be lost.
  - You are about to drop the column `expiresAt` on the `otp` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `textures` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `user_feature` table. All the data in the column will be lost.
  - You are about to drop the `survei_custom` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `expires_at` to the `otp` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `survei_custom` DROP FOREIGN KEY `survei_custom_user_id_fkey`;

-- AlterTable
ALTER TABLE `app_banner` ADD COLUMN `last_update` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `app_feature` DROP COLUMN `updated_at`,
    ADD COLUMN `last_update` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `care_guide` ADD COLUMN `last_update` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `cart_items` ADD COLUMN `last_update` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `carts` ADD COLUMN `last_update` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `designers` ADD COLUMN `last_update` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `favorites` ADD COLUMN `last_update` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `feature-orders` MODIFY `last_update` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `look_textures` DROP COLUMN `updated_at`,
    ADD COLUMN `last_update` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `look_user_access` DROP COLUMN `updated_at`,
    ADD COLUMN `last_update` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `looks` DROP COLUMN `lastUpdate`,
    ADD COLUMN `last_update` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `order_items` ADD COLUMN `last_update` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `orders` MODIFY `last_update` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `otp` DROP COLUMN `createdAt`,
    DROP COLUMN `expiresAt`,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `expires_at` DATETIME(3) NOT NULL,
    ADD COLUMN `last_update` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ALTER COLUMN `type` DROP DEFAULT;

-- AlterTable
ALTER TABLE `packagings` ADD COLUMN `last_update` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `product_note` ADD COLUMN `last_update` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `product_terms` ADD COLUMN `last_update` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `products` MODIFY `last_update` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `shipping_methods` ADD COLUMN `last_update` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `size_guide` ADD COLUMN `last_update` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `term_condition` ADD COLUMN `last_update` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `textures` DROP COLUMN `updated_at`,
    ADD COLUMN `last_update` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `user_feature` DROP COLUMN `updated_at`,
    ADD COLUMN `last_update` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `users` ADD COLUMN `last_update` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- DropTable
DROP TABLE `survei_custom`;
