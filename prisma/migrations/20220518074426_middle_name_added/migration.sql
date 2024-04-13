/*
  Warnings:

  - Added the required column `middleName` to the `StudentReg` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `StudentReg_email_key` ON `studentreg`;

-- AlterTable
ALTER TABLE `studentreg` ADD COLUMN `middleName` VARCHAR(50) NOT NULL,
    MODIFY `email` VARCHAR(191) NULL,
    MODIFY `phoneNo` VARCHAR(191) NULL;
