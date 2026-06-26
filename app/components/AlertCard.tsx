import Link from "next/link";
import type { Alert } from "@/types/alert";

type AlertCardProps = {
  alert: Alert;
};

export default function AlertCard({ alert }: AlertCardProps) {
  const severityColor =
    alert.severity === "High"
      ? "text-red-600"
      : alert.severity === "Medium"
      ? "text-yellow-600"
      : "text-green-600";

  return (
    <div className="bg-white rounded-xl shadow p-6 border">
      <h2 className="text-xl font-semibold text-slate-900">
        ⚠ {alert.type}
      </h2>

      <p className="mt-2 text-slate-600">
        Patient: {alert.patient}
      </p>

      <p className={severityColor}>
        Severity: {alert.severity}
      </p>

      <p className="text-slate-600">
        Status: {alert.status}
      </p>

      <div className="mt-4 flex gap-3">
        <Link
          href={`/patients/${alert.patientId}`}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          View Patient
        </Link>

        <button className="px-4 py-2 border rounded-lg hover:bg-slate-100 transition">
          Resolve Alert
        </button>
      </div>
    </div>
  );
}