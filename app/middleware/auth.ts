import jwt from "jsonwebtoken"

import User from "../models/User"
import clientPromise from "../utils/MongoDB"

interface JwtPayload {
  userId: string
}

export async function verifyAuth(req: Request, allowedRoles: string[]) {
  try {
    const authHeader = req.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return {
        error: "Unauthorized - No token provided",
        status: 401,
      }
    }

    const token = authHeader.split(" ")[1]
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload

    await clientPromise
    const user = await User.findById(decoded.userId)

    if (!user) {
      return {
        error: "User not found",
        status: 404,
      }
    }

    if (!allowedRoles.includes(user.role)) {
      return {
        error: "Unauthorized - Insufficient permissions",
        status: 403,
      }
    }

    return { user }
  } catch (error) {
    return {
      error: "Invalid token",
      status: 401,
    }
  }
}
