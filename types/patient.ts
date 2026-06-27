import type { RiskLevel } from "./risk";

export type Patient = {
  id: number;

  // Demographics
  name: string;
  dob: string;

  // Clinical
  diagnosis: string;

  // Discharge
  dischargeDate: string;

  // Safety Checklist
  medicationReconciled: boolean;
  followUpScheduled: boolean;
  pendingTests: boolean;
  providerAssigned: boolean;
  dischargeInstructionsGiven: boolean;
  homeCareReferral: boolean;

  // Current issue (temporary)
  issue: string;

  // Risk
  score: number;
  risk: RiskLevel;
};