import bcrypt from "bcryptjs"
import { OAuth2Client } from "google-auth-library"
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"

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
    CredentialsProvider({
      id: "google-jwt",
      name: "Google",
      credentials: {
        credential: { type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.credential) throw new Error("Missing Google token")

        try {
          const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
          const ticket = await client.verifyIdToken({
            idToken: credentials.credential,
            audience: process.env.GOOGLE_CLIENT_ID,
          })

          const payload = ticket.getPayload()
          if (!payload) throw new Error("Invalid Google token")

          // Reuse your existing user handling logic
          const mongoClient = await clientPromise
          const db = mongoClient.db("pukhtunkhwa")

          const existingUser = await db
            .collection("users")
            .findOne({ email: payload.email })

          // Same user creation/update logic as original Google provider
          if (!existingUser) {
            const newUser = await db.collection("users").insertOne({
              name: payload.name,
              email: payload.email,
              picture: payload.picture,
              sub: payload.sub,
              email_verified: payload.email_verified,
              given_name: payload.given_name,
              family_name: payload.family_name,
              locale: payload.locale,
              role: "user",
            })

            return {
              id: newUser.insertedId.toString(),
              ...payload,
              role: "user",
            }
          }

          return {
            id: existingUser._id.toString(),
            ...existingUser,
            role: existingUser.role,
          }
        } catch (error) {
          console.error("Google JWT verification failed:", error)
          return null
        }
      },
    }),

    // Original Google OAuth provider remains for regular flow
    Google({
      id: "google",
      name: "Google",
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile: async (profile) => {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: "user",
          sub: profile.sub,
          email_verified: profile.email_verified,
          given_name: profile.given_name,
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
