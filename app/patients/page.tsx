import PatientCard from "../components/PatientCard";
import { getPatients } from "@/services/patientService";

export default function PatientsPage() {
  const patients = getPatients();

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-900">Patients</h1>

        <p className="mt-3 text-slate-600">
          Review patients awaiting discharge safety checks.
        </p>

        <section className="mt-10 bg-white rounded-xl shadow p-6">
          <h2 className="text-2xl font-semibold text-slate-900">
            Patients Requiring Review
          </h2>

          <div className="mt-4 space-y-4">
            {patients.map((patient) => (
              <PatientCard key={patient.id} patient={patient} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}