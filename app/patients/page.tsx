import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { hasPermission } from "@/lib/auth/permissions";

import PatientsClient from "./PatientsClient";

export default async function PatientsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (!hasPermission(session.user.role, "VIEW_PATIENTS")) {
    redirect("/unauthorized");
  }

  return <PatientsClient />;
}