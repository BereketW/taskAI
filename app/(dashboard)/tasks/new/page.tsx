"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CalendarIcon, Clock, Sparkles } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Switch } from "@/components/ui/switch"
import Link from "next/link"

export default function NewTaskPage() {
  const [date, setDate] = useState<Date>()
  const [showAiSuggestions, setShowAiSuggestions] = useState(true)

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create New Task</h1>
          <p className="text-muted-foreground">Add a new task to your list</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Task Details</CardTitle>
              <CardDescription>Enter the details of your new task.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Task Title</Label>
                <Input id="title" placeholder="Enter task title" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Enter task description" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select>
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
                <RadioGroup defaultValue="medium" className="flex space-x-2">
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
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Due Time</Label>
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                    <Input id="time" type="time" />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="recurring">Recurring Task</Label>
                  <Switch id="recurring" />
                </div>
                <p className="text-xs text-muted-foreground">Set this task to repeat on a schedule</p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href="/tasks">Cancel</Link>
              </Button>
              <Button>Create Task</Button>
            </CardFooter>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-secondary" />
                  AI Assistance
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Label htmlFor="ai-suggestions" className="text-sm">
                    Show Suggestions
                  </Label>
                  <Switch id="ai-suggestions" checked={showAiSuggestions} onCheckedChange={setShowAiSuggestions} />
                </div>
              </div>
              <CardDescription>Let AI help you optimize your task.</CardDescription>
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
                      <span className="font-medium text-yellow-500">Medium</span> priority.
                    </p>
                  </div>
                  <div className="rounded-lg border p-3 bg-secondary/5">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-secondary" />
                      <span className="font-medium">Suggested Due Date</span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Tomorrow at 3:00 PM would be optimal based on your productivity patterns.
                    </p>
                  </div>
                  <div className="rounded-lg border p-3 bg-secondary/5">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-secondary" />
                      <span className="font-medium">Task Breakdown</span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      This task might be more manageable if broken into smaller subtasks.
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
                  <h3 className="mt-4 text-lg font-semibold">AI Suggestions Disabled</h3>
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
              <CardDescription>Quickly create a task using natural language.</CardDescription>
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
  )
}

