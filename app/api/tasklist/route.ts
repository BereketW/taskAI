import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  // const { id } = await params;
  const { name, description, id } = await req.json();
  const session = await auth.api.getSession({
    headers: req.headers,
  });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const tasklist = await prisma.taskList.create({
      data: {
        workspaceId: id,
        name,
        description,
        createdById: session.user.id,
      },
    });
    return NextResponse.json({ success: true, tasklist });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
