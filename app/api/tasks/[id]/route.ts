import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  res: NextResponse,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" });
  }
  console.log(id);
}
export async function GET(
  req: NextRequest,
  res: NextResponse,
  { params }: { params: Promise<{ id: string }> }
) {
  console.log("params", params);
  const id = (await params).id;
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const task = await prisma.task.findUnique({
      where: { id },
      include: {
        subtask: true,
        assignedTo: true,
      },
    });
    return NextResponse.json({ task: task }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Unable to fetch task" },
      { status: 404 }
    );
  }
}
