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
    <section className="mt-8 bg-white rounded-xl shadow p-6">
      <h2 className="text-2xl font-semibold text-slate-900">
        Risk Explanation
      </h2>

      <div className="mt-6">
        <h3 className="text-lg font-semibold">Risk Factors</h3>

        {riskFactors.length === 0 ? (
          <p className="mt-2 text-green-600">
            ✅ No significant discharge safety risks identified.
          </p>
        ) : (
          <ul className="mt-3 space-y-2">
            {riskFactors.map((factor) => (
              <li key={factor.label}>{factor.label}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold">
          Recommended Actions
        </h3>

        {riskFactors.length === 0 ? (
          <p className="mt-2 text-green-600">
            ✅ Patient appears ready for discharge.
          </p>
        ) : (
          <ul className="mt-3 space-y-2">
            {riskFactors.map((factor) => (
              <li key={factor.recommendation}>
                • {factor.recommendation}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}