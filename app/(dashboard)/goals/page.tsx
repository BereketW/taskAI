"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Clock,
  Flag,
  MoreHorizontal,
  Plus,
  Target,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
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

export default function GoalsPage() {
  const [goals] = useState([
    {
      id: 1,
      title: "Increase Productivity",
      description: "Improve task completion rate by 25%",
      progress: 65,
      dueDate: "2024-03-15",
      status: "In Progress",
      projects: 3,
      tasks: 12,
    },
    {
      id: 2,
      title: "Launch Mobile App",
      description: "Complete development and launch mobile application",
      progress: 40,
      dueDate: "2024-04-01",
      status: "In Progress",
      projects: 2,
      tasks: 8,
    },
    {
      id: 3,
      title: "Customer Satisfaction",
      description: "Achieve 95% customer satisfaction rate",
      progress: 80,
      dueDate: "2024-03-30",
      status: "On Track",
      projects: 4,
      tasks: 15,
    },
  ]);

  const [projects] = useState([
    {
      id: 1,
      title: "Website Redesign",
      description: "Modernize company website with new features",
      progress: 75,
      dueDate: "2024-03-20",
      status: "On Track",
      tasks: 24,
      members: 5,
    },
    {
      id: 2,
      title: "Product Launch",
      description: "Launch new product line Q1 2024",
      progress: 45,
      dueDate: "2024-04-15",
      status: "At Risk",
      tasks: 18,
      members: 8,
    },
    {
      id: 3,
      title: "Marketing Campaign",
      description: "Q1 Digital Marketing Campaign",
      progress: 90,
      dueDate: "2024-03-10",
      status: "Complete",
      tasks: 30,
      members: 6,
    },
  ]);

  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Goals & Projects
          </h2>
          <p className="text-muted-foreground">
            Track and manage your strategic objectives
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> New Goal
          </Button>
          <Button variant="outline">
            <Plus className="mr-2 h-4 w-4" /> New Project
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Goals</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Projects
            </CardTitle>
            <Flag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">+3 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Completion Rate
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">76%</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Time to Complete
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14.2 days</div>
            <p className="text-xs text-muted-foreground">
              -2.4 days from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Strategic Goals</h3>
            <Button variant="outline" size="sm">
              View All Goals
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {goals.map((goal) => (
              <motion.div
                key={goal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader className="space-y-0">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-medium">
                        {goal.title}
                      </CardTitle>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit Goal</DropdownMenuItem>
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Archive</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <CardDescription>{goal.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Progress</span>
                        <span className="font-medium">{goal.progress}%</span>
                      </div>
                      <Progress value={goal.progress} />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <Flag className="mr-1 h-4 w-4 text-muted-foreground" />
                        <span>{goal.projects} Projects</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle2 className="mr-1 h-4 w-4 text-muted-foreground" />
                        <span>{goal.tasks} Tasks</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                        <span>{goal.dueDate}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Active Projects</h3>
            <Button variant="outline" size="sm">
              View All Projects
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader className="space-y-0">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-medium">
                        {project.title}
                      </CardTitle>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit Project</DropdownMenuItem>
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Archive</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Progress</span>
                        <span
                          className={`font-medium ${
                            project.status === "At Risk"
                              ? "text-destructive"
                              : project.status === "Complete"
                              ? "text-green-500"
                              : ""
                          }`}
                        >
                          {project.progress}%
                        </span>
                      </div>
                      <Progress
                        value={project.progress}
                        className={
                          project.status === "At Risk"
                            ? "text-destructive"
                            : project.status === "Complete"
                            ? "text-green-500"
                            : ""
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <CheckCircle2 className="mr-1 h-4 w-4 text-muted-foreground" />
                        <span>{project.tasks} Tasks</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                        <span>{project.dueDate}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
