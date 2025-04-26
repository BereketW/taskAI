/* eslint-disable react/no-unescaped-entities */
"use client";
import { AvatarFallback } from "@/components/ui/avatar";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CalendarDays,
  CheckCircle2,
  Clock,
  Plus,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Dashboard({
  todaysTasks,
  completedTasksLength,
  taskLength,
  todaysTaskList,
  tomorrowTasks,
}) {
  // const { data: session } = authClient.useSession();
  // if (!session.user) {
  //   redirect("");
  // }
  // if (!session?.user.emailVerified) {
  //   redirect("/email-not-verified");
  // }
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's an overview of your tasks.
          </p>
        </div>
        <Button asChild>
          <Link href="/tasks/new">
            <Plus className="mr-2 h-4 w-4" />
            New Task
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{taskLength}</div>
            <p className="text-xs text-muted-foreground">{} from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedTasksLength}</div>
            <p className="text-xs text-muted-foreground">
              {`${(completedTasksLength / taskLength) * 100}%`} completion rate
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Due Today</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{todaysTasks}</div>
            <p className="text-xs text-muted-foreground">
              {todaysTaskList.filter((task) => task.priority === "HIGH").length}{" "}
              high priority
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Streak</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7 days</div>
            <p className="text-xs text-muted-foreground">Keep it up!</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="today" className="w-full">
        <TabsList>
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="ai-suggestions">AI Suggestions</TabsTrigger>
        </TabsList>
        <TabsContent value="today" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Today's Tasks</CardTitle>
              <CardDescription>
                You have {todaysTasks} tasks due today.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {todaysTaskList.map((task, _) => (
                <div
                  key={task.id}
                  className="flex items-center justify-between rounded-lg border p-3 text-sm"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-2 w-2 rounded-full ${
                        task.priority === "HIGH"
                          ? "bg-destructive"
                          : task.priority === "MEDIUM"
                            ? "bg-amber-500"
                            : "bg-muted"
                      }`}
                    />
                    <span>
                      Task {_ + 1}: {task.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{task.dueTime} PM</span>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => {
                  redirect("/tasks");
                }}
                variant="outline"
                className="w-full"
              >
                View All Tasks
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="upcoming" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Tasks</CardTitle>
              <CardDescription>
                Tasks scheduled for the next 7 days.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {tomorrowTasks.length > 0 ? (
                tomorrowTasks.map((task, _) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between rounded-lg border p-3 text-sm"
                  >
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-muted" />
                      <span>
                        Upcoming Task {_ + 1}: {task.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <CalendarDays className="h-4 w-4" />
                      <span>Tomorrow</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center py-4 text-gray-400">
                  There are no upcoming tasks
                </p>
              )}
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => {
                  redirect("/calendar");
                }}
                variant="outline"
                className="w-full"
              >
                View Calendar
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="ai-suggestions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-secondary" />
                AI Task Suggestions
              </CardTitle>
              <CardDescription>
                Smart recommendations based on your habits.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-lg border p-3 text-sm"
                >
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-secondary" />
                    <span>AI Suggestion {i}: Schedule time for deep work</span>
                  </div>
                  <Button size="sm" variant="outline">
                    Add
                  </Button>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Suggestions
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Productivity Insights</CardTitle>
            <CardDescription>
              AI-powered analysis of your work patterns.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <TrendingUp className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Peak Productivity Time</p>
                  <p className="text-sm text-muted-foreground">
                    9:00 AM - 11:00 AM
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary/10">
                  <Sparkles className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Task Completion Rate</p>
                  <p className="text-sm text-muted-foreground">
                    50% (Improved by 5% this week)
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View Detailed Insights
            </Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Team Activity</CardTitle>
            <CardDescription>Recent updates from your team.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-start gap-4">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>T{i}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Team Member {i}</p>
                    <p className="text-xs text-muted-foreground">
                      Completed "Design Review" task
                    </p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View Team Dashboard
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
