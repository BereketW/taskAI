"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FolderKanban,
  MoreHorizontal,
  Plus,
  Search,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { Skeleton } from "@/components/ui/skeleton";
import { timeAgo } from "@/constants/time";
import { authClient } from "@/lib/auth-client";
import { getAllWorkspaces } from "@/actions/workspaces";
export default function WorkspacesPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [workspaces, setWorkspace] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const { data: session } = authClient.useSession();
  useEffect(() => {
    async function getWorkspace() {
      setIsLoading(true);

      try {
        const { data } = await getAllWorkspaces();
        console.log(data);
        setWorkspace(data.workspaces);
      } catch (err) {
        console.log(err);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    }
    getWorkspace();
  }, []);
  // const workspaces = [
  //   {
  //     id: 1,
  //     name: "Product Development",
  //     description: "Main workspace for product development tasks",
  //     members: 8,
  //     tasklists: 5,
  //     tasks: 34,
  //     updatedAt: "2 hours ago",
  //     members: [
  //       { name: "Sarah Chen", avatar: "/placeholder.svg" },
  //       { name: "Alex Kim", avatar: "/placeholder.svg" },
  //       { name: "Mike Wilson", avatar: "/placeholder.svg" },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     name: "Marketing Projects",
  //     description: "Marketing campaign planning and execution",
  //     members: 6,
  //     tasklists: 3,
  //     tasks: 28,
  //     updatedAt: "5 hours ago",
  //     members: [
  //       { name: "Emma Rodriguez", avatar: "/placeholder.svg" },
  //       { name: "James Wilson", avatar: "/placeholder.svg" },
  //     ],
  //   },
  //   {
  //     id: 3,
  //     name: "Design Team",
  //     description: "Design projects and resources",
  //     members: 4,
  //     tasklists: 4,
  //     tasks: 22,
  //     updatedAt: "1 day ago",
  //     members_preview: [
  //       { name: "Lisa Patel", avatar: "/placeholder.svg" },
  //       { name: "David Kim", avatar: "/placeholder.svg" },
  //     ],
  //   },
  // ];
  console.log("workspace", workspaces);

  const filteredWorkspaces = workspaces.filter((workspace) =>
    workspace.name.toLowerCase().includes(searchQuery.toLowerCase())
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

  const WorkspaceSkeleton = () => (
    <Card className="group relative overflow-hidden">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-60" />
          </div>
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex -space-x-2">
            {[...Array(3)].map((_, i) => (
              <Skeleton
                key={i}
                className="h-8 w-8 rounded-full border-2 border-background"
              />
            ))}
          </div>
          <Skeleton className="h-8 w-20" />
        </div>
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-32" />
        </div>
      </CardContent>
      <CardFooter>
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  );

  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Workspaces</h2>
          <p className="text-muted-foreground">
            Create and manage your workspaces
          </p>
        </div>
        <Button asChild>
          <Link href="/workspaces/new">
            <Plus className="mr-2 h-4 w-4" />
            New Workspace
          </Link>
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search workspaces..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {isLoading ? (
          // Show skeletons while loading
          [...Array(6)].map((_, index) => (
            <motion.div key={`skeleton-${index}`} variants={item}>
              <WorkspaceSkeleton />
            </motion.div>
          ))
        ) : filteredWorkspaces.length > 0 ? (
          // Show actual workspaces when loaded
          filteredWorkspaces.map((workspace) => (
            <motion.div key={workspace.id} variants={item}>
              <Card className="group relative overflow-hidden">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Link
                      href={`/workspaces/${workspace.id}`}
                      className="transition-colors group-hover:text-primary"
                    >
                      <CardTitle>{workspace.name}</CardTitle>
                    </Link>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onSelect={() =>
                            router.push(`/workspaces/${workspace.id}/edit`)
                          }
                        >
                          Edit Workspace
                        </DropdownMenuItem>
                        <DropdownMenuItem>Duplicate Workspace</DropdownMenuItem>
                        <DropdownMenuItem>Archive Workspace</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          Delete Workspace
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <CardDescription>{workspace.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {workspace.members.map((member, index) => (
                        <Avatar
                          key={index}
                          className="border-2 border-background"
                        >
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback>{member.name[0]}</AvatarFallback>
                        </Avatar>
                      ))}
                      {workspace.members > workspace.members.length && (
                        <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-muted text-xs">
                          +{workspace.members - workspace.members.length}
                        </div>
                      )}
                    </div>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Users className="h-4 w-4" />
                      {workspace.members}
                    </Button>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <FolderKanban className="h-4 w-4 text-muted-foreground" />
                      <span>{workspace.taskLists.length} lists</span>
                    </div>
                    <span className="text-muted-foreground">
                      Updated {timeAgo(new Date(workspace.updatedAt))}
                    </span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href={`/workspaces/${workspace.id}`}>
                      View Workspace
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))
        ) : (
          // Show message when no workspaces match the search
          <div className="col-span-full text-center">
            <p className="text-muted-foreground">No workspaces found</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
