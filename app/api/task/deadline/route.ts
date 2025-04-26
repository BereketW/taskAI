import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
// import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await auth.api.getSession({ headers: req.headers });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized Access" }, { status: 401 });
  }
  try {
    const tasks = await prisma.task.findMany({
      where: {
        isCompleted: false,
        status: "PENDING",
        dueDate: {
          lte: new Date().toISOString(),
        },
      },
    });
    console.log("Deadline Notification", tasks);
    if (tasks.length > 0) {
      return NextResponse.json({ response: tasks, status: "success" });
    }
    return NextResponse.json({ response: tasks, status: "error" });
  } catch (error) {
    console.log(error);
  }
}
