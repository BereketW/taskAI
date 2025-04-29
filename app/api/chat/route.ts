// import { fetchTask, getSingleTask } from "@/actions/tasks";
// import { getAllWorkspaces, getSingleWorkspace } from "@/actions/workspaces";
// import { generateInsights } from "@/actions/insights";
// import { google } from "@ai-sdk/google";
// import {
//   appendClientMessage,
//   appendResponseMessages,
//   streamText,
//   tool,
// } from "ai";
// import { NextResponse } from "next/server";
// import { z } from "zod";
// import { auth } from "@/lib/auth";
// import { saveChat, loadChat } from "@/hooks/chat-store";

// type ChatMessage = {
//   role: "user" | "assistant" | "system";
//   content: string;
// };

// type Task = {
//   id: string;
//   title: string;
//   description?: string;
//   status?: string;
//   tags?: string[];
// };

// type Workspace = {
//   id: string;
//   name: string;
// };

// type Insight = {
//   title: string;
//   description: string;
// };

// export async function POST(req: Request): Promise<Response> {
//   if (!process.env.OPENAI_API_KEY) {
//     console.error("[API ERROR] Missing OPENAI_API_KEY environment variable");
//     return NextResponse.json(
//       {
//         error:
//           "API key not configured. Please add OPENAI_API_KEY to your environment variables.",
//       },
//       { status: 500 }
//     );
//   }

//   const session = await auth.api.getSession({ headers: req.headers });

//   if (!session) {
//     return NextResponse.json(
//       {
//         error: "Authentication required",
//       },
//       { status: 401 }
//     );
//   }

//   const userId = session.user.id;
//   const { message, id } = await req.json();
//   const previousMessages = await loadChat(id);
//   const messages = appendClientMessage({
//     messages: previousMessages,
//     message,
//   });

//   if (!Array.isArray(messages)) {
//     console.warn(
//       "[Validation Warning] 'messages' is missing or invalid format"
//     );
//     return NextResponse.json(
//       {
//         error: "'messages' must be an array of chat messages",
//       },
//       { status: 400 }
//     );
//   }

//   let userContext = "";

//   const tasksResult = await fetchTask();
//   const workspacesResult = await getAllWorkspaces();
//   const insightsResult = await generateInsights();

//   const userData = {
//     tasks: tasksResult.tasks ?? [],
//     workspaces: workspacesResult.data?.workspaces ?? [],
//     insights: insightsResult.insights ?? [],
//   };

//   const formattedTasks = userData.tasks
//     .map((task: Task) => {
//       return `- Title: ${task.title}
//   Description: ${task.description || "No description"}
//   Status: ${task.status || "Unknown"}
//   Tags: ${task.tags?.join(", ") || "No tags"}`;
//     })
//     .join("\n");

//   const formattedWorkspaces = userData.workspaces
//     .map((workspace: Workspace) => `- ${workspace.name}`)
//     .join("\n");

//   const formattedInsights = userData.insights
//     .map((insight: Insight) => `- ${insight.title}: ${insight.description}`)
//     .join("\n");

//   userContext = `
// User Information:
// - ID: ${userId}
// - Name: ${session.user.name}
// - Email: ${session.user.email}

// User Tasks:
// ${formattedTasks || "No tasks found"}

// User Workspaces:
// ${formattedWorkspaces || "No workspaces found"}

// AI Insights:
// ${formattedInsights || "No insights available"}

// Please use this information to provide personalized responses related to the user's tasks, workspaces, and insights.
// `;

//   console.log("[Chat API] Fetched user context");

//   // const formattedMessages: ChatMessage[] = messages.map(
//   //   (message: ChatMessage) => ({
//   //     role: message.role,
//   //     content: message.content,
//   //   })
//   // );

//   console.log("[Chat API] Formatted messages:", messages);

//   const systemPrompt = `You are a helpful AI assistant for a task management application and your name is TaskAI.
// ${userContext}

// Use the user's tasks, workspaces, and insights to provide personalized responses.
// You can help with task organization, provide summaries of their work, suggest improvements based on insights,
// and answer questions about their tasks and workspaces.

