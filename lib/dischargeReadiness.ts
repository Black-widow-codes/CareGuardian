import type { Patient } from "@/types/patient";
import { calculateRiskScore } from "@/lib/riskEngine";
import { getRiskFactors } from "@/lib/riskFactors";

export type DischargeReadinessStatus =
  | "Ready for Discharge"
  | "Ready with Actions Required"
  | "Not Ready for Discharge";

export function getDischargeReadiness(patient: Patient): DischargeReadinessStatus {
  const score = calculateRiskScore(patient);
  const riskFactors = getRiskFactors(patient);

  const hasCriticalRisk =
    !patient.medicationReconciled ||
    !patient.providerAssigned ||
    !patient.dischargeInstructionsGiven;

  if (score < 70 || hasCriticalRisk) {
    return "Not Ready for Discharge";
  }

  if (riskFactors.length > 0) {
    return "Ready with Actions Required";
  }

  return "Ready for Discharge";
}