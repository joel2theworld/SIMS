-- DropIndex
DROP INDEX `Staff_email_key` ON `staff`;

-- DropIndex
DROP INDEX `StudentReg_email_key` ON `studentreg`;

-- AlterTable
ALTER TABLE `staff` MODIFY `email` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `studentreg` MODIFY `email` VARCHAR(191) NULL;
