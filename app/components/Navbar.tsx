import Link from "next/link";
import UserMenu from "@/app/components/UserMenu";
import { auth } from "@/auth";

export default async function Navbar() {
  const session = await auth();

  return (
    <nav className="border-b border-brand-navy-dark bg-brand-navy text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-7">
          <Link href="/" className="font-bold tracking-tight">
            CareGuardian
          </Link>

          <div className="hidden items-center gap-6 md:flex">
            <Link
              href="/dashboard"
              className="text-sm font-medium text-white/90 transition hover:text-white"
            >
              Dashboard
            </Link>

            <Link
              href="/patients"
              className="text-sm font-medium text-white/90 transition hover:text-white"
            >
              Patients
            </Link>

            <Link
              href="/alerts"
              className="text-sm font-medium text-white/90 transition hover:text-white"
            >
              Alerts
            </Link>

            <Link
              href="/follow-up"
              className="text-sm font-medium text-white/90 transition hover:text-white"
            >
              Follow-Up
            </Link>

            {session?.user?.role === "ADMIN" && (
  <Link
    href="/admin/users"
    className="text-sm font-medium text-white/90 transition hover:text-white"
  >
    Admin
  </Link>
)}
          </div>
        </div>

        {session ? (
          <UserMenu
          name={session.user?.name ?? "User"}
        />
        ) : (
          <Link
            href="/login"
            className="rounded-md px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
