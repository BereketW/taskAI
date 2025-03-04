import React from "react";

export default async function page({
  params,
}: {
  params: Promise<{ tasklistid: string }>;
}) {
  const id = (await params).tasklistid;
  return <div>page</div>;
}
