"use client";

import PageHeader from "../components/PageHeader";
import AlertCard from "../components/AlertCard";

import { useAlerts } from "@/hooks/useAlerts";

export default function AlertsClient() {
  const { alerts, loading, error } = useAlerts();

  return (
    <main className="min-h-screen bg-background px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <PageHeader
          label="CareGuardian"
          title="Alert Center"
          description="Review patient safety alerts generated from discharge risk factors and take action before discharge."
        />

        {error && (
          <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        <section className="mt-8 rounded-2xl border border-border bg-surface p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-teal">
            Patient Safety Alerts
          </p>

          <h2 className="mt-1 text-2xl font-semibold text-brand-navy">
            Open Alerts
          </h2>

          <p className="mt-2 text-text-secondary">
            These alerts are generated from clinical discharge safety risks.
          </p>

          <div className="mt-6 space-y-4">
            {loading ? (
              <div className="rounded-xl border border-dashed border-border-strong bg-surface-muted p-8 text-center text-text-muted">
                Loading alerts...
              </div>
            ) : alerts.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border-strong bg-surface-muted p-8 text-center text-text-muted">
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
