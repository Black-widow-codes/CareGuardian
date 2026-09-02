import Link from "next/link";
import type { Alert } from "@/types/alert";

type AlertCardProps = {
  alert: Alert;
};

export default function AlertCard({ alert }: AlertCardProps) {
  const severityStyle =
    alert.severity === "High"
      ? "bg-risk-high-bg text-risk-high"
      : alert.severity === "Medium"
        ? "bg-risk-medium-bg text-risk-medium"
        : "bg-risk-low-bg text-risk-low";

  return (
    <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.12em] text-brand-teal">
            Patient Safety Alert
          </p>

          <h2 className="mt-1 text-xl font-semibold text-brand-navy">
            {alert.type}
          </h2>

          <p className="mt-3 text-text-secondary">
            Patient:{" "}
            <span className="font-medium text-brand-navy">
              {alert.patient}
            </span>
          </p>

          <p className="mt-1 text-text-secondary">
            Status:{" "}
            <span className="font-medium text-brand-navy">
              {alert.status}
            </span>
          </p>
        </div>

        <span
          className={`inline-block rounded-full px-3 py-1 text-sm font-semibold ${severityStyle}`}
        >
          {alert.severity} Severity
        </span>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <Link
          href={`/patients/${alert.patientId}`}
          className="rounded-lg bg-brand-teal px-4 py-2 font-semibold text-white transition hover:bg-brand-teal-hover"
        >
          View Patient
        </Link>

        <button
          className="rounded-lg border border-border-strong bg-surface px-4 py-2 font-semibold text-brand-navy transition hover:bg-brand-teal-light"
        >
          Resolve Alert
        </button>
      </div>
    </div>
  );
}
