import { NextResponse } from "next/server";
import { Pool } from "pg";

// PostgreSQL Connection
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

// API to insert business data
export async function POST(req: Request) {
  try {
    const { businessName, contactNumber, address } = await req.json();

    // Validate input
    if (!businessName || !contactNumber || !address) {
      return NextResponse.json({ success: false, error: "All fields are required" }, { status: 400 });
    }

    const client = await pool.connect();

    // Insert into "business" table
    const query = `
      INSERT INTO business (BusinessName, ContactNumber, Address) 
      VALUES ($1, $2, $3) RETURNING *;
    `;

    const values = [businessName, contactNumber, address];

    const result = await client.query(query, values);
    client.release(); // Release connection

    return NextResponse.json({ success: true, message: "Business added successfully", business: result.rows[0] });

  } catch (error) {
    return NextResponse.json({ success: false}, { status: 500 });
  }
}
