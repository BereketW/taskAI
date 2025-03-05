import { auth } from "@/lib/auth";
import { generateTags } from "@/lib/gemini";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ tasklistid: string; id: string }> }
) {
  try {
    console.log("🔍 Incoming request to fetch tasks...");
    // console.log("Params:", params);

    const { tasklistid, id } = await params;
    console.log(tasklistid, id);

    // ✅ 1. Ensure authentication
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session) {
      console.error("❌ Unauthorized request - No session found!");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    console.log(`✅ User authenticated: ${userId}`);

    // ✅ 2. Fetch tasks from the database using correct ID
    const taskList = await prisma.taskList.findUnique({
      where: {
        id: tasklistid,
      },
      include: {
        tasks: true,
        createdBy: true,
      },
    });
    console.log("fetched tasklist", taskList);
    if (!taskList) {
      console.warn("⚠️ Task list not found.");
      return NextResponse.json(
        { error: "Task list not found" },
        { status: 404 }
      );
    }

    console.log(`📦 Retrieved ${taskList.tasks.length} tasks from database.`);

    // ✅ 3. Generate AI-based tags dynamically

    const tasksWithTags = await Promise.all(
      taskList.tasks.map(async (task) => {
        console.log(`🎯 Generating tags for task: ${task.title}`);
        const tags = await generateTags(task.title, task.description);
        return { ...task, tags };
      })
    );
    // console.log("✅ Tasks with AI-generated tags:", tasksWithTags);

    console.log("✅ Tasks with AI-generated tags:", tasksWithTags);

    return NextResponse.json(
      {
        success: true,
        taskList: {
          ...taskList,
          tasks: tasksWithTags, // tasks with tags included
        },
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("❌ Error fetching tasks:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
