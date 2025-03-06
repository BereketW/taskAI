"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertCircle,
  Calendar,
  CalendarIcon,
  Check,
  CheckCircle,
  Clock,
  Edit,
  Filter,
  Plus,
  Search,
  Sparkles,
  Tag,
  Trash2,
  X,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";
import { format } from "path";
import { Textarea } from "../ui/textarea";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { fetchTask } from "@/actions/tasks";

export default function TasksPage() {
  // console.log("TasksPage", tasks);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("all");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [time, setTime] = useState("");
  const [date, setDate] = useState<Date>();
  const [isChecked, setIsChecked] = useState(false);
  const [activeTab, setActiveTab] = useState("details");
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    async function getTasks() {
      setIsLoading(true);
      try {
        const { tasks } = await fetchTask();
        setTasks(tasks);
      } catch (e) {
        console.log(e);
      }
    }
    getTasks();
  }, [isChecked]);

  async function checkAsCompleted(id) {
    try {
      const { response, status } = await fetch(`/api/task/completed`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      console.log(response, status);
      if (status === 200) {
        setIsChecked(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Form state for editing task
  const [formState, setFormState] = useState({
    title: "",
    description: "",
    priority: "",
    category: "",
    time: "",
    dueDate: null,
  });

  const filteredTasks = tasks.filter(
    (task) =>
      (task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (selectedPriority === "all" || task.priority === selectedPriority)
  );

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "HIGH":
        return "bg-red-500";
      case "MEDIUM":
        return "bg-yellow-500";
      case "LOW":
        return "bg-green-500";
      default:
        return "bg-muted";
    }
  };
  const priorityIcons = {
    LOW: <div className="w-2 h-2 rounded-full bg-emerald-500" />,
    MEDIUM: <div className="w-2 h-2 rounded-full bg-amber-500" />,
    HIGH: <div className="w-2 h-2 rounded-full bg-red-500" />,
  };
  const priorityColors = {
    LOW: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    MEDIUM: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    HIGH: "bg-red-500/10 text-red-500 border-red-500/20",
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

  const handleEditTask = (task) => {
    setEditingTask(task);
    setFormState({
      title: task.title,
      description: task.description,
      priority: task.priority,
      category: task.category,
      dueDate: task.dueDate,
      tags: task.tags,
      time: task.dueTime,
    });
    console.log(formState);
    setIsEditDialogOpen(true);
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
                          checked={task.status === "COMPLETED" || isChecked}
                          className="mt-1"
                          onClick={() => checkAsCompleted(task.id)}
                        />
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
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
                              <span>
                                {new Date(task.dueDate).toDateString()}
                              </span>
                            </div>
                            {task.tags.map((tag) => (
                              <Badge
                                key={tag}
                                variant="secondary"
                                className={`text-xs ${!tag && "hidden"}`}
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                          <Button
                            onClick={() => handleEditTask(task)}
                            variant="ghost"
                            size="icon"
                          >
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
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[650px] p-0 overflow-hidden bg-background/95 backdrop-blur-xl border border-muted/30 shadow-lg">
          <div className="flex flex-col h-full">
            <DialogHeader className="px-6 pt-6 pb-2">
              <div className="flex items-center justify-between">
                <DialogTitle className="text-2xl font-bold">
                  Edit Task
                </DialogTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsEditDialogOpen(false)}
                  className="rounded-full h-8 w-8 opacity-70 hover:opacity-100"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <DialogDescription className="text-muted-foreground">
                Make changes to your task here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>

            <Tabs
              defaultValue="details"
              className="w-full"
              value={activeTab}
              onValueChange={setActiveTab}
            >
              <div className="px-6">
                <TabsList className="w-full grid grid-cols-2 mb-4">
                  <TabsTrigger value="details" className="rounded-md">
                    Task Details
                  </TabsTrigger>
                  <TabsTrigger value="schedule" className="rounded-md">
                    Schedule & Priority
                  </TabsTrigger>
                </TabsList>
              </div>

              <div className="px-6 overflow-y-auto max-h-[60vh]">
                <TabsContent value="details" className="mt-0 space-y-4">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4"
                  >
                    <div className="space-y-2">
                      <Label htmlFor="title" className="text-sm font-medium">
                        Task Title
                      </Label>
                      <Input
                        id="title"
                        value={formState.title}
                        onChange={(e) =>
                          setFormState({ ...formState, title: e.target.value })
                        }
                        className="border-input/30 bg-background/50 focus-visible:ring-offset-0 focus-visible:ring-primary/20"
                        placeholder="Enter task title"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="description"
                        className="text-sm font-medium"
                      >
                        Description
                      </Label>
                      <Textarea
                        id="description"
                        value={formState.description}
                        onChange={(e) =>
                          setFormState({
                            ...formState,
                            description: e.target.value,
                          })
                        }
                        className="min-h-[120px] border-input/30 bg-background/50 focus-visible:ring-offset-0 focus-visible:ring-primary/20"
                        placeholder="Describe your task in detail"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category" className="text-sm font-medium">
                        Category
                      </Label>
                      <Select
                        value={formState.category || ""}
                        onValueChange={(value) =>
                          setFormState({ ...formState, category: value })
                        }
                      >
                        <SelectTrigger
                          id="category"
                          className="border-input/30 bg-background/50 focus:ring-offset-0 focus:ring-primary/20"
                        >
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Work">
                            <div className="flex items-center gap-2">
                              <Tag className="h-4 w-4 text-blue-500" />
                              <span>Work</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="Personal">
                            <div className="flex items-center gap-2">
                              <Tag className="h-4 w-4 text-purple-500" />
                              <span>Personal</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="Health">
                            <div className="flex items-center gap-2">
                              <Tag className="h-4 w-4 text-green-500" />
                              <span>Health</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="Finance">
                            <div className="flex items-center gap-2">
                              <Tag className="h-4 w-4 text-amber-500" />
                              <span>Finance</span>
                            </div>
                          </SelectItem>
                          <SelectItem value="Education">
                            <div className="flex items-center gap-2">
                              <Tag className="h-4 w-4 text-indigo-500" />
                              <span>Education</span>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </motion.div>
                </TabsContent>

                <TabsContent value="schedule" className="mt-0 space-y-4">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4"
                  >
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">
                        Priority Level
                      </Label>
                      <div className="grid grid-cols-3 gap-2">
                        {["LOW", "MEDIUM", "HIGH"].map((priority) => (
                          <div
                            key={priority}
                            className={cn(
                              "flex items-center justify-center gap-2 p-3 rounded-lg border cursor-pointer transition-all",
                              formState.priority === priority
                                ? priorityColors[priority] +
                                    " ring-1 ring-offset-1 ring-offset-background ring-" +
                                    priority.split("-")[0]
                                : "border-muted/40 hover:border-muted"
                            )}
                            onClick={() =>
                              setFormState({ ...formState, priority })
                            }
                          >
                            {priorityIcons[priority]}
                            <span className="capitalize font-medium text-sm">
                              {priority}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">Due Date</Label>
                        <Input
                          value={
                            formState.dueDate
                              ? formState.dueDate.split("T")[0]
                              : ""
                          }
                          onChange={(e) =>
                            setFormState({
                              ...formState,
                              dueDate: new Date(e.target.value).toISOString(),
                            })
                          }
                          type="date"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="time" className="text-sm font-medium">
                          Due Time
                        </Label>
                        <div className="relative">
                          <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="time"
                            type="time"
                            value={formState.time}
                            onChange={(e) => setTime(e.target.value)}
                            className="pl-10 border-input/30 bg-background/50"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg border border-muted/30 bg-muted/10">
                      <div className="flex items-start gap-3">
                        <div className="mt-1 p-1 rounded-full bg-primary/10">
                          <CheckCircle className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium">Task Status</h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            This task is currently in progress. Mark it as
                            complete when finished.
                          </p>
                          <Button variant="outline" size="sm" className="mt-2">
                            Mark as Complete
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </TabsContent>
              </div>
            </Tabs>

            <DialogFooter className="px-6 py-4 border-t border-muted/20 mt-4">
              <div className="flex justify-between w-full items-center">
                <Button
                  variant="ghost"
                  onClick={() => setIsEditDialogOpen(false)}
                  className="text-muted-foreground"
                >
                  Cancel
                </Button>
                <Button
                  // onClick={handleSave}
                  // disabled={isSaving}
                  className="relative overflow-hidden group"
                >
                  <span className={cn("transition-all duration-300")}>
                    Save Changes
                  </span>
                  {/* {isSaving && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "linear",
                        }}
                      >
                        <svg className="h-5 w-5 text-white" viewBox="0 0 24 24">
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                      </motion.div>
                    </div>
                  )} */}
                </Button>
              </div>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
