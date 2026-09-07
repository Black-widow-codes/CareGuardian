import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { hasPermission } from "@/lib/auth/permissions";

import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (!hasPermission(session.user.role, "VIEW_PATIENTS")) {
    redirect("/unauthorized");
  }

  return <DashboardClient />;
}