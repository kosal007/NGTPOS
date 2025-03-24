import { NextResponse } from "next/server";
import { Pool } from "pg";

// PostgreSQL Connection
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

export async function GET() {
  try {
    const client = await pool.connect();

    // SQL Query to create the "business" table
    const query = `
      CREATE TABLE IF NOT EXISTS business (
        BusinessId SERIAL PRIMARY KEY,
        BusinessName VARCHAR(255) NOT NULL,
        ContactNumber VARCHAR(20) NOT NULL,
        Address TEXT NOT NULL,
        CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await client.query(query);
    client.release(); // Release connection

    return NextResponse.json({ success: true, message: "Business table created successfully" });
  } catch (error) {
    return NextResponse.json({ success: false });
  }
}
