"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { ChevronLeft, ChevronRight, Plus, Sparkles } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function CalendarPage() {
  const [date, setDate] = useState<Date>(new Date());
  const [view, setView] = useState<"month" | "week" | "day">("month");

  // Mock data for tasks on calendar
  const calendarTasks = [
    {
      date: new Date(),
      title: "Complete project documentation",
      priority: "high",
      time: "4:00 PM",
    },
    {
      date: new Date(),
      title: "Review pull requests",
      priority: "high",
      time: "5:00 PM",
    },
    {
      date: new Date(),
      title: "Gym workout",
      priority: "medium",
      time: "6:00 PM",
    },
    {
      date: new Date(Date.now() + 86400000),
      title: "Weekly team meeting",
      priority: "medium",
      time: "10:00 AM",
    },
    {
      date: new Date(Date.now() + 86400000 * 5),
      title: "Grocery shopping",
      priority: "low",
      time: "11:00 AM",
    },
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-destructive";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-muted";
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
          <p className="text-muted-foreground">View and manage your schedule</p>
        </div>
        <Button asChild>
          <Link href="/tasks/new">
            <Plus className="mr-2 h-4 w-4" />
            New Task
          </Link>
        </Button>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1))
            }
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-xl font-semibold">
            {date.toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </h2>
          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1))
            }
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setDate(new Date())}
          >
            Today
          </Button>
        </div>
        <div className="flex gap-2">
          <Select
            value={view}
            onValueChange={(value) =>
              setView(value as "month" | "week" | "day")
            }
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="View" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Month</SelectItem>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="day">Day</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle>Calendar</CardTitle>
            <CardDescription>Your scheduled tasks and events.</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
            <div className="mt-6 space-y-2">
              <h3 className="font-medium">
                Tasks for{" "}
                {date.toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </h3>
              {calendarTasks
                .filter(
                  (task) =>
                    task.date.getDate() === date.getDate() &&
                    task.date.getMonth() === date.getMonth() &&
                    task.date.getFullYear() === date.getFullYear()
                )
                .map((task, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-2 w-2 rounded-full ${getPriorityColor(
                          task.priority
                        )}`}
                      />
                      <span>{task.title}</span>
                    </div>
                    <Badge variant={"outline"}>{task.time}</Badge>
                  </div>
                ))}
              {calendarTasks.filter(
                (task) =>
                  task.date.getDate() === date.getDate() &&
                  task.date.getMonth() === date.getMonth() &&
                  task.date.getFullYear() === date.getFullYear()
              ).length === 0 && (
                <div className="rounded-lg border p-4 text-center text-muted-foreground">
                  No tasks scheduled for this day
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-secondary" />
              AI Schedule Optimization
            </CardTitle>
            <CardDescription>Smart scheduling recommendations.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border p-3 bg-secondary/5">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-secondary" />
                <span className="font-medium">Optimal Work Hours</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                Based on your productivity patterns, schedule focused work
                between 9:00 AM - 11:00 AM.
              </p>
            </div>
            <div className="rounded-lg border p-3 bg-secondary/5">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-secondary" />
                <span className="font-medium">Task Distribution</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                You have too many high-priority tasks scheduled for today.
                Consider rescheduling some to tomorrow.
              </p>
              <Button variant="outline" size="sm" className="mt-2">
                Optimize Schedule
              </Button>
            </div>
            <div className="rounded-lg border p-3 bg-secondary/5">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-secondary" />
                <span className="font-medium">Break Reminder</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                Schedule short breaks between tasks to maintain productivity
                throughout the day.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
