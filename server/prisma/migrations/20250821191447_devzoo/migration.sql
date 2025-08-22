/*
  Warnings:

  - Added the required column `updatedAt` to the `Enclosure` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `EnclosureStaff` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `FeedingRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `HealthRecord` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Enclosure" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."EnclosureStaff" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."FeedingRecord" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "public"."HealthRecord" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
