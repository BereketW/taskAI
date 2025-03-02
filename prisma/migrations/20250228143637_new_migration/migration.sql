/*
  Warnings:

  - You are about to drop the `Workspace` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WorkspaceMember` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Integration` DROP FOREIGN KEY `Integration_workspaceId_fkey`;

-- DropForeignKey
ALTER TABLE `TaskList` DROP FOREIGN KEY `TaskList_workspaceId_fkey`;

-- DropForeignKey
ALTER TABLE `Workspace` DROP FOREIGN KEY `Workspace_ownerId_fkey`;

-- DropForeignKey
ALTER TABLE `WorkspaceMember` DROP FOREIGN KEY `WorkspaceMember_userId_fkey`;

-- DropForeignKey
ALTER TABLE `WorkspaceMember` DROP FOREIGN KEY `WorkspaceMember_workspaceId_fkey`;

-- DropIndex
DROP INDEX `Integration_workspaceId_fkey` ON `Integration`;

-- DropIndex
DROP INDEX `TaskList_workspaceId_fkey` ON `TaskList`;

-- DropTable
DROP TABLE `Workspace`;

-- DropTable
DROP TABLE `WorkspaceMember`;

-- CreateTable
CREATE TABLE `workspace` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `ownerId` VARCHAR(191) NOT NULL,
    `visibility` ENUM('PRIVATE', 'PUBLIC', 'TEAM') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `workspaceMember` (
    `id` VARCHAR(191) NOT NULL,
    `workspaceId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `role` ENUM('OWNER', 'ADMIN', 'MEMBER', 'VIEWER') NOT NULL,
    `joinedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `workspace` ADD CONSTRAINT `workspace_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `workspaceMember` ADD CONSTRAINT `workspaceMember_workspaceId_fkey` FOREIGN KEY (`workspaceId`) REFERENCES `workspace`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `workspaceMember` ADD CONSTRAINT `workspaceMember_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TaskList` ADD CONSTRAINT `TaskList_workspaceId_fkey` FOREIGN KEY (`workspaceId`) REFERENCES `workspace`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Integration` ADD CONSTRAINT `Integration_workspaceId_fkey` FOREIGN KEY (`workspaceId`) REFERENCES `workspace`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
