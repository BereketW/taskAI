import { auth } from "@/lib/auth";
import { generateTags } from "@/lib/gemini";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { id } = await req.json();
  try {
    console.log("🔍 Incoming request to fetch tasks...");

    // ✅ 1. Ensure authentication
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session) {
      console.error("❌ Unauthorized request - No session found!");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    console.log(`✅ User authenticated: ${userId}`);

    // ✅ 2. Fetch tasks from the database
    const tasks = await prisma.task.findMany({
      where: { assignedToId: userId, listId: id },
      include: {
        list: true,
        comments: true,
        attachments: true,
        reminders: true,
      },
    });

    console.log(`📦 Retrieved ${tasks.length} tasks from database.`);

    // ✅ 3. Generate AI-based tags dynamically
    const tasksWithTags = await Promise.all(
      tasks.map(async (task) => {
        console.log(`🎯 Generating tags for task: ${task.title}`);
        const tags = await generateTags(task.title, task.description);

        console.log(`🏷 Tags generated:`, tags);
        return { ...task, tags };
      })
    );
    console.log("tasksWith", tasksWithTags);
    return NextResponse.json(
      { success: true, tasks: tasksWithTags },
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
