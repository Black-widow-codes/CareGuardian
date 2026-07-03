import type { Alert } from "@/types/alert";

export async function fetchAlerts(): Promise<Alert[]> {
  const response = await fetch("/api/alerts");

  if (!response.ok) {
    throw new Error("Failed to fetch alerts");
  }

  return response.json();
}