import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/auth";
import { hasPermission } from "@/lib/auth/permissions";
import { prisma } from "@/lib/prisma";
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

    return NextResponse.json(patients);
  } catch (error) {
    console.error("Error fetching patients:", error);

    return NextResponse.json(
      { error: "Failed to fetch patients" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    if (!hasPermission(session.user.role, "CREATE_PATIENT")) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    const body = await request.json();

    const legacyName = [
      body.firstName,
      body.middleName,
      body.lastName,
    ]
      .map((part) => part?.trim())
      .filter(Boolean)
      .join(" ");

    const patient = await patientRepository.create({
      // Structured patient identity
      mrn: body.mrn || null,
      firstName: body.firstName || null,
      middleName: body.middleName || null,
      lastName: body.lastName || null,
      preferredName: body.preferredName || null,

      // Temporary compatibility field
      name: legacyName,

      // Demographics
      dob: body.dob,
      sexAtBirth: body.sexAtBirth || null,
      genderIdentity: body.genderIdentity || null,
      pronouns: body.pronouns || null,

      // Clinical / discharge information
      diagnosis: body.diagnosis,
      dischargeDate: body.dischargeDate,

      // Safety checklist
      medicationReconciled: body.medicationReconciled,
      followUpScheduled: body.followUpScheduled,
      pendingTests: body.pendingTests,
      providerAssigned: body.providerAssigned,
      dischargeInstructionsGiven: body.dischargeInstructionsGiven,
      homeCareReferral: body.homeCareReferral,

      issue: body.issue,
      score: body.score,
      risk: body.risk,
    });

    await prisma.auditLog.create({
      data: {
        actorUserId: Number(session.user.id),
        actorName: session.user.name ?? "Unknown User",
        actorEmail: session.user.email ?? "Unknown Email",
        actorRole: session.user.role,
        action: "PATIENT_CREATED",
        entityType: "PATIENT",
        entityId: String(patient.id),
        description: `${session.user.name ?? "Unknown User"} created patient ${patient.name}.`,
      },
    });

    return NextResponse.json(patient, { status: 201 });
  } catch (error) {
    console.error("Error creating patient:", error);

    return NextResponse.json(
      { error: "Failed to create patient" },
      { status: 500 }
    );
  }
}
