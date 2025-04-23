import { fetchTask, getSingleTask } from "@/actions/tasks";
import { getAllWorkspaces, getSingleWorkspace } from "@/actions/workspaces";
import { generateInsights } from "@/actions/insights";
import { google } from "@ai-sdk/google";
import { generateObject, streamText, tool } from "ai";
import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export function errorHandler(error: unknown) {
  if (error == null) {
    return "unknown error";
  }

  if (typeof error === "string") {
    return error;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return JSON.stringify(error);
}

export async function POST(req: Request) {
  try {
    // Check if API key exists
    if (!process.env.OPENAI_API_KEY) {
      console.error("[API ERROR] Missing OPENAI_API_KEY environment variable");
      return NextResponse.json(
        {
          error:
            "API key not configured. Please add OPENAI_API_KEY to your environment variables.",
        },
        { status: 500 }
      );
    }

    // Get the session to verify authentication
    const session = await auth.api.getSession({ headers: req.headers });
    if (!session) {
      return NextResponse.json(
        {
          error: "Authentication required",
        },
        { status: 401 }
      );
    }

    const userId = session?.user.id;
    const body = await req.json();

    if (!Array.isArray(body.messages)) {
      console.warn(
        "[Validation Warning] 'messages' is missing or invalid format"
      );
      return NextResponse.json(
        {
          error: "'messages' must be an array of chat messages",
        },
        { status: 400 }
      );
    }

    // Fetch user-specific data
    let userContext = "";
    let userData = null;

    try {
      // Fetch tasks with tags
      const tasksResult = await fetchTask();

      // Fetch workspaces
      const workspacesResult = await getAllWorkspaces();

      // Fetch insights
      const insightsResult = await generateInsights();

      // Combine all data for context
      userData = {
        tasks: tasksResult.tasks || [],
        workspaces: workspacesResult.data?.workspaces || [],
        insights: insightsResult.insights || [],
      };

      // Format tasks for context
      const formattedTasks = userData.tasks
        .map((task) => {
          return `- Title: ${task.title}
  Description: ${task.description || "No description"}
  Status: ${task.status || "Unknown"}
  Tags: ${task.tags?.join(", ") || "No tags"}`;
        })
        .join("\n");

      // Format workspaces for context
      const formattedWorkspaces = userData.workspaces
        .map((workspace) => `- ${workspace.name}`)
        .join("\n");

      // Format insights for context
      const formattedInsights = userData.insights
        .map((insight) => `- ${insight.title}: ${insight.description}`)
        .join("\n");

      userContext = `
User Information:
- ID: ${userId}
- Name: ${session?.user.name}
- Email: ${session?.user.email}

User Tasks:
${formattedTasks || "No tasks found"}

User Workspaces:
${formattedWorkspaces || "No workspaces found"}

AI Insights:
${formattedInsights || "No insights available"}

Please use this information to provide personalized responses related to the user's tasks, workspaces, and insights.
`;
      console.log("[Chat API] Fetched user context");
    } catch (error) {
      console.warn("[Chat API] Failed to fetch user data:", error);
      // Continue without user context if fetching fails
    }

    const formattedMessages = body.messages.map((message: any) => ({
      role: message.role,
      content: message.content,
    }));

    console.log("[Chat API] Formatted messages:", formattedMessages);

    // Create a personalized system prompt with user context
    const systemPrompt = `You are a helpful AI assistant for a task management application.
${userContext}

Use the user's tasks, workspaces, and insights to provide personalized responses.
You can help with task organization, provide summaries of their work, suggest improvements based on insights,
and answer questions about their tasks and workspaces.

When the user asks about their tasks or workspaces, refer to the actual data provided in the context.
If you need more specific information about a task or workspace, you can use the provided tools to fetch it.  and also add decoration for the response like code formatting and other documents and also use markdown for response`;

    const result = streamText({
      model: google("gemini-2.0-flash-exp"),
      messages: formattedMessages,
      temperature: 0.7,

      system: systemPrompt,

      tools: {
        fetchAllTasks: tool({
          description: "Get all tasks for the current user",
          parameters: z.object({}),
          execute: async () => {
            const result = await fetchTask();
            return {
              tasks: result.tasks || [],
            };
          },
        }),
        fetchSingleTask: tool({
          description: "Get details about a specific task",
          parameters: z.object({
            taskId: z.string().describe("The ID of the task to fetch"),
          }),
          execute: async ({ taskId }) => {
            const result = await getSingleTask(taskId);
            return {
              task: result.task || null,
            };
          },
        }),
        fetchAllWorkspaces: tool({
          description: "Get all workspaces for the current user",
          parameters: z.object({}),
          execute: async () => {
            const result = await getAllWorkspaces();
            return {
              workspaces: result.data?.workspaces || [],
            };
          },
        }),
        fetchSingleWorkspace: tool({
          description: "Get details about a specific workspace",
          parameters: z.object({
            workspaceId: z
              .string()
              .describe("The ID of the workspace to fetch"),
          }),
          execute: async ({ workspaceId }) => {
            const result = await getSingleWorkspace(workspaceId);
            return {
              workspace: result.data?.workspace || null,
            };
          },
        }),
        getInsights: tool({
          description: "Get AI-generated insights for the user's tasks",
          parameters: z.object({}),
          execute: async () => {
            const result = await generateInsights();
            return {
              insights: result.insights || [],
            };
          },
        }),
      },
    });

    return result.toDataStreamResponse({
      getErrorMessage: errorHandler,
    });
  } catch (error: any) {
    console.error("[Chat API Error]", error);
    return NextResponse.json(
      {
        error: "There was an error processing your request",
        details: error?.message || "Unknown error occurred",
      },
      { status: 500 }
    );
  }
}
