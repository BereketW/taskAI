import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Ensure Prisma is set up
// import { getServerSession } from "next-auth"; // Ensure authentication
import { auth } from "@/lib/auth";
// import { headers } from "next/headers";
import { generateTags } from "@/lib/gemini";

export async function POST(req: Request) {
  const {
    title,
    description,
    category,
    priority,
    selectedTasklist,
    dueDate,
    dueTime,
  } = await req.json();
  try {
    // const session = await getServerSession();
    const session = await auth.api.getSession({
      headers: req.headers,
    });
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const userId = session.user.id;

    // Store task in the database
    const newTask = await prisma.task.create({
      data: {
        assignedToId: userId,
        listId: selectedTasklist,
        title,
        description,
        category,
        priority: priority.toUpperCase(),
        dueDate,
        dueTime,
        // recurring,
        status: "PENDING",
      },
    });

    return NextResponse.json({ success: true, task: newTask }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
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
    where: { assignedToId: userId },
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
      const tags = await generateTags(task.title, task?.description || "");

      console.log(`🏷 Tags generated:`, tags);

      return { ...task, tags };
    })
  );
  console.log("tasksWith", tasksWithTags);

  return NextResponse.json(
    { success: true, tasks: tasksWithTags },
    { status: 200 }
  );
}
