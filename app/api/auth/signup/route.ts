import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

import { pgClient } from "@/app/lib/pg"

export async function POST(req: Request) {
  try {
    const { name, email, password, role } = await req.json()

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      )
    }

    // Validate password strength
    if (password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters long" },
        { status: 400 }
      )
    }

    // Connect to database if not already connected
    await pgClient.connect()

    // Create users table if it doesn't exist
    await pgClient.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) NOT NULL,
        created_at TIMESTAMP NOT NULL,
        updated_at TIMESTAMP NOT NULL
      )
    `)

    // Check if user already exists
    const existingUserResult = await pgClient.query("SELECT * FROM users WHERE email = $1", [email])
    if (existingUserResult.rows.length > 0) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 } // 409 Conflict is more appropriate for duplicate resources
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Create user
    const userData = {
      name,
      email,
      password: hashedPassword,
      role: role || "subscriber",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    // Insert user into database
    const result = await pgClient.query(
      "INSERT INTO users (name, email, password, role, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", 
      [name, email, hashedPassword, role || "subscriber", new Date(), new Date()]
    )
    const insertedUser = {
      id: result.rows[0].id,
      name: result.rows[0].name,
      email: result.rows[0].email,
      role: result.rows[0].role,
      created_at: result.rows[0].created_at,
      updated_at: result.rows[0].updated_at,
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: insertedUser.id,
        role: insertedUser.role,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    )

    // Return response without password
    const userResponse = {
      id: insertedUser.id,
      name: insertedUser.name,
      email: insertedUser.email,
      role: insertedUser.role,
    }

    return NextResponse.json(
      {
        user: userResponse,
        token,
      },
      { status: 201 }
    ) // 201 Created for successful resource creation
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
