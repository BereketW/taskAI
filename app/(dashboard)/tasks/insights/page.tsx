"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Activity,
  AlertCircle,
  ArrowDown,
  ArrowUp,
  Clock,
  Focus,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample data for demonstration
const productivityData = [
  { hour: "9AM", productivity: 85, tasks: 5 },
  { hour: "10AM", productivity: 90, tasks: 7 },
  { hour: "11AM", productivity: 95, tasks: 8 },
  { hour: "12PM", productivity: 70, tasks: 4 },
  { hour: "1PM", productivity: 65, tasks: 3 },
  { hour: "2PM", productivity: 80, tasks: 6 },
  { hour: "3PM", productivity: 85, tasks: 7 },
  { hour: "4PM", productivity: 90, tasks: 8 },
  { hour: "5PM", productivity: 75, tasks: 5 },
];

const weeklyData = [
  { day: "Mon", completed: 12, total: 15 },
  { day: "Tue", completed: 15, total: 18 },
  { day: "Wed", completed: 10, total: 14 },
  { day: "Thu", completed: 8, total: 10 },
  { day: "Fri", completed: 14, total: 16 },
  { day: "Sat", completed: 5, total: 8 },
  { day: "Sun", completed: 7, total: 10 },
];

export default function InsightsPage() {
  const [timeRange, setTimeRange] = useState("7d");

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

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Task Insights</h1>
          <p className="text-muted-foreground">
            Detailed analysis of your productivity and task management
          </p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="14d">Last 14 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
      >
        <motion.div variants={item}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Productivity Score
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">85%</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <ArrowUp className="mr-1 h-4 w-4 text-green-500" />
                12% from last week
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={item}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Tasks Completed
              </CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45/58</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <ArrowUp className="mr-1 h-4 w-4 text-green-500" />8 more than
                last week
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={item}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Focus Time</CardTitle>
              <Focus className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5.2h</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <ArrowDown className="mr-1 h-4 w-4 text-red-500" />
                18min from average
              </div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={item}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Time per Task
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45m</div>
              <p className="text-xs text-muted-foreground">
                Average completion time
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="productivity">Productivity</TabsTrigger>
          <TabsTrigger value="ai-insights">AI Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Weekly Task Completion</CardTitle>
                <CardDescription>
                  Number of tasks completed vs total tasks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="total" fill="hsl(var(--muted))" />
                    <Bar dataKey="completed" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Task Distribution</CardTitle>
                <CardDescription>By priority and category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="text-sm font-medium">By Priority</div>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-red-500" />
                        <div className="ml-2 flex-1">
                          <div className="flex justify-between text-sm">
                            <span>High Priority</span>
                            <span>35%</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-muted">
                            <div className="h-2 w-[35%] rounded-full bg-red-500" />
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-yellow-500" />
                        <div className="ml-2 flex-1">
                          <div className="flex justify-between text-sm">
                            <span>Medium Priority</span>
                            <span>45%</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-muted">
                            <div className="h-2 w-[45%] rounded-full bg-yellow-500" />
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-green-500" />
                        <div className="ml-2 flex-1">
                          <div className="flex justify-between text-sm">
                            <span>Low Priority</span>
                            <span>20%</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-muted">
                            <div className="h-2 w-[20%] rounded-full bg-green-500" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm font-medium">By Category</div>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                        <div className="ml-2 flex-1">
                          <div className="flex justify-between text-sm">
                            <span>Work</span>
                            <span>50%</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-muted">
                            <div className="h-2 w-[50%] rounded-full bg-primary" />
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-secondary" />
                        <div className="ml-2 flex-1">
                          <div className="flex justify-between text-sm">
                            <span>Personal</span>
                            <span>30%</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-muted">
                            <div className="h-2 w-[30%] rounded-full bg-secondary" />
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-purple-500" />
                        <div className="ml-2 flex-1">
                          <div className="flex justify-between text-sm">
                            <span>Other</span>
                            <span>20%</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-muted">
                            <div className="h-2 w-[20%] rounded-full bg-purple-500" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="productivity" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Daily Productivity</CardTitle>
                <CardDescription>
                  Your productivity score throughout the day
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={productivityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="productivity"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      dot={{ fill: "hsl(var(--primary))" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Peak Performance Times</CardTitle>
                <CardDescription>
                  When {"you're"} most productive
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <Zap className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">Morning Peak</div>
                      <div className="text-sm text-muted-foreground">
                        9:00 AM - 11:00 AM
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary/10">
                      <Target className="h-6 w-6 text-secondary" />
                    </div>
                    <div>
                      <div className="font-medium">Most Productive Day</div>
                      <div className="text-sm text-muted-foreground">
                        Tuesday
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
                      <Focus className="h-6 w-6 text-green-500" />
                    </div>
                    <div>
                      <div className="font-medium">Focus Sessions</div>
                      <div className="text-sm text-muted-foreground">
                        Average 52 minutes
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ai-insights" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Productivity Patterns
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Your productivity peaks between 9 AM and 11 AM. Consider
                  scheduling important tasks during this window.
                </p>
                <Button variant="outline" size="sm" className="mt-2">
                  Optimize Schedule
                </Button>
              </CardContent>
            </Card>
            <Card className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-yellow-500" />
                  Task Distribution
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  You have an unusually high number of high-priority tasks.
                  Consider delegating or rescheduling some tasks.
                </p>
                <Button variant="outline" size="sm" className="mt-2">
                  View Suggestions
                </Button>
              </CardContent>
            </Card>
            <Card className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-secondary" />
                  Focus Time
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Your average focus session duration has increased by 15
                  minutes. Keep up the good work!
                </p>
                <Button variant="outline" size="sm" className="mt-2">
                  View Focus Stats
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
