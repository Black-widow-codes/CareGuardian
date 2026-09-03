import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-10">
      <div className="mx-auto max-w-3xl">
        <section className="rounded-2xl border border-border bg-surface p-10 text-center shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-risk-high">
            Access Denied
          </p>

          <h1 className="mt-3 text-3xl font-bold text-brand-navy">
            You do not have permission to access this page.
          </h1>

          <p className="mt-4 text-text-secondary">
            Your CareGuardian role does not include access to this administrative
            function.
          </p>

          <Link
            href="/dashboard"
            className="mt-8 inline-block rounded-lg bg-brand-teal px-5 py-3 font-semibold text-white transition hover:bg-brand-teal-hover"
          >
            Return to Dashboard
          </Link>
        </section>
      </div>
    </main>
  );
}