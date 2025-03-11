"use server";
import { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
import { generateTags } from "@/lib/gemini";
import { headers } from "next/headers";
import { json } from "stream/consumers";

export async function fetchTask() {
  const session = await auth.api.getSession({ headers: await headers() });
  try {
    const tasks = await fetch(process.env.BASE_URL + "/api/task", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.session.token}`,
      },
      cache: "no-store",
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

export async function fetchTasklistDetail(workspaceId, tasklistId) {
  const session = await auth.api.getSession({ headers: await headers() });
  try {
    const tasks = await fetch(
      process.env.BASE_URL +
        `/api/workspace/${workspaceId}/tasklist/${tasklistId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.session.token}`,
        },
        cache: "no-store",

        credentials: "include",
      }
    );
    // console.log("task data", tasks);
    const data = await tasks.json();
    // console.log(data);
    // const tasksWithTags = await Promise.all(
    //   data.ttasks.map(async (task) => {
    //     console.log(`🎯 Generating tags for task: ${task.title}`);
    //     const tags = await generateTags(task.title, task.description);
    //     console.log(`🏷 Tags generated:`, tags);
    //     return { ...task, tags };
    //   })
    // );
    // console.log("task finished", tasksWithTags);
    return { taskList: data.taskList };
  } catch (error) {
    return { error: error, message: "Could not fetch tasks" };
  }
}

export async function getSingleTask(id) {
  const session = await auth.api.getSession({ headers: await headers() });
  try {
    const data = await fetch(`${process.env.BASE_URL}/api/tasks/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.session.token}`,
      },
      cache: "no-store",

      credentials: "include",
    });
    const task = await data.json();
    return { task: task };
  } catch (error) {
    return { error: error.message };
  }
}
