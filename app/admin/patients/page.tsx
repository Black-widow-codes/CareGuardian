import { auth } from "@/auth";
import { redirect } from "next/navigation";

import PatientManagement from "./PatientManagement";

export default async function PatientsPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/unauthorized");
  }

  return <PatientManagement />;
}