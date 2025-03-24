import { NextResponse } from "next/server";
import { Pool } from "pg";

// PostgreSQL Connection
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

// API to fetch users
export async function GET() {
  try {
    const client = await pool.connect();

    // Fetch all users from the "users" table
    const result = await client.query("SELECT * FROM users");
    client.release();

    return NextResponse.json({ success: true, users: result.rows });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
