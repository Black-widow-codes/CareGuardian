import type { Patient } from "@/types/patient";

export function getPatientDisplayName(patient: Patient): string {
  const structuredName = [
    patient.firstName,
    patient.middleName,
    patient.lastName,
  ]
    .map((part) => part?.trim())
    .filter(Boolean)
    .join(" ");

  return structuredName || patient.name;
}