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


// PUT: Update a district
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { name, image, latitude, longitude, population, area, description, history, attractions, fun_facts } = await req.json()
  const client = await pool.connect()

  try {
    await client.query('BEGIN')

    // Update the main city record and city attraction and city fun facts if provided
    // If not provided, keep the existing values
    const result = await client.query(
      `UPDATE cities 
       SET name = $1, image = $2, latitude = $3, longitude = $4, 
           population = $5, area = $6, description = $7, history = $8
       WHERE id = $9
       RETURNING id`,
      [name, image, latitude, longitude, population, area, description, history, id]
    )

    // Check if the city was updated
    if (result.rowCount === 0) {
      await client.query('ROLLBACK')
      return NextResponse.json({ message: "City not found" }, { status: 404 })
    }
    // Insert new attractions if provided
    if (attractions && Array.isArray(attractions)) {
      for (const attraction of attractions) {
        await client.query(
          'INSERT INTO city_attractions (city_id, attraction) VALUES ($1, $2)',
          [id, attraction]
        )
      }
    }


    // Insert new attractions and fun facts if provided
    if (attractions && Array.isArray(attractions)) {
      for (const attraction of attractions) {
        await client.query(
          'INSERT INTO city_attractions (city_id, attraction) VALUES ($1, $2)',
          [id, attraction]
        )
      }
    }

    if (fun_facts && Array.isArray(fun_facts)) {
      for (const fact of fun_facts) {
        await client.query(
          'INSERT INTO city_fun_facts (city_id, fact) VALUES ($1, $2)',
          [id, fact]
        )
      }
    }

    await client.query('COMMIT')
    return NextResponse.json({ message: `City ${name} updated successfully` }, { status: 200 })
  } catch (error) {
    await client.query('ROLLBACK')
    console.error("Error updating city:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  } finally {
    client.release()
  }
}

// DELETE: Delete a district
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const result = await pool.query(`DELETE FROM cities WHERE id = $1`, [id])
    if (result.rowCount === 0) {
      return NextResponse.json({ message: "City not found" }, { status: 404 })
    }
    return NextResponse.json({ message: `City ${id} deleted successfully` }, { status: 200 })
  } catch (error) {
    console.error("Error deleting city:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}