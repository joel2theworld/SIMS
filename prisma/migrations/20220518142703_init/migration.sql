/*
  Warnings:

  - You are about to alter the column `response` on the `feedback` table. The data in that column could be lost. The data in that column will be cast from `VarChar(300)` to `VarChar(191)`.
  - You are about to alter the column `username` on the `staff` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `feedback` MODIFY `response` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `incidentcategory` MODIFY `category` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `incidentpost` MODIFY `description` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `staff` MODIFY `firstName` VARCHAR(191) NOT NULL,
    MODIFY `lastName` VARCHAR(191) NOT NULL,
    MODIFY `username` VARCHAR(191) NOT NULL,
    MODIFY `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `updatedAt` DATETIME(3) NULL;

-- AlterTable
ALTER TABLE `studentreg` ADD COLUMN `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NULL,
    MODIFY `matricNo` VARCHAR(191) NOT NULL,
    MODIFY `firstName` VARCHAR(191) NOT NULL,
    MODIFY `lastName` VARCHAR(191) NOT NULL,
    MODIFY `middleName` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `userrole` MODIFY `roles` VARCHAR(191) NOT NULL DEFAULT 'student';
