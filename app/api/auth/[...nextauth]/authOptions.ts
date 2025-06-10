import bcrypt from "bcryptjs"
import { OAuth2Client } from "google-auth-library"
import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"

import { pgClient } from "@/app/lib/pg"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.error("Missing email or password")
          throw new Error("Missing email or password")
        }

        try {
          console.log("Attempting to authorize user:", credentials.email)
          await pgClient.connect()
          
          const userResult = await pgClient.query(
            "SELECT * FROM users WHERE email = $1",
            [credentials.email]
          )

          if (!userResult.rows.length) {
            console.error("No user found with email:", credentials.email)
            throw new Error("No user found with this email")
          }

          const user = userResult.rows[0]
          console.log("Found user:", { id: user.id, email: user.email, role: user.role })

          const isValidPassword = await bcrypt.compare(
            credentials.password,
            user.password
          )

          if (!isValidPassword) {
            console.error("Invalid password for email:", credentials.email)
            throw new Error("Invalid password")
          }

          return {
            id: user.id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
          }
        } catch (error) {
          console.error("Authorize error:", error)
          throw error
        }
      },
    }),

    // Original Google OAuth provider remains for regular flow
    Google({
      id: "google",
      name: "Google",
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile(profile) {
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
  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXTAUTH_SECRET,
}
