import { fetchTask } from "@/actions/tasks";
import Dashboard from "@/components/dashboard/dashboard";
import React from "react";

export default async function page() {
  const { tasks } = await fetchTask();
  const taskLength = tasks.length;
  const completedTasks = tasks?.filter((task) => task.status === "COMPLETED");
  const completedTasksLength = completedTasks?.length;

  function getRelativeDateLocalized(date) {
    const formatter = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
    const today = new Date();
    const targetDate = new Date(date);

    today.setHours(0, 0, 0, 0);
    targetDate.setHours(0, 0, 0, 0);

    const diff = (targetDate - today) / (1000 * 60 * 60 * 24);

    return formatter.format(diff, "day");
  }
  const todayTasks = tasks?.filter(
    (task) => getRelativeDateLocalized(task.dueDate) == "today"
  );
  const tomorrowTasks = tasks?.filter(
    (task) => getRelativeDateLocalized(task.dueDate) == "tomorrow"
  );

  console.log(taskLength, completedTasksLength, todayTasks.length);
  console.dir(todayTasks);
  return (
    <Dashboard
      tomorrowTasks={tomorrowTasks}
      taskLength={taskLength}
      completedTasksLength={completedTasksLength}
      todaysTasks={todayTasks.length}
      todaysTaskList={todayTasks}
    />
  );
}
