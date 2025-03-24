import { NextResponse } from "next/server";
import { Pool } from "pg";

// PostgreSQL Connection
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

// API to create "products" table
export async function GET() {
  try {
    const client = await pool.connect();

    const query = `
      CREATE TABLE IF NOT EXISTS products (
        ProductId SERIAL PRIMARY KEY,
        ProductName VARCHAR(255) NOT NULL,
        Price DECIMAL(10,2) NOT NULL,
        Image TEXT,
        Category VARCHAR(100) NOT NULL
      );
    `;

    await client.query(query);
    client.release();

    return NextResponse.json({ success: true, message: "Products table created successfully" });

  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
