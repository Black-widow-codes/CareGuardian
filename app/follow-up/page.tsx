const tasks = [
    {
      task: "Schedule Follow-Up Appointment",
      owner: "Family Physician",
      dueDate: "2026-06-22",
      status: "Open",
    },
    {
      task: "Review Chest X-Ray Results",
      owner: "Pulmonology",
      dueDate: "2026-06-18",
      status: "In Progress",
    },
    {
      task: "Medication Reconciliation",
      owner: "Pharmacist",
      dueDate: "2026-06-17",
      status: "Completed",
    },
  ];
  
  export default function FollowUpPage() {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-10">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold text-slate-900">
            Follow-Up Tracker
          </h1>
  
          <p className="mt-3 text-slate-600">
            Track ownership and completion of post-discharge tasks.
          </p>
  
          <section className="mt-10 space-y-4">
            {tasks.map((task) => (
              <div
                key={task.task}
                className="bg-white rounded-xl shadow p-6 border"
              >
                <h2 className="text-xl font-semibold">
                  {task.task}
                </h2>
  
                <p className="mt-2 text-slate-600">
                  Owner: {task.owner}
                </p>
  
                <p className="text-slate-600">
                  Due Date: {task.dueDate}
                </p>
  
                <p className="text-slate-600">
                  Status: {task.status}
                </p>
  
                <div className="mt-4 flex gap-3">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                    Update Status
                  </button>
  
                  <button className="px-4 py-2 border rounded-lg">
                    Escalate
                  </button>
                </div>
              </div>
            ))}
          </section>
        </div>
      </main>
    );
  }