import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { hasPermission } from "@/lib/auth/permissions";
import PageHeader from "../components/PageHeader";

export default async function FollowUpPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (!hasPermission(session.user.role, "VIEW_PATIENTS")) {
    redirect("/unauthorized");
  }
  return (
    <main className="min-h-screen bg-background px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <PageHeader
          label="CareGuardian"
          title="Follow-up Management"
          description="Track follow-up appointments and ensure patients receive appropriate care after discharge."
        />

        <section className="mt-8 rounded-2xl border border-border bg-surface p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-teal">
            Post-Discharge Care
          </p>

          <h2 className="mt-1 text-2xl font-semibold text-brand-navy">
            Follow-up Tracker
          </h2>

          <p className="mt-2 text-text-secondary">
            This module will help care teams monitor scheduled follow-up
            appointments and identify patients requiring additional outreach
            after discharge.
          </p>

          <div className="mt-6 rounded-xl border border-dashed border-border-strong bg-surface-muted p-10 text-center">
            <p className="font-medium text-brand-navy">
              Follow-up tracking is not yet active.
            </p>

            <p className="mt-2 text-sm text-text-secondary">
              Additional follow-up management features will be introduced in a
              future development milestone.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
