-- CreateTable
CREATE TABLE `OrderSequence` (
    `id` INTEGER NOT NULL DEFAULT 1,
    `lastNumber` INTEGER NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
