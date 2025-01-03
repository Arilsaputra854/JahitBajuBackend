-- CreateTable
CREATE TABLE `term_condition` (
    `id` VARCHAR(100) NOT NULL,
    `data` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `size_guide` (
    `id` VARCHAR(100) NOT NULL,
    `data` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
