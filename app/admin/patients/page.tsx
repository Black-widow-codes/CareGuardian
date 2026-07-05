"use client";

import { toast } from "sonner";
import Link from "next/link";
import { useMemo, useState } from "react";
import { usePatients } from "@/hooks/usePatients";
import { getDischargeReadiness } from "@/lib/dischargeReadiness";

export default function AdminPatientsPage() {
  const { patients, setPatients, loading, error } = usePatients();

  const [search, setSearch] = useState("");
  const [riskFilter, setRiskFilter] = useState("All");
  const [readinessFilter, setReadinessFilter] = useState("All");

  const filteredPatients = useMemo(() => {
    return patients.filter((patient) => {
      const query = search.toLowerCase();
      const readiness = getDischargeReadiness(patient);

      const matchesSearch =
        patient.name.toLowerCase().includes(query) ||
        patient.diagnosis.toLowerCase().includes(query);

      const matchesRisk =
        riskFilter === "All" || patient.risk === riskFilter;

      const matchesReadiness =
        readinessFilter === "All" || readiness === readinessFilter;

      return matchesSearch && matchesRisk && matchesReadiness;
    });
  }, [patients, search, riskFilter, readinessFilter]);

  async function handleDelete(patientId: number, patientName: string) {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${patientName}?`
    );

    if (!confirmed) return;

    const response = await fetch(`/api/patients/${patientId}`, {
      method: "DELETE",
    });
    
    if (!response.ok) {
      toast.error("Failed to delete patient.");
      return;
    }
    
    setPatients((currentPatients) =>
      currentPatients.filter((patient) => patient.id !== patientId)
    );
    
    toast.success("Patient deleted successfully.");
  }
  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
              Administration
            </p>

            <h1 className="mt-2 text-4xl font-bold text-slate-900">
              Patient Management
            </h1>

            <p className="mt-2 text-slate-600">
              Create, edit and manage patient discharge records.
            </p>
          </div>

          <Link
            href="/admin/patients/new"
            className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            + New Patient
          </Link>
        </div>

        {error && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <input
            type="text"
            placeholder="Search by patient name or diagnosis..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="rounded-lg border border-slate-300 bg-white px-4 py-3 shadow-sm focus:border-blue-500 focus:outline-none"
          />

          <select
            value={riskFilter}
            onChange={(event) => setRiskFilter(event.target.value)}
            className="rounded-lg border border-slate-300 bg-white px-4 py-3 shadow-sm focus:border-blue-500 focus:outline-none"
          >
            <option value="All">All Risk Levels</option>
            <option value="High Risk">High Risk</option>
            <option value="Medium Risk">Medium Risk</option>
            <option value="Low Risk">Low Risk</option>
          </select>

          <select
            value={readinessFilter}
            onChange={(event) => setReadinessFilter(event.target.value)}
            className="rounded-lg border border-slate-300 bg-white px-4 py-3 shadow-sm focus:border-blue-500 focus:outline-none"
          >
            <option value="All">All Readiness Statuses</option>
            <option value="Ready for Discharge">Ready for Discharge</option>
            <option value="Ready with Actions Required">
              Ready with Actions Required
            </option>
            <option value="Not Ready for Discharge">
              Not Ready for Discharge
            </option>
          </select>
        </div>

        <div className="mt-8 overflow-hidden rounded-xl bg-white shadow">
          <table className="min-w-full">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-6 py-4 text-left">Name</th>
                <th className="px-6 py-4 text-left">Diagnosis</th>
                <th className="px-6 py-4 text-left">Risk</th>
                <th className="px-6 py-4 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center">
                    Loading...
                  </td>
                </tr>
              ) : filteredPatients.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-slate-500">
                    No patients found.
                  </td>
                </tr>
              ) : (
                filteredPatients.map((patient) => (
                  <tr key={patient.id} className="border-t border-slate-200">
                    <td className="px-6 py-4 font-medium">{patient.name}</td>

                    <td className="px-6 py-4">{patient.diagnosis}</td>

                    <td className="px-6 py-4">{patient.risk}</td>

                    <td className="space-x-3 px-6 py-4">
                      <Link
                        href={`/patients/${patient.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        View
                      </Link>

                      <Link
                        href={`/admin/patients/${patient.id}/edit`}
                        className="text-amber-600 hover:underline"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => handleDelete(patient.id, patient.name)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}