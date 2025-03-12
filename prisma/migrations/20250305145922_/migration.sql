-- AlterTable
ALTER TABLE `task` ADD COLUMN `completedAt` DATETIME(3) NULL,
    ADD COLUMN `isCompleted` BOOLEAN NOT NULL DEFAULT false;
