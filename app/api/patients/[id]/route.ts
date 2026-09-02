import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/auth";
import { hasPermission } from "@/lib/auth/permissions";
import { patientRepository } from "@/repositories/patientRepository";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    if (!hasPermission(session.user.role, "EDIT_PATIENT")) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    const { id } = await params;
    const body = await request.json();

    const legacyName = [
      body.firstName,
      body.middleName,
      body.lastName,
    ]
      .map((part) => part?.trim())
      .filter(Boolean)
      .join(" ");

    const patient = await patientRepository.update(Number(id), {
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

    return NextResponse.json(patient);
  } catch (error) {
    console.error("Error updating patient:", error);

    return NextResponse.json(
      { error: "Failed to update patient" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    if (!hasPermission(session.user.role, "DELETE_PATIENT")) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    const { id } = await params;

    await patientRepository.delete(Number(id));

    return NextResponse.json({
      message: "Patient deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting patient:", error);

    return NextResponse.json(
      { error: "Failed to delete patient" },
      { status: 500 }
    );
  }
}
