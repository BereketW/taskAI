"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  Loader2,
  Plus,
  RefreshCw,
  Sparkles,
  X,
  CalendarIcon,
} from "lucide-react";
import Link from "next/link";
import { format, isSameDay, parseISO, addDays } from "date-fns";
import { createRoot } from "react-dom/client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import ReactDOM from "react-dom";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { fetchTask } from "@/actions/tasks";

// Define task type
interface Task {
  id: string;
  title: string;
  description?: string;
  priority: "high" | "medium" | "low";
  dueDate: string;
  dueTime?: string;
  status: "todo" | "in-progress" | "completed";
  category?: string;
  createdBy?: {
    name: string;
    image?: string;
  };
  workspace?: string;
  tasklist?: string;
  assignee?: {
    name: string;
    avatar?: string;
  };
}

// Async function to fetch tasks from the database
// async function fetchTasks() {
//   try {
//     // In a real app, this would be an API call to your database
//     // For now, we'll return mock data
//     await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay

//     const today = new Date();
//     const tomorrow = addDays(today, 1);
//     const nextWeek = addDays(today, 7);

//     const tasks: Task[] = [
//       {
//         id: "t1",
//         title: "Complete project documentation",
//         description:
//           "Write technical documentation for the new feature implementation",
//         priority: "high",
//         dueDate: today.toISOString(),
//         dueTime: "14:00",
//         status: "in-progress",
//         category: "Work",
//         assignee: {
//           name: "John Doe",
//           avatar: "/placeholder.svg?height=32&width=32",
//         },
//       },
//       {
//         id: "t2",
//         title: "Review pull requests",
//         description: "Review and provide feedback on team pull requests",
//         priority: "high",
//         dueDate: today.toISOString(),
//         dueTime: "17:00",
//         status: "todo",
//         category: "Work",
//       },
//       {
//         id: "t3",
//         title: "Weekly team meeting",
//         description: "Discuss project progress and roadblocks",
//         priority: "medium",
//         dueDate: tomorrow.toISOString(),
//         dueTime: "10:00",
//         status: "todo",
//         category: "Work",
//         assignee: {
//           name: "Sarah Johnson",
//           avatar: "/placeholder.svg?height=32&width=32",
//         },
//       },
//       {
//         id: "t4",
//         title: "Prepare presentation",
//         description: "Create slides for the client meeting",
//         priority: "medium",
//         dueDate: tomorrow.toISOString(),
//         dueTime: "14:00",
//         status: "todo",
//         category: "Work",
//       },
//       {
//         id: "t5",
//         title: "Gym workout",
//         description: "30 minutes cardio and strength training",
//         priority: "low",
//         dueDate: today.toISOString(),
//         dueTime: "18:00",
//         status: "completed",
//         category: "Personal",
//       },
//       {
//         id: "t6",
//         title: "Design review",
//         description: "Review new UI components",
//         priority: "medium",
//         dueDate: addDays(today, 2).toISOString(),
//         dueTime: "11:00",
//         status: "todo",
//         category: "Design",
//       },
//       {
//         id: "t7",
//         title: "Quarterly planning",
//         description: "Plan objectives for the next quarter",
//         priority: "high",
//         dueDate: addDays(today, 3).toISOString(),
//         dueTime: "09:00",
//         status: "todo",
//         category: "Planning",
//         assignee: {
//           name: "Michael Chen",
//           avatar: "/placeholder.svg?height=32&width=32",
//         },
//       },
//       {
//         id: "t8",
//         title: "Update portfolio",
//         description: "Add recent projects to portfolio",
//         priority: "low",
//         dueDate: nextWeek.toISOString(),
//         status: "todo",
//         category: "Personal",
//       },
//     ];

//     return { tasks };
//   } catch (error) {
//     console.error("Error fetching tasks:", error);
//     throw error;
//   }
// }

