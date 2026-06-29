"use client";

import { useEffect, useState } from "react";
import type { Patient } from "@/types/patient";
import { fetchPatients } from "@/lib/api/patientApi";

export function usePatients() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPatients() {
      try {
        const data = await fetchPatients();
        setPatients(data);
      } catch {
        setError("Unable to load patients.");
      } finally {
        setLoading(false);
      }
    }

    loadPatients();
  }, []);

  return {
    patients,
    loading,
    error,
  };
}