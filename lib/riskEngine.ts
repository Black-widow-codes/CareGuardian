import type { Patient } from "@/types/patient";
import type { RiskLevel } from "@/types/risk";

export function calculateRiskScore(patient: Patient): number {
  let score = 100;

  if (patient.issue.toLowerCase().includes("follow-up")) {
    score -= 25;
  }

  if (patient.issue.toLowerCase().includes("test")) {
    score -= 20;
  }

  if (patient.issue.toLowerCase().includes("medication")) {
    score -= 25;
  }

  return score;
}

export function getRiskLevel(score: number): RiskLevel {
  if (score < 75) return "High Risk";
  if (score < 90) return "Medium Risk";
  return "Low Risk";
}