"use client";

import { useState } from "react";

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
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-900">Patients</h1>

        <p className="mt-3 text-slate-600">
          Review patients awaiting discharge safety checks.
        </p>

        <section className="mt-10 bg-white rounded-xl shadow p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h2 className="text-2xl font-semibold text-slate-900">
              Patients Requiring Review
            </h2>

            <div className="w-full md:w-80">
              <PatientFilter value={filter} onChange={setFilter} />
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {filteredPatients.map((patient) => (
              <PatientCard key={patient.id} patient={patient} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}