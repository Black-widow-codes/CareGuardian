import { prisma } from "@/lib/prisma";

export class PatientRepository {
  async findAll() {
    return prisma.patient.findMany({
      orderBy: {
        id: "asc",
      },
    });
  }

  async findById(id: number) {
    return prisma.patient.findUnique({
      where: {
        id,
      },
    });
  }

  async create(data: Parameters<typeof prisma.patient.create>[0]["data"]) {
    return prisma.patient.create({
      data,
    });
  }

  async update(
    id: number,
    data: Parameters<typeof prisma.patient.update>[0]["data"]
  ) {
    return prisma.patient.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: number) {
    return prisma.patient.delete({
      where: {
        id,
      },
    });
  }
}

export const patientRepository = new PatientRepository();