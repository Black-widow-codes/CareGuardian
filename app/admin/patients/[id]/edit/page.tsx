import PageHeader from "@/app/components/PageHeader";
import PatientForm from "@/app/components/PatientForm";
import { patientRepository } from "@/repositories/patientRepository";

export default async function EditPatientPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const patient = await patientRepository.findById(Number(id));

  if (!patient) {
    return (
      <main className="min-h-screen bg-slate-100 px-6 py-10">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-3xl font-bold text-slate-900">
            Patient not found
          </h1>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <PageHeader
          label="Administration"
          title="Edit Patient Record"
          description="Update patient discharge safety information."
        />

        <section className="mt-8 rounded-2xl bg-white p-6 shadow">
          <PatientForm mode="edit" patient={patient} />
        </section>
      </div>
    </main>
  );
}