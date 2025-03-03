import { type NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth";
// import { createMiddleware } from "@/lib/auth-client"

// Define protected routes and their requirements
const protectedRoutes = {
  // Dashboard routes
  "/dashboard": { requireAuth: true, requireVerified: true },
  "/dashboard/:path*": { requireAuth: true, requireVerified: true },
  "/tasks": { requireAuth: true, requireVerified: true },
  "/tasks/:path*": { requireAuth: true, requireVerified: true },
  "/calendar": { requireAuth: true, requireVerified: true },
  "/team": { requireAuth: true, requireVerified: true },
  "/team/:path*": { requireAuth: true, requireVerified: true },
  "/settings": { requireAuth: true, requireVerified: true },

  // API routes
  "/api/tasks": { requireAuth: true, requireVerified: true },
  "/api/team": { requireAuth: true, requireVerified: true },

  // Auth routes (inverse protection - redirect if already authenticated)
  "/sign-in": { requireAuth: false, isAuthRoute: true },
  "/sign-up": { requireAuth: false, isAuthRoute: true },
};

// Public routes that don't require authentication
const publicRoutes = [
  "/",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
  "/verify-email",
  "/api/auth/callback",
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public routes
  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Get session and user data
  const sessionCookie = getSessionCookie(request);
  let userData = null;

  try {
    if (sessionCookie) {
      // Decode and verify the session cookie
      userData = JSON.parse(atob(sessionCookie.split(".")[1]));
    }
  } catch (error) {
    console.error("Error parsing session:", error);
  }

  // Find matching protected route configuration
  const matchedRoute = Object.entries(protectedRoutes).find(([route, _]) => {
    if (route.includes(":path*")) {
      const basePath = route.split("/:path*")[0];
      return pathname.startsWith(basePath);
    }
    return pathname === route;
  });

  if (matchedRoute) {
    const [_, config] = matchedRoute;

    // Handle auth routes (sign-in, sign-up)
    if (config.isAuthRoute && sessionCookie) {
      // Redirect authenticated users to dashboard
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // Check authentication
    if (config.requireAuth && !sessionCookie) {
      // Save the original URL to redirect back after login
      const callbackUrl = encodeURIComponent(request.url);
      return NextResponse.redirect(
        new URL(`/sign-in?callbackUrl=${callbackUrl}`, request.url)
      );
    }

    // Check email verification
    if (config.requireVerified && userData && !userData.emailVerified) {
      return NextResponse.redirect(new URL("/email-not-verified", request.url));
    }

    // Add user data to headers for server components
    const requestHeaders = new Headers(request.headers);
    if (userData) {
      requestHeaders.set("x-user-id", userData.id);
      requestHeaders.set("x-user-role", userData.role || "user");
    }

    // Continue with modified headers
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  // Default to protected for unspecified routes
  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * 1. /api/auth/* (authentication endpoints)
     * 2. /_next/* (Next.js internals)
     * 3. /fonts/* (inside public directory)
     * 4. /favicon.ico, /sitemap.xml (public files)
     */
    "/((?!api/auth/|_next/|fonts/|favicon.ico|sitemap.xml).*)",
  ],
};
