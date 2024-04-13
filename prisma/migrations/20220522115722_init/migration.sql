/*
  Warnings:

  - You are about to drop the column `staffId` on the `incidentpost` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `incidentpost` DROP FOREIGN KEY `incidentpost_staffId_fkey`;

-- AlterTable
ALTER TABLE `incidentpost` DROP COLUMN `staffId`;
