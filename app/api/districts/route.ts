import { NextRequest, NextResponse } from "next/server"

import District from "@/app/models/District"
import clientPromise from "@/app/utils/MongoDB"

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const client = await clientPromise
    const db = client.db("pukhtunkhwa")
    const collection = db.collection("districts")
    const data = await collection.find({}).toArray()
    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    console.error("MongoDB connection error:", error)
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const client = await clientPromise
    const db = client.db("pukhtunkhwa")
    const collection = db.collection("districts")
    const body = await req.json()
    const district = new District(body)
    const result = await collection.insertOne(district)
    return NextResponse.json(
      { message: "District created successfully", id: result.insertedId },
      { status: 201 }
    )
  } catch (error) {
    console.error("MongoDB connection error:", error)
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    )
  }
}
