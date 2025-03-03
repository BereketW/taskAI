import { auth } from "@/lib/auth";
import { generateTags } from "@/lib/gemini";
import { headers } from "next/headers";

export async function fetchTask() {
  const session = await auth.api.getSession({ headers: await headers() });
  try {
    const tasks = await fetch(process.env.BASE_URL + "/api/task", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.session.token}`,
      },
      cache: "force-cache",
      credentials: "include",
    });
    const data = await tasks.json();
    console.log(data);
    const tasksWithTags = await Promise.all(
      data.tasks.map(async (task) => {
        console.log(`🎯 Generating tags for task: ${task.title}`);
        const tags = await generateTags(task.title, task.description);
        console.log(`🏷 Tags generated:`, tags);
        return { ...task, tags };
      })
    );
    console.log("task finished", tasksWithTags);
    return { tasks: tasksWithTags };
  } catch (error) {
    return { error: error, message: "Could not fetch tasks" };
  }
}
