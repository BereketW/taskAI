"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertCircle,
  CalendarIcon,
  Check,
  Clock,
  Edit,
  Filter,
  Plus,
  Search,
  Sparkles,
  Trash2,
  X,
  Tag,
  CheckCircle,
  MoreHorizontal,
  ArrowUpRight,
  Loader2,
  Save,
  ChevronLeft,
  ChevronRight,
  Grid,
  ListIcon,
} from "lucide-react";
import Link from "next/link";
import { format, parseISO, isToday, isTomorrow, addDays } from "date-fns";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

// Mock tasks data for development
const mockTasks = [
  {
    id: 1,
    title: "Complete project documentation",
    description:
      "Write technical documentation for the new feature implementation",
    priority: "high",
    dueDate: new Date().toISOString(),
    dueTime: "16:00",
    category: "Work",
    status: "PENDING",
    tags: ["Documentation", "Development"],
  },
  {
    id: 2,
    title: "Review pull requests",
    description: "Review and provide feedback on team pull requests",
    priority: "high",
    dueDate: new Date().toISOString(),
    dueTime: "17:00",
    category: "Work",
    status: "PENDING",
    tags: ["Code Review", "Team"],
  },
  {
    id: 3,
    title: "Weekly team meeting",
    description: "Discuss project progress and roadblocks",
    priority: "medium",
    dueDate: addDays(new Date(), 1).toISOString(),
    dueTime: "10:00",
    category: "Work",
    status: "PENDING",
    tags: ["Meeting", "Team"],
  },
  {
    id: 4,
    title: "Prepare presentation",
    description: "Create slides for the client meeting",
    priority: "medium",
    dueDate: addDays(new Date(), 1).toISOString(),
    dueTime: "14:00",
    category: "Work",
    status: "PENDING",
    tags: ["Presentation", "Client"],
  },
  {
    id: 5,
    title: "Gym workout",
    description: "30 minutes cardio and strength training",
    priority: "low",
    dueDate: new Date().toISOString(),
    dueTime: "18:00",
    category: "Personal",
    status: "COMPLETED",
    tags: ["Health", "Exercise"],
  },
  {
    id: 6,
    title: "Design review",
    description: "Review new UI components with design team",
    priority: "medium",
    dueDate: addDays(new Date(), 3).toISOString(),
    dueTime: "11:00",
    category: "Design",
    status: "PENDING",
    tags: ["UI/UX", "Review"],
  },
  {
    id: 7,
    title: "Quarterly planning",
    description: "Plan objectives for the next quarter",
    priority: "high",
    dueDate: addDays(new Date(), 5).toISOString(),
    dueTime: "09:00",
    category: "Planning",
    status: "PENDING",
    tags: ["Strategy", "Planning"],
  },
  {
    id: 8,
    title: "Update portfolio",
    description: "Add recent projects to portfolio",
    priority: "low",
    dueDate: addDays(new Date(), 7).toISOString(),
    dueTime: "15:00",
    category: "Personal",
    status: "PENDING",
    tags: ["Portfolio", "Career"],
  },
];

// Async function to fetch tasks - in a real app this would call an API
const fetchTasks = async () => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return mockTasks;
};

