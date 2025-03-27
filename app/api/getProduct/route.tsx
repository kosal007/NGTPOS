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

//update delete
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const {
      productName,
      price,
      cost,
      initialQuantity,
      sku,
      barcode,
      supplier,
      warehouse,
      category
    } = await request.json();

    const client = await pool.connect();
    
    const query = `
      UPDATE products SET
        ProductName = $1,
        Price = $2,
        Cost = $3,
        InitialQuantity = $4,
        SKU = $5,
        Barcode = $6,
        Supplier = $7,
        Warehouse = $8,
        Category = $9
      WHERE ProductId = $10
      RETURNING *;
    `;

    const values = [
      productName,
      parseFloat(price),
      parseFloat(cost),
      parseInt(initialQuantity),
      sku,
      barcode,
      supplier,
      warehouse,
      category,
      params.id
    ];

    const result = await client.query(query, values);
    client.release();

    return NextResponse.json({
      success: true,
      product: result.rows[0]
    });

  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const client = await pool.connect();
    
    const query = `
      DELETE FROM products
      WHERE ProductId = $1
      RETURNING *;
    `;

    const result = await client.query(query, [params.id]);
    client.release();

    return NextResponse.json({
      success: true,
      product: result.rows[0]
    });

  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}