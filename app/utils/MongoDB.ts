import { MongoClient, ServerApiVersion } from "mongodb"

if (!process.env.MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable in your .env.local file"
  )
}

const uri = process.env.MONGODB_URI

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
})

let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === "development") {
  if (!(global as any)._mongoClientPromise) {
    ;(global as any)._mongoClientPromise = client.connect()
  }
  clientPromise = (global as any)._mongoClientPromise
} else {
  clientPromise = client.connect()
}

export default clientPromise
