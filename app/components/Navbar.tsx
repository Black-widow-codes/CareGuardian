import Link from "next/link";
import StatCard from "@/app/components/StatCard";

export default function Navbar() {
  return (
    <nav className="bg-slate-900 text-white px-6 py-4">
      <div className="max-w-6xl mx-auto flex gap-6">
        <Link href="/">Home</Link>

        <Link href="/dashboard">Dashboard</Link>

        <Link href="/patients">Patients</Link>

        <Link href="/alerts">Alerts</Link>

        <Link href="/follow-up">Follow-Up</Link>
      </div>
    </nav>
  );
}