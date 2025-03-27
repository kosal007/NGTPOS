import { NextResponse } from "next/server";
import { Pool } from "pg";
import { NextRequest } from "next/server"; // Import NextRequest type
// PostgreSQL Connection
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

// API to insert product data
export async function POST(req: NextRequest ) {
  try {
    // Parse JSON request body
    const {
      productName,
      price,
      cost,
      initialQuantity,
      sku,
      barcode,
      supplier,
      warehouse,
      image,
      category
    } = await req.json();

    // Validate input
    if (!productName || !price || !cost || !initialQuantity || !sku || !barcode || !supplier || !warehouse || !category) {
      return NextResponse.json({ success: false, error: "All fields are required" }, { status: 400 });
    }

    // Connect to PostgreSQL
    const client = await pool.connect();

    // Insert data into "products" table
    const query = `
      INSERT INTO products (ProductName, Price, Cost, InitialQuantity, SKU, Barcode, Supplier, Warehouse, Image, Category)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *;
    `;

    // Prepare query values
    const values = [productName, price, cost, initialQuantity, sku, barcode, supplier, warehouse, image || null, category];

    // Execute query
    const result = await client.query(query, values);
    client.release();

    // Return success response
    return NextResponse.json({ success: true, message: "Product added successfully", product: result.rows[0] });

  } catch (error) {
    console.error("Error inserting product:", error); // Log the error for debugging
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
