import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  // const { id } = await params;

  const session = await auth.api.getSession({
    headers: req.headers,
  });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const workspace = await prisma.workspace.create({
      data: {
        id: "xyz-default-workspace",
        name: "My Workspace",
        description: "A default workspace for a new user",
        ownerId: session.user.id,
        visibility: "PRIVATE",
      },
    });
    const tasklist = await prisma.taskList.create({
      data: {
        workspaceId: "xyz-default-workspace",
        name: "My Tasklist",
        description: "A default taslist for a new user",
        createdById: session.user.id,
      },
    });

    return NextResponse.json({ success: true, tasklist, workspace });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
