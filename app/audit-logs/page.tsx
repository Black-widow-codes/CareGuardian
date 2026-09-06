import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { hasPermission } from "@/lib/auth/permissions";
import { prisma } from "@/lib/prisma";

export default async function AuditLogsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (!hasPermission(session.user.role, "VIEW_AUDIT_LOGS")) {
    redirect("/unauthorized");
  }

  const auditLogs = await prisma.auditLog.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 100,
  });

  return (
    <main className="min-h-screen bg-background px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <section className="rounded-2xl bg-brand-navy px-8 py-10 text-white shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-cyan-300">
            Patient Safety & Security
          </p>

          <h1 className="mt-2 text-4xl font-bold">
            Audit Log
          </h1>

          <p className="mt-3 max-w-2xl text-white/75">
            Review recorded CareGuardian user-management and security events.
          </p>
        </section>

        <section className="mt-8 rounded-2xl border border-border bg-surface p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-teal">
            System Activity
          </p>

          <h2 className="mt-1 text-2xl font-semibold text-brand-navy">
            Recent Events
          </h2>

          <p className="mt-2 text-text-secondary">
            Showing the 100 most recent audit events, newest first.
          </p>

          <div className="mt-8 overflow-x-auto rounded-xl border border-border">
            <table className="min-w-full bg-surface">
              <thead className="bg-surface-muted">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-brand-navy">
                    Date & Time
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-brand-navy">
                    User
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-brand-navy">
                    Action
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-brand-navy">
                    Target
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-brand-navy">
                    Details
                  </th>
                </tr>
              </thead>

              <tbody>
                {auditLogs.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-10 text-center text-text-secondary"
                    >
                      No audit events have been recorded yet.
                    </td>
                  </tr>
                ) : (
                  auditLogs.map((log) => (
                    <tr
                      key={log.id}
                      className="border-t border-border transition hover:bg-brand-teal-light"
                    >
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-text-secondary">
                        {log.createdAt.toLocaleString()}
                      </td>

                      <td className="px-6 py-4">
                        <p className="font-medium text-brand-navy">
                          {log.actorName}
                        </p>

                        <p className="mt-1 text-sm text-text-secondary">
                          {log.actorEmail}
                        </p>
                      </td>

                      <td className="px-6 py-4">
                        <span className="whitespace-nowrap rounded-full bg-brand-teal-light px-3 py-1 text-sm font-semibold text-brand-teal">
                          {log.action.replaceAll("_", " ")}
                        </span>
                      </td>

                      <td className="whitespace-nowrap px-6 py-4 text-sm text-text-secondary">
                        {log.entityType}
                        {log.entityId ? ` #${log.entityId}` : ""}
                      </td>

                      <td className="px-6 py-4 text-text-secondary">
                        {log.description}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}