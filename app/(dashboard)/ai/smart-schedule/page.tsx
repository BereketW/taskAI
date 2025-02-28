"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  CalendarIcon,
  Clock,
  Filter,
  MoreHorizontal,
  Plus,
  RefreshCcw,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SmartSchedulePage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [view, setView] = useState("day");

  const scheduleItems = [
    {
      id: 1,
      title: "Team Stand-up",
      time: "09:00 AM - 09:30 AM",
      type: "Meeting",
      priority: "High",
      attendees: [
        { name: "Sarah Chen", avatar: "/placeholder.svg" },
        { name: "Alex Kim", avatar: "/placeholder.svg" },
        { name: "Mike Wilson", avatar: "/placeholder.svg" },
      ],
    },
    {
      id: 2,
      title: "Design Review",
      time: "10:00 AM - 11:00 AM",
      type: "Meeting",
      priority: "Medium",
      attendees: [
        { name: "Lisa Patel", avatar: "/placeholder.svg" },
        { name: "James Wilson", avatar: "/placeholder.svg" },
      ],
    },
    {
      id: 3,
      title: "Complete Project Proposal",
      time: "11:30 AM - 12:30 PM",
      type: "Task",
      priority: "High",
      assignee: { name: "Sarah Chen", avatar: "/placeholder.svg" },
    },
    {
      id: 4,
      title: "Lunch Break",
      time: "12:30 PM - 1:30 PM",
      type: "Break",
      priority: "Low",
    },
    {
      id: 5,
      title: "Client Meeting",
      time: "2:00 PM - 3:00 PM",
      type: "Meeting",
      priority: "High",
      attendees: [
        { name: "Sarah Chen", avatar: "/placeholder.svg" },
        { name: "Mike Wilson", avatar: "/placeholder.svg" },
      ],
    },
  ];

  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Smart Schedule</h2>
          <p className="text-muted-foreground">
            AI-optimized daily schedule for maximum productivity
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-[240px] justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? (
                  date.toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Select value={view} onValueChange={setView}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Select view" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Day</SelectItem>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="month">Month</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Event
          </Button>
          <Button variant="outline">
            <RefreshCcw className="mr-2 h-4 w-4" />
            Optimize
          </Button>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Scheduled Tasks
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">4 high priority</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Meeting Hours</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.5h</div>
            <p className="text-xs text-muted-foreground">3 meetings today</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Focus Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2h</div>
            <p className="text-xs text-muted-foreground">2 focus blocks</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Break Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.5h</div>
            <p className="text-xs text-muted-foreground">Including lunch</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4">
        {scheduleItems.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center space-y-0">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <CardTitle>{item.title}</CardTitle>
                    <span
                      className={`rounded-full px-2 py-1 text-xs ${
                        item.priority === "High"
                          ? "bg-red-100 text-red-700 dark:bg-red-900/30"
                          : item.priority === "Medium"
                          ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30"
                          : "bg-green-100 text-green-700 dark:bg-green-900/30"
                      }`}
                    >
                      {item.priority}
                    </span>
                  </div>
                  <CardDescription>{item.time}</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  {item.attendees && (
                    <div className="flex -space-x-2">
                      {item.attendees.map((attendee, index) => (
                        <Avatar
                          key={index}
                          className="h-8 w-8 border-2 border-background"
                        >
                          <AvatarImage src={attendee.avatar} />
                          <AvatarFallback>{attendee.name[0]}</AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                  )}
                  {item.assignee && (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={item.assignee.avatar} />
                      <AvatarFallback>{item.assignee.name[0]}</AvatarFallback>
                    </Avatar>
                  )}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Reschedule</DropdownMenuItem>
                      <DropdownMenuItem>Cancel</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
