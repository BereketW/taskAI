import { getSingleTask } from "@/actions/tasks";
import React from "react";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { task } = await getSingleTask(id);
  console.log(task);
  return <div>page</div>;
}
