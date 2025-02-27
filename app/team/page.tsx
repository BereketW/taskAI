"use client"

import { useState } from "react"
import { BarChart, CheckCircle2, Clock, Plus, Search, Users } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function TeamDashboardPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const teams = [
    {
      id: 1,
      name: "Product Team",
      description: "Core product development team",
      members: 8,
      tasksCompleted: 45,
      totalTasks: 58,
      progress: 78,
      recentActivity: [
        {
          user: "Sarah K.",
          action: "completed",
          task: "Update user interface designs",
          time: "2 hours ago",
        },
        {
          user: "Mike R.",
          action: "created",
          task: "Backend API documentation",
          time: "4 hours ago",
        },
      ],
    },
    {
      id: 2,
      name: "Marketing Team",
      description: "Brand and marketing initiatives",
      members: 6,
      tasksCompleted: 32,
      totalTasks: 40,
      progress: 80,
      recentActivity: [
        {
          user: "Emily L.",
          action: "updated",
          task: "Q1 Marketing Strategy",
          time: "1 hour ago",
        },
      ],
    },
    {
      id: 3,
      name: "Design Team",
      description: "UI/UX and graphic design",
      members: 5,
      tasksCompleted: 28,
      totalTasks: 35,
      progress: 65,
      recentActivity: [
        {
          user: "Alex M.",
          action: "completed",
          task: "Brand guidelines update",
          time: "3 hours ago",
        },
      ],
    },
  ]

  const filteredTeams = teams.filter((team) => team.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Team Dashboard</h1>
          <p className="text-muted-foreground">Manage your teams and track their progress</p>
        </div>
        <Button asChild>
          <Link href="/team/create">
            <Plus className="mr-2 h-4 w-4" />
            Create Team
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Teams</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teams.length}</div>
            <p className="text-xs text-muted-foreground">Active teams</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teams.reduce((acc, team) => acc + team.members, 0)}</div>
            <p className="text-xs text-muted-foreground">Across all teams</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Tasks Completed</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teams.reduce((acc, team) => acc + team.tasksCompleted, 0)}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Average Progress</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(teams.reduce((acc, team) => acc + team.progress, 0) / teams.length)}%
            </div>
            <p className="text-xs text-muted-foreground">Across all teams</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search teams..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredTeams.map((team) => (
          <Card key={team.id} className="flex flex-col">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">{team.name}</CardTitle>
                <Badge variant="secondary">{team.members} members</Badge>
              </div>
              <CardDescription>{team.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Progress</span>
                    <span className="text-muted-foreground">
                      {team.tasksCompleted}/{team.totalTasks} tasks
                    </span>
                  </div>
                  <Progress value={team.progress} />
                </div>
                <Separator />
                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Recent Activity</h4>
                  {team.recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={`/placeholder-avatar-${index + 1}.jpg`} />
                        <AvatarFallback>{activity.user[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm">
                          <span className="font-medium">{activity.user}</span> {activity.action} {activity.task}
                        </p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="mr-1 h-3 w-3" />
                          {activity.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href={`/team/${team.id}`}>View Details</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href={`/team/${team.id}/tasks`}>View Tasks</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

