import type { Patient } from "@/types/patient";
import { getRiskFactors } from "@/lib/riskFactors";

type RiskExplanationProps = {
  patient: Patient;
};

export default function RiskExplanation({
  patient,
}: RiskExplanationProps) {
  const riskFactors = getRiskFactors(patient);

  return (
    <section className="mt-8 rounded-2xl bg-white p-6 shadow">
      <h2 className="text-2xl font-semibold text-slate-900">
        Risk Explanation
      </h2>

      <p className="mt-2 text-slate-600">
        The following factors contribute to this patient's discharge readiness
        assessment.
      </p>

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        {/* Risk Factors */}
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            Risk Factors
          </h3>

          {riskFactors.length === 0 ? (
            <div className="mt-4 rounded-xl border border-green-200 bg-green-50 p-4 text-green-700">
              ✅ No significant discharge safety risks identified.
            </div>
          ) : (
            <div className="mt-4 space-y-3">
              {riskFactors.map((factor) => (
                <div
                  key={factor.label}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
                >
                  {factor.label}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recommended Actions */}
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            Recommended Actions
          </h3>

          {riskFactors.length === 0 ? (
            <div className="mt-4 rounded-xl border border-green-200 bg-green-50 p-4 text-green-700">
              ✅ Patient appears ready for discharge.
            </div>
          ) : (
            <div className="mt-4 space-y-3">
              {riskFactors.map((factor) => (
                <div
                  key={factor.recommendation}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
                >
                  • {factor.recommendation}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}