export default function TasksPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("all");
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [view, setView] = useState<"calendar" | "list">("calendar");
  const [calendarView, setCalendarView] = useState<
    "dayGridMonth" | "timeGridWeek" | "timeGridDay" | "listWeek"
  >("dayGridMonth");
  const [currentDate, setCurrentDate] = useState(new Date());
  const calendarRef = useRef(null);

  // Form state for editing task
  const [formState, setFormState] = useState({
    title: "",
    description: "",
    priority: "medium",
    category: "Work",
    dueDate: new Date(),
    dueTime: "",
    status: "PENDING",
    tags: [],
  });

  const [newTag, setNewTag] = useState("");

  // Fetch tasks on component mount
  useEffect(() => {
    const loadTasks = async () => {
      setIsLoading(true);
      try {
        const data = await fetchTasks();
        setTasks(data);
      } catch (error) {
        console.error("Failed to load tasks:", error);
        toast({
          variant: "destructive",
          title: "Error loading tasks",
          description: "Please try again later.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadTasks();
  }, []);

  const filteredTasks = tasks.filter(
    (task) =>
      (task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedPriority === "all" || task.priority === selectedPriority)
  );

  const todayTasks = filteredTasks.filter((task) =>
    isToday(parseISO(task.dueDate))
  );
  const upcomingTasks = filteredTasks.filter(
    (task) => !isToday(parseISO(task.dueDate)) && task.status !== "COMPLETED"
  );
  const completedTasks = filteredTasks.filter(
    (task) => task.status === "COMPLETED"
  );

  // Format tasks for FullCalendar
  const calendarEvents = tasks.map((task) => ({
    id: task.id.toString(),
    title: task.title,
    start: task.dueTime
      ? `${task.dueDate.split("T")[0]}T${task.dueTime}:00`
      : task.dueDate,
    allDay: !task.dueTime,
    backgroundColor:
      task.priority === "high"
        ? "rgba(239, 68, 68, 0.8)"
        : task.priority === "medium"
          ? "rgba(245, 158, 11, 0.8)"
          : "rgba(16, 185, 129, 0.8)",
    borderColor: "transparent",
    textColor: "#ffffff",
    extendedProps: {
      description: task.description,
      priority: task.priority,
      category: task.category,
      status: task.status,
      tags: task.tags,
    },
    className: task.status === "COMPLETED" ? "opacity-60" : "",
  }));

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-amber-500";
      case "low":
        return "bg-emerald-500";
      default:
        return "bg-muted";
    }
  };

  const getPriorityBadge = (priority) => {
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

  const formatDueDate = (isoDate, time) => {
    const date = parseISO(isoDate);
    let dateText = "";

    if (isToday(date)) {
      dateText = "Today";
    } else if (isTomorrow(date)) {
      dateText = "Tomorrow";
    } else {
      dateText = format(date, "MMM d");
    }

    return time ? `${dateText}, ${formatTime(time)}` : dateText;
  };

  const formatTime = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    let period = "AM";
    let displayHours = hours;

    if (hours >= 12) {
      period = "PM";
      if (hours > 12) displayHours = hours - 12;
    }
    if (hours === 0) displayHours = 12;

    return `${displayHours}:${minutes.toString().padStart(2, "0")} ${period}`;
  };

  const handleEditTask = (task) => {
    const taskDueDate = task.dueDate ? parseISO(task.dueDate) : new Date();

    setSelectedTask(task);
    setFormState({
      title: task.title,
      description: task.description,
      priority: task.priority,
      category: task.category,
      dueDate: taskDueDate,
      dueTime: task.dueTime || "",
      status: task.status,
      tags: [...task.tags],
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdateTask = async () => {
    setIsSaving(true);

    try {
      // Format date to ISO string
      const updatedTask = {
        ...selectedTask,
        title: formState.title,
        description: formState.description,
        priority: formState.priority,
        category: formState.category,
        dueDate: formState.dueDate.toISOString(),
        dueTime: formState.dueTime,
        status: formState.status,
        tags: formState.tags,
      };

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update tasks array
      setTasks(
        tasks.map((task) => (task.id === selectedTask.id ? updatedTask : task))
      );

      toast({
        title: "Task updated",
        description: "The task has been successfully updated.",
      });

      setIsEditDialogOpen(false);
    } catch (error) {
      console.error("Error updating task:", error);
      toast({
        variant: "destructive",
        title: "Failed to update task",
        description: "Please try again later.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formState.tags.includes(newTag.trim())) {
      setFormState({
        ...formState,
        tags: [...formState.tags, newTag.trim()],
      });
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormState({
      ...formState,
      tags: formState.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  const handleToggleTaskStatus = async (taskId) => {
    try {
      const taskToUpdate = tasks.find((task) => task.id === taskId);
      const updatedStatus =
        taskToUpdate.status === "COMPLETED" ? "PENDING" : "COMPLETED";

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Update tasks array
      setTasks(
        tasks.map((task) =>
          task.id === taskId ? { ...task, status: updatedStatus } : task
        )
      );

      toast({
        title:
          updatedStatus === "COMPLETED"
            ? "Task completed"
            : "Task marked as pending",
        description:
          updatedStatus === "COMPLETED"
            ? "The task has been marked as completed."
            : "The task has been moved back to pending.",
      });
    } catch (error) {
      console.error("Error updating task status:", error);
      toast({
        variant: "destructive",
        title: "Failed to update task status",
        description: "Please try again later.",
      });
    }
  };

  const handleCalendarEventClick = (info) => {
    const taskId = Number.parseInt(info.event.id);
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
      handleEditTask(task);
    }
  };

  const handleDateClick = (info) => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.changeView("timeGridDay", info.dateStr);
      setCalendarView("timeGridDay");
    }
  };

  const handleViewChange = (newView) => {
    setCalendarView(newView);
    if (calendarRef.current) {
      calendarRef.current.getApi().changeView(newView);
    }
  };

  const handlePrevClick = () => {
    if (calendarRef.current) {
      calendarRef.current.getApi().prev();
      setCurrentDate(calendarRef.current.getApi().getDate());
    }
  };

  const handleNextClick = () => {
    if (calendarRef.current) {
      calendarRef.current.getApi().next();
      setCurrentDate(calendarRef.current.getApi().getDate());
    }
  };

  const handleTodayClick = () => {
    if (calendarRef.current) {
      calendarRef.current.getApi().today();
      setCurrentDate(calendarRef.current.getApi().getDate());
    }
  };

  const TaskItem = ({ task }) => (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`group relative rounded-lg border ${task.status === "COMPLETED" ? "border-muted/30 bg-muted/5" : "border-muted/40 bg-card/5"} hover:border-primary/20 transition-all duration-200`}
    >
      <div
        className={`absolute top-0 left-0 w-1 h-full ${task.priority === "high" ? "bg-red-500" : task.priority === "medium" ? "bg-amber-500" : "bg-emerald-500"} rounded-l-lg`}
      />

      <div className="p-4 pl-5">
        <div className="flex items-start gap-3">
          <div className="mt-0.5">
            <Checkbox
              id={`task-${task.id}`}
              checked={task.status === "COMPLETED"}
              onCheckedChange={() => handleToggleTaskStatus(task.id)}
              className={`rounded-full h-5 w-5 ${task.status === "COMPLETED" ? "data-[state=checked]:bg-primary/70" : ""}`}
            />
          </div>
          <div className="flex-1 space-y-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <label
                htmlFor={`task-${task.id}`}
                className={`text-base font-medium ${
                  task.status === "COMPLETED"
                    ? "line-through text-muted-foreground"
                    : ""
                }`}
              >
                {task.title}
              </label>
              <Badge
                variant={getPriorityBadge(task.priority)}
                className="ml-1 rounded-full text-xs font-normal"
              >
                {task.priority}
              </Badge>
              <Badge
                variant="outline"
                className="rounded-full text-xs font-normal"
              >
                {task.category}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{task.description}</p>
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <div className="flex items-center gap-1 text-xs text-muted-foreground bg-muted/20 px-2 py-1 rounded-full">
                <Clock className="h-3 w-3 text-primary/70" />
                <span>{formatDueDate(task.dueDate, task.dueTime)}</span>
              </div>
              {task.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-xs rounded-full bg-secondary/5 text-secondary-foreground"
                >
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex gap-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full h-8 w-8 hover:bg-primary/5"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 rounded-lg">
                <DropdownMenuItem
                  onClick={() => handleEditTask(task)}
                  className="cursor-pointer"
                >
                  <Edit className="h-4 w-4 mr-2 text-primary/70" />
                  Edit Task
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Trash2 className="h-4 w-4 mr-2 text-destructive/70" />
                  Delete Task
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleToggleTaskStatus(task.id)}
                  className="cursor-pointer"
                >
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500/70" />
                  Mark as{" "}
                  {task.status === "COMPLETED" ? "Pending" : "Completed"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* High priority visual indicator */}
        {task.priority === "high" && task.status !== "COMPLETED" && (
          <div className="absolute -right-1 -top-1">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );

  return (
    <div className="flex flex-col p-6 max-w-7xl mx-auto">
      {/* Clean, minimal header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-medium tracking-tight text-foreground">
            Tasks
          </h1>
          <p className="text-muted-foreground mt-1">
            Organize and manage your tasks efficiently
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center rounded-md border border-muted/30 p-1">
            <Button
              variant={view === "calendar" ? "default" : "ghost"}
              size="sm"
              className="rounded-sm h-8"
              onClick={() => setView("calendar")}
            >
              <Grid className="h-4 w-4 mr-1" />
              Calendar
            </Button>
            <Button
              variant={view === "list" ? "default" : "ghost"}
              size="sm"
              className="rounded-sm h-8"
              onClick={() => setView("list")}
            >
              <ListIcon className="h-4 w-4 mr-1" />
              List
            </Button>
          </div>

          <Button asChild className="rounded-md">
            <Link href="/tasks/new">
              <Plus className="mr-2 h-4 w-4" />
              New Task
            </Link>
          </Button>
        </div>
      </div>

      {/* Search and filter section */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            <Search className="h-4 w-4" />
          </div>
          <Input
            placeholder="Search tasks..."
            className="pl-9 rounded-md border-muted/30 h-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute inset-y-0 right-0 h-full rounded-md hover:bg-transparent"
              onClick={() => setSearchQuery("")}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        <Select value={selectedPriority} onValueChange={setSelectedPriority}>
          <SelectTrigger className="w-full sm:w-[180px] rounded-md border-muted/30 h-10">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <SelectValue placeholder="Filter by priority" />
            </div>
          </SelectTrigger>
          <SelectContent className="rounded-md">
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="high">High Priority</SelectItem>
            <SelectItem value="medium">Medium Priority</SelectItem>
            <SelectItem value="low">Low Priority</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-10 w-10 animate-spin text-primary/70" />
            <p className="text-muted-foreground">Loading tasks...</p>
          </div>
        </div>
      ) : (
        <>
          {view === "calendar" ? (
            <Card className="border-muted/30 rounded-lg overflow-hidden">
              <CardHeader className="pb-2 border-b bg-muted/5 flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle className="text-lg font-medium">
                    {format(currentDate, "MMMM yyyy")}
                  </CardTitle>
                  <CardDescription>
                    {calendarView === "dayGridMonth"
                      ? "Monthly view"
                      : calendarView === "timeGridWeek"
                        ? "Weekly view"
                        : calendarView === "timeGridDay"
                          ? `Daily view: ${format(currentDate, "EEEE, MMMM d")}`
                          : "List view"}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center rounded-md border border-muted/30 p-1">
                    <Button
                      variant={
                        calendarView === "dayGridMonth" ? "default" : "ghost"
                      }
                      size="sm"
                      className="rounded-sm h-8 px-3"
                      onClick={() => handleViewChange("dayGridMonth")}
                    >
                      Month
                    </Button>
                    <Button
                      variant={
                        calendarView === "timeGridWeek" ? "default" : "ghost"
                      }
                      size="sm"
                      className="rounded-sm h-8 px-3"
                      onClick={() => handleViewChange("timeGridWeek")}
                    >
                      Week
                    </Button>
                    <Button
                      variant={
                        calendarView === "timeGridDay" ? "default" : "ghost"
                      }
                      size="sm"
                      className="rounded-sm h-8 px-3"
                      onClick={() => handleViewChange("timeGridDay")}
                    >
                      Day
                    </Button>
                    <Button
                      variant={
                        calendarView === "listWeek" ? "default" : "ghost"
                      }
                      size="sm"
                      className="rounded-sm h-8 px-3"
                      onClick={() => handleViewChange("listWeek")}
                    >
                      List
                    </Button>
                  </div>

                  <div className="flex items-center gap-1">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-md"
                      onClick={handlePrevClick}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 rounded-md"
                      onClick={handleTodayClick}
                    >
                      Today
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-md"
                      onClick={handleNextClick}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-[700px]">
                  <FullCalendar
                    ref={calendarRef}
                    plugins={[
                      dayGridPlugin,
                      timeGridPlugin,
                      interactionPlugin,
                      listPlugin,
                    ]}
                    initialView={calendarView}
                    headerToolbar={false} // We're using our own header
                    events={calendarEvents}
                    eventClick={handleCalendarEventClick}
                    dateClick={handleDateClick}
                    height="100%"
                    dayMaxEvents={3}
                    nowIndicator={true}
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
                    eventContent={(eventInfo) => (
                      <div className="w-full overflow-hidden">
                        <div className="font-medium text-sm truncate">
                          {eventInfo.event.title}
                        </div>
                        {eventInfo.timeText && (
                          <div className="text-xs opacity-80">
                            {eventInfo.timeText}
                          </div>
                        )}
                      </div>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          ) : (
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-4 rounded-md h-10 p-1 bg-muted/10 mb-6">
                <TabsTrigger
                  value="all"
                  className="rounded-sm data-[state=active]:bg-background"
                >
                  All
                </TabsTrigger>
                <TabsTrigger
                  value="today"
                  className="rounded-sm data-[state=active]:bg-background"
                >
                  Today
                </TabsTrigger>
                <TabsTrigger
                  value="upcoming"
                  className="rounded-sm data-[state=active]:bg-background"
                >
                  Upcoming
                </TabsTrigger>
                <TabsTrigger
                  value="completed"
                  className="rounded-sm data-[state=active]:bg-background"
                >
                  Completed
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                <Card className="border-muted/30 rounded-lg overflow-hidden">
                  <CardHeader className="pb-2 border-b bg-muted/5">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary/70" />
                      <CardTitle className="text-lg font-medium">
                        All Tasks
                      </CardTitle>
                    </div>
                    <CardDescription>
                      View and manage all your tasks in one place
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4">
                    {filteredTasks.length > 0 ? (
                      <div className="space-y-3">
                        <AnimatePresence>
                          {filteredTasks.map((task) => (
                            <TaskItem key={task.id} task={task} />
                          ))}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <div className="text-center py-10">
                        <div className="mx-auto rounded-full bg-muted/20 h-14 w-14 flex items-center justify-center mb-4">
                          <AlertCircle className="h-7 w-7 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-medium">No tasks found</h3>
                        <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                          Try adjusting your search or filter to find what
                          you're looking for.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="today">
                <Card className="border-muted/30 rounded-lg overflow-hidden">
                  <CardHeader className="pb-2 border-b bg-muted/5">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary/70" />
                      <CardTitle className="text-lg font-medium">
                        Today's Tasks
                      </CardTitle>
                    </div>
                    <CardDescription>
                      Tasks that need to be completed today
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4">
                    {todayTasks.length > 0 ? (
                      <div className="space-y-3">
                        <AnimatePresence>
                          {todayTasks.map((task) => (
                            <TaskItem key={task.id} task={task} />
                          ))}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <div className="text-center py-10">
                        <div className="mx-auto rounded-full bg-muted/20 h-14 w-14 flex items-center justify-center mb-4">
                          <Calendar className="h-7 w-7 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-medium">
                          No tasks for today
                        </h3>
                        <p className="text-muted-foreground mt-2">
                          Enjoy your day! Or create a new task to stay
                          productive.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="upcoming">
                <Card className="border-muted/30 rounded-lg overflow-hidden">
                  <CardHeader className="pb-2 border-b bg-muted/5">
                    <div className="flex items-center gap-2">
                      <ArrowUpRight className="h-5 w-5 text-primary/70" />
                      <CardTitle className="text-lg font-medium">
                        Upcoming Tasks
                      </CardTitle>
                    </div>
                    <CardDescription>
                      Tasks scheduled for the future
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4">
                    {upcomingTasks.filter(
                      (task) => !isToday(parseISO(task.dueDate))
                    ).length > 0 ? (
                      <div className="space-y-3">
                        <AnimatePresence>
                          {upcomingTasks
                            .filter((task) => !isToday(parseISO(task.dueDate)))
                            .map((task) => (
                              <TaskItem key={task.id} task={task} />
                            ))}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <div className="text-center py-10">
                        <div className="mx-auto rounded-full bg-muted/20 h-14 w-14 flex items-center justify-center mb-4">
                          <ArrowUpRight className="h-7 w-7 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-medium">
                          No upcoming tasks
                        </h3>
                        <p className="text-muted-foreground mt-2">
                          You're all caught up with your future tasks.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="completed">
                <Card className="border-muted/30 rounded-lg overflow-hidden">
                  <CardHeader className="pb-2 border-b bg-muted/5">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-primary/70" />
                      <CardTitle className="text-lg font-medium">
                        Completed Tasks
                      </CardTitle>
                    </div>
                    <CardDescription>
                      Tasks you've already completed
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4">
                    {completedTasks.length > 0 ? (
                      <div className="space-y-3">
                        <AnimatePresence>
                          {completedTasks.map((task) => (
                            <TaskItem key={task.id} task={task} />
                          ))}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <div className="text-center py-10">
                        <div className="mx-auto rounded-full bg-muted/20 h-14 w-14 flex items-center justify-center mb-4">
                          <CheckCircle className="h-7 w-7 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-medium">
                          No completed tasks
                        </h3>
                        <p className="text-muted-foreground mt-2">
                          Start checking off your tasks to see them appear here.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </>
      )}

      {/* AI Suggestions Card - Minimalist Design */}
      <Card className="border-muted/30 mt-6 rounded-lg overflow-hidden">
        <CardHeader className="pb-2 border-b bg-muted/5">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary/70" />
            <CardTitle className="text-lg font-medium">
              AI Task Suggestions
            </CardTitle>
          </div>
          <CardDescription>
            Smart recommendations based on your task patterns
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-3">
            {[
              {
                title: "Break down project documentation",
                description:
                  "This task might be more manageable if split into smaller subtasks.",
                icon: AlertCircle,
                action: "Split Task",
                color: "text-amber-500",
                bgColor: "bg-amber-500/10",
              },
              {
                title: "Schedule focus time",
                description:
                  "Block 2 hours tomorrow morning for deep work on high-priority tasks.",
                icon: Calendar,
                action: "Schedule",
                color: "text-blue-500",
                bgColor: "bg-blue-500/10",
              },
              {
                title: "Delegate review tasks",
                description:
                  "Consider delegating some code reviews to reduce workload.",
                icon: Check,
                action: "Delegate",
                color: "text-emerald-500",
                bgColor: "bg-emerald-500/10",
              },
            ].map((suggestion, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative rounded-lg border border-muted/30 p-4 transition-all duration-200 hover:border-primary/20"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-md ${suggestion.bgColor}`}
                  >
                    <suggestion.icon
                      className={`h-5 w-5 ${suggestion.color}`}
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{suggestion.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {suggestion.description}
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="rounded-md">
                    {suggestion.action}
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Edit Task Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px] bg-background rounded-lg border-muted/30">
          <DialogHeader>
            <DialogTitle className="text-xl font-medium">Edit Task</DialogTitle>
            <DialogDescription>
              Make changes to your task here.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-5 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Task Title</Label>
              <Input
                id="title"
                value={formState.title}
                onChange={(e) =>
                  setFormState({ ...formState, title: e.target.value })
                }
                className="border-muted/30 rounded-md"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formState.description}
                onChange={(e) =>
                  setFormState({ ...formState, description: e.target.value })
                }
                className="border-muted/30 rounded-md min-h-[100px]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Priority</Label>
                <RadioGroup
                  value={formState.priority}
                  onValueChange={(value) =>
                    setFormState({ ...formState, priority: value })
                  }
                  className="flex space-x-2"
                >
                  <div className="flex items-center space-x-1">
                    <RadioGroupItem
                      value="low"
                      id="low"
                      className="text-emerald-500"
                    />
                    <Label htmlFor="low" className="text-emerald-500">
                      Low
                    </Label>
                  </div>
                  <div className="flex items-center space-x-1">
                    <RadioGroupItem
                      value="medium"
                      id="medium"
                      className="text-amber-500"
                    />
                    <Label htmlFor="medium" className="text-amber-500">
                      Medium
                    </Label>
                  </div>
                  <div className="flex items-center space-x-1">
                    <RadioGroupItem
                      value="high"
                      id="high"
                      className="text-red-500"
                    />
                    <Label htmlFor="high" className="text-red-500">
                      High
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formState.category}
                  onValueChange={(value) =>
                    setFormState({ ...formState, category: value })
                  }
                >
                  <SelectTrigger
                    id="category"
                    className="border-muted/30 rounded-md"
                  >
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="rounded-md">
                    <SelectItem value="Work">Work</SelectItem>
                    <SelectItem value="Personal">Personal</SelectItem>
                    <SelectItem value="Health">Health</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                    <SelectItem value="Education">Education</SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                    <SelectItem value="Planning">Planning</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-2">
              <Label>Status</Label>
              <div className="flex items-center gap-2">
                <Switch
                  checked={formState.status === "COMPLETED"}
                  onCheckedChange={(checked) =>
                    setFormState({
                      ...formState,
                      status: checked ? "COMPLETED" : "PENDING",
                    })
                  }
                />
                <Label>Mark as completed</Label>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Due Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal border-muted/30 rounded-md",
                        !formState.dueDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formState.dueDate
                        ? format(formState.dueDate, "PPP")
                        : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 rounded-md">
                    <Calendar
                      mode="single"
                      selected={formState.dueDate}
                      onSelect={(date) =>
                        setFormState({ ...formState, dueDate: date })
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="dueTime">Due Time</Label>
                <Input
                  id="dueTime"
                  type="time"
                  value={formState.dueTime}
                  onChange={(e) =>
                    setFormState({ ...formState, dueTime: e.target.value })
                  }
                  className="border-muted/30 rounded-md"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label>Tags</Label>
              <div className="flex flex-wrap gap-2 border rounded-md p-2 border-muted/30 min-h-[80px]">
                {formState.tags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="rounded-full bg-secondary/5 text-secondary-foreground px-3 py-1"
                  >
                    {tag}
                    <button
                      type="button"
                      className="ml-2 rounded-full hover:bg-secondary/20"
                      onClick={() => handleRemoveTag(tag)}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2 mt-1">
                <Input
                  placeholder="Add a tag"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddTag();
                    }
                  }}
                  className="border-muted/30 rounded-md"
                />
                <Button
                  type="button"
                  onClick={handleAddTag}
                  className="rounded-md"
                >
                  Add
                </Button>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
              className="rounded-md"
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdateTask}
              disabled={isSaving}
              className="rounded-md"
            >
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
