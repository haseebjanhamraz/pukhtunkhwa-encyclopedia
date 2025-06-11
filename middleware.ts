import { NextResponse, type NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

const AUTHENTICATED_ROUTES = ["/dashboard", "/admin"] // Add routes that require authentication
const ADMIN_ROUTES = ["/admin"] // Add routes that require admin access
const PROTECTED_API_ROUTES = ["/api/districts", "/api/users"] // Add API routes that need protection

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  // Check if the route requires authentication
  const isAuthenticatedRoute = AUTHENTICATED_ROUTES.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  )

  // Check if the route is a protected API route
  const isProtectedApiRoute = PROTECTED_API_ROUTES.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  )

  // Handle API route protection - only for POST, PUT, DELETE methods
  if (isProtectedApiRoute && (req.method === "POST" || req.method === "PUT" || req.method === "DELETE")) {
    if (!token) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      )
    }

    // For admin routes, check for admin role
    if (req.nextUrl.pathname.startsWith("/api/admin")) {
      if (token.role !== "admin") {
        return NextResponse.json(
          { error: "Admin access required" },
          { status: 403 }
        )
      }
    }

    // Add user info to request headers
    const requestHeaders = new Headers(req.headers)
    requestHeaders.set("x-user-id", token.id as string)
    requestHeaders.set("x-user-role", token.role as string)

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })
  }

  // Handle regular route protection
  if (isAuthenticatedRoute) {
    if (!token) {
      // Redirect to login if not authenticated
      const loginUrl = new URL("/login", req.url)
      loginUrl.searchParams.set("callbackUrl", req.url) // Save the original URL for redirection after login
      return NextResponse.redirect(loginUrl)
    }

    // Check if the route requires admin access
    const isAdminRoute = ADMIN_ROUTES.some((route) =>
      req.nextUrl.pathname.startsWith(route)
    )

    if (isAdminRoute && token.role !== "admin") {
      // Redirect to unauthorized page if the user is not an admin
      return NextResponse.redirect(new URL("/user", req.url))
    }
  }

  // Allow the request to proceed
  return NextResponse.next()
}

// Apply the middleware to specific routes
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/api/districts/:path*",
    "/api/users/:path*",
    "/api/admin/:path*"
  ],
}
