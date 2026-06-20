export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h1 className="text-5xl font-bold text-slate-900 mb-6">
          CareGuardian
        </h1>

        <p className="text-xl text-slate-600 mb-8">
          A Patient Safety Intelligence Platform designed to improve clinical
          information continuity and reduce preventable harm during transitions
          of care.
        </p>

        <div className="flex gap-4">
        <a
  href="/dashboard"
  className="px-6 py-3 bg-blue-600 text-white rounded-lg inline-block"
>
  View Dashboard
</a>

          <a
  href="/learn-more"
  className="px-6 py-3 border border-slate-300 rounded-lg inline-block"
>
  Learn More
</a>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-3xl font-semibold mb-6">
          MVP: Discharge Safety Monitor
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-xl shadow">
            <h3 className="font-semibold text-lg mb-2">
              Missing Information Detection
            </h3>
            <p>
              Identify missing discharge information before a patient leaves
              hospital.
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow">
            <h3 className="font-semibold text-lg mb-2">
              Risk Scoring
            </h3>
            <p>
              Generate explainable patient safety risk scores.
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl shadow">
            <h3 className="font-semibold text-lg mb-2">
              Follow-Up Tracking
            </h3>
            <p>
              Improve accountability for post-discharge actions.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}