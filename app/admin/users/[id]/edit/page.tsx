import { auth } from "@/auth";
import { hasPermission } from "@/lib/auth/permissions";
import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";

import EditUserForm from "./EditUserForm";

type EditUserPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditUserPage({
  params,
}: EditUserPageProps) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (!hasPermission(session.user.role, "MANAGE_USERS")) {
    redirect("/unauthorized");
  }

  const { id } = await params;
  const userId = Number(id);

  if (!Number.isInteger(userId)) {
    notFound();
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });

  if (!user) {
    notFound();
  }

  return <EditUserForm user={user} />;
}