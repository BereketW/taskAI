"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Brain,
  CheckCircle2,
  Clock,
  Filter,
  LayoutGrid,
  List,
  MoreHorizontal,
  Search,
  Settings2,
  Sparkles,
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
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function AISuggestionsPage() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [filter, setFilter] = useState("all");

  const suggestions = [
    {
      id: 1,
      type: "optimization",
      title: "Optimize Meeting Schedule",
      description:
        "AI suggests reducing meeting duration by 15 minutes to improve team productivity",
      impact: "High",
      confidence: 92,
      category: "Time Management",
      timeToImplement: "5 min",
      aiInsight:
        "Based on analysis of past meeting patterns, 85% of objectives can be achieved in shorter timeframes",
    },
    {
      id: 2,
      type: "task",
      title: "Documentation Update Required",
      description:
        "Several API endpoints need updated documentation based on recent changes",
      impact: "Medium",
      confidence: 88,
      category: "Development",
      timeToImplement: "2 hours",
      aiInsight:
        "Pattern analysis shows documentation gaps in recently modified features",
    },
    {
      id: 3,
      type: "automation",
      title: "Automate Report Generation",
      description:
        "Create automated weekly report generation to save 3 hours per week",
      impact: "High",
      confidence: 95,
      category: "Automation",
      timeToImplement: "4 hours",
      aiInsight: "Repetitive manual reporting patterns detected",
    },
    {
      id: 4,
      type: "productivity",
      title: "Implement Focus Time Blocks",
      description:
        "Schedule 2-hour focus blocks for deep work during peak productivity hours",
      impact: "High",
      confidence: 90,
      category: "Productivity",
      timeToImplement: "10 min",
      aiInsight:
        "Performance analysis shows 40% higher output during uninterrupted work periods",
    },
  ];

  const quickActions = [
    {
      id: 1,
      title: "Reschedule Low-Priority Meetings",
      description: "Move 3 non-critical meetings to next week",
      impact: "Medium",
      timeToImplement: "2 min",
    },
    {
      id: 2,
      title: "Delegate Code Review",
      description: "Assign 5 pending reviews to available team members",
      impact: "High",
      timeToImplement: "5 min",
    },
    {
      id: 3,
      title: "Break Down Large Task",
      description: "Split 'Database Migration' into smaller subtasks",
      impact: "High",
      timeToImplement: "10 min",
    },
  ];

  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">AI Suggestions</h2>
          <p className="text-muted-foreground">
            Smart recommendations to optimize your workflow
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button>
            <Settings2 className="mr-2 h-4 w-4" />
            Configure AI
          </Button>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setView(view === "grid" ? "list" : "grid")}
          >
            {view === "grid" ? (
              <LayoutGrid className="h-4 w-4" />
            ) : (
              <List className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              AI Confidence Score
            </CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">
              Based on your workflow patterns
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Potential Time Saved
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8.5h</div>
            <p className="text-xs text-muted-foreground">
              Per week with suggested optimizations
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Suggestions
            </CardTitle>
            <Sparkles className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              4 high-impact suggestions
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Implementation Rate
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">76%</div>
            <p className="text-xs text-muted-foreground">
              Of suggestions implemented
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search suggestions..." className="pl-8" />
            </div>
          </div>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="optimization">Optimization</SelectItem>
              <SelectItem value="task">Tasks</SelectItem>
              <SelectItem value="automation">Automation</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Immediate improvements you can make
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                {quickActions.map((action) => (
                  <Card key={action.id}>
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">
                            {action.title}
                          </span>
                          <Zap className="h-4 w-4 text-yellow-500" />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {action.description}
                        </p>
                        <div className="flex items-center justify-between text-xs">
                          <span
                            className={`rounded-full px-2 py-0.5 ${
                              action.impact === "High"
                                ? "bg-green-100 text-green-700 dark:bg-green-900/30"
                                : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30"
                            }`}
                          >
                            {action.impact} Impact
                          </span>
                          <span className="text-muted-foreground">
                            {action.timeToImplement}
                          </span>
                        </div>
                        <Button className="w-full" size="sm">
                          Implement
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <div
            className={
              view === "grid"
                ? "grid gap-4 md:grid-cols-2 lg:grid-cols-3"
                : "space-y-4"
            }
          >
            {suggestions.map((suggestion) => (
              <motion.div
                key={suggestion.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <CardTitle>{suggestion.title}</CardTitle>
                        <CardDescription>
                          {suggestion.description}
                        </CardDescription>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Implement Now</DropdownMenuItem>
                          <DropdownMenuItem>Schedule Later</DropdownMenuItem>
                          <DropdownMenuItem>Dismiss</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            AI Confidence
                          </span>
                          <span className="font-medium">
                            {suggestion.confidence}%
                          </span>
                        </div>
                        <Progress value={suggestion.confidence} />
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <span className="rounded-full bg-primary/10 px-2 py-1 text-xs">
                          {suggestion.category}
                        </span>
                        <span
                          className={`rounded-full px-2 py-1 text-xs ${
                            suggestion.impact === "High"
                              ? "bg-green-100 text-green-700 dark:bg-green-900/30"
                              : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30"
                          }`}
                        >
                          {suggestion.impact} Impact
                        </span>
                        <span className="rounded-full bg-secondary/10 px-2 py-1 text-xs">
                          {suggestion.timeToImplement}
                        </span>
                      </div>
                      <Separator />
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Brain className="h-4 w-4 text-primary" />
                          <span className="font-medium">AI Insight</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {suggestion.aiInsight}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
