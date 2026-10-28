
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
