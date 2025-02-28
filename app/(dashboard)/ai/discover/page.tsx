"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Brain,
  Filter,
  LayoutGrid,
  List,
  Plus,
  Search,
  SlidersHorizontal,
  Sparkles,
  Star,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TaskDiscoveryPage() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sort, setSort] = useState("recommended");

  const recommendedTasks = [
    {
      id: 1,
      title: "Update Website Content",
      description: "Refresh the landing page content with new features",
      category: "Marketing",
      priority: "High",
      estimatedTime: "3-4 hours",
      aiScore: 92,
      assignee: {
        name: "Sarah Chen",
        avatar: "/placeholder.svg",
      },
    },
    {
      id: 2,
      title: "Prepare Q1 Report",
      description: "Compile and analyze Q1 performance metrics",
      category: "Analytics",
      priority: "Medium",
      estimatedTime: "5-6 hours",
      aiScore: 88,
      assignee: {
        name: "Mike Wilson",
        avatar: "/placeholder.svg",
      },
    },
    {
      id: 3,
      title: "User Research",
      description: "Conduct user interviews for new feature",
      category: "Research",
      priority: "High",
      estimatedTime: "8-10 hours",
      aiScore: 85,
      assignee: {
        name: "Lisa Patel",
        avatar: "/placeholder.svg",
      },
    },
  ];

  const suggestedProjects = [
    {
      id: 1,
      title: "Mobile App Redesign",
      description: "Modernize the mobile app UI/UX",
      tasks: 8,
      completion: 35,
      priority: "High",
    },
    {
      id: 2,
      title: "Customer Feedback Analysis",
      description: "Analyze Q1 customer feedback and create action items",
      tasks: 5,
      completion: 60,
      priority: "Medium",
    },
    {
      id: 3,
      title: "Performance Optimization",
      description: "Improve website loading speed and performance",
      tasks: 6,
      completion: 20,
      priority: "High",
    },
  ];

  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Task Discovery</h2>
          <p className="text-muted-foreground">
            AI-powered task recommendations based on your workflow
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Task
          </Button>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setView(view === "grid" ? "list" : "grid")}
          >
            {view === "grid" ? (
              <LayoutGrid className="h-4 w-4" />
            ) : (
              <List className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search tasks..." className="pl-8" />
          </div>
        </div>
        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="w-[180px]">
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recommended">Recommended</SelectItem>
            <SelectItem value="priority">Priority</SelectItem>
            <SelectItem value="deadline">Deadline</SelectItem>
            <SelectItem value="complexity">Complexity</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="recommended" className="space-y-4">
        <TabsList>
          <TabsTrigger value="recommended">
            <Sparkles className="mr-2 h-4 w-4" />
            Recommended
          </TabsTrigger>
          <TabsTrigger value="projects">
            <Star className="mr-2 h-4 w-4" />
            Suggested Projects
          </TabsTrigger>
        </TabsList>
        <TabsContent value="recommended" className="space-y-4">
          <div
            className={
              view === "grid"
                ? "grid gap-4 md:grid-cols-2 lg:grid-cols-3"
                : "space-y-4"
            }
          >
            {recommendedTasks.map((task) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="cursor-pointer transition-all hover:shadow-md">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle>{task.title}</CardTitle>
                        <CardDescription>{task.description}</CardDescription>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1 rounded-full bg-primary/10 px-2 py-1 text-xs">
                          <Brain className="h-3 w-3" />
                          <span>{task.aiScore}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-sm">
                          <span className="rounded-full bg-secondary px-2 py-0.5 text-xs">
                            {task.category}
                          </span>
                          <span
                            className={`rounded-full px-2 py-0.5 text-xs ${
                              task.priority === "High"
                                ? "bg-red-100 text-red-700 dark:bg-red-900/30"
                                : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30"
                            }`}
                          >
                            {task.priority}
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {task.estimatedTime}
                        </div>
                      </div>
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={task.assignee.avatar} />
                        <AvatarFallback>{task.assignee.name[0]}</AvatarFallback>
                      </Avatar>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="projects" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {suggestedProjects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="cursor-pointer transition-all hover:shadow-md">
                  <CardHeader>
                    <div className="space-y-1">
                      <CardTitle>{project.title}</CardTitle>
                      <CardDescription>{project.description}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          <span>{project.tasks} tasks</span>
                          <Separator orientation="vertical" className="h-4" />
                          <span>{project.completion}% complete</span>
                        </div>
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs ${
                            project.priority === "High"
                              ? "bg-red-100 text-red-700 dark:bg-red-900/30"
                              : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30"
                          }`}
                        >
                          {project.priority}
                        </span>
                      </div>
                      <Button className="w-full">
                        View Project
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
