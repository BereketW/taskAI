import { headers } from "next/headers";
import { auth } from "./auth";
import prisma from "./prisma";

export async function checkDeadline() {
  const session = await auth.api.getSession({ headers: await headers() });
  try {
    const task = await fetch(process.env.BASE_URL + "/api/task/deadline", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.session.token}`,
      },
      cache: "no-store",
    });
    const data = await task.json();

    console.log("Deadline Notification", data.response);
  } catch (error) {
    console.log(error);
  }
}
