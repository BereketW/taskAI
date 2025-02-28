import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // Ensure Prisma is set up
// import { getServerSession } from "next-auth"; // Ensure authentication
import { GoogleGenerativeAI } from "@google/generative-ai"; // Install gemini npm package
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!); // Ensure you have the API key

export async function POST(req: Request) {
  try {
    // const session = await getServerSession();
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const {
      title,
      description,
      category,
      priority,
      dueDate,
      dueTime,
      recurring,
    } = await req.json();
    const userId = session.user.id;

    // Store task in the database
    const newTask = await prisma.task.create({
      data: {
        userId,
        title,
        description,
        category,
        priority,
        dueDate,
        dueTime,
        recurring,
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
