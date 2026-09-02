"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import ConfirmDialog from "@/app/components/ConfirmDialog";
import { usePatients } from "@/hooks/usePatients";
import { hasPermission } from "@/lib/auth/permissions";
import { getDischargeReadiness } from "@/lib/dischargeReadiness";
import { getPatientDisplayName } from "@/lib/patientName";
import type { Patient } from "@/types/patient";

type AdminPatientsPageProps = {
  userRole: string;
};

export default function AdminPatientsPage({
  userRole,
}: AdminPatientsPageProps) {
  const { patients, setPatients, loading, error } = usePatients();

  const [search, setSearch] = useState("");
  const [riskFilter, setRiskFilter] = useState("All");
  const [readinessFilter, setReadinessFilter] = useState("All");
  const [patientToDelete, setPatientToDelete] = useState<Patient | null>(null);

  const filteredPatients = useMemo(() => {
    return patients.filter((patient) => {
      const query = search.toLowerCase();
      const readiness = getDischargeReadiness(patient);

      const matchesSearch =
  getPatientDisplayName(patient).toLowerCase().includes(query) ||
  patient.diagnosis.toLowerCase().includes(query);

      const matchesRisk =
        riskFilter === "All" || patient.risk === riskFilter;

      const matchesReadiness =
        readinessFilter === "All" || readiness === readinessFilter;

      return matchesSearch && matchesRisk && matchesReadiness;
    });
  }, [patients, search, riskFilter, readinessFilter]);

  async function handleDeleteConfirmed() {
    if (!patientToDelete) return;

    try {
      const response = await fetch(`/api/patients/${patientToDelete.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        toast.error("Failed to delete patient.");
        return;
      }

      setPatients((currentPatients) =>
        currentPatients.filter(
          (patient) => patient.id !== patientToDelete.id
        )
      );

      toast.success("Patient deleted successfully.");
      setPatientToDelete(null);
    } catch {
      toast.error("Something went wrong while deleting the patient.");
    }
  }

  const getRiskClass = (risk: string) => {
    if (risk === "High Risk") return "text-risk-high";
    if (risk === "Medium Risk") return "text-risk-medium";
    if (risk === "Low Risk") return "text-risk-low";
    return "text-text-secondary";
  };

  return (
    <main className="min-h-screen bg-background px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <section className="rounded-2xl bg-brand-navy px-8 py-10 text-white shadow-sm">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-cyan-300">
                Administration
              </p>

              <h1 className="mt-2 text-4xl font-bold">
                Patient Management
              </h1>

              <p className="mt-3 max-w-2xl text-white/75">
                Create, edit, review, and manage patient discharge records based
                on your assigned permissions.
              </p>
            </div>

            {hasPermission(userRole, "CREATE_PATIENT") && (
              <Link
                href="/admin/patients/new"
                className="rounded-lg bg-brand-teal px-5 py-3 font-semibold text-white transition hover:bg-brand-teal-hover"
              >
                New Patient
              </Link>
            )}
          </div>
        </section>

        {error && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        <section className="mt-8 rounded-2xl border border-border bg-surface p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-teal">
            Patient Records
          </p>

          <h2 className="mt-1 text-2xl font-semibold text-brand-navy">
            Manage Patients
          </h2>

          <p className="mt-2 text-text-secondary">
            Search, filter, and manage discharge records according to your role.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <input
              type="text"
              placeholder="Search by patient name or diagnosis..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="rounded-lg border border-border-strong bg-surface px-4 py-3 text-brand-navy shadow-sm outline-none transition placeholder:text-text-muted focus:border-brand-teal"
            />

            <select
              value={riskFilter}
              onChange={(event) => setRiskFilter(event.target.value)}
              className="rounded-lg border border-border-strong bg-surface px-4 py-3 text-brand-navy shadow-sm outline-none transition focus:border-brand-teal"
            >
              <option value="All">All Risk Levels</option>
              <option value="High Risk">High Risk</option>
              <option value="Medium Risk">Medium Risk</option>
              <option value="Low Risk">Low Risk</option>
            </select>

            <select
              value={readinessFilter}
              onChange={(event) => setReadinessFilter(event.target.value)}
              className="rounded-lg border border-border-strong bg-surface px-4 py-3 text-brand-navy shadow-sm outline-none transition focus:border-brand-teal"
            >
              <option value="All">All Readiness Statuses</option>
              <option value="Ready for Discharge">
                Ready for Discharge
              </option>
              <option value="Ready with Actions Required">
                Ready with Actions Required
              </option>
              <option value="Not Ready for Discharge">
                Not Ready for Discharge
              </option>
            </select>
          </div>

          <div className="mt-8 overflow-hidden rounded-xl border border-border">
            <table className="min-w-full bg-surface">
              <thead className="bg-surface-muted">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-brand-navy">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-brand-navy">
                    Diagnosis
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-brand-navy">
                    Risk
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-brand-navy">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="p-8 text-center text-text-muted"
                    >
                      Loading...
                    </td>
                  </tr>
                ) : filteredPatients.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="p-8 text-center text-text-muted"
                    >
                      No patients found.
                    </td>
                  </tr>
                ) : (
                  filteredPatients.map((patient) => (
                    <tr
                      key={patient.id}
                      className="border-t border-border transition hover:bg-brand-teal-light"
                    >
                      <td className="px-6 py-4 font-medium text-brand-navy">
                      {getPatientDisplayName(patient)}
                      </td>

                      <td className="px-6 py-4 text-text-secondary">
                        {patient.diagnosis}
                      </td>

                      <td className={`px-6 py-4 font-semibold ${getRiskClass(patient.risk)}`}>
                        {patient.risk}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-4">
                          <Link
                            href={`/patients/${patient.id}`}
                            className="font-medium text-brand-teal hover:underline"
                          >
                            View
                          </Link>

                          {hasPermission(userRole, "EDIT_PATIENT") && (
                            <Link
                              href={`/admin/patients/${patient.id}/edit`}
                              className="font-medium text-risk-medium hover:underline"
                            >
                              Edit
                            </Link>
                          )}

                          {hasPermission(userRole, "DELETE_PATIENT") && (
                            <button
                              type="button"
                              onClick={() => setPatientToDelete(patient)}
                              className="font-medium text-risk-high hover:underline"
                            >
                              Delete
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      <ConfirmDialog
        isOpen={patientToDelete !== null}
        title="Delete Patient"
        message={
          patientToDelete
            ? `Are you sure you want to delete ${getPatientDisplayName(
                patientToDelete
              )}? This action cannot be undone.`
            : ""
        }
        confirmText="Delete Patient"
        cancelText="Cancel"
        onConfirm={handleDeleteConfirmed}
        onCancel={() => setPatientToDelete(null)}
      />
    </main>
  );
}
