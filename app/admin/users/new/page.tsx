import { auth } from "@/auth";
import { hasPermission } from "@/lib/auth/permissions";
import { redirect } from "next/navigation";

import NewUserForm from "./NewUserForm";

export default async function NewUserPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (!hasPermission(session.user.role, "MANAGE_USERS")) {
    redirect("/unauthorized");
  }

  return <NewUserForm />;
}