// When the user asks about their tasks or workspaces, refer to the actual data provided in the context.
// If you need more specific information about a task or workspace, you can use the provided tools to fetch it.

// Format your responses using markdown for better readability:
//   - Use **bold** for emphasis
//   - Use \`code\` for inline code
//   - Use code blocks with language specification for multi-line code
//   - Use bullet points and numbered lists where appropriate
//   - Use headings to organize information
//   - Use tables when presenting structured data
//   - Use > for quotes

// Always provide well-formatted, syntax-highlighted code examples when relevant.`;

//   const result = streamText({
//     model: google("gemini-2.0-flash-thinking-exp-01-21"),
//     messages,

//     temperature: 0.7,
//     system: systemPrompt,
//     tools: {
//       fetchAllTasks: tool({
//         description: "Get all tasks for the current user",
//         parameters: z.object({}),
//         execute: async () => {
//           const result = await fetchTask();
//           return {
//             tasks: result.tasks ?? [],
//           };
//         },
//       }),
//       fetchSingleTask: tool({
//         description: "Get details about a specific task",
//         parameters: z.object({
//           taskId: z.string().describe("The ID of the task to fetch"),
//         }),
//         execute: async ({ taskId }: { taskId: string }) => {
//           const result = await getSingleTask(taskId);
//           return {
//             task: result.task ?? null,
//           };
//         },
//       }),
//       fetchAllWorkspaces: tool({
//         description: "Get all workspaces for the current user",
//         parameters: z.object({}),
//         execute: async () => {
//           const result = await getAllWorkspaces();
//           return {
//             workspaces: result.data?.workspaces ?? [],
//           };
//         },
//       }),
//       fetchSingleWorkspace: tool({
//         description: "Get details about a specific workspace",
//         parameters: z.object({
//           workspaceId: z.string().describe("The ID of the workspace to fetch"),
//         }),
//         execute: async ({ workspaceId }: { workspaceId: string }) => {
//           const result = await getSingleWorkspace(workspaceId);
//           return {
//             workspace: result.data?.workspace ?? null,
//           };
//         },
//       }),
//       getInsights: tool({
//         description: "Get AI-generated insights for the user's tasks",
//         parameters: z.object({}),
//         execute: async () => {
//           const result = await generateInsights();
//           return {
//             insights: result.insights ?? [],
//           };
//         },
//       }),
//     },
//     async onFinish({ response }) {
//       await saveChat({
//         id: id,
//         messages: appendResponseMessages({
//           messages: messages,
//           responseMessages: response.messages,
//         }),
//       });
//     },
//   });
//   result.consumeStream();
//   return result.toDataStreamResponse();
// }

import {
  appendClientMessage,
  appendResponseMessages,
  createDataStreamResponse,
  smoothStream,
  streamText,
} from "ai";
// import { auth, type UserType } from '@/app/(auth)/auth';
import { systemPrompt } from "@/lib/ai/prompts";
import {
  deleteChatById,
  getChatById,
  getMessageCountByUserId,
  getMessagesByChatId,
  saveChat,
  saveMessages,
} from "@/actions/chat";
import { generateUUID, getTrailingMessageId } from "@/lib/utils";
import { generateTitleFromUserMessage } from "@/app/chat/actions";
import { createDocument } from "@/lib/ai/tools/create-document";
import { updateDocument } from "@/lib/ai/tools/update-document";
import { requestSuggestions } from "@/lib/ai/tools/request-suggestions";
import { getWeather } from "@/lib/ai/tools/get-weather";
import { isProductionEnvironment } from "@/constants/constants";
import { myProvider } from "@/lib/ai/providers";
import { entitlementsByUserType } from "@/lib/ai/entitlements";
import { postRequestBodySchema, type PostRequestBody } from "./schema";
import { auth } from "@/lib/auth";
import { fetchUserTasks } from "@/lib/ai/tools/fetch-task";

export const maxDuration = 60;
export const maxSteps = 5;

export async function POST(request: Request) {
  let requestBody: PostRequestBody;

  try {
    const json = await request.json();
    requestBody = postRequestBodySchema.parse(json);
  } catch (_) {
    return new Response("Invalid request body", { status: 400 });
  }

  try {
    const { id, message, selectedChatModel } = requestBody;

    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    // const userType: UserType = session.user.type;

    // const messageCount = await getMessageCountByUserId({
    //   id: session.user.id,
    //   differenceInHours: 24,
    // });

    // if (messageCount > entitlementsByUserType[userType].maxMessagesPerDay) {
    //   return new Response(
    //     "You have exceeded your maximum number of messages for the day! Please try again later.",
    //     {
    //       status: 429,
    //     }
    //   );
    // }

    const chat = await getChatById({ id });

    if (!chat) {
      const title = await generateTitleFromUserMessage({
        message,
      });

      await saveChat({ id, userId: session.user.id, title });
    } else {
      if (chat.userId !== session.user.id) {
        return new Response("Forbidden", { status: 403 });
      }
    }

    const previousMessages = await getMessagesByChatId({ id });

    const messages = appendClientMessage({
      // @ts-expect-error: todo add type conversion from DBM`essage[] to UIMessage[]
      messages: previousMessages,
      message,
    });

    await saveMessages({
      messages: [
        {
          chatId: id,
          id: message.id,
          role: "user",
          parts: message.parts,
          attachments: message.experimental_attachments ?? [],
          createdAt: new Date(),
        },
      ],
    });

    return createDataStreamResponse({
      execute: (dataStream) => {
        const result = streamText({
          model: myProvider.languageModel(selectedChatModel),
          system: systemPrompt({ selectedChatModel }),
          messages,
          maxSteps: 5,
          experimental_activeTools:
            selectedChatModel !== "chat-model-reasoning"
              ? []
              : [
                  "fetchUserTasks",
                  "createDocument",
                  "updateDocument",
                  "requestSuggestions",
                ],
          experimental_transform: smoothStream({ chunking: "word" }),
          experimental_generateMessageId: generateUUID,
          tools: {
            getWeather,
            createDocument: createDocument({ session, dataStream }),
            updateDocument: updateDocument({ session, dataStream }),
            requestSuggestions: requestSuggestions({
              session,
              dataStream,
            }),
            fetchUserTasks,
          },
          onFinish: async ({ response }) => {
            if (session.user?.id) {
              try {
                const assistantId = getTrailingMessageId({
                  messages: response.messages.filter(
                    (message) => message.role === "assistant"
                  ),
                });

                if (!assistantId) {
                  throw new Error("No assistant message found!");
                }

                const [, assistantMessage] = appendResponseMessages({
                  messages: [message],
                  responseMessages: response.messages,
                });

                await saveMessages({
                  messages: [
                    {
                      id: assistantId,
                      chatId: id,
                      role: assistantMessage.role,
                      parts: assistantMessage.parts,
                      attachments:
                        assistantMessage.experimental_attachments ?? [],
                      createdAt: new Date(),
                    },
                  ],
                });
              } catch (_) {
                console.error("Failed to save chat");
              }
            }
          },
          experimental_telemetry: {
            isEnabled: isProductionEnvironment,
            functionId: "stream-text",
          },
        });

        result.consumeStream();

        result.mergeIntoDataStream(dataStream, {
          sendReasoning: true,
        });
      },
      onError: () => {
        return "Oops, an error occurred!";
      },
    });
  } catch (_) {
    return new Response("An error occurred while processing your request!", {
      status: 500,
    });
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return new Response("Not Found", { status: 404 });
  }

  const session = await auth.api.getSession({ headers: request.headers });

  if (!session?.user?.id) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const chat = await getChatById({ id });

    if (chat?.userId !== session.user.id) {
      return new Response("Forbidden", { status: 403 });
    }

    const deletedChat = await deleteChatById({ id });

    return Response.json(deletedChat, { status: 200 });
  } catch (error) {
    return new Response("An error occurred while processing your request!", {
      status: 500,
    });
  }
}
