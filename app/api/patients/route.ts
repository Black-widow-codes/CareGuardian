import { NextRequest, NextResponse } from "next/server";
import { patientRepository } from "@/repositories/patientRepository";

export async function GET() {
  try {
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
    const body = await request.json();

    const patient = await patientRepository.create({
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

    return NextResponse.json(patient, { status: 201 });
  } catch (error) {
    console.error("Error creating patient:", error);

    return NextResponse.json(
      { error: "Failed to create patient" },
      { status: 500 }
    );
  }
}

