import bcrypt from "bcryptjs";
import "dotenv/config";
import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  const hashedPassword = await bcrypt.hash("Test123!", 12);

  await prisma.user.upsert({
    where: {
      email: "nurse@careguardian.local",
    },
    update: {
      name: "Test Nurse",
      password: hashedPassword,
      role: "NURSE",
    },
    create: {
      name: "Test Nurse",
      email: "nurse@careguardian.local",
      password: hashedPassword,
      role: "NURSE",
    },
  });

  console.log("Test nurse created successfully.");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });