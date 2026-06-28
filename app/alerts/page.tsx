import PageHeader from "../components/PageHeader";
import AlertCard from "../components/AlertCard";
import { getAlerts } from "@/services/alertService";

export default function AlertsPage() {
  const alerts = getAlerts();

  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <PageHeader
          label="CareGuardian"
          title="Alert Center"
          description="Review patient safety alerts generated from discharge risk factors and take action before discharge."
        />

        <section className="mt-8 rounded-2xl bg-white p-6 shadow">
          <h2 className="text-2xl font-semibold text-slate-900">
            Open Alerts
          </h2>

          <p className="mt-2 text-slate-600">
            These alerts are generated from clinical discharge safety risks.
          </p>

          <div className="mt-6 space-y-4">
            {alerts.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-slate-500">
                No open alerts.
              </div>
            ) : (
              alerts.map((alert) => (
                <AlertCard key={alert.id} alert={alert} />
              ))
            )}
          </div>
        </section>
      </div>
    </main>
  );
}