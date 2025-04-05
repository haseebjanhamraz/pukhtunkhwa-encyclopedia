import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

import User from "@/app/models/User"
import clientPromise from "@/app/utils/MongoDB"

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

    // Connect to MongoDB
    await clientPromise
    const client = await clientPromise
    const db = client.db("pukhtunkhwa")

    // Check if user already exists
    const existingUser = await db.collection("users").findOne({ email })
    if (existingUser) {
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
    const result = await db.collection("users").insertOne(userData)
    const insertedUser = {
      _id: result.insertedId,
      ...userData,
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: insertedUser._id,
        role: insertedUser.role,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "1d" }
    )

    // Return response without password
    const userResponse = {
      id: insertedUser._id,
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
