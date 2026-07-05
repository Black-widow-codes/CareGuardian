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
        <p className="text-sm font-semibold text-slate-700">
          {name}
        </p>

        <p className="text-xs text-slate-500">
          {role.replaceAll("_", " ")}
        </p>
      </div>

      <button
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
      >
        Logout
      </button>
    </div>
  );
}