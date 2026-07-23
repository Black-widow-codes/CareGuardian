import { auth } from "@/auth";
import { hasPermission } from "@/lib/auth/permissions";
import { redirect } from "next/navigation";

import PatientManagement from "./PatientManagement";

export default async function PatientsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (!hasPermission(session.user.role, "VIEW_PATIENTS")) {
    redirect("/unauthorized");
  }

  return (
    <PatientManagement
      userRole={session.user.role}
    />
  );
}