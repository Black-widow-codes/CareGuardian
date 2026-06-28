import type { DischargeReadinessStatus } from "@/lib/dischargeReadiness";

type DischargeReadinessBadgeProps = {
  status: DischargeReadinessStatus;
};

export default function DischargeReadinessBadge({
  status,
}: DischargeReadinessBadgeProps) {
  const badgeStyle =
    status === "Ready for Discharge"
      ? "bg-green-100 text-green-700"
      : status === "Ready with Actions Required"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-red-100 text-red-700";

  return (
    <span className={`inline-block rounded-full px-4 py-2 text-sm font-semibold ${badgeStyle}`}>
      {status}
    </span>
  );
}