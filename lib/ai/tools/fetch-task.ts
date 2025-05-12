import { tool } from "ai";
import { z } from "zod";
// Import date-fns functions for robust date comparison (assuming available in the environment)
import {
  parseISO,
  isMatch,
  isEqual,
  startOfDay,
  endOfDay,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  parse,
  addMonths,
  addDays,
} from "date-fns";
import { fetchTask } from "@/actions/tasks";
export const TaskPriority = z.enum(["HIGH", "MEDIUM", "LOW"]).optional();

// --- Task Status Enum (Example - adjust values as needed, ensure they match Prisma Enum) ---
// Assuming Prisma TaskStatus Enum has these values (case-sensitive)
export const TaskStatus = z
  .enum(["PENDING", "IN_PROGRESS", "COMPLETED", "BLOCKED"])
  .optional(); // Adjust based on your actual Prisma Enum

// --- Zod Schema for identifying a task (either by ID or a unique query) ---
export const TaskIdentifier = z
  .union([
    z.object({ taskId: z.string().describe("The unique ID of the task.") }),
    z.object({
      query: z
        .string()
        .describe(
          'A unique natural language query to identify the task (e.g., "the report task due tomorrow"). Use if ID is unknown.'
        ),
    }),
  ])
  .describe(
    "How to identify the specific task (either by its ID or a unique query)."
  );

// --- Type definition for the structure returned by fetchTask (based on provided code) ---
// Note: This assumes fetchTask adds a 'tags' array to each task object.
// Adjust based on the actual structure of your Prisma Task model and fetchTask modifications.
export interface FetchedTask {
  id: string;
  title: string;
  description: string | null;
  listId: string; // Mapped from projectId filter
  assignedToId: string | null;
  dueDate: string | null; // Assuming fetchTask returns ISO string date
  dueTime: string | null;
  priority: "HIGH" | "MEDIUM" | "LOW"; // Match Prisma Enum case
  status: "PENDING" | "COMPLETED"; // Match Prisma Enum case
  tags?: string[]; // Added by fetchTask's tag generation logic
  category?: string; // From Prisma model
  // Add other relevant fields from your Prisma Task model if needed for filtering/display
}

