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
    <section className="mt-8 rounded-2xl border border-border bg-surface p-6 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-teal">
        Clinical Decision Support
      </p>

      <h2 className="mt-1 text-2xl font-semibold text-brand-navy">
        Risk Explanation
      </h2>

      <p className="mt-2 text-text-secondary">
        The following factors contribute to this patient&apos;s discharge readiness
        assessment.
      </p>

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <div>
          <h3 className="text-lg font-semibold text-brand-navy">
            Risk Factors
          </h3>

          {riskFactors.length === 0 ? (
            <div className="mt-4 rounded-xl border border-risk-low bg-risk-low-bg p-4 text-risk-low">
              No significant discharge safety risks identified.
            </div>
          ) : (
            <div className="mt-4 space-y-3">
              {riskFactors.map((factor) => (
                <div
                  key={factor.label}
                  className="rounded-xl border border-border bg-surface-muted px-4 py-3 text-brand-navy"
                >
                  {factor.label}
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <h3 className="text-lg font-semibold text-brand-navy">
            Recommended Actions
          </h3>

          {riskFactors.length === 0 ? (
            <div className="mt-4 rounded-xl border border-risk-low bg-risk-low-bg p-4 text-risk-low">
              Patient appears ready for discharge.
            </div>
          ) : (
            <div className="mt-4 space-y-3">
              {riskFactors.map((factor) => (
                <div
                  key={factor.recommendation}
                  className="rounded-xl border border-border bg-surface-muted px-4 py-3 text-brand-navy"
                >
                  {factor.recommendation}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
