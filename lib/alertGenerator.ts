import { getPatientDisplayName } from "@/lib/patientName";
import type { Patient } from "@/types/patient";
import type { Alert } from "@/types/alert";
import { getRiskFactors } from "@/lib/riskFactors";

export function generateAlertsForPatient(patient: Patient): Alert[] {
  const riskFactors = getRiskFactors(patient);

  return riskFactors.map((factor, index) => ({
    id: patient.id * 100 + index + 1,
    type: factor.label,
    patientId: patient.id,
    patient: getPatientDisplayName(patient),
    recommendation: factor.recommendation,
    severity: factor.severity,
    status: "Open",
  }));
}

export function generateAlertsForPatients(patients: Patient[]): Alert[] {
  return patients.flatMap((patient) => generateAlertsForPatient(patient));
}