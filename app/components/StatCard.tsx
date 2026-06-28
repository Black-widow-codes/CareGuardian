type StatCardProps = {
  label: string;
  value: number;
  color?: string;
};

export default function StatCard({
  label,
  value,
  color = "text-slate-900",
}: StatCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <p className="text-sm font-medium uppercase tracking-wide text-slate-500">
        {label}
      </p>

      <div className="mt-4 flex items-end justify-between">
        <p className={`text-4xl font-bold ${color}`}>
          {value}
        </p>

        <div className="h-10 w-1 rounded-full bg-slate-200" />
      </div>
    </div>
  );
}