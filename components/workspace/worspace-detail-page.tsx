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
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { timeAgo } from "@/constants/time";

export default function WorkspaceDetailPage({ id, workspace }) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(!workspace);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   async function getWorkspace() {
  //     setIsLoading(true);
  //     try {
  //       // ✅ Fetch session first

  //       // ✅ Use session token in the request
  //       const { data } = await getSingleWorkspace(id);

  //       setWorkspace(data.workspace);
  //     } catch (err) {
  //       console.error("Error fetching workspace:", err);
  //       setError(err.message);
  //       toast({
  //         title: "Error",
  //         description: "Failed to fetch workspace.",
  //         variant: "destructive",
  //       });
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }

  //   getWorkspace();
  // }, [id]);

  // Skeleton components for loading states
  const HeaderSkeleton = () => (
    <div className="flex items-center justify-between">
      <div className="space-y-2">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-96" />
      </div>
      <div className="flex items-center gap-4">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-28" />
        <Skeleton className="h-10 w-10 rounded-md" />
      </div>
    </div>
  );

  const StatCardSkeleton = () => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-4 w-4" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-8 w-16 mb-2" />
        <Skeleton className="h-4 w-full" />
      </CardContent>
    </Card>
  );

  const TasklistCardSkeleton = () => (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-8 w-8 rounded-md" />
        </div>
        <Skeleton className="h-4 w-full mt-2" />
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-24" />
          </div>
          <Skeleton className="h-4 w-full" />
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-8 w-24" />
        </div>
      </CardContent>
    </Card>
  );

  const MemberAvatarSkeleton = () => (
    <Skeleton className="h-8 w-8 rounded-full border-2 border-background" />
  );

  if (!workspace && !isLoading) {
    return <div>No workspace found</div>;
  }

  const filteredTasklists = isLoading
    ? []
    : workspace.taskLists.filter((tasklist) =>
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
      {isLoading ? (
        <HeaderSkeleton />
      ) : (
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
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {isLoading ? (
          <>
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
          </>
        ) : (
          <>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Tasks
                </CardTitle>
                <FolderKanban className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {workspace.taskLists.reduce(
                    (acc, list) => acc + list.tasks.length,
                    0
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  Across {workspace.taskLists.length} tasklists
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
                  {workspace.taskLists.reduce(
                    (acc, list) => acc + list.tasks,
                    0
                  )}
                </div>
                <Progress
                  value={
                    (workspace.taskLists.reduce(
                      (acc, list) => acc + (list.status === "COMPLETED"),
                      0
                    ) /
                      workspace.taskLists.reduce(
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
                  {workspace.members.map((member, index) => (
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
                  {/* {workspace.recentActivity.length} */}
                </div>
                <p className="text-xs text-muted-foreground">
                  Updates in the last 24h
                </p>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tasklists..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <div className="ml-4 flex items-center gap-4">
          <Button asChild disabled={isLoading}>
            <Link
              href={
                isLoading ? "#" : `/workspaces/${workspace?.id}/tasklists/new`
              }
            >
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
        {isLoading ? (
          // Show skeleton tasklist cards while loading
          [...Array(6)].map((_, index) => (
            <motion.div key={`skeleton-${index}`} variants={item}>
              <TasklistCardSkeleton />
            </motion.div>
          ))
        ) : filteredTasklists.length > 0 ? (
          // Show actual tasklists when loaded
          filteredTasklists.map((tasklist) => (
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
                        {tasklist.tasks.length}/{tasklist.tasks.length} tasks
                      </span>
                    </div>
                    <Progress value={(tasklist.tasks.length + 1 / 10) * 100} />
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      Updated {timeAgo(new Date(tasklist.updatedAt))}
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
          ))
        ) : (
          // Show message when no tasklists match the search
          <div className="col-span-full text-center">
            <p className="text-muted-foreground">No tasklists found</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
