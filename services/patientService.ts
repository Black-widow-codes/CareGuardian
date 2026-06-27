import { mockPatients } from "@/data/mockPatients";
import type { Patient } from "@/types/patient";

export function getPatients(): Patient[] {
  return mockPatients;
}

export function getPatientById(id: number): Patient | undefined {
  return mockPatients.find((patient) => patient.id === id);
}