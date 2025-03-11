"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  Clock,
  Link2,
  MessageSquare,
  MoreHorizontal,
  Paperclip,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

export default function TaskDetailPage({ task }) {
  //   const [task] = useState({
  //     id: "TASK-1234",
  //     title: "Implement New Feature",
  //     description:
  //       "Design and implement the new user dashboard with improved analytics and real-time data visualization.",
  //     status: "In Progress",
  //     priority: "High",
  //     progress: 65,
  //     dueDate: "2024-03-15",
  //     createdAt: "2024-02-28",
  //     assignee: {
  //       name: "Sarah Chen",
  //       avatar: "/placeholder.svg",
  //       role: "Frontend Developer",
  //     },
  //     project: "Website Redesign",
  //     tags: ["Frontend", "UI/UX", "Dashboard"],
  //     attachments: 3,
  //     comments: 8,
  //     subtasks: [
  //       {
  //         id: 1,
  //         title: "Design mockups",
  //         completed: true,
  //       },
  //       {
  //         id: 2,
  //         title: "Implement basic layout",
  //         completed: true,
  //       },
  //       {
  //         id: 3,
  //         title: "Add interactive charts",
  //         completed: false,
  //       },
  //       {
  //         id: 4,
  //         title: "User testing",
  //         completed: false,
  //       },
  //     ],
  //     activities: [
  //       {
  //         id: 1,
  //         type: "comment",
  //         user: "Alex Kim",
  //         avatar: "/placeholder.svg",
  //         content: "Added new requirements for chart interactions",
  //         time: "2 hours ago",
  //       },
  //       {
  //         id: 2,
  //         type: "update",
  //         user: "Sarah Chen",
  //         avatar: "/placeholder.svg",
  //         content: "Updated task progress to 65%",
  //         time: "4 hours ago",
  //       },
  //       {
  //         id: 3,
  //         type: "attachment",
  //         user: "Mike Wilson",
  //         avatar: "/placeholder.svg",
  //         content: "Added design specifications document",
  //         time: "1 day ago",
  //       },
  //     ],
  //   });

  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <h2 className="text-3xl font-bold tracking-tight">{task.title}</h2>
            <span className="text-sm text-muted-foreground">#{task.id}</span>
          </div>
          <p className="text-muted-foreground">in {task.project}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline">Share</Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">More actions</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit Task</DropdownMenuItem>
              <DropdownMenuItem>Move to Project</DropdownMenuItem>
              <DropdownMenuItem>Delete Task</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-6">
        <div className="space-y-6 md:col-span-4">
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{task.description}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Subtasks</CardTitle>
              <CardDescription>
                {task.subtasks.filter((st) => st.completed).length} of{" "}
                {task.subtasks.length} subtasks completed
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {task.subtasks.map((subtask) => (
                <div key={subtask.id} className="flex items-center space-x-2">
                  <CheckCircle2
                    className={`h-5 w-5 ${
                      subtask.completed
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  />
                  <span className={subtask.completed ? "line-through" : ""}>
                    {subtask.title}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {task.activities.map((activity) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start space-x-4"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={activity.avatar} />
                    <AvatarFallback>{activity.user[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm">
                      <span className="font-medium">{activity.user}</span>{" "}
                      {activity.content}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                </motion.div>
              ))}
              <Separator className="my-4" />
              <div className="space-y-4">
                <Textarea
                  placeholder="Add a comment..."
                  className="min-h-[100px]"
                />
                <Button>Add Comment</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Status</div>
                <div className="flex items-center space-x-2">
                  <div
                    className={`h-2 w-2 rounded-full ${
                      task.status === "In Progress"
                        ? "bg-blue-500"
                        : "bg-green-500"
                    }`}
                  />
                  <span>{task.status}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Priority</div>
                <div className="flex items-center space-x-2">
                  <AlertCircle
                    className={`h-4 w-4 ${
                      task.priority === "High"
                        ? "text-red-500"
                        : "text-yellow-500"
                    }`}
                  />
                  <span>{task.priority}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Progress</div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>{task.progress}% complete</span>
                  </div>
                  <Progress value={task.progress} />
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Assignee</div>
                <div className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={task.assignee.avatar} />
                    <AvatarFallback>{task.assignee.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-sm font-medium">
                      {task.assignee.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {task.assignee.role}
                    </div>
                  </div>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Dates</div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Due {task.dueDate}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Created {task.createdAt}</span>
                  </div>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Tags</div>
                <div className="flex flex-wrap gap-2">
                  {task.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <Separator />
              <div className="flex justify-between text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Paperclip className="mr-2 h-4 w-4" />
                  {task.attachments} attachments
                </div>
                <div className="flex items-center">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  {task.comments} comments
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Linked Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Link2 className="h-4 w-4 text-muted-foreground" />
                    <span>PRD Document</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Link2 className="h-4 w-4 text-muted-foreground" />
                    <span>Design Specs</span>
                  </div>
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
