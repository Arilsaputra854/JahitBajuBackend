-- CreateTable
CREATE TABLE `survei_custom` (
    `id` VARCHAR(100) NOT NULL,
    `question_1` TEXT NOT NULL,
    `question_2` TEXT NOT NULL,
    `question_3` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
