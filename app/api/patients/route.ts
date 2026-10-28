import { NextResponse } from "next/server";
import { sql } from "../../../lib/db";

export async function GET() {
  try {
    const patients = await sql`
      SELECT id, patient_code, full_name, date_of_birth,
             gender, phone, address, created_at
      FROM patients
      ORDER BY id DESC
    `;

    return NextResponse.json(patients);
  } catch (error) {
    console.error("GET patients error:", error);
    return NextResponse.json(
      { message: "Failed to load patients." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      patient_code,
      full_name,
      date_of_birth,
      gender,
      phone,
      address,
    } = body;

    if (
      typeof patient_code !== "string" || !patient_code.trim() ||
      typeof full_name !== "string" || !full_name.trim()
    ) {
      return NextResponse.json(
        { message: "Patient code and full name are required." },
        { status: 400 }
      );
    }

    const patients = await sql`
      INSERT INTO patients (
        patient_code, full_name, date_of_birth,
        gender, phone, address
      )
      VALUES (
        ${patient_code.trim()},
        ${full_name.trim()},
        ${date_of_birth || null},
        ${gender || null},
        ${phone || null},
        ${address || null}
      )
      RETURNING id, patient_code, full_name, date_of_birth,
                gender, phone, address, created_at
    `;

    return NextResponse.json(patients[0], { status: 201 });
  } catch (error) {
    console.error("POST patients error:", error);
    return NextResponse.json(
      { message: "Failed to save patient." },
      { status: 500 }
    );
  }
}
