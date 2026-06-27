import { getPatientById } from "@/services/patientService";
import { calculateRiskScore, getRiskLevel } from "@/lib/riskEngine";

export default async function PatientDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const patient = getPatientById(Number(id));

  if (!patient) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-10">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-slate-900">
            Patient not found
          </h1>
        </div>
      </main>
    );
  }

  const score = calculateRiskScore(patient);
  const riskLevel = getRiskLevel(score);

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-900">
          Patient Discharge Review
        </h1>

        <section className="mt-10 bg-white rounded-xl shadow p-6">
          <h2 className="text-2xl font-semibold">{patient.name}</h2>
          <p className="text-slate-600 mt-1">DOB: {patient.dob}</p>
          <p className="text-slate-600">Diagnosis: {patient.diagnosis}</p>
          <p className="text-slate-600">
            Discharge Date: {patient.dischargeDate}
          </p>
        </section>

        <section className="mt-8 bg-white rounded-xl shadow p-6">
          <h2 className="text-2xl font-semibold">Discharge Checklist</h2>

          <ul className="mt-5 space-y-3 text-slate-700">
            <li>✓ Diagnosis Present</li>
            <li>✓ Medication List Present</li>
            <li>⚠ Follow-Up Appointment Missing</li>
            <li>⚠ Pending Test Ownership Missing</li>
            <li>✓ Assigned Provider Present</li>
          </ul>
        </section>

        <section className="mt-8 bg-white rounded-xl shadow p-6">
          <h2 className="text-2xl font-semibold">Safety Score</h2>

          <p className="mt-4 text-4xl font-bold text-yellow-600">
            {score} / 100
          </p>

          <p className="mt-2 text-slate-700">Risk Level: {riskLevel}</p>
        </section>
      </div>
    </main>
  );
}