// Function to get AI schedule optimization
async function getAIOptimization(tasks: Task[], date: Date) {
  try {
    // In a real app, this would call an API endpoint that uses Gemini
    // For now, we'll simulate a response
    await new Promise((resolve) => setTimeout(resolve, 1500));

    return {
      optimalWorkHours: {
        start: "9:00 AM",
        end: "11:00 AM",
        reason: "Based on your productivity patterns and calendar analysis",
      },
      taskDistribution: {
        overloaded: tasks.filter((t) => t.priority === "high").length > 3,
        suggestion:
          "Consider rescheduling some high-priority tasks to tomorrow",
      },
      breakSuggestions: [
        { time: "11:00 AM", duration: "15 minutes" },
        { time: "2:30 PM", duration: "10 minutes" },
        { time: "4:45 PM", duration: "5 minutes" },
      ],
      focusTips: [
        "Block notifications during your optimal work hours",
        "Group similar tasks together for better context switching",
        "Schedule complex tasks during your peak energy periods",
      ],
    };
  } catch (error) {
    console.error("Error getting AI optimization:", error);
    throw error;
  }
}

// Map priority to color
function getPriorityColor(priority: string): string {
  switch (priority) {
    case "HIGH":
      return "#ef4444"; // text-red-500
    case "MEDIUM":
      return "#f59e0b"; // text-amber-500
    case "LOW":
      return "#10b981"; // text-emerald-500
    default:
      return "#6b7280"; // text-gray-500
  }
}

// Format tasks for FullCalendar
function formatTasksForCalendar(tasks: Task[]) {
  return tasks.map((task) => ({
    id: task.id,
    title: task.title,
    start: task.dueTime
      ? `${task.dueDate.split("T")[0]}T${task.dueTime}:00`
      : task.dueDate,
    allDay: !task.dueTime,
    backgroundColor: getPriorityColor(task.priority),
    borderColor: getPriorityColor(task.priority),
    textColor: "#ffffff",
    extendedProps: {
      description: task.description,
      priority: task.priority,
      status: task.status,
      category: task.category,
      assignee: task.assignee,
    },
  }));
}

