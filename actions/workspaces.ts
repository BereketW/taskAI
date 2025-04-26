/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function getAllWorkspaces() {
  const session = await auth.api.getSession({ headers: await headers() });
  try {
    const workspaces = await fetch(process.env.BASE_URL + "/api/workspace", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.session.token}`,
      },
      cache: "no-store",
      credentials: "include",
    });
    const data = await workspaces.json();
    console.log(data);
    return { data: data };
  } catch (error) {
    return { error: error, message: "Could not fetch workspace" };
  }
}

export async function getSingleWorkspace(id: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  console.log(session);
  try {
    const workspace = await fetch(
      process.env.BASE_URL + `/api/workspace/${id}`,
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
    const data = await workspace.json();
    console.log("data", data);
    return { data: data };
  } catch (error) {
    console.log(error);
    return { error: error, message: "Could not fetch workspace" };
  }
}

export async function createTaskList(data: {
  name: string;
  description: string;
  id: any;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  try {
    const taskList = await fetch(process.env.BASE_URL + "/api/tasklist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.session.token}`,
      },
      body: JSON.stringify(data),
      cache: "force-cache",
      credentials: "include",
    });
    const response = await taskList.json();
    return { response };
  } catch (err: any) {
    console.log(err);
    return { error: err.message, message: "Could not create task list" };
  }
}

export async function createTask(data: {
  title: string;
  description: string;
  category: string;
  recurring: boolean;
  dueDate: Date | undefined;
  dueTime: string;
  priority: string;
  selectedWorkspace: never;
  selectedTasklist: string;
  subtasks: { title: any; completed: boolean }[];
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  try {
    const task = await fetch(process.env.BASE_URL + "/api/task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.session.token}`,
      },
      body: JSON.stringify(data),
      cache: "no-store",
      credentials: "include",
    });
    const response = await task.json();
    return { response };
  } catch (err: any) {
    console.log(err);
    return { error: err.message, message: "Could not create task" };
  }
}

export async function defaultWorkspace() {
  const session = await auth.api.getSession({ headers: await headers() });
  try {
    const taskList = await fetch(
      process.env.BASE_URL + "/api/default/tasklist",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.session.token}`,
        },

        cache: "force-cache",
        credentials: "include",
      }
    );
    const response = await taskList.json();
    return { response };
  } catch (err: any) {
    console.log(err);
    return { error: err.message, message: "Could not create task list" };
  }
}
