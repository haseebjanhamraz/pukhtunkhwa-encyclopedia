import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/lib/db";

// GET: Fetch a user
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = await params;
  try {
    const data = await pool.query(`SELECT id, name, role, email, created_at, updated_at FROM users WHERE id = $1`, [id]);
    if (data.rows.length === 0) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "User fetched successfully", data: data.rows[0] }, { status: 200 });
  } catch (error) {
    console.error("GET user error:", error);
    return NextResponse.json(
      { message: "Failed to fetch user", error },
      { status: 500 }
    );
  }
}

// PUT: Update a user
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { name, role, email } = await req.json();
  try {
    const data = await pool.query(`UPDATE users SET name = $1, role = $2, email = $3 WHERE id = $4`, [name, role, email, id]);
    return NextResponse.json({ message: `User ${name} updated successfully` }, { status: 200 });
  } catch (error) {
    console.error("PUT user error:", error);
    return NextResponse.json(
      { message: "Failed to update user", error },
      { status: 500 }
    );
  }
}

// PUT: Update user password
export async function PUT_PASSWORD(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { password } = await req.json();
  try {
    const data = await pool.query(`UPDATE users SET password = $1 WHERE id = $2`, [password, id]);
    return NextResponse.json({ message: "User password updated successfully" }, { status: 200 });
  } catch (error) {
    console.error("PUT user password error:", error);
    return NextResponse.json(
      { message: "Failed to update user password", error },
      { status: 500 }
    );
  }
}

// DELETE: Delete a user
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const data = await pool.query(`DELETE FROM users WHERE id = $1`, [id]);
    return NextResponse.json({ message: `User ${id} deleted successfully` }, { status: 200 });
  } catch (error) {
    console.error("DELETE user error:", error);
    return NextResponse.json(
      { message: "Failed to delete user", error },
      { status: 500 }
    );
  }
}