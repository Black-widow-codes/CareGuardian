import type { Patient } from "@/types/patient";

export type RiskFactor = {
  label: string;
  recommendation: string;
  severity: "High" | "Medium";
};

export function getRiskFactors(patient: Patient): RiskFactor[] {
  const factors: RiskFactor[] = [];

  if (!patient.medicationReconciled) {
    factors.push({
      label: "Medication reconciliation incomplete",
      recommendation: "Complete medication reconciliation before discharge.",
      severity: "High",
    });
  }

  if (!patient.followUpScheduled) {
    factors.push({
      label: "Follow-up appointment not scheduled",
      recommendation: "Schedule a follow-up appointment.",
      severity: "High",
    });
  }

  if (patient.pendingTests) {
    factors.push({
      label: "Pending tests require follow-up",
      recommendation: "Assign a provider to review pending test results.",
      severity: "Medium",
    });
  }

  if (!patient.providerAssigned) {
    factors.push({
      label: "No responsible provider assigned",
      recommendation: "Assign a responsible provider.",
      severity: "High",
    });
  }

  if (!patient.dischargeInstructionsGiven) {
    factors.push({
      label: "Discharge instructions not provided",
      recommendation: "Provide discharge instructions to the patient.",
      severity: "High",
    });
  }

  if (!patient.homeCareReferral) {
    factors.push({
      label: "Home care referral not completed",
      recommendation: "Arrange a home care referral if appropriate.",
      severity: "Medium",
    });
  }

  return factors;
}