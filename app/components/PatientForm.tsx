"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Patient } from "@/types/patient";

interface PatientFormProps {
  mode: "create" | "edit";
  patient?: Patient;
}

function getLegacyNameParts(patient?: Patient) {
  if (!patient) {
    return {
      firstName: "",
      lastName: "",
    };
  }

  if (patient.firstName || patient.lastName) {
    return {
      firstName: patient.firstName ?? "",
      lastName: patient.lastName ?? "",
    };
  }

  const parts = patient.name.trim().split(/\s+/);

  if (parts.length === 2) {
    return {
      firstName: parts[0],
      lastName: parts[1],
    };
  }

  return {
    firstName: patient.name,
    lastName: "",
  };
}

export default function PatientForm({
  mode,
  patient,
}: PatientFormProps) {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const legacyNameParts = getLegacyNameParts(patient);

  const [formData, setFormData] = useState({
    mrn: patient?.mrn ?? "",
    firstName: legacyNameParts.firstName,
    middleName: patient?.middleName ?? "",
    lastName: legacyNameParts.lastName,
    preferredName: patient?.preferredName ?? "",

    dob: patient?.dob ?? "",

    diagnosis: patient?.diagnosis ?? "",
    dischargeDate: patient?.dischargeDate ?? "",
    issue: patient?.issue ?? "",

    medicationReconciled: patient?.medicationReconciled ?? false,
    followUpScheduled: patient?.followUpScheduled ?? false,
    pendingTests: patient?.pendingTests ?? false,
    providerAssigned: patient?.providerAssigned ?? false,
    dischargeInstructionsGiven:
      patient?.dischargeInstructionsGiven ?? false,
    homeCareReferral: patient?.homeCareReferral ?? false,

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

      const method = mode === "create" ? "POST" : "PUT";

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

  const fieldClass =
    "w-full rounded-lg border border-border-strong bg-surface px-4 py-3 text-brand-navy outline-none transition placeholder:text-text-muted focus:border-brand-teal";

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <section>
        <h3 className="text-lg font-semibold text-brand-navy">
          Patient Identity
        </h3>

        <p className="mt-1 text-sm text-text-secondary">
          Enter the patient&apos;s identifying information for this discharge
          safety review.
        </p>

        <div className="mt-4 grid gap-5 md:grid-cols-2">
          <label className="space-y-2 md:col-span-2">
            <span className="text-sm font-medium text-text-secondary">
              Medical Record Number (MRN)
            </span>

            <input
              name="mrn"
              placeholder="Enter medical record number"
              value={formData.mrn}
              onChange={handleChange}
              className={fieldClass}
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-text-secondary">
              First Name
            </span>

            <input
              name="firstName"
              placeholder="Enter first name"
              value={formData.firstName}
              onChange={handleChange}
              className={fieldClass}
              required
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-text-secondary">
              Middle Name
            </span>

            <input
              name="middleName"
              placeholder="Enter middle name"
              value={formData.middleName}
              onChange={handleChange}
              className={fieldClass}
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-text-secondary">
              Last Name
            </span>

            <input
              name="lastName"
              placeholder="Enter last name"
              value={formData.lastName}
              onChange={handleChange}
              className={fieldClass}
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-text-secondary">
              Preferred Name
            </span>

            <input
              name="preferredName"
              placeholder="Enter preferred name"
              value={formData.preferredName}
              onChange={handleChange}
              className={fieldClass}
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-text-secondary">
              Date of Birth
            </span>

            <input
              name="dob"
              type="date"
              value={formData.dob}
              onChange={handleChange}
              className={fieldClass}
              required
            />
          </label>
        </div>
      </section>

      <section className="border-t border-border pt-8">
        <h3 className="text-lg font-semibold text-brand-navy">
          Discharge Review
        </h3>

        <p className="mt-1 text-sm text-text-secondary">
          Record the clinical information relevant to the current discharge
          review.
        </p>

        <div className="mt-4 grid gap-5 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-medium text-text-secondary">
              Diagnosis
            </span>

            <input
              name="diagnosis"
              placeholder="Enter diagnosis"
              value={formData.diagnosis}
              onChange={handleChange}
              className={fieldClass}
              required
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-text-secondary">
              Planned Discharge Date
            </span>

            <input
              name="dischargeDate"
              type="date"
              value={formData.dischargeDate}
              onChange={handleChange}
              className={fieldClass}
              required
            />
          </label>

          <label className="space-y-2 md:col-span-2">
            <span className="text-sm font-medium text-text-secondary">
              Main Discharge Concern / Issue
            </span>

            <input
              name="issue"
              placeholder="Enter the main discharge concern or issue"
              value={formData.issue}
              onChange={handleChange}
              className={fieldClass}
              required
            />
          </label>
        </div>
      </section>

      <section className="border-t border-border pt-8">
        <h3 className="text-lg font-semibold text-brand-navy">
          Discharge Safety Requirements
        </h3>

        <p className="mt-1 text-sm text-text-secondary">
          Select each requirement that has been completed or applies to the
          patient&apos;s current discharge review.
        </p>

        <div className="mt-4 grid gap-3 md:grid-cols-2">
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
              className="flex cursor-pointer items-center gap-3 rounded-lg border border-border bg-surface-muted px-4 py-3 text-brand-navy transition hover:bg-brand-teal-light"
            >
              <input
                type="checkbox"
                name={name}
                checked={formData[name as keyof typeof formData] as boolean}
                onChange={handleChange}
                className="h-4 w-4 accent-[var(--cg-teal)]"
              />

              <span className="font-medium">{label}</span>
            </label>
          ))}
        </div>
      </section>

      <div className="flex flex-wrap gap-3 border-t border-border pt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-brand-teal px-5 py-3 font-semibold text-white transition hover:bg-brand-teal-hover disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting
            ? mode === "create"
              ? "Creating Patient..."
              : "Updating Patient..."
            : mode === "create"
              ? "Create Patient"
              : "Update Patient"}
        </button>

        <button
          type="button"
          onClick={() => router.push("/admin/patients")}
          className="rounded-lg border border-border-strong bg-surface px-5 py-3 font-semibold text-brand-navy transition hover:bg-brand-teal-light"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}