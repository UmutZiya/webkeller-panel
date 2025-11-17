/*
  Warnings:

  - You are about to drop the column `favicon` on the `settings` table. All the data in the column will be lost.
  - You are about to drop the column `logo` on the `settings` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `settings` DROP COLUMN `favicon`,
    DROP COLUMN `logo`,
    ADD COLUMN `logoDark` LONGTEXT NULL,
    ADD COLUMN `logoLight` LONGTEXT NULL;
