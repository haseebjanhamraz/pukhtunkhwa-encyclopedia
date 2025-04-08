import "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null
      email?: string | null
      image?: string | null
      role?: string
      id?: string
    }
  }

  interface User {
    id: string
    role: string
  }
  interface GoogleSignIn {
    response: string
    credential: string
    id: string
    name: string
    email: string
    picture: string
    sub: string
    email_verified: boolean
    given_name: string
    family_name: string
    locale: string
    role: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string
    id?: string
  }
}
