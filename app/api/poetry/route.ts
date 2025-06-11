import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/lib/db";

// GET: Fetch all verses
export async function GET() {
  try {
    const data = await pool.query(`
      SELECT id, content, poet, created_at, updated_at 
      FROM poetry_verse
      ORDER BY created_at DESC
    `);

    return NextResponse.json(data.rows, { status: 200 });
  } catch (error) {
    console.error("GET poetry_verse error:", error);
    return NextResponse.json(
      { message: "Failed to fetch poetry verses", error },
      { status: 500 }
    );
  }
}

// POST: Add a new verse
export async function POST(req: NextRequest) {
  try {
    const { content, poet } = await req.json();

    if (!content || !poet) {
      return NextResponse.json(
        { message: "Both 'content' and 'poet' fields are required." },
        { status: 400 }
      );
    }

    await pool.query(
      // Create table if not exists using the schema file
      `CREATE TABLE IF NOT EXISTS poetry_verse (
        id SERIAL PRIMARY KEY,
        content TEXT NOT NULL,
        poet TEXT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE (content)
      );`
    );

    // Check if the content already exists
    const checkContent = await pool.query(
      `SELECT id FROM poetry_verse WHERE content = $1`,
      [content]
    );
    
    if (checkContent.rows.length > 0) {
      return NextResponse.json(
        { message: "Content already exists" },
        { status: 400 }
      );
    }

    const result = await pool.query(
      `
      INSERT INTO poetry_verse (content, poet) 
       VALUES ($1, $2) 
       RETURNING id, content, poet, created_at, updated_at`,
      [content, poet]
    );


    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error("POST poetry_verse error:", error);
    return NextResponse.json(
      { message: "Failed to insert poetry verse", error },
      { status: 500 }
    );
  }
}
