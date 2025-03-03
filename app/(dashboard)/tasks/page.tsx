import { fetchTask } from "@/actions/tasks";
import TasksPage from "@/components/tasks/fetch-task";
import React from "react";

export default async function page() {
  const { tasks } = await fetchTask();

  return <TasksPage tasks={tasks} />;
}
