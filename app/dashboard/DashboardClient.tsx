"use client";

import { useState } from "react";

import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";
import PatientCard from "../components/PatientCard";
import PatientFilter, {
  type PatientFilterValue,
} from "../components/PatientFilter";

import { usePatients } from "@/hooks/usePatients";
import { calculateRiskScore, getRiskLevel } from "@/lib/riskEngine";
import { getDischargeReadiness } from "@/lib/dischargeReadiness";

export default function DashboardClient() {
  const [filter, setFilter] = useState<PatientFilterValue>("All");
  const { patients, loading, error } = usePatients();

  const filteredPatients =
    filter === "All"
      ? patients
      : patients.filter(
          (patient) => getDischargeReadiness(patient) === filter
        );

  const highRisk = patients.filter(
    (patient) => getRiskLevel(calculateRiskScore(patient)) === "High Risk"
  ).length;

  const mediumRisk = patients.filter(
    (patient) => getRiskLevel(calculateRiskScore(patient)) === "Medium Risk"
  ).length;

  const lowRisk = patients.filter(
    (patient) => getRiskLevel(calculateRiskScore(patient)) === "Low Risk"
  ).length;

  const ready = patients.filter(
    (patient) => getDischargeReadiness(patient) === "Ready for Discharge"
  ).length;

  const actionsRequired = patients.filter(
    (patient) =>
      getDischargeReadiness(patient) === "Ready with Actions Required"
  ).length;

  const notReady = patients.filter(
    (patient) => getDischargeReadiness(patient) === "Not Ready for Discharge"
  ).length;

  return (
    <main className="min-h-screen bg-background px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <PageHeader
          label="CareGuardian Discharge Safety Monitor"
          title="Patient Safety Dashboard"
          description="Monitor discharge readiness, identify high-risk patients, and focus clinical attention on patients requiring action before discharge."
        />

        {error && (
          <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        <section className="mt-8">
          <div className="mb-4">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-teal">
              Clinical Risk
            </p>

            <h2 className="mt-1 text-xl font-semibold text-brand-navy">
              Risk Overview
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-4">
            <StatCard
              label="Awaiting Discharge"
              value={patients.length}
              color="text-brand-navy"
            />

            <StatCard
              label="High Risk"
              value={highRisk}
              color="text-risk-high"
            />

            <StatCard
              label="Medium Risk"
              value={mediumRisk}
              color="text-risk-medium"
            />

            <StatCard
              label="Low Risk"
              value={lowRisk}
              color="text-risk-low"
            />
          </div>
        </section>

        <section className="mt-10">
          <div className="mb-4">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-teal">
              Discharge Status
            </p>

            <h2 className="mt-1 text-xl font-semibold text-brand-navy">
              Discharge Readiness
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <StatCard
              label="Ready for Discharge"
              value={ready}
              color="text-risk-low"
            />

            <StatCard
              label="Actions Required"
              value={actionsRequired}
              color="text-risk-medium"
            />

            <StatCard
              label="Not Ready"
              value={notReady}
              color="text-risk-high"
            />
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-border bg-surface p-6 shadow-sm">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-teal">
                Clinical Review
              </p>

              <h2 className="mt-1 text-2xl font-semibold text-brand-navy">
                Patients Requiring Review
              </h2>

              <p className="mt-2 text-text-secondary">
                Use the readiness filter to focus on patients requiring
                discharge action.
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
