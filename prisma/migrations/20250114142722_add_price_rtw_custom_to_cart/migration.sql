-- AlterTable
ALTER TABLE `carts` ADD COLUMN `custom_price` FLOAT NOT NULL DEFAULT 0,
    ADD COLUMN `rtw_price` FLOAT NOT NULL DEFAULT 0;
