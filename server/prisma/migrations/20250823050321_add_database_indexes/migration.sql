-- CreateIndex
CREATE INDEX "Animal_species_idx" ON "public"."Animal"("species");

-- CreateIndex
CREATE INDEX "Animal_healthStatus_idx" ON "public"."Animal"("healthStatus");

-- CreateIndex
CREATE INDEX "Animal_gender_idx" ON "public"."Animal"("gender");

-- CreateIndex
CREATE INDEX "Animal_enclosureId_idx" ON "public"."Animal"("enclosureId");

-- CreateIndex
CREATE INDEX "Animal_age_idx" ON "public"."Animal"("age");

-- CreateIndex
CREATE INDEX "Animal_createdAt_idx" ON "public"."Animal"("createdAt");

-- CreateIndex
CREATE INDEX "Animal_name_idx" ON "public"."Animal"("name");

-- CreateIndex
CREATE INDEX "Animal_scientificName_idx" ON "public"."Animal"("scientificName");

-- CreateIndex
CREATE INDEX "Animal_species_healthStatus_idx" ON "public"."Animal"("species", "healthStatus");

-- CreateIndex
CREATE INDEX "Animal_enclosureId_species_idx" ON "public"."Animal"("enclosureId", "species");

-- CreateIndex
CREATE INDEX "Enclosure_type_idx" ON "public"."Enclosure"("type");

-- CreateIndex
CREATE INDEX "Enclosure_capacity_idx" ON "public"."Enclosure"("capacity");

-- CreateIndex
CREATE INDEX "Enclosure_createdAt_idx" ON "public"."Enclosure"("createdAt");

-- CreateIndex
CREATE INDEX "Enclosure_name_idx" ON "public"."Enclosure"("name");

-- CreateIndex
CREATE INDEX "EnclosureStaff_staffId_idx" ON "public"."EnclosureStaff"("staffId");

-- CreateIndex
CREATE INDEX "EnclosureStaff_enclosureId_idx" ON "public"."EnclosureStaff"("enclosureId");

-- CreateIndex
CREATE INDEX "EnclosureStaff_assignedAt_idx" ON "public"."EnclosureStaff"("assignedAt");

-- CreateIndex
CREATE INDEX "EnclosureStaff_createdAt_idx" ON "public"."EnclosureStaff"("createdAt");

-- CreateIndex
CREATE INDEX "EnclosureStaff_staffId_enclosureId_idx" ON "public"."EnclosureStaff"("staffId", "enclosureId");

-- CreateIndex
CREATE INDEX "EnclosureStaff_enclosureId_assignedAt_idx" ON "public"."EnclosureStaff"("enclosureId", "assignedAt");

-- CreateIndex
CREATE INDEX "FeedingRecord_staffId_idx" ON "public"."FeedingRecord"("staffId");

-- CreateIndex
CREATE INDEX "FeedingRecord_animalId_idx" ON "public"."FeedingRecord"("animalId");

-- CreateIndex
CREATE INDEX "FeedingRecord_foodType_idx" ON "public"."FeedingRecord"("foodType");

-- CreateIndex
CREATE INDEX "FeedingRecord_feedingTime_idx" ON "public"."FeedingRecord"("feedingTime");

-- CreateIndex
CREATE INDEX "FeedingRecord_createdAt_idx" ON "public"."FeedingRecord"("createdAt");

-- CreateIndex
CREATE INDEX "FeedingRecord_animalId_feedingTime_idx" ON "public"."FeedingRecord"("animalId", "feedingTime");

-- CreateIndex
CREATE INDEX "FeedingRecord_staffId_feedingTime_idx" ON "public"."FeedingRecord"("staffId", "feedingTime");

-- CreateIndex
CREATE INDEX "FeedingRecord_animalId_foodType_idx" ON "public"."FeedingRecord"("animalId", "foodType");

-- CreateIndex
CREATE INDEX "HealthRecord_animalId_idx" ON "public"."HealthRecord"("animalId");

-- CreateIndex
CREATE INDEX "HealthRecord_vetId_idx" ON "public"."HealthRecord"("vetId");

-- CreateIndex
CREATE INDEX "HealthRecord_checkupDate_idx" ON "public"."HealthRecord"("checkupDate");

-- CreateIndex
CREATE INDEX "HealthRecord_createdAt_idx" ON "public"."HealthRecord"("createdAt");

-- CreateIndex
CREATE INDEX "HealthRecord_animalId_checkupDate_idx" ON "public"."HealthRecord"("animalId", "checkupDate");

-- CreateIndex
CREATE INDEX "HealthRecord_vetId_checkupDate_idx" ON "public"."HealthRecord"("vetId", "checkupDate");

-- CreateIndex
CREATE INDEX "HealthRecord_animalId_vetId_idx" ON "public"."HealthRecord"("animalId", "vetId");

-- CreateIndex
CREATE INDEX "User_role_idx" ON "public"."User"("role");

-- CreateIndex
CREATE INDEX "User_createdAt_idx" ON "public"."User"("createdAt");
