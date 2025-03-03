"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertCircle,
  Calendar,
  Check,
  Clock,
  Edit,
  Filter,
  Plus,
  Search,
  Sparkles,
  Trash2,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TasksPage({ tasks }) {
  console.log("TasksPage", tasks);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("all");

  const filteredTasks = tasks.filter(
    (task) =>
      (task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedPriority === "all" || task.priority === selectedPriority)
  );

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-muted";
    }
  };

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
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tasks</h1>
          <p className="text-muted-foreground">
            Manage and organize your tasks
          </p>
        </div>
        <Button asChild>
          <Link href="/tasks/new">
            <Plus className="mr-2 h-4 w-4" />
            New Task
          </Link>
        </Button>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={selectedPriority} onValueChange={setSelectedPriority}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Filter by priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="high">High Priority</SelectItem>
            <SelectItem value="medium">Medium Priority</SelectItem>
            <SelectItem value="low">Low Priority</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Tasks</CardTitle>
              <CardDescription>
                View and manage all your tasks in one place.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="space-y-4"
              >
                <AnimatePresence>
                  {filteredTasks.map((task) => (
                    <motion.div
                      key={task.id}
                      variants={item}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="group relative rounded-lg border p-4 hover:bg-muted/50"
                    >
                      <div className="flex items-start gap-4">
                        <Checkbox
                          id={`task-${task.id}`}
                          checked={task.status === "PENDING"}
                          className="mt-1"
                        />
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <label
                              htmlFor={`task-${task.id}`}
                              className={`text-base font-medium ${
                                task.completed
                                  ? "line-through text-muted-foreground"
                                  : ""
                              }`}
                            >
                              {task.title}
                            </label>
                            <div
                              className={`h-2 w-2 rounded-full ${getPriorityColor(
                                task.priority
                              )}`}
                            />
                            <Badge variant="outline">{task.category}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {task.description}
                          </p>
                          <div className="flex flex-wrap items-center gap-2 pt-2">
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Clock className="h-3.5 w-3.5" />
                              <span>{task.dueDate}</span>
                            </div>
                            {task.tags.map((tag) => (
                              <Badge
                                key={tag}
                                variant="secondary"
                                className="text-xs"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      {task.priority === "high" && (
                        <div className="absolute -right-1 -top-1">
                          <span className="relative flex h-3 w-3">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex h-3 w-3 rounded-full bg-red-500"></span>
                          </span>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="today">
          <Card>
            <CardHeader>
              <CardTitle>Today's Tasks</CardTitle>
              <CardDescription>
                Tasks that need to be completed today.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <motion.div
                variants={container}
                initial="hidden"
                animate="show"
                className="space-y-4"
              >
                {filteredTasks
                  .filter((task) => task.dueDate.includes("Today"))
                  .map((task) => (
                    <motion.div
                      key={task.id}
                      variants={item}
                      className="group relative rounded-lg border p-4 hover:bg-muted/50"
                    >
                      {/* Task content (same as above) */}
                    </motion.div>
                  ))}
              </motion.div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Similar structure for "upcoming" and "completed" tabs */}
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-secondary" />
            AI Task Suggestions
          </CardTitle>
          <CardDescription>
            Smart recommendations based on your task patterns.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-4"
          >
            {[
              {
                title: "Break down project documentation",
                description:
                  "This task might be more manageable if split into smaller subtasks.",
                icon: AlertCircle,
                action: "Split Task",
              },
              {
                title: "Schedule focus time",
                description:
                  "Block 2 hours tomorrow morning for deep work on high-priority tasks.",
                icon: Calendar,
                action: "Schedule",
              },
              {
                title: "Delegate review tasks",
                description:
                  "Consider delegating some code reviews to reduce workload.",
                icon: Check,
                action: "Delegate",
              },
            ].map((suggestion, index) => (
              <motion.div
                key={index}
                variants={item}
                className="relative overflow-hidden rounded-lg border p-4 transition-colors hover:bg-muted/50"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-primary/5" />
                <div className="relative flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/10">
                    <suggestion.icon className="h-5 w-5 text-secondary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{suggestion.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {suggestion.description}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    {suggestion.action}
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </CardContent>
      </Card>
    </div>
  );
}
