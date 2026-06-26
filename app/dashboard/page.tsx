import StatCard from "../components/StatCard";
import PatientCard from "../components/PatientCard";

import { mockPatients } from "@/data/mockPatients";
import { calculateRiskScore, getRiskLevel } from "@/lib/riskEngine";

export default function DashboardPage() {
  const highRisk = mockPatients.filter(
    (patient) =>
      getRiskLevel(calculateRiskScore(patient)) === "High Risk"
  ).length;

  const mediumRisk = mockPatients.filter(
    (patient) =>
      getRiskLevel(calculateRiskScore(patient)) === "Medium Risk"
  ).length;

  const lowRisk = mockPatients.filter(
    (patient) =>
      getRiskLevel(calculateRiskScore(patient)) === "Low Risk"
  ).length;

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-900">
          CareGuardian Dashboard
        </h1>

        <p className="mt-3 text-slate-600">
          Monitor discharge safety risks and patients requiring review.
        </p>

        <section className="grid md:grid-cols-4 gap-6 mt-10">
          <StatCard
            label="Awaiting Discharge"
            value={mockPatients.length}
          />

          <StatCard
            label="High Risk"
            value={highRisk}
            color="text-red-600"
          />

          <StatCard
            label="Medium Risk"
            value={mediumRisk}
            color="text-yellow-600"
          />

          <StatCard
            label="Low Risk"
            value={lowRisk}
            color="text-green-600"
          />
        </section>

        <section className="mt-10 bg-white rounded-xl shadow p-6">
          <h2 className="text-2xl font-semibold text-slate-900">
            Recent Alerts
          </h2>

          <ul className="mt-4 space-y-3 text-slate-700">
            <li>⚠ Missing Follow-Up Appointment</li>
            <li>⚠ Pending Test Result</li>
            <li>⚠ Missing Medication Information</li>
          </ul>
        </section>

        <section className="mt-10 bg-white rounded-xl shadow p-6">
          <h2 className="text-2xl font-semibold text-slate-900">
            Patients Requiring Review
          </h2>

          <div className="mt-4 space-y-4">
            {mockPatients.map((patient) => (
              <PatientCard
                key={patient.id}
                patient={patient}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}