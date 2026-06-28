import type { Alert } from "@/types/alert";
import { getPatients } from "@/services/patientService";
import { generateAlertsForPatients } from "@/lib/alertGenerator";

export function getAlerts(): Alert[] {
  const patients = getPatients();
  return generateAlertsForPatients(patients);
}

export function getAlertsByPatientId(patientId: number): Alert[] {
  return getAlerts().filter((alert) => alert.patientId === patientId);
}