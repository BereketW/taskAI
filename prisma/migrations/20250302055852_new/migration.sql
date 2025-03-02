/*
  Warnings:

  - You are about to drop the `Task` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Reminder` DROP FOREIGN KEY `Reminder_taskId_fkey`;

-- DropForeignKey
ALTER TABLE `Task` DROP FOREIGN KEY `Task_assignedToId_fkey`;

-- DropForeignKey
ALTER TABLE `Task` DROP FOREIGN KEY `Task_listId_fkey`;

-- DropForeignKey
ALTER TABLE `TaskActivityLog` DROP FOREIGN KEY `TaskActivityLog_taskId_fkey`;

-- DropForeignKey
ALTER TABLE `TaskAttachment` DROP FOREIGN KEY `TaskAttachment_taskId_fkey`;

-- DropForeignKey
ALTER TABLE `TaskComment` DROP FOREIGN KEY `TaskComment_taskId_fkey`;

-- DropIndex
DROP INDEX `Reminder_taskId_fkey` ON `Reminder`;

-- DropIndex
DROP INDEX `TaskActivityLog_taskId_fkey` ON `TaskActivityLog`;

-- DropIndex
DROP INDEX `TaskAttachment_taskId_fkey` ON `TaskAttachment`;

-- DropIndex
DROP INDEX `TaskComment_taskId_fkey` ON `TaskComment`;

-- DropTable
DROP TABLE `Task`;

-- CreateTable
CREATE TABLE `task` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `listId` VARCHAR(191) NOT NULL,
    `assignedToId` VARCHAR(191) NULL,
    `dueDate` DATETIME(3) NULL,
    `dueTime` VARCHAR(191) NOT NULL,
    `priority` ENUM('LOW', 'MEDIUM', 'HIGH') NOT NULL,
    `status` ENUM('PENDING', 'IN_PROGRESS', 'COMPLETED', 'ARCHIVED') NOT NULL,
    `category` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `task` ADD CONSTRAINT `task_listId_fkey` FOREIGN KEY (`listId`) REFERENCES `TaskList`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `task` ADD CONSTRAINT `task_assignedToId_fkey` FOREIGN KEY (`assignedToId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TaskComment` ADD CONSTRAINT `TaskComment_taskId_fkey` FOREIGN KEY (`taskId`) REFERENCES `task`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TaskActivityLog` ADD CONSTRAINT `TaskActivityLog_taskId_fkey` FOREIGN KEY (`taskId`) REFERENCES `task`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reminder` ADD CONSTRAINT `Reminder_taskId_fkey` FOREIGN KEY (`taskId`) REFERENCES `task`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TaskAttachment` ADD CONSTRAINT `TaskAttachment_taskId_fkey` FOREIGN KEY (`taskId`) REFERENCES `task`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
