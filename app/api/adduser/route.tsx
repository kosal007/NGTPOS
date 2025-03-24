import { NextResponse } from "next/server";
import { Pool } from "pg";

// PostgreSQL Connection
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

// API to insert user data
export async function POST(req: Request) {
  try {
    const { name, email, password, role } = await req.json();

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json({ success: false, error: "All fields are required" }, { status: 400 });
    }

    const client = await pool.connect();

    // Insert data into "users" table
    const query = `
      INSERT INTO users (name, email, password, role)
      VALUES ($1, $2, $3, $4) RETURNING *;
    `;
    const values = [name, email, password, role || "customer"];

    const result = await client.query(query, values);
    client.release();

    return NextResponse.json({ success: true, message: "User added successfully", user: result.rows[0] });

  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
