import PageHeader from "@/app/components/PageHeader";
import PatientForm from "@/app/components/PatientForm";

export default function NewPatientPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <PageHeader
          label="Administration"
          title="Register Patient for Discharge Review"
          description="Enter patient information to begin discharge safety monitoring."
        />

        <section className="mt-8 rounded-2xl border border-border bg-surface p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-teal">
            Patient Registration
          </p>

          <h2 className="mt-1 text-2xl font-semibold text-brand-navy">
            Discharge Review Details
          </h2>

          <p className="mt-2 text-text-secondary">
            Complete the required patient and discharge safety information below.
          </p>

          <div className="mt-6">
            <PatientForm mode="create" />
          </div>
        </section>
      </div>
    </main>
  );
}
