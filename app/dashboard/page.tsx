import Link from "next/link";
import { calculateRiskScore, getRiskLevel } from "@/lib/riskEngine";
import { mockPatients } from "@/data/mockPatients";

export default function DashboardPage() {
  const highRisk = mockPatients.filter(
    (patient) => patient.risk === "High Risk"
  ).length;

  const mediumRisk = mockPatients.filter(
    (patient) => patient.risk === "Medium Risk"
  ).length;

  const lowRisk = mockPatients.filter(
    (patient) => patient.risk === "Low Risk"
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
          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-slate-500">Awaiting Discharge</p>
            <p className="text-3xl font-bold mt-2">{mockPatients.length}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-slate-500">High Risk</p>
            <p className="text-3xl font-bold mt-2 text-red-600">{highRisk}</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-slate-500">Medium Risk</p>
            <p className="text-3xl font-bold mt-2 text-yellow-600">
              {mediumRisk}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-slate-500">Low Risk</p>
            <p className="text-3xl font-bold mt-2 text-green-600">{lowRisk}</p>
          </div>
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
              <Link
              href={`/patients/${patient.id}`}
              key={patient.id}
              className="border rounded-lg p-4 flex justify-between items-center hover:bg-slate-50">
                <div>
                  <p className="font-semibold">{patient.name}</p>
                  <p className="text-sm text-slate-600">{patient.issue}</p>
                </div>

                <span className="font-semibold text-red-600">
                {getRiskLevel(calculateRiskScore(patient))}
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}