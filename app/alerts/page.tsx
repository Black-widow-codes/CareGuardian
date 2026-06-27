import AlertCard from "../components/AlertCard";
import { getAlerts } from "@/services/alertService";

export default function AlertsPage() {
  const alerts = getAlerts();

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-900">
          Alert Center
        </h1>

        <p className="mt-3 text-slate-600">
          Review and manage patient safety alerts before discharge.
        </p>

        <section className="mt-10 space-y-4">
          {alerts.map((alert) => (
            <AlertCard
              key={alert.id}
              alert={alert}
            />
          ))}
        </section>
      </div>
    </main>
  );
}