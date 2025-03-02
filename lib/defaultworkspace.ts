"use server";
import { headers } from "next/headers";
import { auth } from "./auth";
import { prisma } from "./prisma";

export async function createDefaultWorkspace(id: string) {
  const data = await prisma.workspace.create({
    data: {
      id: "id-default-workspace",
      name: "Default Workspace",
      ownerId: id,
      visibility: "PRIVATE",
    },
  });
}

export async function createDefaultTaskList(id: string) {
  const data = await prisma.taskList.create({
    data: {
      name: "Default Task List",
      workspaceId: "id-default-workspace",
      createdById: id,
    },
  });
}
