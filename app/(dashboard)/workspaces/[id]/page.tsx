import WorkspaceDetailPage from "@/components/workspace/worspace-detail-page";

import React from "react";
// import axios from "axios";
// import { getAllWorkspaces, getSingleWorkspace } from "@/actions/workspaces";
// import { auth } from "@/lib/auth";
// import { headers } from "next/headers";
// import { authClient } from "@/lib/auth-client";
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  // const session = await auth.api.getSession({ headers: await headers() });
  // console.log("session", session);
  // const { data: sessions } = await authClient.getSession();
  // console.log("sessions: ", sessions);

  // // No need for await
  // // const token = localStorage.getItem("bearer_token");
  const data = await getSingleWorkspace(id);
  // const workspaces = await fetch(
  //   process.env.BASE_URL + `/api/workspace/${id}`,
  //   {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${session?.session.token}`,
  //     },
  //     cache: "force-cache",
  //     credentials: "same-origin",
  //   }
  // );
  // console.log(workspaces, "workspaces");
  // const workspace = (await workspaces.json()).workspace;

  return <WorkspaceDetailPage id={id} workspace={data.data.workspace} />;
}
