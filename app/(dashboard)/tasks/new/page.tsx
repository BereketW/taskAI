"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { ArrowRight, Clock, Loader2, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { useToast } from "@/hooks/use-toast";
import { createTask } from "@/actions/workspaces";
import { ToastContainer, toast } from "react-toastify";
export default function NewTaskPage() {
  const router = useRouter();
  // const { toast } = useToast();
  const [dueDate, setDate] = useState<Date>();
  const [dueTime, setDueTime] = useState("");
  const [showAiSuggestions, setShowAiSuggestions] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedWorkspace, setSelectedWorkspace] = useState(null);
  const [category, setCategory] = useState("");
  const [recurring, setRecuring] = useState(false);
  const [priority, setPriority] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [workspaces, setWorkspace] = useState([]);
  const [selectedTasklist, setSelectedTasklist] = useState("");

  useEffect(() => {
    async function getWorkspace() {
      setIsLoading(false);
      try {
        const response = await fetch("/api/workspace", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        console.log(data.workspaces.members);
        setWorkspace(data.workspaces);
      } catch (err) {
        console.log(err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    getWorkspace();
  }, []);

  // Mock data for workspaces and tasklists
  // const workspaces = [
  //   {
  //     id: "1",
  //     name: "Product Development",
  //     tasklists: [
  //       { id: "1", name: "Sprint Backlog" },
  //       { id: "2", name: "In Progress" },
  //       { id: "3", name: "Code Review" },
  //     ],
  //   },
  //   {
  //     id: "2",
  //     name: "Marketing Projects",
  //     tasklists: [
  //       { id: "4", name: "Campaign Planning" },
  //       { id: "5", name: "Content Creation" },
  //     ],
  //   },
  // ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
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
      };
      const task = await createTask(data);
      console.log("task", task);
      if (task.success) {
        // toast({
        //   title: "Task Created",
        //   description: "Your new task has been created successfully.",
        // });
        toast("Your task has been created successfully");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      toast({
        title: "Task Created",
        description: "Your new task has been created successfully.",
      });
    }

    if (!selectedWorkspace || !selectedTasklist) {
      toast({
        title: "Required Fields Missing",
        description: "Please select a workspace and tasklist for this task.",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }

    // Simulate API call
  };

  const selectedWorkspaceData = workspaces.find(
    (w) => w.id === selectedWorkspace
  );
  // console.log(selectedWorkspaceData);
  // console.log(selectedWorkspace);
  return (
    <div className="flex flex-col gap-6 p-6">
      <ToastContainer />
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create New Task</h1>
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
                      {workspaces.map((workspace) => (
                        <SelectItem key={workspace.id} value={workspace.id}>
                          {workspace.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
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
                      {selectedWorkspaceData?.taskLists.map((tasklist) => (
                        <SelectItem key={tasklist.id} value={tasklist.id}>
                          {tasklist.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Task Title</Label>
                  <Input
                    onChange={(e) => setTitle(e.target.value)}
                    id="title"
                    placeholder="Enter task title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    onChange={(e) => setDescription(e.target.value)}
                    id="description"
                    placeholder="Enter task description"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select onValueChange={(value) => setCategory(value)}>
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
                    onValueChange={(value) => setPriority(value)}
                    defaultValue="medium"
                    className="flex space-x-2"
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
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Due Date</Label>
                    <Input
                      onChange={(e) => setDate(new Date(e.target.value))}
                      type="date"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Due Time</Label>
                    <div className="flex items-center">
                      <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                      <Input
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
                      onChange={() => setRecuring(!recurring)}
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
                      <Sparkles className="h-4 w-4 text-secondary" />
                      <span className="font-medium">Suggested Due Date</span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Tomorrow at 3:00 PM would be optimal based on your
                      productivity patterns.
                    </p>
                  </div>
                  <div className="rounded-lg border p-3 bg-secondary/5">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-secondary" />
                      <span className="font-medium">Task Breakdown</span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      This task might be more manageable if broken into smaller
                      subtasks.
                    </p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Generate Subtasks
                    </Button>
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
                  placeholder="E.g., 'Remind me to submit the report tomorrow at 3 PM'"
                  className="min-h-[100px]"
                />
              </div>
              <Button className="w-full">
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
