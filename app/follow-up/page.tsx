import PageHeader from "../components/PageHeader";

export default function FollowUpPage() {
  return (
    <main className="min-h-screen bg-slate-100 px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <PageHeader
          label="CareGuardian"
          title="Follow-up Management"
          description="Track follow-up appointments and ensure patients receive appropriate care after discharge."
        />

        <section className="mt-8 rounded-2xl bg-white p-6 shadow">
          <h2 className="text-2xl font-semibold text-slate-900">
            Follow-up Tracker
          </h2>

          <p className="mt-2 text-slate-600">
            This module will help care teams monitor scheduled follow-up appointments and identify patients requiring additional outreach after discharge.
          </p>

          <div className="mt-6 rounded-xl border border-dashed border-slate-300 p-10 text-center text-slate-500">
            Follow-up tracking features will be expanded in a future milestone.
          </div>
        </section>
      </div>
    </main>
  );
}