-- DropForeignKey
ALTER TABLE `feedback` DROP FOREIGN KEY `Feedback_incidentId_fkey`;

-- AddForeignKey
ALTER TABLE `feedback` ADD CONSTRAINT `Feedback_incidentId_fkey` FOREIGN KEY (`incidentId`) REFERENCES `incidentpost`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
