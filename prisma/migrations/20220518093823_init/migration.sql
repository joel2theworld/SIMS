/*
  Warnings:

  - You are about to alter the column `middleName` on the `studentreg` table. The data in that column could be lost. The data in that column will be cast from `VarChar(50)` to `VarChar(45)`.
  - A unique constraint covering the columns `[email]` on the table `studentreg` will be added. If there are existing duplicate values, this will fail.
  - Made the column `email` on table `studentreg` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phoneNo` on table `studentreg` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `studentreg` MODIFY `email` VARCHAR(191) NOT NULL,
    MODIFY `phoneNo` VARCHAR(191) NOT NULL,
    MODIFY `middleName` VARCHAR(45) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `StudentReg_email_key` ON `studentreg`(`email`);
