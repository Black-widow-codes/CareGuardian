import DischargeReadinessBadge from "@/app/components/DischargeReadinessBadge";
import RiskExplanation from "@/app/components/RiskExplanation";
import { getPatientById } from "@/services/patientService";
import { calculateRiskScore, getRiskLevel } from "@/lib/riskEngine";
import { getDischargeReadiness } from "@/lib/dischargeReadiness";

export default async function PatientDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const patient = getPatientById(Number(id));

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

  const score = calculateRiskScore(patient);
  const riskLevel = getRiskLevel(score);
  const readiness = getDischargeReadiness(patient);

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <section className="rounded-2xl bg-slate-900 px-8 py-10 text-white shadow">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-300">
            Patient Discharge Review
          </p>

          <div className="mt-4 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-4xl font-bold">{patient.name}</h1>

              <p className="mt-3 text-slate-300">
                Review discharge readiness, safety risks, and required actions
                before discharge approval.
              </p>
            </div>

            <DischargeReadinessBadge status={readiness} />
          </div>
        </section>

        <section className="mt-8 grid gap-4 rounded-2xl bg-white p-6 shadow md:grid-cols-3">
          <div>
            <p className="text-sm text-slate-500">Date of Birth</p>
            <p className="mt-1 font-semibold text-slate-900">{patient.dob}</p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Diagnosis</p>
            <p className="mt-1 font-semibold text-slate-900">
              {patient.diagnosis}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Discharge Date</p>
            <p className="mt-1 font-semibold text-slate-900">
              {patient.dischargeDate}
            </p>
          </div>
        </section>

        <section className="mt-8 rounded-2xl bg-white p-6 shadow">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
                Safety Score
              </p>

              <p className="mt-2 text-5xl font-bold text-yellow-600">
                {score}
                <span className="text-2xl text-slate-400"> /100</span>
              </p>
            </div>

            <div className="text-right">
              <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
                Risk Level
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {riskLevel}
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8 bg-white rounded-xl shadow p-6">
          <h2 className="text-2xl font-semibold">
            Discharge Safety Checklist
          </h2>

          <ul className="mt-5 space-y-3">
            <li>{patient.medicationReconciled ? "✅ Medication Reconciled" : "❌ Medication Reconciliation Missing"}</li>
            <li>{patient.followUpScheduled ? "✅ Follow-up Appointment Scheduled" : "❌ Follow-up Appointment Missing"}</li>
            <li>{patient.pendingTests ? "⚠ Pending Tests Require Follow-up" : "✅ No Pending Tests"}</li>
            <li>{patient.providerAssigned ? "✅ Responsible Provider Assigned" : "❌ Responsible Provider Missing"}</li>
            <li>{patient.dischargeInstructionsGiven ? "✅ Discharge Instructions Given" : "❌ Discharge Instructions Missing"}</li>
            <li>{patient.homeCareReferral ? "✅ Home Care Referral Completed" : "⚠ Home Care Referral Needed"}</li>
          </ul>
        </section>

        <RiskExplanation patient={patient} />
      </div>
    </main>
  );
}