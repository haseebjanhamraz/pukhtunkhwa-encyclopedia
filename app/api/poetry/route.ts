import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/app/utils/MongoDB";
import poetrySchema from "@/app/models/Poetry";



export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const client = await clientPromise;
    const db = client.db("pukhtunkhwa");
    const collection = db.collection("poetry");
    const data = await collection.find({}).toArray();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("MongoDB connection error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest, res: NextResponse) {

  try {
    const client = await clientPromise;
    const db = client.db("pukhtunkhwa");
    const collection = db.collection("poetry");
    const body = await req.json();
    const poetry = new poetrySchema(body);
    const result = await collection.insertOne(poetry);
    return NextResponse.json(
      { message: "Poetry created successfully", id: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error("MongoDB connection error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}