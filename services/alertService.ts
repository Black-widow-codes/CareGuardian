import { mockAlerts } from "@/data/mockAlerts";
import type { Alert } from "@/types/alert";

export function getAlerts(): Alert[] {
  return mockAlerts;
}

export function getAlertsByPatientId(patientId: number): Alert[] {
  return mockAlerts.filter((alert) => alert.patientId === patientId);
}