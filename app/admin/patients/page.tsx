"use client";

import Link from "next/link";
import { usePatients } from "@/hooks/usePatients";

export default function AdminPatientsPage() {
  const { patients, loading, error } = usePatients();

  async function handleDelete(patientId: number, patientName: string) {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${patientName}?`
    );

    if (!confirmed) return;

    const response = await fetch(`/api/patients/${patientId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      alert("Failed to delete patient.");
      return;
    }

    window.location.reload();
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
              ) : (
                patients.map((patient) => (
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
                        onClick={() =>
                          handleDelete(patient.id, patient.name)
                        }
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