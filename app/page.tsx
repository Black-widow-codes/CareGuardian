export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-4xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-brand-teal">
            Patient Safety Intelligence Platform
          </p>

          <h1 className="mb-6 text-5xl font-bold tracking-tight text-brand-navy">
            CareGuardian
          </h1>

          <p className="mb-4 max-w-3xl text-xl leading-8 text-text-secondary">
            CareGuardian helps healthcare teams identify potential safety risks,
            strengthen critical clinical workflows, and reduce preventable patient harm.
          </p>

          <p className="mb-8 text-lg font-medium text-brand-navy">
            Detect Risk. Prevent Harm. Protect Patients.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="/dashboard"
              className="inline-block rounded-lg bg-brand-teal px-6 py-3 font-semibold text-white transition hover:bg-brand-teal-hover"
            >
              View Dashboard
            </a>

            <a
              href="/learn-more"
              className="inline-block rounded-lg border border-border-strong bg-surface px-6 py-3 font-semibold text-brand-navy transition hover:bg-brand-teal-light"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.16em] text-brand-teal">
            Current MVP
          </p>

          <h2 className="text-3xl font-semibold text-brand-navy">
            Discharge Safety Monitor
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
            <h3 className="mb-2 text-lg font-semibold text-brand-navy">
              Missing Information Detection
            </h3>
            <p className="leading-7 text-text-secondary">
              Identify missing discharge information before a patient leaves
              the hospital.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
            <h3 className="mb-2 text-lg font-semibold text-brand-navy">
              Risk Scoring
            </h3>
            <p className="leading-7 text-text-secondary">
              Generate explainable patient-safety risk scores and identify
              contributing factors.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-surface p-6 shadow-sm">
            <h3 className="mb-2 text-lg font-semibold text-brand-navy">
              Follow-Up Tracking
            </h3>
            <p className="leading-7 text-text-secondary">
              Improve accountability for important post-discharge actions and
              follow-up requirements.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
