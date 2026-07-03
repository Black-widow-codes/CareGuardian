import PageHeader from "@/app/components/PageHeader";
import PatientForm from "@/app/components/PatientForm";

export default function NewPatientPage() {
  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <PageHeader
          label="Administration"
          title="Register Patient for Discharge Review"
          description="Enter patient information to begin discharge safety monitoring."
        />

        <section className="mt-8 rounded-2xl bg-white p-6 shadow">
        <PatientForm mode="create" />
        </section>
      </div>
    </main>
  );
}