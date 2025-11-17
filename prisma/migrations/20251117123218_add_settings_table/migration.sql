-- CreateTable
CREATE TABLE `settings` (
    `id` VARCHAR(191) NOT NULL,
    `logo` LONGTEXT NULL,
    `favicon` LONGTEXT NULL,
    `businessName` VARCHAR(191) NULL,
    `businessEmail` VARCHAR(191) NULL,
    `businessPhone` VARCHAR(191) NULL,
    `businessAddress` TEXT NULL,
    `darkMode` BOOLEAN NOT NULL DEFAULT false,
    `compactMode` BOOLEAN NOT NULL DEFAULT false,
    `showAnimations` BOOLEAN NOT NULL DEFAULT true,
    `emailNotifications` BOOLEAN NOT NULL DEFAULT true,
    `smsNotifications` BOOLEAN NOT NULL DEFAULT false,
    `pushNotifications` BOOLEAN NOT NULL DEFAULT true,
    `appointmentReminders` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
