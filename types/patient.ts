import type { RiskLevel } from "./risk";

export type Patient = {
  id: number;

  // Patient identity
  mrn?: string | null;
  firstName?: string | null;
  middleName?: string | null;
  lastName?: string | null;
  preferredName?: string | null;

  // Temporary legacy field
  name: string;

  // Demographics
  dob: string;
  sexAtBirth?: string | null;
  genderIdentity?: string | null;
  pronouns?: string | null;

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

  // Current issue
  issue: string;

  // Risk
  score: number;
  risk: RiskLevel | string;
};
