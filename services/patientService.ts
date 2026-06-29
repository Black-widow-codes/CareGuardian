import { mockPatients } from "@/data/mockPatients";

export function getPatients() {
  return mockPatients;
}

export function getPatientById(id: number) {
  return mockPatients.find((patient) => patient.id === id);
}