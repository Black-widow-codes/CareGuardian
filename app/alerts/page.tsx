import Link from "next/link";

const alerts = [
  {
    type: "Missing Follow-Up Appointment",
    patientId: 1,
    patient: "John Smith",
    severity: "Medium",
    status: "Open",
  },
  {
    type: "Pending Test Result",
    patientId: 2,
    patient: "Mary Johnson",
    severity: "High",
    status: "Open",
  },
  {
    type: "Missing Medication Information",
    patientId: 3,
    patient: "David Lee",
    severity: "High",
    status: "Open",
  },
];

export default function AlertsPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-900">Alert Center</h1>

        <p className="mt-3 text-slate-600">
          Review and manage patient safety alerts before discharge.
        </p>

        <section className="mt-10 space-y-4">
          {alerts.map((alert) => (
            <div
              key={alert.type}
              className="bg-white rounded-xl shadow p-6 border"
            >
              <h2 className="text-xl font-semibold text-slate-900">
                ⚠ {alert.type}
              </h2>

              <p className="mt-2 text-slate-600">Patient: {alert.patient}</p>
              <p className="text-slate-600">Severity: {alert.severity}</p>
              <p className="text-slate-600">Status: {alert.status}</p>

              <div className="mt-4 flex gap-3">
                <Link
                  href={`/patients/${alert.patientId}`}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                  View Patient
                </Link>

                <button className="px-4 py-2 border rounded-lg">
                  Resolve Alert
                </button>
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}