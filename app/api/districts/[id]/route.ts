import { MongoClient, ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const uri = process.env.MONGODB_URI || "";
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  if (!(global as any)._mongoClientPromise) {
    client = new MongoClient(uri);
    (global as any)._mongoClientPromise = client.connect();
  }
  clientPromise = (global as any)._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const client = await clientPromise;
    const db = client.db("pukhtunkhwa");
    const collection = db.collection("districts");
    const district = await collection.findOne({ _id: new ObjectId(params.id) });

    if (!district) {
      return NextResponse.json(
        { message: "District not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(district, { status: 200 });
  } catch (error) {
    console.error("MongoDB connection error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const client = await clientPromise;
    const db = client.db("pukhtunkhwa");
    const collection = db.collection("districts");
    const body = await request.json();

    const result = await collection.updateOne(
      { _id: new ObjectId(params.id) },
      { $set: body }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { message: "District not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: `${body.name} updated successfully` },
      { status: 200 }
    );
  } catch (error) {
    console.error("MongoDB connection error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const client = await clientPromise;
    const db = client.db("pukhtunkhwa");
    const collection = db.collection("districts");

    const result = await collection.deleteOne({ _id: new ObjectId(params.id) });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { message: "District not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "District deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("MongoDB connection error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
