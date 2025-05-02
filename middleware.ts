import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getSessionCookie } from "better-auth";
import { authClient } from "./lib/auth-client";

export async function middleware(request: NextRequest) {
  const session = getSessionCookie(request);

  // const { data: session } = await authClient.getSession();
  // const session =

  if (!session) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/tasks",
    "/chat",
    "/workspaces",
    "/ai",
    "/calendar",
    "/goals",
    "/schedule",
    "/settings",
    "/team",
    "/api",
    // "/chat",
  ], // Apply middleware to specific routes
};
