-- CreateTable
CREATE TABLE "public"."Animal" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "species" TEXT NOT NULL,
    "scientificName" TEXT,
    "age" INTEGER,
    "gender" TEXT,
    "healthStatus" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "enclosureId" TEXT,

    CONSTRAINT "Animal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Enclosure" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Enclosure_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."EnclosureStaff" (
    "id" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "staffId" TEXT NOT NULL,
    "enclosureId" TEXT NOT NULL,

    CONSTRAINT "EnclosureStaff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."FeedingRecord" (
    "id" TEXT NOT NULL,
    "foodType" TEXT NOT NULL,
    "quantity" TEXT,
    "feedingTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "staffId" TEXT NOT NULL,
    "animalId" TEXT NOT NULL,

    CONSTRAINT "FeedingRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."HealthRecord" (
    "id" TEXT NOT NULL,
    "checkupDate" TIMESTAMP(3) NOT NULL,
    "notes" TEXT NOT NULL,
    "medication" TEXT,
    "animalId" TEXT NOT NULL,
    "vetId" TEXT NOT NULL,

    CONSTRAINT "HealthRecord_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Animal" ADD CONSTRAINT "Animal_enclosureId_fkey" FOREIGN KEY ("enclosureId") REFERENCES "public"."Enclosure"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."EnclosureStaff" ADD CONSTRAINT "EnclosureStaff_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."EnclosureStaff" ADD CONSTRAINT "EnclosureStaff_enclosureId_fkey" FOREIGN KEY ("enclosureId") REFERENCES "public"."Enclosure"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."FeedingRecord" ADD CONSTRAINT "FeedingRecord_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."FeedingRecord" ADD CONSTRAINT "FeedingRecord_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "public"."Animal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."HealthRecord" ADD CONSTRAINT "HealthRecord_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "public"."Animal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."HealthRecord" ADD CONSTRAINT "HealthRecord_vetId_fkey" FOREIGN KEY ("vetId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
