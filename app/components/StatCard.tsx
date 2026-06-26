type StatCardProps = {
    label: string;
    value: number;
    color?: string;
  };
  
  export default function StatCard({ label, value, color = "text-slate-900" }: StatCardProps) {
    return (
      <div className="bg-white p-6 rounded-xl shadow">
        <p className="text-slate-500">{label}</p>
        <p className={`text-3xl font-bold mt-2 ${color}`}>{value}</p>
      </div>
    );
  }