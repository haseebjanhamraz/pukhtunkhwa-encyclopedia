import { NextRequest, NextResponse } from "next/server"
import { ObjectId } from "mongodb"

import clientPromise from "@/app/utils/MongoDB"

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    const client = await clientPromise
    const db = client.db("pukhtunkhwa")
    const collection = db.collection("districts")
    const district = await collection.findOne({ _id: new ObjectId(id) })
    if (!district) {
      return NextResponse.json(
        { message: "District not found" },
        { status: 404 }
      )
    }
    return NextResponse.json(district, { status: 200 })
  } catch (error) {
    console.error("Error fetching district:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
