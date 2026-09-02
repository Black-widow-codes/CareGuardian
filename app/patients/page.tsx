"use client";

import { useState } from "react";

import PageHeader from "../components/PageHeader";
import PatientCard from "../components/PatientCard";
import PatientFilter, {
  type PatientFilterValue,
} from "../components/PatientFilter";

import { usePatients } from "@/hooks/usePatients";
import { getDischargeReadiness } from "@/lib/dischargeReadiness";

export default function PatientsPage() {
  const [filter, setFilter] = useState<PatientFilterValue>("All");

  const { patients, loading, error } = usePatients();

  const filteredPatients =
    filter === "All"
      ? patients
      : patients.filter(
          (patient) => getDischargeReadiness(patient) === filter
        );

  return (
    <main className="min-h-screen bg-background px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <PageHeader
          label="CareGuardian"
          title="Patients Awaiting Discharge"
          description="Review patients, assess discharge readiness, and identify those requiring clinical action before discharge."
        />

        {error && (
          <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        <section className="mt-8 rounded-2xl border border-border bg-surface p-6 shadow-sm">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-teal">
                Patient Review
              </p>

              <h2 className="mt-1 text-2xl font-semibold text-brand-navy">
                Patient List
              </h2>

              <p className="mt-2 text-text-secondary">
                Filter patients by discharge readiness.
              </p>
            </div>

            <div className="w-full md:w-80">
              <PatientFilter value={filter} onChange={setFilter} />
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {loading ? (
              <div className="rounded-xl border border-dashed border-border-strong bg-surface-muted p-8 text-center text-text-muted">
                Loading patients...
              </div>
            ) : filteredPatients.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border-strong bg-surface-muted p-8 text-center text-text-muted">
                No patients match this filter.
              </div>
            ) : (
              filteredPatients.map((patient) => (
                <PatientCard key={patient.id} patient={patient} />
              ))
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
