import Link from "next/link";
import type { Patient } from "@/types/patient";
import { calculateRiskScore, getRiskLevel } from "@/lib/riskEngine";
import { getDischargeReadiness } from "@/lib/dischargeReadiness";
import DischargeReadinessBadge from "@/app/components/DischargeReadinessBadge";

type PatientCardProps = {
  patient: Patient;
};

export default function PatientCard({ patient }: PatientCardProps) {
  const score = calculateRiskScore(patient);
  const riskLevel = getRiskLevel(score);
  const readiness = getDischargeReadiness(patient);

  return (
    <Link
      href={`/patients/${patient.id}`}
      className="border rounded-lg p-4 flex justify-between items-center hover:bg-slate-50 transition"
    >
      <div>
        <p className="font-semibold">{patient.name}</p>
        <p className="text-sm text-slate-600">{patient.issue}</p>
      </div>

      <div className="flex flex-col items-end gap-2">
        <DischargeReadinessBadge status={readiness} />

        <span className="font-semibold text-red-600">
          {riskLevel}
        </span>
      </div>
    </Link>
  );
}