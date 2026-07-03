"use client";

import { useEffect, useState } from "react";
import type { Alert } from "@/types/alert";
import { fetchAlerts } from "@/lib/api/alertApi";

export function useAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadAlerts() {
      try {
        const data = await fetchAlerts();
        setAlerts(data);
      } catch {
        setError("Unable to load alerts.");
      } finally {
        setLoading(false);
      }
    }

    loadAlerts();
  }, []);

  return {
    alerts,
    loading,
    error,
  };
}