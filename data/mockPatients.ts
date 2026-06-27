import type { Patient } from "@/types/patient";

export const mockPatients: Patient[] = [
  {
    id: 1,
    name: "John Smith",
    dob: "1980-04-15",
    diagnosis: "Pneumonia",
    dischargeDate: "2026-06-15",

    medicationReconciled: true,
    followUpScheduled: false,
    pendingTests: true,
    providerAssigned: true,
    dischargeInstructionsGiven: true,
    homeCareReferral: false,

    issue: "Missing follow-up plan",
    score: 72,
    risk: "High Risk",
  },

  {
    id: 2,
    name: "Mary Johnson",
    dob: "1975-09-22",
    diagnosis: "Heart Failure",
    dischargeDate: "2026-06-16",

    medicationReconciled: true,
    followUpScheduled: true,
    pendingTests: false,
    providerAssigned: true,
    dischargeInstructionsGiven: true,
    homeCareReferral: true,

    issue: "Pending test result",
    score: 91,
    risk: "Low Risk",
  },

  {
    id: 3,
    name: "David Lee",
    dob: "1990-02-10",
    diagnosis: "Diabetes",
    dischargeDate: "2026-06-17",

    medicationReconciled: false,
    followUpScheduled: false,
    pendingTests: true,
    providerAssigned: false,
    dischargeInstructionsGiven: false,
    homeCareReferral: false,

    issue: "Missing medication information",
    score: 58,
    risk: "High Risk",
  },
];