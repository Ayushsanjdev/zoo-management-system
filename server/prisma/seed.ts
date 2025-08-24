import { PrismaClient } from "../src/generated/prisma";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("password123", 10);

  // Create Users
  const admin = await prisma.user.create({
    data: {
      name: "Alice Admin",
      email: "admin@zoo.com",
      password: passwordHash,
      role: "ADMIN",
    },
  });

  const staff1 = await prisma.user.create({
    data: {
      name: "Sam Staff",
      email: "staff@zoo.com",
      password: passwordHash,
      role: "STAFF",
    },
  });

  const staff2 = await prisma.user.create({
    data: {
      name: "John Keeper",
      email: "john@zoo.com",
      password: passwordHash,
      role: "STAFF",
    },
  });

  const vet1 = await prisma.user.create({
    data: {
      name: "Dr. Victor Vet",
      email: "vet@zoo.com",
      password: passwordHash,
      role: "VET",
    },
  });

  const vet2 = await prisma.user.create({
    data: {
      name: "Dr. Sarah Wilson",
      email: "sarah@zoo.com",
      password: passwordHash,
      role: "VET",
    },
  });

  // Create Enclosures
  const lionEnclosure = await prisma.enclosure.create({
    data: {
      name: "African Savanna",
      type: "Outdoor Grassland",
      capacity: 8,
    },
  });

  const birdEnclosure = await prisma.enclosure.create({
    data: {
      name: "Tropical Aviary",
      type: "Indoor Aviary",
      capacity: 25,
    },
  });

  const primateEnclosure = await prisma.enclosure.create({
    data: {
      name: "Primate House",
      type: "Indoor/Outdoor",
      capacity: 12,
    },
  });

  const aquaticEnclosure = await prisma.enclosure.create({
    data: {
      name: "Marine Habitat",
      type: "Aquatic",
      capacity: 15,
    },
  });

  // Create Animals
  const lion1 = await prisma.animal.create({
    data: {
      name: "Simba",
      species: "African Lion",
      scientificName: "Panthera leo",
      age: 5,
      gender: "Male",
      healthStatus: "Healthy",
      enclosureId: lionEnclosure.id,
    },
  });

  const lion2 = await prisma.animal.create({
    data: {
      name: "Nala",
      species: "African Lion",
      scientificName: "Panthera leo",
      age: 4,
      gender: "Female",
      healthStatus: "Healthy",
      enclosureId: lionEnclosure.id,
    },
  });

  const parrot1 = await prisma.animal.create({
    data: {
      name: "Polly",
      species: "Scarlet Macaw",
      scientificName: "Ara macao",
      age: 3,
      gender: "Female",
      healthStatus: "Healthy",
      enclosureId: birdEnclosure.id,
    },
  });

  const parrot2 = await prisma.animal.create({
    data: {
      name: "Rio",
      species: "Blue-and-yellow Macaw",
      scientificName: "Ara ararauna",
      age: 7,
      gender: "Male",
      healthStatus: "Under medication",
      enclosureId: birdEnclosure.id,
    },
  });

  const chimp = await prisma.animal.create({
    data: {
      name: "Caesar",
      species: "Chimpanzee",
      scientificName: "Pan troglodytes",
      age: 12,
      gender: "Male",
      healthStatus: "Healthy",
      enclosureId: primateEnclosure.id,
    },
  });

  const seal = await prisma.animal.create({
    data: {
      name: "Splash",
      species: "Harbor Seal",
      scientificName: "Phoca vitulina",
      age: 8,
      gender: "Female",
      healthStatus: "Healthy",
      enclosureId: aquaticEnclosure.id,
    },
  });

  const penguin = await prisma.animal.create({
    data: {
      name: "Pebble",
      species: "Emperor Penguin",
      scientificName: "Aptenodytes forsteri",
      age: 2,
      gender: "Male",
      healthStatus: "Healthy",
      enclosureId: aquaticEnclosure.id,
    },
  });

  // Create Enclosure Staff Assignments
  await prisma.enclosureStaff.create({
    data: {
      staffId: staff1.id,
      enclosureId: lionEnclosure.id,
    },
  });

  await prisma.enclosureStaff.create({
    data: {
      staffId: staff1.id,
      enclosureId: birdEnclosure.id,
    },
  });

  await prisma.enclosureStaff.create({
    data: {
      staffId: staff2.id,
      enclosureId: primateEnclosure.id,
    },
  });

  await prisma.enclosureStaff.create({
    data: {
      staffId: staff2.id,
      enclosureId: aquaticEnclosure.id,
    },
  });

  // Create Feeding Schedules
  // Lions - Morning feeding
  await prisma.feedingSchedule.create({
    data: {
      name: "Lion Morning Feed",
      foodType: "Raw beef chunks",
      quantity: "8kg",
      feedingTime: new Date("2024-01-01T09:00:00Z"),
      frequency: "ONCE_DAILY",
      isActive: true,
      notes: "Feed in separate areas to avoid competition",
      animalId: lion1.id,
      assignedStaffId: staff1.id,
    },
  });

  await prisma.feedingSchedule.create({
    data: {
      name: "Lion Morning Feed",
      foodType: "Raw beef chunks",
      quantity: "6kg",
      feedingTime: new Date("2024-01-01T09:00:00Z"),
      frequency: "ONCE_DAILY",
      isActive: true,
      notes: "Smaller portion for female",
      animalId: lion2.id,
      assignedStaffId: staff1.id,
    },
  });

  // Lions - Weekly bone feeding
  await prisma.feedingSchedule.create({
    data: {
      name: "Lion Bone Day",
      foodType: "Large beef bones",
      quantity: "1 bone",
      feedingTime: new Date("2024-01-01T14:00:00Z"),
      frequency: "WEEKLY",
      daysOfWeek: "sunday",
      isActive: true,
      notes: "For dental health and enrichment",
      animalId: lion1.id,
      assignedStaffId: staff1.id,
    },
  });

  await prisma.feedingSchedule.create({
    data: {
      name: "Lion Bone Day",
      foodType: "Large beef bones",
      quantity: "1 bone",
      feedingTime: new Date("2024-01-01T14:00:00Z"),
      frequency: "WEEKLY",
      daysOfWeek: "sunday",
      isActive: true,
      notes: "For dental health and enrichment",
      animalId: lion2.id,
      assignedStaffId: staff1.id,
    },
  });

  // Parrots - Twice daily feeding
  await prisma.feedingSchedule.create({
    data: {
      name: "Macaw Breakfast",
      foodType: "Mixed fruits and nuts",
      quantity: "300g",
      feedingTime: new Date("2024-01-01T08:00:00Z"),
      frequency: "TWICE_DAILY",
      isActive: true,
      notes: "Include variety of tropical fruits",
      animalId: parrot1.id,
      assignedStaffId: staff1.id,
    },
  });

  await prisma.feedingSchedule.create({
    data: {
      name: "Macaw Dinner",
      foodType: "Mixed fruits and nuts",
      quantity: "200g",
      feedingTime: new Date("2024-01-01T17:00:00Z"),
      frequency: "TWICE_DAILY",
      isActive: true,
      notes: "Lighter evening portion",
      animalId: parrot1.id,
      assignedStaffId: staff1.id,
    },
  });

  // Special medication feeding for sick parrot
  await prisma.feedingSchedule.create({
    data: {
      name: "Rio Medication Feed",
      foodType: "Soft fruits with medication",
      quantity: "150g",
      feedingTime: new Date("2024-01-01T12:00:00Z"),
      frequency: "ONCE_DAILY",
      isActive: true,
      startDate: new Date("2024-08-15T00:00:00Z"),
      endDate: new Date("2024-08-30T00:00:00Z"),
      notes: "Mix antibiotics with banana paste - ends 30th Aug",
      animalId: parrot2.id,
      assignedStaffId: staff1.id,
    },
  });

  // Chimp feeding - Three times daily
  await prisma.feedingSchedule.create({
    data: {
      name: "Chimp Breakfast",
      foodType: "Fruits and vegetables",
      quantity: "2kg",
      feedingTime: new Date("2024-01-01T08:00:00Z"),
      frequency: "THREE_TIMES_DAILY",
      isActive: true,
      notes: "Variety of seasonal fruits",
      animalId: chimp.id,
      assignedStaffId: staff2.id,
    },
  });

  await prisma.feedingSchedule.create({
    data: {
      name: "Chimp Lunch",
      foodType: "Nuts and seeds",
      quantity: "1kg",
      feedingTime: new Date("2024-01-01T13:00:00Z"),
      frequency: "THREE_TIMES_DAILY",
      isActive: true,
      notes: "Include foraging enrichment",
      animalId: chimp.id,
      assignedStaffId: staff2.id,
    },
  });

  await prisma.feedingSchedule.create({
    data: {
      name: "Chimp Dinner",
      foodType: "Vegetables and grains",
      quantity: "1.5kg",
      feedingTime: new Date("2024-01-01T18:00:00Z"),
      frequency: "THREE_TIMES_DAILY",
      isActive: true,
      notes: "Cooked sweet potatoes and grains",
      animalId: chimp.id,
      assignedStaffId: staff2.id,
    },
  });

  // Aquatic animals
  await prisma.feedingSchedule.create({
    data: {
      name: "Seal Feeding",
      foodType: "Fresh fish (herring, mackerel)",
      quantity: "4kg",
      feedingTime: new Date("2024-01-01T11:00:00Z"),
      frequency: "TWICE_DAILY",
      isActive: true,
      notes: "Check fish quality daily",
      animalId: seal.id,
      assignedStaffId: staff2.id,
    },
  });

  await prisma.feedingSchedule.create({
    data: {
      name: "Penguin Feeding",
      foodType: "Krill and small fish",
      quantity: "1.5kg",
      feedingTime: new Date("2024-01-01T10:00:00Z"),
      frequency: "TWICE_DAILY",
      isActive: true,
      notes: "Feed during training session",
      animalId: penguin.id,
      assignedStaffId: staff2.id,
    },
  });

  // Create some Feeding Records (completed feedings)
  await prisma.feedingRecord.create({
    data: {
      foodType: "Raw beef chunks",
      quantity: "8kg",
      feedingTime: new Date(Date.now() - 24 * 60 * 60 * 1000), // Yesterday
      notes: "Fed successfully, good appetite",
      staffId: staff1.id,
      animalId: lion1.id,
      scheduleId: (
        await prisma.feedingSchedule.findFirst({
          where: { animalId: lion1.id, name: "Lion Morning Feed" },
        })
      )?.id,
    },
  });

  await prisma.feedingRecord.create({
    data: {
      foodType: "Mixed fruits and nuts",
      quantity: "300g",
      feedingTime: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
      notes: "Ate well, very active",
      staffId: staff1.id,
      animalId: parrot1.id,
    },
  });

  await prisma.feedingRecord.create({
    data: {
      foodType: "Fresh fish",
      quantity: "4kg",
      feedingTime: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      notes: "Training went well during feeding",
      staffId: staff2.id,
      animalId: seal.id,
    },
  });

  // Create Health Records
  await prisma.healthRecord.create({
    data: {
      checkupDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
      notes:
        "Annual checkup completed. Excellent health condition. Weight: 180kg",
      medication: null,
      animalId: lion1.id,
      vetId: vet1.id,
    },
  });

  await prisma.healthRecord.create({
    data: {
      checkupDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
      notes:
        "Annual checkup completed. Good health. Weight: 140kg. Recommend dental check next month",
      medication: null,
      animalId: lion2.id,
      vetId: vet1.id,
    },
  });

  await prisma.healthRecord.create({
    data: {
      checkupDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      notes:
        "Upper respiratory infection. Started antibiotic treatment. Monitor closely.",
      medication: "Amoxicillin 250mg twice daily for 10 days",
      animalId: parrot2.id,
      vetId: vet2.id,
    },
  });

  await prisma.healthRecord.create({
    data: {
      checkupDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 2 weeks ago
      notes:
        "Routine checkup. Behavioral enrichment working well. Good social interactions.",
      medication: null,
      animalId: chimp.id,
      vetId: vet2.id,
    },
  });

  await prisma.healthRecord.create({
    data: {
      checkupDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 1 month ago
      notes:
        "Monthly weight check. Weight stable at 85kg. Flipper healing well from minor cut.",
      medication: "Topical antiseptic for flipper - completed",
      animalId: seal.id,
      vetId: vet1.id,
    },
  });

  console.log("✅ Database seeded successfully!");
  console.log(`Created:
    👥 Users: 5 (1 admin, 2 staff, 2 vets)
    🏠 Enclosures: 4 
    🦁 Animals: 7
    👔 Staff Assignments: 4
    📋 Feeding Schedules: 12
    🍽️ Feeding Records: 3
    🏥 Health Records: 5`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Seeding error:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
