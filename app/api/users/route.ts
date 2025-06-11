import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/lib/db";
import bcrypt from "bcryptjs";

export async function GET(req: NextRequest) {
  try {
    const data = await pool.query(`SELECT id, name, role, email, created_at, updated_at FROM users`);
    return NextResponse.json({ message: "Users fetched successfully", data: data.rows }, { status: 200 });
  } catch (error) {
    console.error("GET users error:", error);
    return NextResponse.json(
      { message: "Failed to fetch users", error },
      { status: 500 }
    );
  }
}

// POST: Create a new user
export async function POST(req: NextRequest) {
  const { name, role, email, password } = await req.json();
  try {
    // Check if the user already exists, check by email
    const checkUser = await pool.query(`SELECT id FROM users WHERE email = $1`, [email]);
    if (checkUser.rows.length > 0) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const data = await pool.query(
      `INSERT INTO users (name, role, email, password, created_at, updated_at) 
       VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
       RETURNING id, name, role, email, created_at, updated_at`,
      [name, role, email, hashedPassword]
    );

    return NextResponse.json({ message: `User ${name} created successfully`, data: data.rows[0] }, { status: 201 });
  } catch (error) {
    console.error("POST user error:", error);
    return NextResponse.json(
      { message: "Failed to create user", error },
      { status: 500 }
    );
  }
}