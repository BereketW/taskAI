import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  console.log("request received");
  const { id, status } = await req.json();
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const updateTask = await prisma.task.update({
      where: { id },
      data: {
        isCompleted: status === "COMPLETED" ? false : true,
        completedAt: new Date().toISOString(),
        status: status === "PENDING" ? "COMPLETED" : "PENDING",
      },
    });
    console.log("Task updated successfully", updateTask);
    return NextResponse.json({ response: updateTask, status: "success" });
  } catch (err) {
    return NextResponse.json({ response: err, status: "error" });
  }
}
