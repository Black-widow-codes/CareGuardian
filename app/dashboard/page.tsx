import StatCard from "../components/StatCard";
import PatientCard from "../components/PatientCard";

import { getPatients } from "@/services/patientService";
import { calculateRiskScore, getRiskLevel } from "@/lib/riskEngine";
import { getDischargeReadiness } from "@/lib/dischargeReadiness";

export default function DashboardPage() {
  const patients = getPatients();

  const highRisk = patients.filter(
    (patient) => getRiskLevel(calculateRiskScore(patient)) === "High Risk"
  ).length;

  const mediumRisk = patients.filter(
    (patient) => getRiskLevel(calculateRiskScore(patient)) === "Medium Risk"
  ).length;

  const lowRisk = patients.filter(
    (patient) => getRiskLevel(calculateRiskScore(patient)) === "Low Risk"
  ).length;

  const ready = patients.filter(
    (patient) => getDischargeReadiness(patient) === "Ready for Discharge"
  ).length;

  const actionsRequired = patients.filter(
    (patient) =>
      getDischargeReadiness(patient) === "Ready with Actions Required"
  ).length;

  const notReady = patients.filter(
    (patient) => getDischargeReadiness(patient) === "Not Ready for Discharge"
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
          <StatCard label="Awaiting Discharge" value={patients.length} />
          <StatCard label="High Risk" value={highRisk} color="text-red-600" />
          <StatCard
            label="Medium Risk"
            value={mediumRisk}
            color="text-yellow-600"
          />
          <StatCard label="Low Risk" value={lowRisk} color="text-green-600" />
        </section>

        <section className="grid md:grid-cols-3 gap-6 mt-10">
          <StatCard
            label="Ready for Discharge"
            value={ready}
            color="text-green-600"
          />

          <StatCard
            label="Actions Required"
            value={actionsRequired}
            color="text-yellow-600"
          />

          <StatCard
            label="Not Ready"
            value={notReady}
            color="text-red-600"
          />
        </section>

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