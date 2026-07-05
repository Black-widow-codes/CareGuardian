import Link from "next/link";
import UserMenu from "@/app/components/UserMenu";
import { auth } from "@/auth";

export default async function Navbar() {
  const session = await auth();

  return (
    <nav className="bg-slate-900 px-6 py-4 text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <div className="flex gap-6">
          <Link href="/">Home</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/patients">Patients</Link>
          <Link href="/alerts">Alerts</Link>
          <Link href="/follow-up">Follow-Up</Link>
          <Link href="/admin/patients">Admin</Link>
        </div>

        {session ? (
          <UserMenu
          name={session.user?.name ?? "User"}
          role={(session.user as { role?: string })?.role ?? "USER"}
        />
        ) : (
          <Link href="/login" className="font-semibold">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}