export const fetchUserTasks = tool({
  description:
    "list all the user tasks when the user asks you to list the tasks or ask a question like do i have any tasks.",
  parameters: z.object({
    query: z
      .string()
      .optional()
      .describe("Keywords to search for in task titles or descriptions."),
    priority: TaskPriority.describe(
      "Filter tasks by priority level (HIGH, MEDIUM, LOW)."
    ), // Updated description
    status: TaskStatus.describe(
      "Filter tasks by their status (PENDING, IN_PROGRESS, COMPLETED, BLOCKED)."
    ), // Updated description
    dueDate: z
      .string()
      .optional()
      .describe(
        'Filter tasks due on a specific date or range (e.g., "YYYY-MM-DD", "today", "tomorrow", "this week", "next month").'
      ), // Updated description
    assigneeId: z
      .string()
      .optional()
      .describe("Filter tasks assigned to a specific user ID."),
    projectId: z
      .string()
      .optional()
      .describe(
        "Filter tasks within a specific project or workspace (TaskList ID)."
      ), // Updated description
    tags: z
      .array(z.string())
      .optional()
      .describe("Filter tasks containing specific tags (case-insensitive)."), // Updated description
    limit: z
      .number()
      .int()
      .positive()
      .optional()
      .default(10)
      .describe("Maximum number of tasks to return (default 10)."),
  }),
  execute: async (params) => {
    console.log("Executing findTasks with params:", params);

    try {
      // 1. Call the actual fetchTask server action
      const fetchResult = await fetchTask(); // Assuming fetchTask is imported

      if (fetchResult.error || !fetchResult.tasks) {
        console.error(
          "Error fetching tasks:",
          fetchResult.error || fetchResult.message
        );
        return {
          success: false,
          message: fetchResult.message || "Failed to fetch tasks.",
          count: 0,
          tasks: [],
        };
      }

      let fetchedTasks = fetchResult.tasks;

      // 2. Filter fetched tasks based on tool parameters
      const filteredTasks = fetchedTasks.filter((task) => {
        let match = true;

        // Filter by query (search title and description)
        if (params.query) {
          const queryLower = params.query.toLowerCase();
          const titleMatch = task.title.toLowerCase().includes(queryLower);
          const descMatch =
            task.description?.toLowerCase().includes(queryLower) ?? false;
          if (!titleMatch && !descMatch) {
            match = false;
          }
        }

        // Filter by priority
        if (match && params.priority && task.priority !== params.priority) {
          match = false;
        }

        // Filter by status
        if (match && params.status && task.status !== params.status) {
          match = false;
        }

        // Filter by assigneeId
        if (
          match &&
          params.assigneeId &&
          task.assignedToId !== params.assigneeId
        ) {
          match = false;
        }

        // Filter by projectId (maps to listId in the model)
        if (match && params.projectId && task.listId !== params.projectId) {
          match = false;
        }

        // Filter by tags (case-insensitive check against generated tags or category)
        if (match && params.tags && params.tags.length > 0) {
          const taskTagsLower = (task.tags ?? [task.category ?? ""]).map((t) =>
            t.toLowerCase()
          ); // Use generated tags or category as fallback
          const filterTagsLower = params.tags.map((t) => t.toLowerCase());
          if (
            !filterTagsLower.every((filterTag) =>
              taskTagsLower.includes(filterTag)
            )
          ) {
            match = false;
          }
        }

        // Filter by dueDate (handle relative terms and specific dates)
        if (match && params.dueDate && task.dueDate) {
          try {
            const taskDueDate = startOfDay(parseISO(task.dueDate)); // Compare dates only
            const today = startOfDay(new Date());
            const tomorrow = startOfDay(
              new Date(today.getTime() + 24 * 60 * 60 * 1000)
            );

            let dateFilterMatch = false;
            const dateParamLower = params.dueDate.toLowerCase();

            if (dateParamLower === "today") {
              dateFilterMatch = isEqual(taskDueDate, today);
            } else if (dateParamLower === "tomorrow") {
              dateFilterMatch = isEqual(taskDueDate, tomorrow);
            } else if (dateParamLower === "this week") {
              const start = startOfWeek(today, { weekStartsOn: 1 }); // Assuming week starts Monday
              const end = endOfWeek(today, { weekStartsOn: 1 });
              dateFilterMatch = taskDueDate >= start && taskDueDate <= end;
            } else if (dateParamLower === "next week") {
              const startNextWeek = startOfWeek(addDays(today, 7), {
                weekStartsOn: 1,
              });
              const endNextWeek = endOfWeek(addDays(today, 7), {
                weekStartsOn: 1,
              });
              dateFilterMatch =
                taskDueDate >= startNextWeek && taskDueDate <= endNextWeek;
            } else if (dateParamLower === "this month") {
              const start = startOfMonth(today);
              const end = endOfMonth(today);
              dateFilterMatch = taskDueDate >= start && taskDueDate <= end;
            } else if (dateParamLower === "next month") {
              const startNextMonth = startOfMonth(addMonths(today, 1));
              const endNextMonth = endOfMonth(addMonths(today, 1));
              dateFilterMatch =
                taskDueDate >= startNextMonth && taskDueDate <= endNextMonth;
            } else if (isMatch(params.dueDate, "yyyy-MM-dd")) {
              // Specific date match
              const filterDate = startOfDay(
                parse(params.dueDate, "yyyy-MM-dd", new Date())
              );
              dateFilterMatch = isEqual(taskDueDate, filterDate);
            } else {
              // If format is unrecognized, don't filter by date for safety
              // Or attempt more flexible parsing if needed
              console.warn(
                `Unrecognized date format for filtering: ${params.dueDate}`
              );
              dateFilterMatch = true; // Default to not filtering if format is unknown
            }

            if (!dateFilterMatch) {
              match = false;
            }
          } catch (e) {
            console.error("Error parsing date for filtering:", e);
            // Don't filter if date parsing fails
          }
        } else if (match && params.dueDate && !task.dueDate) {
          // If filtering by date but task has no due date, it doesn't match
          match = false;
        }

        return match;
      });

      // 3. Apply limit
      const limitedTasks = filteredTasks.slice(0, params.limit);
      console.log(limitedTasks);
      return {
        success: true,
        count: limitedTasks.length,
        tasks: limitedTasks, // Return the filtered and limited tasks
      };
    } catch (error) {
      console.error("Unexpected error in findTasks execute:", error);
      return {
        success: false,
        message: "An unexpected error occurred while searching for tasks.",
        count: 0,
        tasks: [],
      };
    }
  },
});
