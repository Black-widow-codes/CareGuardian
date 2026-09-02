import Link from "next/link";
import type { Patient } from "@/types/patient";
import { calculateRiskScore, getRiskLevel } from "@/lib/riskEngine";
import { getDischargeReadiness } from "@/lib/dischargeReadiness";
import { getPatientDisplayName } from "@/lib/patientName";
import DischargeReadinessBadge from "@/app/components/DischargeReadinessBadge";

type PatientCardProps = {
  patient: Patient;
};

export default function PatientCard({ patient }: PatientCardProps) {
  const score = calculateRiskScore(patient);
  const riskLevel = getRiskLevel(score);
  const readiness = getDischargeReadiness(patient);

  const riskColor =
    riskLevel === "High Risk"
      ? "text-risk-high"
      : riskLevel === "Medium Risk"
        ? "text-risk-medium"
        : "text-risk-low";

  return (
    <Link
      href={`/patients/${patient.id}`}
      className="flex items-center justify-between rounded-lg border border-border bg-surface p-4 transition hover:bg-brand-teal-light"
    >
      <div>
        <p className="font-semibold text-brand-navy">
          {getPatientDisplayName(patient)}
        </p>

        <p className="text-sm text-text-secondary">
          {patient.issue}
        </p>
      </div>

      <div className="flex flex-col items-end gap-2">
        <DischargeReadinessBadge status={readiness} />

        <span className={`font-semibold ${riskColor}`}>
          {riskLevel}
        </span>
      </div>
    </Link>
  );
}
