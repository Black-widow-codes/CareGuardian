"use client";

import { signOut } from "next-auth/react";

export default function UserMenu() {
  return (
    <div className="flex items-center gap-4">
      <span className="text-sm font-medium text-slate-700">
        System Administrator
      </span>

      <button
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
      >
        Logout
      </button>
    </div>
  );
}