import { NextResponse } from "next/server";
import { Pool } from "pg";

// PostgreSQL Connection
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

// API to create or update "products" table
export async function GET() {
  try {
    const client = await pool.connect();

    // Ensure table exists
    const createQuery = `
      CREATE TABLE IF NOT EXISTS products (
        ProductId SERIAL PRIMARY KEY,
        ProductName VARCHAR(255) NOT NULL,
        Price DECIMAL(10,2) NOT NULL,
        Image TEXT,
        Category VARCHAR(100) NOT NULL
      );
    `;
    await client.query(createQuery);

    // Add new columns if they don’t exist, setting default values for NOT NULL constraints
    const alterQueries = [
      `ALTER TABLE products ADD COLUMN IF NOT EXISTS Cost DECIMAL(10,2) DEFAULT 0 NOT NULL`,
      `ALTER TABLE products ADD COLUMN IF NOT EXISTS InitialQuantity INT DEFAULT 0 NOT NULL`,
      `ALTER TABLE products ADD COLUMN IF NOT EXISTS SKU VARCHAR(50) UNIQUE DEFAULT 'UNKNOWN' NOT NULL`,
      `ALTER TABLE products ADD COLUMN IF NOT EXISTS Barcode INT UNIQUE DEFAULT 0 NOT NULL`,
      `ALTER TABLE products ADD COLUMN IF NOT EXISTS Supplier VARCHAR(255) DEFAULT 'UNKNOWN' NOT NULL`,
      `ALTER TABLE products ADD COLUMN IF NOT EXISTS Warehouse VARCHAR(255) DEFAULT 'UNKNOWN' NOT NULL`
    ];

    // Execute each ALTER TABLE statement separately
    for (const query of alterQueries) {
      await client.query(query);
    }

    client.release();
    return NextResponse.json({ success: true, message: "Products table updated successfully" });

  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
