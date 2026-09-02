import type { DischargeReadinessStatus } from "@/lib/dischargeReadiness";

type DischargeReadinessBadgeProps = {
  status: DischargeReadinessStatus;
};

export default function DischargeReadinessBadge({
  status,
}: DischargeReadinessBadgeProps) {
  const badgeStyle =
    status === "Ready for Discharge"
      ? "bg-risk-low-bg text-risk-low"
      : status === "Ready with Actions Required"
        ? "bg-risk-medium-bg text-risk-medium"
        : "bg-risk-high-bg text-risk-high";

  return (
    <span
      className={`inline-block rounded-full px-4 py-2 text-sm font-semibold ${badgeStyle}`}
    >
      {status}
    </span>
  );
}
