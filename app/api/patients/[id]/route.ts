import { NextRequest, NextResponse } from "next/server";
import { patientRepository } from "@/repositories/patientRepository";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const patient = await patientRepository.update(Number(id), {
      name: body.name,
      dob: body.dob,
      diagnosis: body.diagnosis,
      dischargeDate: body.dischargeDate,
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