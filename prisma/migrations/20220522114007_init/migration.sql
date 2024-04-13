-- AlterTable
ALTER TABLE `incidentpost` ADD COLUMN `staffId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `incidentpost` ADD CONSTRAINT `incidentpost_staffId_fkey` FOREIGN KEY (`staffId`) REFERENCES `staff`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
