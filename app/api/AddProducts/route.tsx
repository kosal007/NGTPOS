import { NextResponse } from "next/server";
import { Pool } from "pg";

// PostgreSQL Connection
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

// API to insert product data
export async function POST(req: Request) {
  try {
    const { ProductName, Price, Image, Category } = await req.json();

    // Validate input
    if (!ProductName || !Price || !Category) {
      return NextResponse.json({ success: false, error: "All fields are required" }, { status: 400 });
    }

    const client = await pool.connect();

    const query = `
      INSERT INTO products (ProductName, Price, Image, Category)
      VALUES ($1, $2, $3, $4) RETURNING *;
    `;

    const values = [ProductName, Price, Image || "", Category];

    const result = await client.query(query, values);
    client.release();

    return NextResponse.json({ success: true, message: "Product added successfully", product: result.rows[0] });

  } catch (error) {
    return NextResponse.json({ success: false}, { status: 500 });
  }
}
