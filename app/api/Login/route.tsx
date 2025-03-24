import { NextResponse } from "next/server";
import { Pool } from "pg";

// PostgreSQL Connection
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

// API to handle user login
export async function POST(req: Request) {
  try {
    const { name, password } = await req.json();

    // Validate input
    if (!name || !password) {
      return NextResponse.json({ success: false, error: "Name and password are required" }, { status: 400 });
    }

    const client = await pool.connect();

    // Query to check if user exists
    const query = `SELECT * FROM users WHERE name = $1 AND password = $2;`;
    const values = [name, password];

    const result = await client.query(query, values);
    client.release(); // Release connection

    // Check if user exists
    if (result.rows.length === 0) {
      return NextResponse.json({ success: false, error: "Invalid name or password" }, { status: 401 });
    }

    return NextResponse.json({ success: true, message: "Login successful", user: result.rows[0] });

  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
