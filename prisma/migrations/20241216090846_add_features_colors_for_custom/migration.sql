-- AlterTable
ALTER TABLE `products` ADD COLUMN `colors` JSON NOT NULL,
    ADD COLUMN `features` JSON NOT NULL;
