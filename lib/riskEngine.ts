import type { Patient } from "@/types/patient";
import type { RiskLevel } from "@/types/risk";

export function calculateRiskScore(patient: Patient): number {
  let score = 100;

  if (!patient.medicationReconciled) {
    score -= 25;
  }

  if (!patient.followUpScheduled) {
    score -= 20;
  }

  if (patient.pendingTests) {
    score -= 20;
  }

  if (!patient.providerAssigned) {
    score -= 20;
  }

  if (!patient.dischargeInstructionsGiven) {
    score -= 15;
  }

  if (!patient.homeCareReferral) {
    score -= 10;
  }

  return Math.max(score, 0);
}

export function getRiskLevel(score: number): RiskLevel {
  if (score < 75) return "High Risk";
  if (score < 90) return "Medium Risk";
  return "Low Risk";
}