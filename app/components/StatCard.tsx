type StatCardProps = {
  label: string;
  value: number;
  color?: string;
};

export default function StatCard({
  label,
  value,
  color = "text-brand-navy",
}: StatCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm transition-shadow hover:shadow-md">
      <p className="text-sm font-medium uppercase tracking-wide text-text-secondary">
        {label}
      </p>

      <p className={`mt-4 text-4xl font-bold ${color}`}>
        {value}
      </p>
    </div>
  );
}
