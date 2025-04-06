import { NextResponse, type NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

const AUTHENTICATED_ROUTES = ["/dashboard"] // Add routes that require authentication
const ADMIN_ROUTES = ["/admin"] // Add routes that require admin access

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  // Check if the route requires authentication
  const isAuthenticatedRoute = AUTHENTICATED_ROUTES.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  )

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
      return NextResponse.redirect(new URL("/unauthorized", req.url))
    }
  }
  // If user is authenticated and trying to access /login
  if (token && req.nextUrl.pathname === "/login") {
    return NextResponse.redirect(new URL("/", req.url))
  }

  // Allow the request to proceed
  return NextResponse.next()
}

// Apply the middleware to specific routes
export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"], // Define the routes where the middleware should run
}
