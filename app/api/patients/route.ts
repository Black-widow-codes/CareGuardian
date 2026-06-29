import { NextResponse } from "next/server";
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