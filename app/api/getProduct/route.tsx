import { NextResponse } from "next/server";
import { Pool } from "pg";

// PostgreSQL Connection
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

// API to get all products
export async function GET() {
  try {
    const client = await pool.connect();

    const query = `SELECT * FROM products ORDER BY ProductId ASC;`;
    const result = await client.query(query);
    client.release(); // Release connection

    return NextResponse.json({ success: true, products: result.rows });

  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
