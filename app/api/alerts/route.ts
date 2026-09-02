import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { hasPermission } from "@/lib/auth/permissions";
import { generateAlertsForPatients } from "@/lib/alertGenerator";
import { patientRepository } from "@/repositories/patientRepository";

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    if (!hasPermission(session.user.role, "VIEW_PATIENTS")) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    const patients = await patientRepository.findAll();
    const alerts = generateAlertsForPatients(patients);

    return NextResponse.json(alerts);
  } catch (error) {
    console.error("Error fetching alerts:", error);

    return NextResponse.json(
      { error: "Failed to fetch alerts" },
      { status: 500 }
    );
  }
}