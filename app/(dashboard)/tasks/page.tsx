import { fetchTask } from "@/actions/tasks";
import TasksPage from "@/components/tasks/fetch-task";
import React from "react";
// import TasksPage from "../ai/smart-schedule/page";

export default async function page() {
  const { tasks } = await fetchTask();

  return <TasksPage tasks={tasks} />;
}
