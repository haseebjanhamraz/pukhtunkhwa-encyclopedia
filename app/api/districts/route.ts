  // app/api/cities/route.ts

import { NextRequest, NextResponse } from "next/server"
import pool from "@/app/lib/db"

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT 
        c.*, 
        ARRAY_AGG(DISTINCT a.attraction) AS attractions,
        ARRAY_AGG(DISTINCT f.fact) AS fun_facts
      FROM cities c
      LEFT JOIN city_attractions a ON c.id = a.city_id
      LEFT JOIN city_fun_facts f ON c.id = f.city_id
      GROUP BY c.id
    `)

    return NextResponse.json(result.rows, { status: 200 })
  } catch (error) {
    console.error("GET error:", error)
    return NextResponse.json({ message: "Error fetching cities" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const client = await pool.connect()
  try {
    const {
      name,
      image,
      latitude,
      longitude,
      population,
      area,
      description,
      history,
      mustVisit,
      attractions = [],
      funFacts = []
    } = await req.json()

    await client.query("BEGIN")

    const insertCity = await client.query(
      `INSERT INTO cities 
        (name, image, latitude, longitude, population, area, description, history, must_visit)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING id`,
      [
        name,
        image,
        latitude,
        longitude,
        population,
        area,
        description,
        history,
        mustVisit ?? false
      ]
    )

    const cityId = insertCity.rows[0].id

    // Insert attractions
    for (const attraction of attractions) {
      await client.query(
        "INSERT INTO city_attractions (city_id, attraction) VALUES ($1, $2)",
        [cityId, attraction]
      )
    }

    // Insert fun facts
    for (const fact of funFacts) {
      await client.query(
        "INSERT INTO city_fun_facts (city_id, fact) VALUES ($1, $2)",
        [cityId, fact]
      )
    }

    await client.query("COMMIT")

    return NextResponse.json(
      { message: "City added successfully", cityId },
      { status: 201 }
    )
  } catch (error) {
    await client.query("ROLLBACK")
    console.error("POST error:", error)
    return NextResponse.json({ message: "Failed to add city" }, { status: 500 })
  } finally {
    client.release()
  }
}
