import { fetchTasklistDetail } from "@/actions/tasks";
import TasklistDetailPage from "@/components/tasklist/tasklist-detail";
import React from "react";

export default async function page({
  params,
}: {
  params: Promise<{ tasklistid: string; id: string }>;
}) {
  // console.log((await params).tasklistid);
  const id = (await params).tasklistid;
  const tasklistid = (await params).tasklistid;
  const data = await fetchTasklistDetail(id, tasklistid);
  console.log(data);
  // const tasks = data.tasks;

  return <TasklistDetailPage tasklistid={id} tasklist={data.taskList} />;
}
