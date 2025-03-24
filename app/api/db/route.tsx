import { NextResponse } from "next/server";
import { Pool } from "pg";

// Create a PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

export async function GET() {
  try {
    // Try connecting to the database
    const client = await pool.connect();
    await client.query("SELECT 1"); // Test query
    client.release(); // Release the connection

    return NextResponse.json({ success: true, message: "Database connected successfully" });
  } catch (error) {
    return NextResponse.json({ success: false});
  }
}
