import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  console.log("req", req);
  try {
    const id = (await params).id; // Ensure `id` is directly accessed
    if (!id) {
      return NextResponse.json(
        { error: "Workspace ID is required" },
        { status: 400 }
      );
    }

    // Fetch session
    // const session = getSessionCookie(req);
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    // Optionally pass config as the second argument if cookie name or prefix is customized.
    console.log("session", session);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch workspace
    const workspace = await prisma.workspace.findUnique({
      where: { id },
      include: {
        members: {
          include: {
            user: true, // Include user details for each member
          },
        },
        taskLists: {
          include: {
            tasks: true,
          },
        }, // Include all task lists in the workspace
      },
    });

    if (!workspace) {
      return NextResponse.json(
        { error: "Workspace not found" },
        { status: 404 }
      );
    }

    console.log("Workspace:", workspace);

    return NextResponse.json({ success: true, workspace }, { status: 200 });
  } catch (error) {
    console.error("Error fetching workspace:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
