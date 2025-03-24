import { NextResponse } from "next/server";
import { Pool } from "pg";

// PostgreSQL Connection
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

export async function GET() {
  try {
    const client = await pool.connect();

    // SQL Query to create the "users" table
    const query = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role VARCHAR(50) DEFAULT 'customer',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await client.query(query);
    client.release(); // Release connection

    return NextResponse.json({ success: true, message: "Users table created successfully" });
  } catch (error) {
    return NextResponse.json({ success: false});
  }
}
