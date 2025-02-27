"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2, Plus, Upload, Users } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function CreateTeamPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [teamName, setTeamName] = useState("")
  const [teamDescription, setTeamDescription] = useState("")
  const [invitedMembers, setInvitedMembers] = useState([{ email: "", role: "member" }])

  const handleAddMember = () => {
    setInvitedMembers([...invitedMembers, { email: "", role: "member" }])
  }

  const handleRemoveMember = (index: number) => {
    setInvitedMembers(invitedMembers.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      router.push("/team")
    }, 1500)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Create New Team</h1>
          <p className="text-muted-foreground">Set up a new team and invite members</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Team Details</CardTitle>
              <CardDescription>Basic information about your team</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="team-name">Team Name</Label>
                <Input
                  id="team-name"
                  placeholder="Enter team name"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter team description"
                  value={teamDescription}
                  onChange={(e) => setTeamDescription(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Team Avatar</Label>
                <div className="flex items-center gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="/placeholder-team.jpg" />
                    <AvatarFallback>
                      <Users className="h-8 w-8" />
                    </AvatarFallback>
                  </Avatar>
                  <Button variant="outline">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Image
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Team Settings</CardTitle>
              <CardDescription>Configure your team preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Privacy</Label>
                <div className="flex gap-4">
                  <Button variant="outline" className="flex-1">
                    Public Team
                  </Button>
                  <Button variant="outline" className="flex-1">
                    Private Team
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Public teams can be discovered by other users. Private teams are invite-only.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Invite Members</CardTitle>
                <Button variant="outline" size="sm" onClick={handleAddMember}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Member
                </Button>
              </div>
              <CardDescription>Invite team members to collaborate</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {invitedMembers.map((member, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="flex-1">
                    <Input
                      placeholder="member@example.com"
                      value={member.email}
                      onChange={(e) => {
                        const newMembers = [...invitedMembers]
                        newMembers[index].email = e.target.value
                        setInvitedMembers(newMembers)
                      }}
                    />
                  </div>
                  <Badge variant="outline">{member.role}</Badge>
                  {index > 0 && (
                    <Button variant="ghost" size="sm" onClick={() => handleRemoveMember(index)}>
                      Remove
                    </Button>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Review & Create</CardTitle>
              <CardDescription>Review your team setup before creating</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Team Name</span>
                    <span className="text-sm text-muted-foreground">{teamName || "Not set"}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Members</span>
                    <span className="text-sm text-muted-foreground">{invitedMembers.length} invited</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Privacy</span>
                    <span className="text-sm text-muted-foreground">Private Team</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href="/team">Cancel</Link>
              </Button>
              <Button onClick={handleSubmit} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    Create Team
                    <Users className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

