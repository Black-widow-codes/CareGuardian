import type { Patient } from "@/types/patient";

export async function fetchPatients(): Promise<Patient[]> {
  const response = await fetch("/api/patients");

  if (!response.ok) {
    throw new Error("Failed to fetch patients");
  }

  return response.json();
}