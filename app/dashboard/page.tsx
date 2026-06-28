"use client";

import { useState } from "react";

import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";
import PatientCard from "../components/PatientCard";
import PatientFilter, {
  type PatientFilterValue,
} from "../components/PatientFilter";

import { getPatients } from "@/services/patientService";
import { calculateRiskScore, getRiskLevel } from "@/lib/riskEngine";
import { getDischargeReadiness } from "@/lib/dischargeReadiness";

export default function DashboardPage() {
  const [filter, setFilter] = useState<PatientFilterValue>("All");

  const patients = getPatients();

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
    <main className="min-h-screen bg-slate-100 px-6 py-10">
      <div className="mx-auto max-w-7xl">

        <PageHeader
          label="CareGuardian Discharge Safety Monitor"
          title="Patient Safety Dashboard"
          description="Monitor discharge readiness, identify high-risk patients, and focus clinical attention on patients requiring action before discharge."
        />

        <section className="mt-8">
          <h2 className="text-xl font-semibold text-slate-900">
            Risk Overview
          </h2>

          <div className="mt-4 grid gap-6 md:grid-cols-4">
            <StatCard label="Awaiting Discharge" value={patients.length} />
            <StatCard
              label="High Risk"
              value={highRisk}
              color="text-red-600"
            />
            <StatCard
              label="Medium Risk"
              value={mediumRisk}
              color="text-yellow-600"
            />
            <StatCard
              label="Low Risk"
              value={lowRisk}
              color="text-green-600"
            />
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-semibold text-slate-900">
            Discharge Readiness
          </h2>

          <div className="mt-4 grid gap-6 md:grid-cols-3">
            <StatCard
              label="Ready for Discharge"
              value={ready}
              color="text-green-600"
            />
            <StatCard
              label="Actions Required"
              value={actionsRequired}
              color="text-yellow-600"
            />
            <StatCard
              label="Not Ready"
              value={notReady}
              color="text-red-600"
            />
          </div>
        </section>

        <section className="mt-8 rounded-2xl bg-white p-6 shadow">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">
                Patients Requiring Review
              </h2>

              <p className="mt-2 text-slate-600">
                Use the readiness filter to focus on patients requiring discharge action.
              </p>
            </div>

            <div className="w-full md:w-80">
              <PatientFilter value={filter} onChange={setFilter} />
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {filteredPatients.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-slate-500">
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