"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
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
  Lightbulb,
  Rocket,
  Gauge,
  Flame,
  Bolt,
  X,
  Calendar,
  Bookmark,
  Trash2,
  ThumbsUp,
  ThumbsDown,
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
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Mock data for development
// const mockInsights = {
//   confidenceScore: 0.91,
//   potentialTimeSaved: 12.5,
//   activeActionsCount: 8,
//   implementationRate: 0.78,
//   actions: [
//     {
//       id: 1,
//       title: "Reschedule Low-Priority Meetings",
//       description: "Move 3 non-critical meetings to next week",
//       impact: "High",
//       timeToImplement: "2 min",
//     },
//     {
//       id: 2,
//       title: "Delegate Code Review",
//       description: "Assign 5 pending reviews to available team members",
//       impact: "High",
//       timeToImplement: "5 min",
//     },
//     {
//       id: 3,
//       title: "Break Down Large Task",
//       description: "Split 'Database Migration' into smaller subtasks",
//       impact: "Medium",
//       timeToImplement: "10 min",
//     },
//   ],
//   suggestions: [
//     {
//       id: 1,
//       title: "Optimize Meeting Schedule",
//       suggestions: "Reduce meeting duration by 15 minutes",
//       actionType: "Optimization",
//       impactLevel: "high",
//       estimatedTime: 0.1,
//       aiConfidenceScore: 0.92,
//       aiInsight:
//         "Based on analysis of past meeting patterns, 85% of objectives can be achieved in shorter timeframes",
//     },
//     {
//       id: 2,
//       title: "Documentation Update Required",
//       suggestions: "Update API documentation for recent changes",
//       actionType: "Task",
//       impactLevel: "medium",
//       estimatedTime: 2,
//       aiConfidenceScore: 0.88,
//       aiInsight:
//         "Pattern analysis shows documentation gaps in recently modified features",
//     },
//     {
//       id: 3,
//       title: "Automate Report Generation",
//       suggestions: "Create automated weekly report generation",
//       actionType: "Automation",
//       impactLevel: "high",
//       estimatedTime: 4,
//       aiConfidenceScore: 0.95,
//       aiInsight: "Repetitive manual reporting patterns detected",
//     },
//     {
//       id: 4,
//       title: "Implement Focus Time Blocks",
//       suggestions: "Schedule 2-hour focus blocks for deep work",
//       actionType: "Productivity",
//       impactLevel: "high",
//       estimatedTime: 0.2,
//       aiConfidenceScore: 0.9,
//       aiInsight:
//         "Performance analysis shows 40% higher output during uninterrupted work periods",
//     },
//     {
//       id: 5,
//       title: "Consolidate Project Meetings",
//       suggestions: "Combine 3 separate project check-ins into one",
//       actionType: "Optimization",
//       impactLevel: "medium",
//       estimatedTime: 0.1,
//       aiConfidenceScore: 0.87,
//       aiInsight:
//         "Similar stakeholders are present in multiple meetings discussing related topics",
//     },
//     {
//       id: 6,
//       title: "Implement Automated Testing",
//       suggestions: "Set up CI/CD pipeline with automated tests",
//       actionType: "Automation",
//       impactLevel: "high",
//       estimatedTime: 8,
//       aiConfidenceScore: 0.93,
//       aiInsight: "Manual testing is consuming 30% of development time",
//     },
//   ],
// };

