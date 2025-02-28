"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Clock,
  FolderKanban,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  Share2,
  Users,
} from "lucide-react";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

export default function WorkspaceDetailPage() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");

  // Mock workspace data
  const workspace = {
    id: 1,
    name: "Product Development",
    description: "Main workspace for product development tasks",
    members: 8,
    tasklists: [
      {
        id: 1,
        name: "Sprint Backlog",
        description: "Current sprint tasks",
        tasks: 12,
        completed: 5,
        updatedAt: "1 hour ago",
      },
      {
        id: 2,
        name: "In Progress",
        description: "Tasks currently being worked on",
        tasks: 8,
        completed: 3,
        updatedAt: "30 minutes ago",
      },
      {
        id: 3,
        name: "Code Review",
        description: "Tasks pending review",
        tasks: 6,
        completed: 2,
        updatedAt: "2 hours ago",
      },
    ],
    members_list: [
      {
        name: "Sarah Chen",
        role: "Owner",
        avatar: "/placeholder.svg",
        status: "active",
      },
      {
        name: "Alex Kim",
        role: "Member",
        avatar: "/placeholder.svg",
        status: "active",
      },
      {
        name: "Mike Wilson",
        role: "Member",
        avatar: "/placeholder.svg",
        status: "offline",
      },
    ],
    recentActivity: [
      {
        id: 1,
        user: "Sarah Chen",
        action: "created tasklist",
        target: "Sprint Backlog",
        time: "1 hour ago",
        avatar: "/placeholder.svg",
      },
      {
        id: 2,
        user: "Alex Kim",
        action: "completed task",
        target: "Update Documentation",
        time: "2 hours ago",
        avatar: "/placeholder.svg",
      },
    ],
  };

  const filteredTasklists = workspace.tasklists.filter((tasklist) =>
    tasklist.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            {workspace.name}
          </h2>
          <p className="text-muted-foreground">{workspace.description}</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit Workspace</DropdownMenuItem>
              <DropdownMenuItem>Duplicate Workspace</DropdownMenuItem>
              <DropdownMenuItem>Archive Workspace</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                Delete Workspace
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
            <FolderKanban className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {workspace.tasklists.reduce((acc, list) => acc + list.tasks, 0)}
            </div>
            <p className="text-xs text-muted-foreground">
              Across {workspace.tasklists.length} tasklists
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Completed Tasks
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {workspace.tasklists.reduce(
                (acc, list) => acc + list.completed,
                0
              )}
            </div>
            <Progress
              value={
                (workspace.tasklists.reduce(
                  (acc, list) => acc + list.completed,
                  0
                ) /
                  workspace.tasklists.reduce(
                    (acc, list) => acc + list.tasks,
                    0
                  )) *
                100
              }
              className="mt-2"
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{workspace.members}</div>
            <div className="mt-2 flex -space-x-2">
              {workspace.members_list.map((member, index) => (
                <Avatar key={index} className="border-2 border-background">
                  <AvatarImage src={member.avatar} />
                  <AvatarFallback>{member.name[0]}</AvatarFallback>
                </Avatar>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Activity</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {workspace.recentActivity.length}
            </div>
            <p className="text-xs text-muted-foreground">
              Updates in the last 24h
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tasklists..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="ml-4 flex items-center gap-4">
          <Button asChild>
            <Link href={`/workspaces/${workspace.id}/tasklists/new`}>
              <Plus className="mr-2 h-4 w-4" />
              New Tasklist
            </Link>
          </Button>
        </div>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-6 md:grid-cols-3"
      >
        {filteredTasklists.map((tasklist) => (
          <motion.div key={tasklist.id} variants={item}>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Link
                    href={`/workspaces/${workspace.id}/tasklists/${tasklist.id}`}
                    className="transition-colors hover:text-primary"
                  >
                    <CardTitle>{tasklist.name}</CardTitle>
                  </Link>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit Tasklist</DropdownMenuItem>
                      <DropdownMenuItem>Move Tasklist</DropdownMenuItem>
                      <DropdownMenuItem>Archive Tasklist</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        Delete Tasklist
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardDescription>{tasklist.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Progress</span>
                    <span>
                      {tasklist.completed}/{tasklist.tasks} tasks
                    </span>
                  </div>
                  <Progress
                    value={(tasklist.completed / tasklist.tasks) * 100}
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    Updated {tasklist.updatedAt}
                  </span>
                  <Button variant="ghost" size="sm" asChild>
                    <Link
                      href={`/workspaces/${workspace.id}/tasklists/${tasklist.id}`}
                    >
                      View Tasks
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
