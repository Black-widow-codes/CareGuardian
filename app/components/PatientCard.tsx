import Link from "next/link";
import type { Patient } from "@/types/patient";
import { calculateRiskScore, getRiskLevel } from "@/lib/riskEngine";

type PatientCardProps = {
  patient: Patient;
};

export default function PatientCard({ patient }: PatientCardProps) {
  const score = calculateRiskScore(patient);
  const riskLevel = getRiskLevel(score);

  return (
    <Link
      href={`/patients/${patient.id}`}
      className="border rounded-lg p-4 flex justify-between items-center hover:bg-slate-50 transition"
    >
      <div>
        <p className="font-semibold">{patient.name}</p>
        <p className="text-sm text-slate-600">{patient.issue}</p>
      </div>

      <span className="font-semibold text-red-600">
        {riskLevel}
      </span>
    </Link>
  );
}