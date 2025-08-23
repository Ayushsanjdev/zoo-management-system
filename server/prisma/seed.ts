import { PrismaClient } from "../src/generated/prisma";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("password123", 10);

  const admin = await prisma.user.create({
    data: {
      name: "Alice Admin",
      email: "admin@zoo.com",
      password: passwordHash,
      role: "ADMIN",
    },
  });

  const staff = await prisma.user.create({
    data: {
      name: "Sam Staff",
      email: "staff@zoo.com",
      password: passwordHash,
      role: "STAFF",
    },
  });

  const vet = await prisma.user.create({
    data: {
      name: "Victor Vet",
      email: "vet@zoo.com",
      password: passwordHash,
      role: "VET",
    },
  });

  const lionEnclosure = await prisma.enclosure.create({
    data: {
      name: "Savannah Zone",
      type: "Grassland",
      capacity: 5,
    },
  });

  const birdEnclosure = await prisma.enclosure.create({
    data: {
      name: "Bird Sanctuary",
      type: "Aviary",
      capacity: 20,
    },
  });

  const lion = await prisma.animal.create({
    data: {
      name: "Simba",
      species: "Lion",
      scientificName: "Panthera leo",
      age: 5,
      gender: "Male",
      healthStatus: "Healthy",
      enclosureId: lionEnclosure.id,
    },
  });

  const parrot = await prisma.animal.create({
    data: {
      name: "Polly",
      species: "Parrot",
      scientificName: "Psittaciformes",
      age: 2,
      gender: "Female",
      healthStatus: "Healthy",
      enclosureId: birdEnclosure.id,
    },
  });

  await prisma.enclosureStaff.create({
    data: {
      staffId: staff.id,
      enclosureId: lionEnclosure.id,
    },
  });

  await prisma.feedingRecord.create({
    data: {
      foodType: "Meat",
      quantity: "5kg",
      staffId: staff.id,
      animalId: lion.id,
    },
  });

  await prisma.feedingRecord.create({
    data: {
      foodType: "Seeds",
      quantity: "200g",
      staffId: staff.id,
      animalId: parrot.id,
    },
  });

  await prisma.healthRecord.create({
    data: {
      checkupDate: new Date(),
      notes: "Routine checkup, all good.",
      medication: null,
      animalId: lion.id,
      vetId: vet.id,
    },
  });
}

main()
  .then(async () => {
    console.log("✅ Seeding completed");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Seeding error:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
