import { fetchTask, getSingleTask } from "@/actions/tasks";
import { getAllWorkspaces, getSingleWorkspace } from "@/actions/workspaces";
import { generateInsights } from "@/actions/insights";
import { google } from "@ai-sdk/google";
import { streamText, tool } from "ai";
import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";

type ChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

type Task = {
  id: string;
  title: string;
  description?: string;
  status?: string;
  tags?: string[];
};

type Workspace = {
  id: string;
  name: string;
};

type Insight = {
  title: string;
  description: string;
};

export async function POST(req: Request): Promise<Response> {
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

  const session = await auth.api.getSession({ headers: req.headers });

  if (!session) {
    return NextResponse.json(
      {
        error: "Authentication required",
      },
      { status: 401 }
    );
  }

  const userId = session.user.id;
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

  let userContext = "";

  const tasksResult = await fetchTask();
  const workspacesResult = await getAllWorkspaces();
  const insightsResult = await generateInsights();

  const userData = {
    tasks: tasksResult.tasks ?? [],
    workspaces: workspacesResult.data?.workspaces ?? [],
    insights: insightsResult.insights ?? [],
  };

  const formattedTasks = userData.tasks
    .map((task: Task) => {
      return `- Title: ${task.title}
  Description: ${task.description || "No description"}
  Status: ${task.status || "Unknown"}
  Tags: ${task.tags?.join(", ") || "No tags"}`;
    })
    .join("\n");

  const formattedWorkspaces = userData.workspaces
    .map((workspace: Workspace) => `- ${workspace.name}`)
    .join("\n");

  const formattedInsights = userData.insights
    .map((insight: Insight) => `- ${insight.title}: ${insight.description}`)
    .join("\n");

  userContext = `
User Information:
- ID: ${userId}
- Name: ${session.user.name}
- Email: ${session.user.email}

User Tasks:
${formattedTasks || "No tasks found"}

User Workspaces:
${formattedWorkspaces || "No workspaces found"}

AI Insights:
${formattedInsights || "No insights available"}

Please use this information to provide personalized responses related to the user's tasks, workspaces, and insights.
`;

  console.log("[Chat API] Fetched user context");

  const formattedMessages: ChatMessage[] = body.messages.map(
    (message: ChatMessage) => ({
      role: message.role,
      content: message.content,
    })
  );

  console.log("[Chat API] Formatted messages:", formattedMessages);

  const systemPrompt = `You are a helpful AI assistant for a task management application and your name is TaskAI.
${userContext}

Use the user's tasks, workspaces, and insights to provide personalized responses.
You can help with task organization, provide summaries of their work, suggest improvements based on insights,
and answer questions about their tasks and workspaces.

When the user asks about their tasks or workspaces, refer to the actual data provided in the context.
If you need more specific information about a task or workspace, you can use the provided tools to fetch it.

Format your responses using markdown for better readability:
  - Use **bold** for emphasis
  - Use \`code\` for inline code
  - Use code blocks with language specification for multi-line code
  - Use bullet points and numbered lists where appropriate
  - Use headings to organize information
  - Use tables when presenting structured data
  - Use > for quotes

Always provide well-formatted, syntax-highlighted code examples when relevant.`;

  const result = streamText({
    model: google("gemini-2.0-flash-thinking-exp-01-21"),
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
            tasks: result.tasks ?? [],
          };
        },
      }),
      fetchSingleTask: tool({
        description: "Get details about a specific task",
        parameters: z.object({
          taskId: z.string().describe("The ID of the task to fetch"),
        }),
        execute: async ({ taskId }: { taskId: string }) => {
          const result = await getSingleTask(taskId);
          return {
            task: result.task ?? null,
          };
        },
      }),
      fetchAllWorkspaces: tool({
        description: "Get all workspaces for the current user",
        parameters: z.object({}),
        execute: async () => {
          const result = await getAllWorkspaces();
          return {
            workspaces: result.data?.workspaces ?? [],
          };
        },
      }),
      fetchSingleWorkspace: tool({
        description: "Get details about a specific workspace",
        parameters: z.object({
          workspaceId: z.string().describe("The ID of the workspace to fetch"),
        }),
        execute: async ({ workspaceId }: { workspaceId: string }) => {
          const result = await getSingleWorkspace(workspaceId);
          return {
            workspace: result.data?.workspace ?? null,
          };
        },
      }),
      getInsights: tool({
        description: "Get AI-generated insights for the user's tasks",
        parameters: z.object({}),
        execute: async () => {
          const result = await generateInsights();
          return {
            insights: result.insights ?? [],
          };
        },
      }),
    },
  });

  return result.toDataStreamResponse();
}
