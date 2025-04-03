import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/app/utils/MongoDB";
import Poetry from "@/app/models/Poetry";
import { PoetrySchema } from "@/app/schemas/Poetry";

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
      { message: "Internal Server Error", error: error },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const client = await clientPromise;
    const db = client.db("pukhtunkhwa");
    const collection = db.collection("poetry");
    try{
      const body = await req.json();
      const parsedBody = PoetrySchema.parse(body);
      const poetry = new Poetry(parsedBody);
      
  
      const result = await collection.insertOne(poetry);
      return NextResponse.json(
        { message: "Poetry created successfully", id: result.insertedId },
        { status: 201 }
      );
    } catch (error: any) {
      console.error("Error creating poetry:", `${error.issues[0].path} ${error.issues[0].message}`);
      return NextResponse.json(
        { message: "Error creating poetry:", error: `${error.issues[0].path} ${error.issues[0].message}` },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("MongoDB connection error:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error },
      { status: 500 }
    );
  }
}