// Custom stat card component
const StatCard = ({
  icon: Icon,
  title,
  value,
  description,
  color,
  delay = 0,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{ duration: 0.3, delay }}
    >
      <Card className="border border-border">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-md ${color}`}
          >
            <Icon className="h-4 w-4" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{value}</div>
          <p className="text-xs text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Custom action card component
const ActionCard = ({ action, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{ duration: 0.3, delay }}
    >
      <Card className="h-full border border-border">
        <CardContent className="p-5">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-md ${
                    action.impact === "High"
                      ? "bg-green-100 dark:bg-green-950 text-green-600"
                      : "bg-amber-100 dark:bg-amber-950 text-amber-600"
                  }`}
                >
                  <Bolt className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium">{action.title}</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              {action.description}
            </p>
            <div className="flex items-center justify-between text-xs pt-2">
              <Badge
                variant={action.impactLevel === "High" ? "success" : "warning"}
              >
                {action.impactLevel} Impact
              </Badge>
              <span className="text-muted-foreground flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {action.timeToImplement}
              </span>
            </div>
            <Button className="w-full mt-2" size="sm">
              <Zap className="h-3.5 w-3.5 mr-1.5" />
              Implement
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Custom suggestion card component
const SuggestionCard = ({ suggestion, view, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const getActionTypeColor = (type) => {
    switch (type.toLowerCase()) {
      case "optimization":
        return "bg-blue-100 dark:bg-blue-950 text-blue-600";
      case "task":
        return "bg-purple-100 dark:bg-purple-950 text-purple-600";
      case "automation":
        return "bg-emerald-100 dark:bg-emerald-950 text-emerald-600";
      case "productivity":
        return "bg-amber-100 dark:bg-amber-950 text-amber-600";
      default:
        return "bg-primary/10 text-primary";
    }
  };

  const getActionTypeIcon = (type) => {
    switch (type.toLowerCase()) {
      case "optimization":
        return Gauge;
      case "task":
        return CheckCircle2;
      case "automation":
        return Rocket;
      case "productivity":
        return Flame;
      default:
        return Lightbulb;
    }
  };

  const ActionIcon = getActionTypeIcon(suggestion.actionType);
  const actionTypeColor = getActionTypeColor(suggestion.actionType);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="relative"
    >
      <Card
        className={`h-full border border-border ${view === "list" ? "flex flex-row" : ""}`}
      >
        <CardHeader className={view === "list" ? "w-1/3" : ""}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-md ${actionTypeColor}`}
              >
                <ActionIcon className="h-4 w-4" />
              </div>
              <CardTitle className="text-base">{suggestion.title}</CardTitle>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>
                  <Zap className="h-4 w-4 mr-2" />
                  Implement Now
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Later
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Bookmark className="h-4 w-4 mr-2" />
                  Save for Reference
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Dismiss
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <CardDescription>{suggestion.suggestions}</CardDescription>
        </CardHeader>

        <CardContent className={view === "list" ? "w-2/3 pt-6" : ""}>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  AI Confidence
                </span>
                <span className="font-medium">
                  {Math.round(suggestion.aiConfidenceScore * 100)}%
                </span>
              </div>
              <div className="relative h-2 w-full overflow-hidden rounded-md bg-muted">
                <motion.div
                  className={`absolute inset-y-0 left-0 ${
                    suggestion.aiConfidenceScore > 0.9
                      ? "bg-green-500"
                      : suggestion.aiConfidenceScore > 0.8
                        ? "bg-amber-500"
                        : "bg-red-500"
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${suggestion.aiConfidenceScore * 100}%` }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge
                variant="outline"
                className={`${actionTypeColor} bg-transparent`}
              >
                <ActionIcon className="h-3 w-3 mr-1" />
                {suggestion.actionType}
              </Badge>
              <Badge
                variant={
                  suggestion.impactLevel === "high" ? "success" : "warning"
                }
              >
                {suggestion.impactLevel} Impact
              </Badge>
              <Badge variant="outline">
                <Clock className="h-3 w-3 mr-1" />
                {suggestion.estimatedTime < 1
                  ? `${Math.round(suggestion.estimatedTime * 60)}min`
                  : `${suggestion.estimatedTime}hr`}
              </Badge>
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

            <div className="flex items-center justify-between pt-2">
              <div className="flex gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <ThumbsUp className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>This suggestion is helpful</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <ThumbsDown className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>This suggestion is not helpful</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <Button size="sm">
                <Zap className="h-3.5 w-3.5 mr-1.5" />
                Implement
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default function AISuggestionsPage({ insights }) {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // Filter suggestions based on search query and filter
  const filteredSuggestions = insights.suggestions.filter((suggestion) => {
    const matchesSearch =
      searchQuery === "" ||
      suggestion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      suggestion.suggestions
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      suggestion.aiInsight.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      filter === "all" ||
      suggestion.actionType.toLowerCase() === filter.toLowerCase();

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "high-impact" && suggestion.impactLevel === "high") ||
      (activeTab === "quick-wins" && suggestion.estimatedTime < 0.5) ||
      (activeTab === "automation" &&
        suggestion.actionType.toLowerCase() === "automation");

    return matchesSearch && matchesFilter && matchesTab;
  });

  return (
    <div className="relative min-h-screen">
      <div className="flex-1 space-y-6 p-6 max-w-7xl mx-auto">
        {/* Header section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-semibold">AI Suggestions</h2>
            </div>
            <p className="text-muted-foreground mt-1">
              Smart recommendations to optimize your workflow and boost
              productivity
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button>
              <Settings2 className="mr-2 h-4 w-4" />
              Configure AI
            </Button>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
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
                </TooltipTrigger>
                <TooltipContent>
                  <p>Switch to {view === "grid" ? "list" : "grid"} view</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={Brain}
            title="AI Confidence Score"
            value={`${Math.round(insights.confidenceScore * 100)}%`}
            description="Based on your workflow patterns"
            color="bg-primary/10 text-primary"
            delay={0.1}
          />
          <StatCard
            icon={Clock}
            title="Potential Time Saved"
            value={`${insights.potentialTimeSaved}h`}
            description="Per week with suggested optimizations"
            color="bg-blue-100 dark:bg-blue-950 text-blue-600"
            delay={0.15}
          />
          <StatCard
            icon={Sparkles}
            title="Active Suggestions"
            value={insights.activeActionsCount}
            description={`${insights.suggestions.filter((s) => s.impactLevel === "high").length} high-impact suggestions`}
            color="bg-purple-100 dark:bg-purple-950 text-purple-600"
            delay={0.2}
          />
          <StatCard
            icon={CheckCircle2}
            title="Implementation Rate"
            value={`${Math.round(insights.implementationRate * 100)}%`}
            description="Of suggestions implemented"
            color="bg-emerald-100 dark:bg-emerald-950 text-emerald-600"
            delay={0.25}
          />
        </div>

        {/* Search and filter section */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative flex-1 w-full">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-muted-foreground" />
              </div>
              <Input
                placeholder="Search suggestions..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute inset-y-0 right-0 h-full"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            <Select value={filter} onValueChange={(value) => setFilter(value)}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="optimization">Optimization</SelectItem>
                <SelectItem value="task">Tasks</SelectItem>
                <SelectItem value="automation">Automation</SelectItem>
                <SelectItem value="productivity">Productivity</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tabs for different suggestion categories */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="high-impact">High Impact</TabsTrigger>
              <TabsTrigger value="quick-wins">Quick Wins</TabsTrigger>
              <TabsTrigger value="automation">Automation</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Quick Actions section */}
          <Card>
            <CardHeader className="pb-3 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-secondary/10">
                    <Bolt className="h-4 w-4 text-secondary" />
                  </div>
                  <CardTitle>Quick Actions</CardTitle>
                </div>
                <Badge variant="outline">
                  {insights.actions.length} Available
                </Badge>
              </div>
              <CardDescription>
                Immediate improvements you can make to boost productivity
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid gap-4 md:grid-cols-3">
                {insights.actions.map((action, index) => (
                  <ActionCard
                    key={action.id}
                    action={action}
                    delay={index * 0.05}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Main suggestions section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">AI Suggestions</h3>
              <Badge variant="outline">
                {filteredSuggestions.length} Suggestions
              </Badge>
            </div>

            {filteredSuggestions.length > 0 ? (
              <div
                className={
                  view === "grid"
                    ? "grid gap-4 md:grid-cols-2 lg:grid-cols-3"
                    : "space-y-4"
                }
              >
                {filteredSuggestions.map((suggestion, index) => (
                  <SuggestionCard
                    key={suggestion.id}
                    suggestion={suggestion}
                    view={view}
                    index={index}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-md bg-muted mb-4">
                  <Search className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium">No suggestions found</h3>
                <p className="text-muted-foreground mt-2 max-w-md">
                  Try adjusting your search or filter criteria to find relevant
                  suggestions.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
