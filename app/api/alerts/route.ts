import { NextResponse } from "next/server";
import { patientRepository } from "@/repositories/patientRepository";
import { generateAlertsForPatients } from "@/lib/alertGenerator";

export async function GET() {
  try {
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