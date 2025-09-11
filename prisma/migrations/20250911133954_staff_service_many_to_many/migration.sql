/*
  Warnings:

  - You are about to drop the column `serviceIds` on the `staff` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `staff` DROP COLUMN `serviceIds`;

-- CreateTable
CREATE TABLE `_StaffServices` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_StaffServices_AB_unique`(`A`, `B`),
    INDEX `_StaffServices_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_StaffServices` ADD CONSTRAINT `_StaffServices_A_fkey` FOREIGN KEY (`A`) REFERENCES `Service`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_StaffServices` ADD CONSTRAINT `_StaffServices_B_fkey` FOREIGN KEY (`B`) REFERENCES `Staff`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
