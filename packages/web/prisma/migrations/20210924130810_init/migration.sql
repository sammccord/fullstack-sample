-- CreateTable
CREATE TABLE `Message` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `method` ENUM('WEBSITE', 'EMAIL', 'SMS') NOT NULL DEFAULT 'WEBSITE',
    `type` ENUM('INFO', 'WARN', 'ERROR', 'SUCCESS') NOT NULL DEFAULT 'INFO',
    `text` VARCHAR(191) NOT NULL,
    `data` JSON,
    `delivered` BOOLEAN NOT NULL DEFAULT false,
    `deliverAt` DATETIME(3) DEFAULT CURRENT_TIMESTAMP(3),
    `error` JSON,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
