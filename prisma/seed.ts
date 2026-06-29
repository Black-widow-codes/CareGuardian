import "dotenv/config";
import { PrismaClient } from "../lib/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { mockPatients } from "../data/mockPatients";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  await prisma.patient.deleteMany();

  await prisma.patient.createMany({
    data: mockPatients.map((patient) => ({
      name: patient.name,
      dob: patient.dob,
      diagnosis: patient.diagnosis,
      dischargeDate: patient.dischargeDate,
      medicationReconciled: patient.medicationReconciled,
      followUpScheduled: patient.followUpScheduled,
      pendingTests: patient.pendingTests,
      providerAssigned: patient.providerAssigned,
      dischargeInstructionsGiven: patient.dischargeInstructionsGiven,
      homeCareReferral: patient.homeCareReferral,
      issue: patient.issue,
      score: patient.score,
      risk: patient.risk,
    })),
  });
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