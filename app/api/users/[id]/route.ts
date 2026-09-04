import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/auth";
import { hasPermission } from "@/lib/auth/permissions";
import { prisma } from "@/lib/prisma";

const allowedRoles = [
  "ADMIN",
  "DISCHARGE_COORDINATOR",
  "NURSE",
  "PATIENT_SAFETY_OFFICER",
] as const;

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function PUT(
  request: NextRequest,
  context: RouteContext
) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    if (!hasPermission(session.user.role, "MANAGE_USERS")) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    const { id } = await context.params;
    const userId = Number(id);

    if (!Number.isInteger(userId)) {
      return NextResponse.json(
        { error: "Invalid user ID." },
        { status: 400 }
      );
    }

    const body = await request.json();

    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim().toLowerCase();
    const role = String(body.role ?? "");
    if (typeof body.isActive !== "boolean") {
      return Response.json(
        { error: "Invalid account status." },
        { status: 400 }
      );
    }

    const isActive = body.isActive;
    const password = String(body.password ?? "");

    if (!name || !email || !role) {
      return NextResponse.json(
        { error: "Name, email, and role are required." },
        { status: 400 }
      );
    }

    if (!allowedRoles.includes(role as (typeof allowedRoles)[number])) {
      return NextResponse.json(
        { error: "Invalid user role." },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      return NextResponse.json(
        { error: "User not found." },
        { status: 404 }
      );
    }

    const emailOwner = await prisma.user.findUnique({
      where: { email },
    });

    if (emailOwner && emailOwner.id !== userId) {
      return NextResponse.json(
        { error: "A user with this email already exists." },
        { status: 409 }
      );
    }

    const updateData: {
      name: string;
      email: string;
      role: (typeof allowedRoles)[number];
      isActive: boolean;
      password?: string;
    } = {
      name,
      email,
      role: role as (typeof allowedRoles)[number],
      isActive,
    };

    if (password) {
      if (password.length < 8) {
        return NextResponse.json(
          { error: "Password must be at least 8 characters." },
          { status: 400 }
        );
      }

      updateData.password = await bcrypt.hash(password, 12);
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        isActive: true,
      },
    });


    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);

    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}


