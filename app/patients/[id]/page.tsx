import DischargeReadinessBadge from "@/app/components/DischargeReadinessBadge";
import RiskExplanation from "@/app/components/RiskExplanation";
import { patientRepository } from "@/repositories/patientRepository";
import { calculateRiskScore, getRiskLevel } from "@/lib/riskEngine";
import { getDischargeReadiness } from "@/lib/dischargeReadiness";
import { getPatientDisplayName } from "@/lib/patientName";

export default async function PatientDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const patient = await patientRepository.findById(Number(id));

  if (!patient) {
    return (
      <main className="min-h-screen bg-background px-6 py-10">
        <div className="mx-auto max-w-5xl">
          <div className="rounded-2xl border border-border bg-surface p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-teal">
              Patient Review
            </p>

            <h1 className="mt-2 text-3xl font-bold text-brand-navy">
              Patient not found
            </h1>

            <p className="mt-3 text-text-secondary">
              The requested patient record could not be located.
            </p>
          </div>
        </div>
      </main>
    );
  }

  const score = calculateRiskScore(patient);
  const riskLevel = getRiskLevel(score);
  const readiness = getDischargeReadiness(patient);

  const riskColor =
    riskLevel === "High Risk"
      ? "text-risk-high"
      : riskLevel === "Medium Risk"
        ? "text-risk-medium"
        : "text-risk-low";

  const checklistItems = [
    {
      label: "Medication Reconciliation",
      status: patient.medicationReconciled ? "Complete" : "Missing",
      tone: patient.medicationReconciled ? "success" : "danger",
    },
    {
      label: "Follow-up Appointment",
      status: patient.followUpScheduled ? "Scheduled" : "Missing",
      tone: patient.followUpScheduled ? "success" : "danger",
    },
    {
      label: "Pending Diagnostic Tests",
      status: patient.pendingTests ? "Follow-up Required" : "No Pending Tests",
      tone: patient.pendingTests ? "warning" : "success",
    },
    {
      label: "Responsible Provider",
      status: patient.providerAssigned ? "Assigned" : "Missing",
      tone: patient.providerAssigned ? "success" : "danger",
    },
    {
      label: "Discharge Instructions",
      status: patient.dischargeInstructionsGiven ? "Complete" : "Missing",
      tone: patient.dischargeInstructionsGiven ? "success" : "danger",
    },
    {
      label: "Home Care Referral",
      status: patient.homeCareReferral ? "Complete" : "Follow-up Required",
      tone: patient.homeCareReferral ? "success" : "warning",
    },
  ];

  return (
    <main className="min-h-screen bg-background px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <section className="rounded-2xl bg-brand-navy px-8 py-10 text-white shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-cyan-300">
            Patient Discharge Review
          </p>

          <div className="mt-4 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
            <h1 className="text-4xl font-bold">
  {getPatientDisplayName(patient)}
</h1>

              <p className="mt-3 max-w-2xl text-white/75">
                Review discharge readiness, safety risks, and required actions
                before discharge approval.
              </p>
            </div>

            <DischargeReadinessBadge status={readiness} />
          </div>
        </section>

        <section className="mt-8 grid gap-4 rounded-2xl border border-border bg-surface p-6 shadow-sm md:grid-cols-4">
  <div>
    <p className="text-sm text-text-secondary">
      Medical Record Number
    </p>
    <p className="mt-1 font-semibold text-brand-navy">
      {patient.mrn || "Not assigned"}
    </p>
  </div>

  <div>
    <p className="text-sm text-text-secondary">
      Date of Birth
    </p>
    <p className="mt-1 font-semibold text-brand-navy">
      {patient.dob}
    </p>
  </div>

  <div>
    <p className="text-sm text-text-secondary">
      Diagnosis
    </p>
    <p className="mt-1 font-semibold text-brand-navy">
      {patient.diagnosis}
    </p>
  </div>

  <div>
    <p className="text-sm text-text-secondary">
      Discharge Date
    </p>
    <p className="mt-1 font-semibold text-brand-navy">
      {patient.dischargeDate}
    </p>
  </div>
</section>

        <section className="mt-8 rounded-2xl border border-border bg-surface p-6 shadow-sm">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-wide text-text-secondary">
                Safety Score
              </p>

              <p className={`mt-2 text-5xl font-bold ${riskColor}`}>
                {score}
                <span className="text-2xl text-text-muted"> /100</span>
              </p>
            </div>

            <div className="md:text-right">
              <p className="text-sm font-medium uppercase tracking-wide text-text-secondary">
                Risk Level
              </p>

              <p className={`mt-2 text-2xl font-bold ${riskColor}`}>
                {riskLevel}
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-border bg-surface p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-teal">
            Safety Review
          </p>

          <h2 className="mt-1 text-2xl font-semibold text-brand-navy">
            Discharge Safety Checklist
          </h2>

          <div className="mt-5 space-y-3">
            {checklistItems.map((item) => {
              const statusStyle =
                item.tone === "success"
                  ? "bg-risk-low-bg text-risk-low"
                  : item.tone === "warning"
                    ? "bg-risk-medium-bg text-risk-medium"
                    : "bg-risk-high-bg text-risk-high";

              return (
                <div
                  key={item.label}
                  className="flex flex-col gap-2 rounded-xl border border-border bg-surface-muted px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  <span className="font-medium text-brand-navy">
                    {item.label}
                  </span>

                  <span
                    className={`rounded-full px-3 py-1 text-sm font-semibold ${statusStyle}`}
                  >
                    {item.status}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        <RiskExplanation patient={patient} />
      </div>
    </main>
  );
}
