import Link from "next/link";
import { auth } from "@/auth";
import { hasPermission } from "@/lib/auth/permissions";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function UsersPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (!hasPermission(session.user.role, "VIEW_USERS")) {
    redirect("/unauthorized");
  }

  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  return (
    <main className="min-h-screen bg-background px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <section className="rounded-2xl bg-brand-navy px-8 py-10 text-white shadow-sm">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
  <div>
    <p className="text-sm font-semibold uppercase tracking-[0.14em] text-cyan-300">
      Administration
    </p>

    <h1 className="mt-2 text-4xl font-bold">
      User Management
    </h1>

    <p className="mt-3 max-w-2xl text-white/75">
      Manage CareGuardian staff accounts, roles, and system access.
    </p>
  </div>

  {hasPermission(session.user.role, "MANAGE_USERS") && (
    <Link
      href="/admin/users/new"
      className="rounded-lg bg-brand-teal px-5 py-3 font-semibold text-white transition hover:bg-brand-teal-hover"
    >
      New User
    </Link>
  )}
</div>
        </section>

        <section className="mt-8 rounded-2xl border border-border bg-surface p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-brand-teal">
            Staff Accounts
          </p>

          <h2 className="mt-1 text-2xl font-semibold text-brand-navy">
            System Users
          </h2>

          <p className="mt-2 text-text-secondary">
            Review staff accounts and their assigned CareGuardian roles.
          </p>

          <div className="mt-8 overflow-hidden rounded-xl border border-border">
            <table className="min-w-full bg-surface">
            <thead className="bg-surface-muted">
  <tr>
    <th className="px-6 py-4 text-left text-sm font-semibold text-brand-navy">
      Name
    </th>

    <th className="px-6 py-4 text-left text-sm font-semibold text-brand-navy">
      Email
    </th>

    <th className="px-6 py-4 text-left text-sm font-semibold text-brand-navy">
      Role
    </th>

    <th className="px-6 py-4 text-left text-sm font-semibold text-brand-navy">
      Created
    </th>

    <th className="px-6 py-4 text-left text-sm font-semibold text-brand-navy">
      Actions
    </th>
  </tr>
</thead>

              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-t border-border transition hover:bg-brand-teal-light"
                  >
                    <td className="px-6 py-4 font-medium text-brand-navy">
                      {user.name}
                    </td>

                    <td className="px-6 py-4 text-text-secondary">
                      {user.email}
                    </td>

                    <td className="px-6 py-4">
                      <span className="rounded-full bg-brand-teal-light px-3 py-1 text-sm font-semibold text-brand-teal">
                        {user.role.replaceAll("_", " ")}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-text-secondary">
  {user.createdAt.toLocaleDateString()}
</td>

<td className="px-6 py-4">
  {hasPermission(session.user.role, "MANAGE_USERS") && (
    <Link
      href={`/admin/users/${user.id}/edit`}
      className="font-medium text-brand-teal hover:underline"
    >
      Edit
    </Link>
  )}
</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