export default function CalendarPage() {
  const { toast } = useToast();
  const [date, setDate] = useState<Date>(new Date());
  const [view, setView] = useState<
    "dayGridMonth" | "timeGridWeek" | "timeGridDay" | "listWeek"
  >("dayGridMonth");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [optimization, setOptimization] = useState<any>(null);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [calendarRef, setCalendarRef] = useState<any>(null);

  // Fetch tasks on component mount
  useEffect(() => {
    async function loadTasks() {
      try {
        setIsLoading(true);
        const { tasks } = await fetchTask();
        setTasks(tasks);
        setError(null);
      } catch (err) {
        setError("Failed to load tasks. Please try again.");
        toast({
          variant: "destructive",
          title: "Error loading tasks",
          description: "Please refresh the page and try again.",
        });
      } finally {
        setIsLoading(false);
      }
    }

    loadTasks();
  }, [toast]);

  // Get AI optimization when date changes
  useEffect(() => {
    async function loadOptimization() {
      if (tasks.length === 0) return;

      try {
        setIsOptimizing(true);
        const optimizationData = await getAIOptimization(tasks, date);
        setOptimization(optimizationData);
      } catch (err) {
        console.error("Failed to get AI optimization:", err);
      } finally {
        setIsOptimizing(false);
      }
    }

    loadOptimization();
  }, [date, tasks]);

  // Filter tasks for the selected date
  const tasksForSelectedDate = tasks.filter((task) =>
    isSameDay(parseISO(task.dueDate), date)
  );

  // Get priority badge variant
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive";
      case "medium":
        return "warning";
      case "low":
        return "success";
      default:
        return "secondary";
    }
  };

  // Handle optimize schedule
  const handleOptimizeSchedule = async () => {
    try {
      setIsOptimizing(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast({
        title: "Schedule Optimized",
        description:
          "Your schedule has been optimized for maximum productivity.",
      });

      // In a real app, this would update the tasks with new times
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Optimization failed",
        description: "Please try again later.",
      });
    } finally {
      setIsOptimizing(false);
    }
  };

  // Handle calendar date change
  const handleDateChange = (info: any) => {
    setDate(info.start || new Date());
  };

  // Handle calendar event click
  const handleEventClick = (info: any) => {
    const taskId = info.event.id;
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      setSelectedTask(task);
    }
  };

  // Handle calendar view change
  const handleViewChange = (newView: string) => {
    setView(newView as any);
    if (calendarRef) {
      calendarRef.getApi().changeView(newView);

      // When changing to a day or week view, make sure we see the tasks for the selected date
      if (newView === "timeGridDay" || newView === "timeGridWeek") {
        calendarRef.getApi().gotoDate(date);
      }
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
          <p className="text-muted-foreground">View and manage your schedule</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => window.location.reload()}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button asChild>
            <Link href="/tasks/new">
              <Plus className="mr-2 h-4 w-4" />
              New Task
            </Link>
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              if (calendarRef) {
                calendarRef.getApi().prev();
                setDate(calendarRef.getApi().getDate());
              }
            }}
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
            onClick={() => {
              if (calendarRef) {
                calendarRef.getApi().next();
                setDate(calendarRef.getApi().getDate());
              }
            }}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              if (calendarRef) {
                calendarRef.getApi().today();
                setDate(calendarRef.getApi().getDate());
              }
            }}
          >
            Today
          </Button>
        </div>
        <div className="flex gap-2">
          <Tabs defaultValue={view} className="w-[400px]">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger
                value="dayGridMonth"
                onClick={() => handleViewChange("dayGridMonth")}
              >
                Month
              </TabsTrigger>
              <TabsTrigger
                value="timeGridWeek"
                onClick={() => handleViewChange("timeGridWeek")}
              >
                Week
              </TabsTrigger>
              <TabsTrigger
                value="timeGridDay"
                onClick={() => handleViewChange("timeGridDay")}
              >
                Day
              </TabsTrigger>
              <TabsTrigger
                value="listWeek"
                onClick={() => handleViewChange("listWeek")}
              >
                List
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="md:col-span-2"
        >
          <Card className="overflow-hidden h-full">
            <CardHeader className="pb-2 bg-gradient-to-r from-primary/10 to-secondary/10">
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                Calendar
              </CardTitle>
              <CardDescription>Your scheduled tasks and events</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              {isLoading ? (
                <div className="space-y-4 p-6">
                  <Skeleton className="h-[500px] w-full rounded-md" />
                </div>
              ) : error ? (
                <div className="flex flex-col items-center justify-center py-12 text-center p-6">
                  <AlertCircle className="h-12 w-12 text-destructive mb-4" />
                  <h3 className="text-lg font-semibold">
                    Failed to load calendar
                  </h3>
                  <p className="text-muted-foreground mt-2 mb-4">{error}</p>
                  <Button onClick={() => window.location.reload()}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Retry
                  </Button>
                </div>
              ) : (
                <div className="calendar-container" style={{ height: "600px" }}>
                  <TooltipProvider>
                    <FullCalendar
                      ref={(ref) => ref && setCalendarRef(ref)}
                      plugins={[
                        dayGridPlugin,
                        timeGridPlugin,
                        interactionPlugin,
                        listPlugin,
                      ]}
                      themeSystem="united"
                      initialView={view}
                      headerToolbar={false} // We'll use our own header
                      events={tasks ? formatTasksForCalendar(tasks) : []}
                      eventClick={handleEventClick}
                      datesSet={handleDateChange}
                      height="100%"
                      dayMaxEvents={3}
                      eventTimeFormat={{
                        hour: "2-digit",
                        minute: "2-digit",
                        meridiem: "short",
                      }}
                      slotLabelFormat={{
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      }}
                      nowIndicator={true}
                      eventContent={(eventInfo) => {
                        return (
                          <>
                            <div className="fc-event-time">
                              {eventInfo.timeText}
                            </div>
                            <div className="fc-event-title font-medium">
                              {eventInfo.event.title}
                            </div>
                          </>
                        );
                      }}
                      eventDidMount={(info) => {
                        const task = tasks?.find((t) => t.id === info.event.id);
                        if (task) {
                          const tooltipDiv = document.createElement("div");
                          createRoot(tooltipDiv).render(
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <div>{info.el}</div>
                              </TooltipTrigger>
                              <TooltipContent>
                                <div className="space-y-2 p-2 max-w-xs">
                                  <div className="font-semibold">
                                    {task.title}
                                  </div>
                                  {task.description && (
                                    <div className="text-xs">
                                      {task.description}
                                    </div>
                                  )}
                                  <div className="flex items-center gap-2 text-xs">
                                    <Badge
                                      variant={getPriorityBadge(task.priority)}
                                    >
                                      {task.priority}
                                    </Badge>
                                    {task.dueTime && (
                                      <span className="text-muted-foreground">
                                        {task.dueTime}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </TooltipContent>
                            </Tooltip>
                          );
                          info.el.appendChild(tooltipDiv);
                        }
                      }}
                    />
                  </TooltipProvider>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="h-full bg-gradient-to-b from-background to-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                AI Schedule Optimization
              </CardTitle>
              <CardDescription>
                Smart scheduling powered by Gemini AI
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {isOptimizing ? (
                <div className="space-y-4">
                  <Skeleton className="h-24 w-full rounded-md" />
                  <Skeleton className="h-24 w-full rounded-md" />
                  <Skeleton className="h-24 w-full rounded-md" />
                </div>
              ) : optimization ? (
                <>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-lg border p-4 bg-gradient-to-r from-primary/10 to-background"
                  >
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span className="font-medium">Optimal Work Hours</span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Based on your productivity patterns, schedule focused work
                      between {optimization.optimalWorkHours.start} -{" "}
                      {optimization.optimalWorkHours.end}.
                    </p>
                    <Progress value={75} className="mt-2 h-1" />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="rounded-lg border p-4 bg-gradient-to-r from-primary/10 to-background"
                  >
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span className="font-medium">Task Distribution</span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {optimization.taskDistribution.overloaded
                        ? "You have too many high-priority tasks scheduled for today. Consider rescheduling some to tomorrow."
                        : "Your task distribution looks balanced for today."}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-3 w-full"
                      onClick={handleOptimizeSchedule}
                      disabled={isOptimizing}
                    >
                      {isOptimizing ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Optimizing...
                        </>
                      ) : (
                        <>
                          <Sparkles className="mr-2 h-4 w-4" />
                          Optimize Schedule
                        </>
                      )}
                    </Button>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="rounded-lg border p-4 bg-gradient-to-r from-primary/10 to-background"
                  >
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span className="font-medium">Break Reminders</span>
                    </div>
                    <div className="mt-2 space-y-2">
                      {optimization.breakSuggestions.map(
                        (breakSuggestion: any, index: number) => (
                          <div
                            key={index}
                            className="flex items-center justify-between text-sm"
                          >
                            <span className="text-muted-foreground">
                              {breakSuggestion.time}
                            </span>
                            <Badge variant="outline">
                              {breakSuggestion.duration} break
                            </Badge>
                          </div>
                        )
                      )}
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="rounded-lg border p-4 bg-gradient-to-r from-primary/10 to-background"
                  >
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span className="font-medium">Focus Tips</span>
                    </div>
                    <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                      {optimization.focusTips.map(
                        (tip: string, index: number) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-primary">•</span>
                            <span>{tip}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </motion.div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">
                    AI Optimization
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Add some tasks to your calendar to get AI-powered scheduling
                    recommendations.
                  </p>
                </div>
              )}
            </CardContent>

            {!isLoading && tasksForSelectedDate.length > 0 && (
              <div className="px-6 pb-4">
                <h3 className="font-medium mb-3 flex items-center text-sm">
                  <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
                  Tasks for{" "}
                  {date.toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "short",
                    day: "numeric",
                  })}
                </h3>
                <div className="space-y-2 max-h-[200px] overflow-auto pr-1">
                  {tasksForSelectedDate.map((task) => (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-2 p-2 rounded-md border border-border/50 hover:bg-primary/5 cursor-pointer transition-colors"
                      onClick={() => setSelectedTask(task)}
                    >
                      <div
                        className={`h-2 w-2 rounded-full bg-${task.priority === "high" ? "destructive" : task.priority === "medium" ? "amber-500" : "emerald-500"}`}
                        style={{
                          backgroundColor: getPriorityColor(task.priority),
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">
                          {task.title}
                        </p>
                        {task.dueTime && (
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" /> {task.dueTime}
                          </p>
                        )}
                      </div>
                      <Badge
                        variant={
                          task.status === "completed" ? "success" : "outline"
                        }
                        className="capitalize text-xs"
                      >
                        {task.status.replace("-", " ")}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            <CardFooter className="flex justify-center border-t bg-muted/10 px-6 py-4">
              <p className="text-xs text-center text-muted-foreground">
                Powered by Gemini AI • Analyzing {tasks.length} tasks across
                your calendar
              </p>
            </CardFooter>
          </Card>
        </motion.div>
      </div>

      {/* Task Detail Modal */}
      <AnimatePresence>
        {selectedTask && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4"
            onClick={() => setSelectedTask(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md overflow-hidden rounded-lg border bg-card shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <div
                  className="absolute inset-0 h-1.5"
                  style={{
                    backgroundColor: getPriorityColor(selectedTask.priority),
                  }}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2"
                  onClick={() => setSelectedTask(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
                <div className="p-6 pt-8">
                  <Badge
                    variant={getPriorityBadge(selectedTask.priority)}
                    className="mb-2"
                  >
                    {selectedTask.priority.toUpperCase()} PRIORITY
                  </Badge>
                  <h2 className="text-xl font-semibold">
                    {selectedTask.title}
                  </h2>
                  {selectedTask.description && (
                    <p className="mt-2 text-muted-foreground">
                      {selectedTask.description}
                    </p>
                  )}

                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">
                        Due Date
                      </h4>
                      <p className="flex items-center gap-2 mt-1">
                        <CalendarIcon className="h-4 w-4" />
                        {format(parseISO(selectedTask.dueDate), "PPP")}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">
                        Time
                      </h4>
                      <p className="flex items-center gap-2 mt-1">
                        <Clock className="h-4 w-4" />
                        {selectedTask.dueTime || "All day"}
                      </p>
                    </div>
                    {selectedTask.category && (
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground">
                          Category
                        </h4>
                        <Badge variant="outline" className="mt-1 capitalize">
                          {selectedTask.category}
                        </Badge>
                      </div>
                    )}
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">
                        Status
                      </h4>
                      <Badge
                        variant={
                          selectedTask.status === "completed"
                            ? "success"
                            : "outline"
                        }
                        className="mt-1 capitalize"
                      >
                        {selectedTask.status.replace("-", " ")}
                      </Badge>
                    </div>
                  </div>

                  {selectedTask.assignee && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-muted-foreground">
                        Assignee
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={selectedTask.assignee.avatar} />
                          <AvatarFallback>
                            {selectedTask.assignee.name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <span>{selectedTask.assignee.name}</span>
                      </div>
                    </div>
                  )}

                  <div className="mt-6 flex justify-end gap-2">
                    <Button variant="outline" asChild>
                      <Link href={`/tasks/${selectedTask.id}`}>
                        View Details
                      </Link>
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button>Actions</Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit Task</DropdownMenuItem>
                        <DropdownMenuItem>Mark as Completed</DropdownMenuItem>
                        <DropdownMenuItem>Reschedule</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
