"use client";

import type React from "react";

import { useEffect, useState } from "react";
import {
  ArrowRight,
  Clock,
  Loader2,
  Sparkles,
  ListTodo,
  CalendarClock,
  CheckCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GoogleGenerativeAI } from "@google/generative-ai";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { createTask } from "@/actions/workspaces";
import { Checkbox } from "@/components/ui/checkbox";
import { motion, AnimatePresence } from "framer-motion";

export default function NewTaskPage() {
  const router = useRouter();
  const [dueDate, setDate] = useState<Date>();
  const [dueTime, setDueTime] = useState("");
  const [showAiSuggestions, setShowAiSuggestions] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedWorkspace, setSelectedWorkspace] = useState(null);
  const [category, setCategory] = useState("");
  const [recurring, setRecurring] = useState(false);
  const [priority, setPriority] = useState("medium");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [workspaces, setWorkspace] = useState([]);
  const [selectedTasklist, setSelectedTasklist] = useState("");
  // const [error, setError] = useState("");
  const [generatedSubtasks, setGeneratedSubtasks] = useState([]);
  const [isGeneratingSubtasks, setIsGeneratingSubtasks] = useState(false);
  const [naturalLanguageInput, setNaturalLanguageInput] = useState("");

  useEffect(() => {
    async function getWorkspace() {
      setIsLoading(true);
      try {
        const response = await fetch("/api/workspace", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        setWorkspace(data.workspaces);
      } catch (err) {
        console.log(err);
        setError(err.message);
        toast({
          title: "Error loading workspaces",
          description: "Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
    getWorkspace();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!selectedWorkspace || !selectedTasklist) {
      toast({
        title: "Required Fields Missing",
        description: "Please select a workspace and tasklist for this task.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    if (!title) {
      toast({
        title: "Required Field Missing",
        description: "Please enter a task title.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    try {
      const data = {
        title,
        description,
        category,
        recurring,
        dueDate,
        dueTime,
        priority,
        selectedWorkspace,
        selectedTasklist,
        subtasks: generatedSubtasks.map((st) => ({
          title: st.title,
          completed: false,
        })),
      };

      const task = await createTask(data);

      if (task.success) {
        toast({
          title: "Task Created",
          description: "Your new task has been created successfully.",
        });

        // Redirect to tasks page after successful creation
        setTimeout(() => {
          router.push("/tasks");
        }, 1000);
      }
    } catch (error) {
      console.log(error);
      toast({
        title: "Error Creating Task",
        description: "There was an error creating your task. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const generateSubtasks = async () => {
    if (!title || !description) {
      toast({
        title: "Missing Information",
        description:
          "Please provide a task title and description to generate subtasks.",
        variant: "destructive",
      });
      return;
    }

    setIsGeneratingSubtasks(true);
    let subtasks = []; // Define variable to avoid errors

    try {
      const genAI = new GoogleGenerativeAI(
        "AIzaSyAbak5mfGfPJ00VZQ44HeAGFW4f2ab9dWQ"
      );
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

      const prompt = `
        Given the task title "${title}" and description "${description}", generate a list of 5 clear and concise subtasks.
        Ensure the output is properly formatted as a JSON array of objects. Here is an example of the desired format:
        [
          {id:id, name:name, status:status, descritption:description},
          
        ]
         also make the status PENDING and stuff also to have an id, name and status and description"`;

      const result = await model.generateContent(prompt);
      console.log(result);
      const responseText = result.response
        .text()
        .replace(/```json|```/g, "")
        .trim();

      console.log(responseText); // Await the text response
      subtasks = JSON.parse(responseText); // Parse the AI-generated JSON

      console.log(subtasks);
      setGeneratedSubtasks(subtasks);
    } catch (error) {
      console.error("Error generating subtasks:", error);
      toast({
        title: "Error",
        description: "Failed to generate subtasks. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingSubtasks(false);
    }

    // Only show toast if subtasks were successfully generated
    if (subtasks.length > 0) {
      toast({
        title: "Subtasks Generated",
        description: `${subtasks.length} subtasks have been created based on your task.`,
      });
    }
  };

  const parseNaturalLanguage = () => {
    if (!naturalLanguageInput) {
      toast({
        title: "Empty Input",
        description: "Please enter a task description in natural language.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Simulate parsing natural language

    const input = naturalLanguageInput.toLowerCase();

    // Extract title
    let extractedTitle = input.split(" ").slice(0, 5).join(" ");
    if (extractedTitle.length < input.length) {
      extractedTitle += "...";
    }
    setTitle(extractedTitle);

    // Extract description
    setDescription(naturalLanguageInput);

    // Extract priority
    if (
      input.includes("urgent") ||
      input.includes("important") ||
      input.includes("critical")
    ) {
      setPriority("high");
    } else if (input.includes("low") || input.includes("minor")) {
      setPriority("low");
    } else {
      setPriority("medium");
    }

    // Extract date
    if (input.includes("tomorrow")) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      setDate(tomorrow);
    } else if (input.includes("next week")) {
      const nextWeek = new Date();
      nextWeek.setDate(nextWeek.getDate() + 7);
      setDate(nextWeek);
    }

    // Extract time
    if (input.includes("3 pm") || input.includes("3pm")) {
      setDueTime("15:00");
    } else if (input.includes("morning")) {
      setDueTime("09:00");
    } else if (input.includes("afternoon")) {
      setDueTime("14:00");
    } else if (input.includes("evening")) {
      setDueTime("18:00");
    }

    // Extract category
    if (input.includes("work")) {
      setCategory("work");
    } else if (input.includes("personal")) {
      setCategory("personal");
    } else if (input.includes("health")) {
      setCategory("health");
    } else if (input.includes("education")) {
      setCategory("education");
    } else if (input.includes("finance")) {
      setCategory("finance");
    }

    setIsLoading(false);

    toast({
      title: "Task Parsed",
      description: "Task details have been extracted from your description.",
    });
  };

  const selectedWorkspaceData = workspaces.find(
    (w) => w.id === selectedWorkspace
  );

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Create New Task
          </h1>
          <p className="text-muted-foreground">
            Add a new task to your workspace
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Task Details</CardTitle>
              <CardDescription>
                Enter the details of your new task
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Workspace</Label>
                  <Select
                    value={selectedWorkspace}
                    onValueChange={(value) => setSelectedWorkspace(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select workspace" />
                    </SelectTrigger>
                    <SelectContent>
                      {workspaces &&
                        workspaces.map((workspace) => (
                          <SelectItem key={workspace.id} value={workspace.id}>
                            {isLoading ? "Loading..." : workspace.name}
                          </SelectItem>
                        ))}
                      {workspaces.length === 0 && (
                        <Link
                          href={"/workspaces/new"}
                          className="flex items-center justify-center py-2 bg-white rounded text-black"
                        >
                          Create New Workspace
                        </Link>
                      )}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2 overflow-hidden">
                  <Label>Tasklist</Label>
                  <Select
                    value={selectedTasklist}
                    onValueChange={setSelectedTasklist}
                    disabled={!selectedWorkspace}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select tasklist" />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedWorkspaceData?.taskLists?.map((tasklist) => (
                        <SelectItem key={tasklist.id} value={tasklist.id}>
                          {tasklist.name}
                        </SelectItem>
                      ))}
                      {selectedWorkspaceData?.taskLists?.length === 0 && (
                        <Link
                          href={`/workspaces/${selectedWorkspaceData.id}/tasklists/new`}
                          className="flex items-start justify-center py-2 bg-white rounded text-black"
                        >
                          Create New TaskList
                        </Link>
                      )}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Task Title</Label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    id="title"
                    placeholder="Enter task title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    id="description"
                    placeholder="Enter task description"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={category}
                    onValueChange={(value) => setCategory(value)}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="work">Work</SelectItem>
                      <SelectItem value="personal">Personal</SelectItem>
                      <SelectItem value="health">Health</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Priority</Label>
                  <RadioGroup
                    value={priority}
                    onValueChange={(value) => setPriority(value)}
                    className="flex flex-wrap space-x-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="low" id="low" />
                      <Label htmlFor="low" className="text-green-500">
                        Low
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="medium" id="medium" />
                      <Label htmlFor="medium" className="text-yellow-500">
                        Medium
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="high" id="high" />
                      <Label htmlFor="high" className="text-destructive">
                        High
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Due Date</Label>
                    <Input
                      value={dueDate ? dueDate.toISOString().split("T")[0] : ""}
                      onChange={(e) => setDate(new Date(e.target.value))}
                      type="date"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Due Time</Label>
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                      <Input
                        value={dueTime}
                        onChange={(e) => setDueTime(e.target.value)}
                        id="time"
                        type="time"
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="recurring">Recurring Task</Label>
                    <Switch
                      checked={recurring}
                      onCheckedChange={setRecurring}
                      id="recurring"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Set this task to repeat on a schedule
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href="/tasks">Cancel</Link>
              </Button>
              <Button onClick={handleSubmit} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    Create Task
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-secondary" />
                AI Assistance
              </CardTitle>
              <CardDescription>
                Let AI help you optimize your task
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {showAiSuggestions ? (
                <>
                  <div className="rounded-lg border p-3 bg-secondary/5">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-secondary" />
                      <span className="font-medium">Suggested Priority</span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Based on your calendar, this task should be{" "}
                      <span className="font-medium text-yellow-500">
                        Medium
                      </span>{" "}
                      priority.
                    </p>
                  </div>
                  <div className="rounded-lg border p-3 bg-secondary/5">
                    <div className="flex items-center gap-2">
                      <CalendarClock className="h-4 w-4 text-secondary" />
                      <span className="font-medium">Suggested Due Date</span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Tomorrow at 3:00 PM would be optimal based on your
                      productivity patterns.
                    </p>
                  </div>
                  <div className="rounded-lg border p-3 bg-secondary/5">
                    <div className="flex items-center gap-2">
                      <ListTodo className="h-4 w-4 text-secondary" />
                      <span className="font-medium">Task Breakdown</span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      This task might be more manageable if broken into smaller
                      subtasks.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={generateSubtasks}
                      disabled={isGeneratingSubtasks}
                    >
                      {isGeneratingSubtasks ? (
                        <>
                          <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>Generate Subtasks</>
                      )}
                    </Button>

                    <AnimatePresence>
                      {generatedSubtasks.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-4 pt-4 border-t"
                        >
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm font-medium">
                                Generated Subtasks
                              </h4>
                              <span className="text-xs text-muted-foreground">
                                {generatedSubtasks.length} items
                              </span>
                            </div>
                            {generatedSubtasks.map((subtask, index) => (
                              <motion.div
                                key={subtask.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{
                                  opacity: 1,
                                  y: 0,
                                  transition: {
                                    delay: index * 0.08,
                                    duration: 0.3,
                                  },
                                }}
                                whileHover={{
                                  scale: 1.02,
                                  backgroundColor: "var(--secondary-light)",
                                  transition: { duration: 0.2 },
                                }}
                                className="flex items-start gap-3 p-3 rounded-lg border border-transparent hover:border-secondary/20 hover:shadow-sm transition-all"
                              >
                                <div className="mt-0.5">
                                  <Checkbox
                                    id={`subtask-${subtask.id}`}
                                    checked={subtask.status === "COMPLETED"}
                                    onCheckedChange={(checked) => {
                                      setGeneratedSubtasks((prev) =>
                                        prev.map((st) =>
                                          st.id === subtask.id
                                            ? {
                                                ...st,
                                                status: checked
                                                  ? "COMPLETED"
                                                  : "TODO",
                                              }
                                            : st
                                        )
                                      );
                                    }}
                                    className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground transition-all"
                                  />
                                </div>
                                <div className="flex-1 space-y-1">
                                  <Label
                                    htmlFor={`subtask-${subtask.id}`}
                                    className={`text-sm font-medium transition-all ${
                                      subtask.status === "COMPLETED"
                                        ? "line-through text-muted-foreground"
                                        : ""
                                    }`}
                                  >
                                    {subtask.name}
                                  </Label>
                                  {subtask.description && (
                                    <p
                                      className={`text-xs text-muted-foreground ${
                                        subtask.status === "COMPLETED"
                                          ? "line-through opacity-70"
                                          : ""
                                      }`}
                                    >
                                      {subtask.description}
                                    </p>
                                  )}
                                </div>
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{
                                    scale:
                                      subtask.status === "COMPLETED" ? 1 : 0,
                                    transition: {
                                      type: "spring",
                                      stiffness: 500,
                                      damping: 15,
                                    },
                                  }}
                                  className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary"
                                >
                                  <CheckCircle className="h-3.5 w-3.5" />
                                </motion.div>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="rounded-full bg-muted p-3">
                    <Sparkles className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">
                    AI Suggestions Disabled
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Enable AI suggestions to get help with optimizing your task.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4"
                    onClick={() => setShowAiSuggestions(true)}
                  >
                    Enable AI Suggestions
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Natural Language Input</CardTitle>
              <CardDescription>
                Quickly create a task using natural language
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="natural-language">Describe your task</Label>
                <Textarea
                  id="natural-language"
                  value={naturalLanguageInput}
                  onChange={(e) => setNaturalLanguageInput(e.target.value)}
                  placeholder="E.g., 'Remind me to submit the report tomorrow at 3 PM'"
                  className="min-h-[100px]"
                />
              </div>
              <Button
                className="w-full"
                onClick={parseNaturalLanguage}
                disabled={!naturalLanguageInput || isLoading}
              >
                <Sparkles className="mr-2 h-4 w-4" />
                Parse Task
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
