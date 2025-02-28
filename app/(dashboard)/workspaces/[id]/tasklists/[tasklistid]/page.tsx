"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  AlertCircle,
  ArrowDownUp,
  Calendar,
  CheckCircle2,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
} from "lucide-react";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export default function TasklistDetailPage() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [sortBy, setSortBy] = useState("dueDate");
  const [isUpdating, setIsUpdating] = useState(false);

  // Mock tasklist data
  const tasklist = {
    id: "1",
    name: "Sprint Backlog",
    description: "Current sprint tasks and objectives",
    workspace: "Product Development",
    totalTasks: 12,
    completedTasks: 5,
    overdueTasks: 2,
    highPriorityTasks: 4,
    tasks: [
      {
        id: "1",
        title: "Implement user authentication",
        description: "Add OAuth integration for social login",
        status: "in-progress",
        priority: "high",
        dueDate: "2024-03-15",
        assignee: {
          name: "Sarah Chen",
          avatar: "/placeholder.svg",
        },
        tags: ["Frontend", "Security"],
        subtasks: {
          total: 4,
          completed: 2,
        },
      },
      {
        id: "2",
        title: "Design system updates",
        description: "Update component library with new styles",
        status: "todo",
        priority: "medium",
        dueDate: "2024-03-16",
        assignee: {
          name: "Alex Kim",
          avatar: "/placeholder.svg",
        },
        tags: ["Design", "UI"],
        subtasks: {
          total: 3,
          completed: 0,
        },
      },
      {
        id: "3",
        title: "API documentation",
        description: "Update API documentation with new endpoints",
        status: "completed",
        priority: "low",
        dueDate: "2024-03-14",
        assignee: {
          name: "Mike Wilson",
          avatar: "/placeholder.svg",
        },
        tags: ["Documentation", "API"],
        subtasks: {
          total: 2,
          completed: 2,
        },
      },
    ],
    recentActivity: [
      {
        id: 1,
        user: "Sarah Chen",
        action: "completed",
        target: "User authentication - Google integration",
        time: "2 hours ago",
        avatar: "/placeholder.svg",
      },
      {
        id: 2,
        user: "Alex Kim",
        action: "updated",
        target: "Design system documentation",
        time: "4 hours ago",
        avatar: "/placeholder.svg",
      },
    ],
  };

  const handleStatusChange = async (taskId: string, checked: boolean) => {
    setIsUpdating(true);
    // Simulate API call
    setTimeout(() => {
      setIsUpdating(false);
      toast({
        title: "Task Updated",
        description: "Task status has been updated successfully.",
      });
    }, 500);
  };

  const filteredTasks = tasklist.tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      filterStatus === "all" ||
      (filterStatus === "completed" && task.status === "completed") ||
      (filterStatus === "active" && task.status !== "completed");
    const matchesPriority =
      filterPriority === "all" || task.priority === filterPriority;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  // Sort tasks
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    switch (sortBy) {
      case "dueDate":
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      case "priority":
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return (
          priorityOrder[a.priority as keyof typeof priorityOrder] -
          priorityOrder[b.priority as keyof typeof priorityOrder]
        );
      case "title":
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });

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
          <h2 className="text-3xl font-bold tracking-tight">{tasklist.name}</h2>
          <p className="text-muted-foreground">
            {tasklist.description} • {tasklist.workspace}
          </p>
        </div>
        <div className="flex items-center gap-4">
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
              <DropdownMenuItem>Edit Tasklist</DropdownMenuItem>
              <DropdownMenuItem>Move Tasklist</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Archive Tasklist</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                Delete Tasklist
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tasklist.totalTasks}</div>
            <Progress
              value={(tasklist.completedTasks / tasklist.totalTasks) * 100}
              className="mt-2"
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tasklist.completedTasks}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round(
                (tasklist.completedTasks / tasklist.totalTasks) * 100
              )}
              % completion rate
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tasklist.overdueTasks}</div>
            <p className="text-xs text-muted-foreground">Tasks past due date</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Priority</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {tasklist.highPriorityTasks}
            </div>
            <p className="text-xs text-muted-foreground">
              Tasks marked as high priority
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tasks..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[140px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Status</SelectLabel>
                <SelectItem value="all">All Tasks</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select value={filterPriority} onValueChange={setFilterPriority}>
            <SelectTrigger className="w-[140px]">
              <AlertCircle className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Priority</SelectLabel>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-4">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[140px]">
              <ArrowDownUp className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dueDate">Due Date</SelectItem>
              <SelectItem value="priority">Priority</SelectItem>
              <SelectItem value="title">Title</SelectItem>
            </SelectContent>
          </Select>
          <Button asChild>
            <Link href="/tasks/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Task
            </Link>
          </Button>
        </div>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-4"
      >
        {sortedTasks.map((task) => (
          <motion.div key={task.id} variants={item}>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Checkbox
                    checked={task.status === "completed"}
                    disabled={isUpdating}
                    onCheckedChange={(checked) =>
                      handleStatusChange(task.id, checked)
                    }
                    className="mt-1"
                  />
                  <div className="flex-1 space-y-1">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <h4 className="text-base font-medium leading-none">
                          {task.title}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {task.description}
                        </p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit Task</DropdownMenuItem>
                          <DropdownMenuItem>Move Task</DropdownMenuItem>
                          <DropdownMenuItem>Add Subtask</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            Delete Task
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge
                        variant="outline"
                        className={
                          task.priority === "high"
                            ? "border-red-500 text-red-500"
                            : task.priority === "medium"
                            ? "border-yellow-500 text-yellow-500"
                            : "border-green-500 text-green-500"
                        }
                      >
                        {task.priority} priority
                      </Badge>
                      {task.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex flex-wrap items-center gap-4 pt-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>Due {task.dueDate}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="h-4 w-4" />
                        <span>
                          {task.subtasks.completed}/{task.subtasks.total}{" "}
                          subtasks
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={task.assignee.avatar} />
                          <AvatarFallback>
                            {task.assignee.name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{task.assignee.name}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest updates in this tasklist</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tasklist.recentActivity.map((activity, index) => (
              <div key={activity.id} className="flex items-start gap-4">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={activity.avatar} />
                  <AvatarFallback>{activity.user[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <p className="text-sm">
                    <span className="font-medium">{activity.user}</span>{" "}
                    {activity.action}{" "}
                    <span className="font-medium">{activity.target}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
