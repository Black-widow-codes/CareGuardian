"use client";

import { useState } from "react";

import PageHeader from "../components/PageHeader";
import PatientCard from "../components/PatientCard";
import PatientFilter, {
  type PatientFilterValue,
} from "../components/PatientFilter";

import { getPatients } from "@/services/patientService";
import { getDischargeReadiness } from "@/lib/dischargeReadiness";

export default function PatientsPage() {
  const [filter, setFilter] = useState<PatientFilterValue>("All");

  const patients = getPatients();

  const filteredPatients =
    filter === "All"
      ? patients
      : patients.filter(
          (patient) => getDischargeReadiness(patient) === filter
        );

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <PageHeader
          label="CareGuardian"
          title="Patients Awaiting Discharge"
          description="Review patients, assess discharge readiness, and identify those requiring clinical action before discharge."
        />

        <section className="mt-8 rounded-2xl bg-white p-6 shadow">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">
                Patient List
              </h2>

              <p className="mt-2 text-slate-600">
                Filter patients by discharge readiness.
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