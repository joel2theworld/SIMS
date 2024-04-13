-- DropForeignKey
ALTER TABLE `assignincident` DROP FOREIGN KEY `AssignIncident_incidentId_fkey`;

-- DropForeignKey
ALTER TABLE `assignincident` DROP FOREIGN KEY `AssignIncident_staffId_fkey`;

-- DropForeignKey
ALTER TABLE `incidentpost` DROP FOREIGN KEY `IncidentPost_studentId_fkey`;

-- AlterTable
ALTER TABLE `incidentpost` ADD COLUMN `roomno` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `refreshtoken` MODIFY `studentId` INTEGER NULL,
    MODIFY `staffId` INTEGER NULL;

-- AlterTable
ALTER TABLE `studentreg` ADD COLUMN `address` VARCHAR(191) NULL,
    ADD COLUMN `gender` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `incidentpost` ADD CONSTRAINT `IncidentPost_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `studentreg`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `assignincident` ADD CONSTRAINT `AssignIncident_staffId_fkey` FOREIGN KEY (`staffId`) REFERENCES `staff`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `assignincident` ADD CONSTRAINT `AssignIncident_incidentId_fkey` FOREIGN KEY (`incidentId`) REFERENCES `incidentpost`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
