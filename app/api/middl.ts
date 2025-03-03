import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSessionCookie } from "better-auth";

export function withAuth(
  handler: Function,
  options: { requireVerified?: boolean; requiredRole?: string } = {}
) {
  return async (request: NextRequest) => {
    const sessionCookie = getSessionCookie(request);

    if (!sessionCookie) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let userData = null;
    try {
      userData = JSON.parse(atob(sessionCookie.split(".")[1]));
    } catch (error) {
      return NextResponse.json({ error: "Invalid session" }, { status: 401 });
    }

    if (options.requireVerified && !userData.emailVerified) {
      return NextResponse.json(
        { error: "Email not verified" },
        { status: 403 }
      );
    }

    if (options.requiredRole && userData.role !== options.requiredRole) {
      return NextResponse.json(
        { error: "Insufficient permissions" },
        { status: 403 }
      );
    }

    // Add user data to request for the handler
    request.user = userData;

    return handler(request);
  };
}
