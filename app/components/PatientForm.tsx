"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Patient } from "@/types/patient";

interface PatientFormProps {
  mode: "create" | "edit";
  patient?: Patient;
}

export default function PatientForm({
  mode,
  patient,
}: PatientFormProps) {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: patient?.name ?? "",
    dob: patient?.dob ?? "",
    diagnosis: patient?.diagnosis ?? "",
    dischargeDate: patient?.dischargeDate ?? "",
    medicationReconciled: patient?.medicationReconciled ?? false,
    followUpScheduled: patient?.followUpScheduled ?? false,
    pendingTests: patient?.pendingTests ?? false,
    providerAssigned: patient?.providerAssigned ?? false,
    dischargeInstructionsGiven:
      patient?.dischargeInstructionsGiven ?? false,
    homeCareReferral: patient?.homeCareReferral ?? false,
    issue: patient?.issue ?? "",
    score: patient?.score ?? 80,
    risk: patient?.risk ?? "Medium Risk",
  });

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value, type } = event.target;

    const checked =
      type === "checkbox"
        ? (event.target as HTMLInputElement).checked
        : undefined;

    setFormData((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    setIsSubmitting(true);

    try {
      const url =
        mode === "create"
          ? "/api/patients"
          : `/api/patients/${patient?.id}`;

      const method =
        mode === "create"
          ? "POST"
          : "PUT";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        alert(
          mode === "create"
            ? "Failed to create patient."
            : "Failed to update patient."
        );
        return;
      }

      router.push("/admin/patients");
      router.refresh();
    } catch (error) {
      console.error(error);

      alert(
        mode === "create"
          ? "Something went wrong while creating the patient."
          : "Something went wrong while updating the patient."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <input
          name="name"
          placeholder="Patient name"
          value={formData.name}
          onChange={handleChange}
          className="rounded-lg border p-3"
          required
        />

        <input
          name="dob"
          type="date"
          value={formData.dob}
          onChange={handleChange}
          className="rounded-lg border p-3"
          required
        />

        <input
          name="diagnosis"
          placeholder="Diagnosis"
          value={formData.diagnosis}
          onChange={handleChange}
          className="rounded-lg border p-3"
          required
        />

        <input
          name="dischargeDate"
          type="date"
          value={formData.dischargeDate}
          onChange={handleChange}
          className="rounded-lg border p-3"
          required
        />

        <input
          name="issue"
          placeholder="Main issue"
          value={formData.issue}
          onChange={handleChange}
          className="rounded-lg border p-3 md:col-span-2"
          required
        />
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {[
          ["medicationReconciled", "Medication Reconciled"],
          ["followUpScheduled", "Follow-up Scheduled"],
          ["pendingTests", "Pending Tests"],
          ["providerAssigned", "Provider Assigned"],
          ["dischargeInstructionsGiven", "Discharge Instructions Given"],
          ["homeCareReferral", "Home Care Referral"],
        ].map(([name, label]) => (
          <label
            key={name}
            className="flex items-center gap-3 rounded-lg border p-3"
          >
            <input
              type="checkbox"
              name={name}
              checked={formData[name as keyof typeof formData] as boolean}
              onChange={handleChange}
            />
            {label}
          </label>
        ))}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting
          ? mode === "create"
            ? "Creating Patient..."
            : "Updating Patient..."
          : mode === "create"
            ? "Create Patient"
            : "Update Patient"}
      </button>
    </form>
  );
}