/*
  Warnings:

  - Added the required column `description` to the `TaskList` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `TaskList` ADD COLUMN `description` TEXT NOT NULL;
