import type { Patient } from "@/types/patient";

export type RiskFactor = {
  label: string;
  recommendation: string;
};

export function getRiskFactors(patient: Patient): RiskFactor[] {
  const factors: RiskFactor[] = [];

  if (!patient.medicationReconciled) {
    factors.push({
      label: "❌ Medication reconciliation incomplete",
      recommendation: "Complete medication reconciliation before discharge.",
    });
  }

  if (!patient.followUpScheduled) {
    factors.push({
      label: "❌ Follow-up appointment not scheduled",
      recommendation: "Schedule a follow-up appointment.",
    });
  }

  if (patient.pendingTests) {
    factors.push({
      label: "⚠ Pending tests require follow-up",
      recommendation: "Assign a provider to review pending test results.",
    });
  }

  if (!patient.providerAssigned) {
    factors.push({
      label: "❌ No responsible provider assigned",
      recommendation: "Assign a responsible provider.",
    });
  }

  if (!patient.dischargeInstructionsGiven) {
    factors.push({
      label: "❌ Discharge instructions not provided",
      recommendation: "Provide discharge instructions to the patient.",
    });
  }

  if (!patient.homeCareReferral) {
    factors.push({
      label: "⚠ Home care referral not completed",
      recommendation: "Arrange a home care referral if appropriate.",
    });
  }

  return factors;
}