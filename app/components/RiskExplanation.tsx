import type { Patient } from "@/types/patient";

type RiskExplanationProps = {
  patient: Patient;
};

export default function RiskExplanation({
  patient,
}: RiskExplanationProps) {
  const riskFactors: string[] = [];
  const recommendations: string[] = [];

  if (!patient.medicationReconciled) {
    riskFactors.push("❌ Medication reconciliation incomplete");
    recommendations.push("Complete medication reconciliation before discharge.");
  }

  if (!patient.followUpScheduled) {
    riskFactors.push("❌ Follow-up appointment not scheduled");
    recommendations.push("Schedule a follow-up appointment.");
  }

  if (patient.pendingTests) {
    riskFactors.push("⚠ Pending laboratory tests require follow-up");
    recommendations.push("Assign a provider to review pending test results.");
  }

  if (!patient.providerAssigned) {
    riskFactors.push("❌ No responsible provider assigned");
    recommendations.push("Assign a responsible provider.");
  }

  if (!patient.dischargeInstructionsGiven) {
    riskFactors.push("❌ Discharge instructions not provided");
    recommendations.push("Provide discharge instructions to the patient.");
  }

  if (!patient.homeCareReferral) {
    riskFactors.push("⚠ Home care referral not completed");
    recommendations.push("Arrange a home care referral if appropriate.");
  }

  return (
    <section className="mt-8 bg-white rounded-xl shadow p-6">
      <h2 className="text-2xl font-semibold text-slate-900">
        Risk Explanation
      </h2>

      <div className="mt-6">
        <h3 className="font-semibold text-lg">Risk Factors</h3>

        {riskFactors.length === 0 ? (
          <p className="mt-2 text-green-600">
            ✅ No significant discharge safety risks identified.
          </p>
        ) : (
          <ul className="mt-3 space-y-2">
            {riskFactors.map((factor) => (
              <li key={factor}>{factor}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-8">
        <h3 className="font-semibold text-lg">
          Recommended Actions
        </h3>

        {recommendations.length === 0 ? (
          <p className="mt-2 text-green-600">
            ✅ Patient appears ready for discharge.
          </p>
        ) : (
          <ul className="mt-3 space-y-2">
            {recommendations.map((action) => (
              <li key={action}>• {action}</li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}