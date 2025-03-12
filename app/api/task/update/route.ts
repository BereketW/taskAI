import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
// import { request } from "http";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, res: NextResponse) {
  console.log("PUT request received");
  const { id, title, description, status, priority, dueDate, time } =
    await req.json();
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Perform your database update operations here
  try {
    const updateTask = await prisma.task.updateMany({
      where: { id },
      data: {
        title,
        description,
        status,
        priority,
        dueDate,
        dueTime: time,
      },
    });
    console.log(updateTask);
    return NextResponse.json({ updateTask: updateTask }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
