export default function LearnMorePage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-4xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-brand-teal">
            About CareGuardian
          </p>

          <h1 className="mb-6 text-5xl font-bold tracking-tight text-brand-navy">
            A Patient Safety Intelligence Platform
          </h1>

          <p className="max-w-3xl text-xl leading-8 text-text-secondary">
            CareGuardian is designed to help healthcare teams identify unresolved
            patient-safety risks, strengthen critical clinical workflows, and
            improve accountability across transitions of care.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-surface p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-teal">
              The Problem
            </p>

            <h2 className="mt-2 text-2xl font-semibold text-brand-navy">
              Important safety tasks can be lost during care transitions.
            </h2>

            <p className="mt-4 leading-7 text-text-secondary">
              Discharge involves medications, follow-up appointments, diagnostic
              results, referrals, instructions, and responsibility for ongoing
              care. When critical information or actions remain unresolved,
              patients may leave the hospital with avoidable safety risks.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-teal">
              The Approach
            </p>

            <h2 className="mt-2 text-2xl font-semibold text-brand-navy">
              Make safety risks visible and actionable.
            </h2>

            <p className="mt-4 leading-7 text-text-secondary">
              CareGuardian brings patient-safety information into a structured
              workflow so care teams can identify risks, understand why they
              matter, and focus attention on actions that still require
              resolution.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <div className="rounded-2xl bg-brand-navy p-8 text-white shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-cyan-300">
            Current MVP
          </p>

          <h2 className="mt-2 text-3xl font-semibold">
            Discharge Safety Monitor
          </h2>

          <p className="mt-4 max-w-3xl leading-7 text-white/75">
            The current CareGuardian MVP focuses on discharge safety. It helps
            healthcare teams review patient readiness, identify missing safety
            information, assess risk factors, and determine which patients need
            additional clinical action before discharge.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-teal">
          Safety Workflow
        </p>

        <h2 className="mt-2 text-3xl font-semibold text-brand-navy">
          From risk detection to accountability
        </h2>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            ["Detect", "Identify missing information and unresolved safety risks."],
            ["Explain", "Show the factors contributing to patient-safety concerns."],
            ["Assign & Alert", "Bring required actions to the attention of the care team."],
            ["Resolve", "Support completion of outstanding safety-critical tasks."],
            ["Verify", "Confirm that important requirements have been addressed."],
            ["Audit", "Maintain accountability for important clinical and administrative actions."],
          ].map(([title, description]) => (
            <div
              key={title}
              className="rounded-xl border border-border bg-surface p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold text-brand-navy">
                {title}
              </h3>

              <p className="mt-2 leading-7 text-text-secondary">
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="rounded-2xl border border-border bg-surface-muted p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-teal">
            Platform Direction
          </p>

          <h2 className="mt-2 text-3xl font-semibold text-brand-navy">
            Built to support broader patient-safety workflows
          </h2>

          <p className="mt-4 max-w-3xl leading-7 text-text-secondary">
            Discharge safety is the starting point. CareGuardian is being
            developed as a modular patient-safety platform that can support
            additional clinical safety workflows while maintaining strong
            access control, auditability, and accountability.
          </p>

          <div className="mt-6 flex flex-wrap gap-4">
            <a
              href="/login"
              className="inline-block rounded-lg bg-brand-teal px-6 py-3 font-semibold text-white transition hover:bg-brand-teal-hover"
            >
              Access CareGuardian
            </a>

            <a
              href="/"
              className="inline-block rounded-lg border border-border-strong bg-surface px-6 py-3 font-semibold text-brand-navy transition hover:bg-brand-teal-light"
            >
              Back to Home
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}