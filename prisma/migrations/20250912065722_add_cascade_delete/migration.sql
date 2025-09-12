-- DropForeignKey
ALTER TABLE `appointment` DROP FOREIGN KEY `Appointment_businessId_fkey`;

-- DropForeignKey
ALTER TABLE `appointment` DROP FOREIGN KEY `Appointment_customerId_fkey`;

-- DropForeignKey
ALTER TABLE `appointment` DROP FOREIGN KEY `Appointment_serviceId_fkey`;

-- DropForeignKey
ALTER TABLE `appointment` DROP FOREIGN KEY `Appointment_staffId_fkey`;

-- DropForeignKey
ALTER TABLE `cashtransaction` DROP FOREIGN KEY `CashTransaction_businessId_fkey`;

-- DropForeignKey
ALTER TABLE `customer` DROP FOREIGN KEY `Customer_businessId_fkey`;

-- DropForeignKey
ALTER TABLE `service` DROP FOREIGN KEY `Service_businessId_fkey`;

-- DropForeignKey
ALTER TABLE `staff` DROP FOREIGN KEY `Staff_businessId_fkey`;

-- AddForeignKey
ALTER TABLE `Service` ADD CONSTRAINT `Service_businessId_fkey` FOREIGN KEY (`businessId`) REFERENCES `Business`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Staff` ADD CONSTRAINT `Staff_businessId_fkey` FOREIGN KEY (`businessId`) REFERENCES `Business`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Customer` ADD CONSTRAINT `Customer_businessId_fkey` FOREIGN KEY (`businessId`) REFERENCES `Business`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Appointment` ADD CONSTRAINT `Appointment_businessId_fkey` FOREIGN KEY (`businessId`) REFERENCES `Business`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Appointment` ADD CONSTRAINT `Appointment_serviceId_fkey` FOREIGN KEY (`serviceId`) REFERENCES `Service`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Appointment` ADD CONSTRAINT `Appointment_staffId_fkey` FOREIGN KEY (`staffId`) REFERENCES `Staff`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Appointment` ADD CONSTRAINT `Appointment_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CashTransaction` ADD CONSTRAINT `CashTransaction_businessId_fkey` FOREIGN KEY (`businessId`) REFERENCES `Business`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
