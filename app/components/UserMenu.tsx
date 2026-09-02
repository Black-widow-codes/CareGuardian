"use client";

import { signOut } from "next-auth/react";

type UserMenuProps = {
  name: string;
  role: string;
};

export default function UserMenu({
  name,
  role,
}: UserMenuProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="text-right">
        <p className="text-sm font-semibold text-white">
          {name}
        </p>

        <p className="text-xs font-medium uppercase tracking-wide text-white/70">
          {role.replaceAll("_", " ")}
        </p>
      </div>

      <button
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="rounded-lg border border-white/20 bg-brand-navy-dark px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
      >
        Logout
      </button>
    </div>
  );
}
