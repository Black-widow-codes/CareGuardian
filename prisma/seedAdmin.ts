import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient, UserRole } from "../lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  const hashedPassword = await bcrypt.hash("Admin123!", 10);

  const existingUser = await prisma.user.findUnique({
    where: {
      email: "admin@careguardian.local",
    },
  });

  if (existingUser) {
    console.log("Administrator already exists.");
    return;
  }

  await prisma.user.create({
    data: {
      name: "System Administrator",
      email: "admin@careguardian.local",
      password: hashedPassword,
      role: UserRole.ADMIN,
    },
  });

  console.log("Administrator created successfully.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });