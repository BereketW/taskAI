import { tool } from "ai";
import { z } from "zod";
import { TaskPriority, TaskStatus } from "./fetch-task";
import { createTask } from "@/actions/workspaces";

export const addTask = tool({
  description:
    "Creates a new task in the task manager. Requires at least a title.",
  parameters: z.object({
    title: z
      .string()
      .describe("The main title or name of the task (required)."),
    description: z
      .string()
      .optional()
      .describe("A more detailed description of the task."),
    priority: TaskPriority.describe(
      "The priority level of the task (e.g., HIGH, MEDIUM, LOW). Defaults to MEDIUM if unspecified."
    ),
    dueDate: z
      .string()
      .optional()
      .describe(
        'The date the task is due (e.g., "YYYY-MM-DD", "tomorrow", "next Friday").'
      ),
    dueTime: z
      .string()
      .optional()
      .describe(
        'The specific time the task is due on the dueDate (e.g., "HH:MM", "5pm").'
      ),
    status: TaskStatus.describe(
      "The current status of the task (e.g., PENDING, IN_PROGRESS). Defaults to PENDING if unspecified."
    ),
    projectId: z
      .string()
      .optional()
      .describe(
        "The ID of the project or workspace (TaskList ID) this task belongs to."
      ), // Changed description
    assigneeId: z
      .string()
      .optional()
      .describe("The ID of the user assigned to this task."),
    tags: z
      .array(z.string())
      .optional()
      .describe(
        "A list of tags or labels associated with the task. These might be set via category or generated."
      ), // Updated description
  }),
  execute: async (params) => {
    // --- Backend Logic Placeholder ---
    // In a real app, you would:
    // 1. Validate/sanitize inputs further if needed.
    // 2. Call your API endpoint or database function (e.g., prisma.task.create).
    // 3. Handle potential errors (e.g., invalid projectId, database errors).
    console.log("Executing createTask with params:", params);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Simulate success response
    //   const mockTaskId = `task_${Date.now()}`;
    const task = await createTask({
      title,
      description,
      priority,
      dueDate,
      dueTime,
    });
    return {
      success: true,
      message: `Task "${params.title}" created successfully.`,
      taskId: mockTaskId,
      createdTask: {
        // Return the created task details (optional but helpful)
        id: mockTaskId,
        ...params,
        priority: params.priority ?? "MEDIUM", // Apply defaults used
        status: params.status ?? "PENDING", // Apply defaults used
        createdAt: new Date().toISOString(),
      },
    };
    
    // --- End Placeholder ---
    },
  
});
