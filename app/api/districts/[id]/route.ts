import { NextRequest, NextResponse } from "next/server"
import pool from "@/app/lib/db"

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    // Query with joins
    const result = await pool.query(`
      SELECT 
        c.*, 
        ARRAY_AGG(DISTINCT a.attraction) AS attractions,
        ARRAY_AGG(DISTINCT f.fact) AS fun_facts
      FROM cities c
      LEFT JOIN city_attractions a ON c.id = a.city_id
      LEFT JOIN city_fun_facts f ON c.id = f.city_id
      WHERE c.id = $1
      GROUP BY c.id
    `, [id])
    const district = result.rows[0]
    if (!district) {
      return NextResponse.json(
        { message: "City not found" },
        { status: 404 }
      )
    }
    return NextResponse.json(district, { status: 200 })
  } catch (error) {
    console.error("Error fetching city:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
