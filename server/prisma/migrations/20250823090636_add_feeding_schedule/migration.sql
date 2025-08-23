-- CreateEnum
CREATE TYPE "public"."Frequency" AS ENUM ('ONCE_DAILY', 'TWICE_DAILY', 'THREE_TIMES_DAILY', 'WEEKLY', 'TWICE_WEEKLY', 'CUSTOM');

-- AlterTable
ALTER TABLE "public"."FeedingRecord" ADD COLUMN     "notes" TEXT,
ADD COLUMN     "scheduleId" TEXT;

-- CreateTable
CREATE TABLE "public"."FeedingSchedule" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "foodType" TEXT NOT NULL,
    "quantity" TEXT NOT NULL,
    "feedingTime" TIMESTAMP(3) NOT NULL,
    "frequency" "public"."Frequency" NOT NULL,
    "daysOfWeek" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3),
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "animalId" TEXT NOT NULL,
    "assignedStaffId" TEXT,

    CONSTRAINT "FeedingSchedule_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "FeedingSchedule_animalId_idx" ON "public"."FeedingSchedule"("animalId");

-- CreateIndex
CREATE INDEX "FeedingSchedule_feedingTime_idx" ON "public"."FeedingSchedule"("feedingTime");

-- CreateIndex
CREATE INDEX "FeedingSchedule_frequency_idx" ON "public"."FeedingSchedule"("frequency");

-- AddForeignKey
ALTER TABLE "public"."FeedingRecord" ADD CONSTRAINT "FeedingRecord_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "public"."FeedingSchedule"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."FeedingSchedule" ADD CONSTRAINT "FeedingSchedule_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "public"."Animal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."FeedingSchedule" ADD CONSTRAINT "FeedingSchedule_assignedStaffId_fkey" FOREIGN KEY ("assignedStaffId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
