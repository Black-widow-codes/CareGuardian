import type { DischargeReadinessStatus } from "@/lib/dischargeReadiness";

export type PatientFilterValue = "All" | DischargeReadinessStatus;

type PatientFilterProps = {
  value: PatientFilterValue;
  onChange: (value: PatientFilterValue) => void;
};

export default function PatientFilter({
  value,
  onChange,
}: PatientFilterProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-slate-700">
        Filter by discharge readiness
      </label>

      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value as PatientFilterValue)
        }
        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2"
      >
        <option value="All">All Patients</option>
        <option value="Ready for Discharge">Ready for Discharge</option>
        <option value="Ready with Actions Required">
          Ready with Actions Required
        </option>
        <option value="Not Ready for Discharge">
          Not Ready for Discharge
        </option>
      </select>
    </div>
  );
}