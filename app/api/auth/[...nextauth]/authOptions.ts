import bcrypt from "bcryptjs"
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"

import User from "@/app/models/User"
import clientPromise from "@/app/utils/MongoDB"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials || {}

        console.log("Credentials received:", { email, password })

        if (!email || !password) {
          console.error("Missing email or password")
          throw new Error("Missing email or password")
        }

        try {
          const client = await clientPromise
          const db = client.db("pukhtunkhwa")

          const user = await db.collection("users").findOne({ email })
          if (!user) {
            console.error("No user found with this email:", email)
            throw new Error("No user found with this email")
          }

          const isValidPassword = await bcrypt.compare(password, user.password)
          if (!isValidPassword) {
            console.error("Invalid password for email:", email)
            throw new Error("Invalid password")
          }

          console.log("User authenticated successfully:", user)
          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
          }
        } catch (error) {
          console.error("Authorize error:", error)
          throw new Error("Invalid email or password")
        }
      },
    }),

    Google({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      async profile(profile) {
        const { email, name } = profile
        const client = await clientPromise
        const db = client.db("pukhtunkhwa")

        const existingUser = await db.collection("users").findOne({ email })
        if (!existingUser) {
          const newUser = await db.collection("users").insertOne({
            name,
            email,
            role: "user",
          })
          return {
            id: newUser.insertedId.toString(),
            name,
            email,
            role: "user",
          }
        }
        return {
          id: existingUser._id.toString(),
          name: existingUser.name,
          email: existingUser.email,
          role: existingUser.role,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role
        session.user.id = token.id
      }
      return session
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
}
