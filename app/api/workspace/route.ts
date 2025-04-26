import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Ensure Prisma is set up
// import { getServerSession } from "next-auth"; // Ensure authentication
// import { GoogleGenerativeAI } from "@google/generative-ai"; // Install gemini npm package
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function POST(req: Request) {
  try {
    // const session = await getServerSession();
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    console.log(session);
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { name, description } = await req.json();
    const userId = session.user.id;

    // Store task in the database
    const newWorkspace = await prisma.workspace.create({
      data: {
        ownerId: userId,
        name,
        description,
        visibility: "PRIVATE",
      },
    });
    console.log(newWorkspace);
    return NextResponse.json(
      { success: true, workspace: newWorkspace },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
export async function GET(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const workspaces = await prisma.workspace.findMany({
      where: { ownerId: session.user.id },
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

    return NextResponse.json({ success: true, workspaces }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
