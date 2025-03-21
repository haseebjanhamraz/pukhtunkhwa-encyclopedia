import { MongoClient } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

if (!process.env.MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable in your .env.local file"
  );
}

const uri: string = process.env.MONGODB_URI;
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// In development mode, use a global variable to preserve the connection between module reloads.
if (process.env.NODE_ENV === "development") {
  if (!(global as any)._mongoClientPromise) {
    client = new MongoClient(uri);
    (global as any)._mongoClientPromise = client.connect();
  }
  clientPromise = (global as any)._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default async function handler(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("pukhtunkhwa");
    const collection = db.collection("districts");

    if (req.method === "GET") {
      const data = await collection.find({}).toArray();
      return NextResponse.json(data, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Method Not Allowed" },
        { status: 405 }
      );
    }
  } catch (error) {
    console.error("MongoDB connection error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
