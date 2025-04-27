/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Loader2,
  MessageSquare,
  Sparkles,
  LayoutDashboard,
  FileStack,
  Mail,
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { authClient } from "@/lib/auth-client";

export default function OnboardingPage() {
  const { data: session } = authClient.useSession();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const totalSteps = 5;

  // Step 1 - Personal Info
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [roleInTeam, setRoleInTeam] = useState("team-member");

  // Step 2 - Team & Collaboration
  const [teamSize, setTeamSize] = useState("");
  const [workStyle, setWorkStyle] = useState("hybrid");
  const [primaryWorkType, setPrimaryWorkType] = useState("");
  const [teamEmails, setTeamEmails] = useState("");

  // Step 3 - Task Management Preferences
  const [biggestChallenge, setBiggestChallenge] = useState("");
  const [preferredView, setPreferredView] = useState("list");
  const [currentTools, setCurrentTools] = useState<string[]>([]);
  const [productivityPeaks, setProductivityPeaks] = useState<string[]>([]);

  // Step 4 - Integrations
  const [calendarIntegration, setCalendarIntegration] = useState("");
  const [communicationTool, setCommunicationTool] = useState("");
  const [fileStorage, setFileStorage] = useState("");

  // Step 5 - AI Features & Goals
  const [aiFeatures, setAiFeatures] = useState<string[]>([
    "suggestions",
    "prioritization",
    "insights",
  ]);
  const [aiAssistanceAreas, setAiAssistanceAreas] = useState<string[]>([]);
  const [primaryGoal, setPrimaryGoal] = useState("");

  const handleProductivityPeakToggle = (value: string) => {
    setProductivityPeaks(
      productivityPeaks.includes(value)
        ? productivityPeaks.filter((peak) => peak !== value)
        : [...productivityPeaks, value]
    );
  };

  async function handleSubmit() {
    try {
      const data = await fetch("http://localhost:3000/api/onboarding", {
        method: "POST",
        body: JSON.stringify({
          jobTitle,
          company,
          aiFeatures,
          workStyle,
          teamSize,
          teamEmails,
          roleInTeam,
          primaryWorkType,
          productivityPeaks,
          calendarIntegration,
          fileStorage,
          aiAssistanceAreas,
          primaryGoal,
          communicationTool,
          currentTools,
        }),
      });
      console.log(data);
    } catch (error: any) {
      console.log(error?.message);
    }
  }
  const handleAIFeatureToggle = (value: string) => {
    setAiFeatures(
      aiFeatures.includes(value)
        ? aiFeatures.filter((feature) => feature !== value)
        : [...aiFeatures, value]
    );
  };

  const handleAIAssistanceAreaToggle = (value: string) => {
    setAiAssistanceAreas(
      aiAssistanceAreas.includes(value)
        ? aiAssistanceAreas.filter((area) => area !== value)
        : [...aiAssistanceAreas, value]
    );
  };

  const handleCurrentToolToggle = (value: string) => {
    setCurrentTools(
      currentTools.includes(value)
        ? currentTools.filter((tool) => tool !== value)
        : [...currentTools, value]
    );
  };

  const handleNextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    } else {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        // Redirect to dashboard after completing onboarding
        router.push("/dashboard");
      }, 1500);
    }
  };

  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSkip = () => {
    if (step < totalSteps) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="w-full max-w-3xl px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="space-y-2 text-center mb-6">
          <h1 className="text-3xl font-bold">Welcome to TaskAI</h1>
          <p className="text-muted-foreground">
            {"Let's"} set up your experience in a few simple steps
          </p>
        </div>

        <div className="mb-8">
          <Progress value={(step / totalSteps) * 100} className="h-2" />
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>Getting Started</span>
            <span>All Set!</span>
          </div>
        </div>

        <Card className="backdrop-blur-lg bg-white/10 dark:bg-white/[0.03] border-white/10 shadow-xl">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold">
                {step === 1 && "Personal Information"}
                {step === 2 && "Team & Collaboration"}
                {step === 3 && "Task Management Preferences"}
                {step === 4 && "Connect Your Tools"}
                {step === 5 && "AI Features & Goals"}
              </CardTitle>
              <div className="text-sm text-muted-foreground">
                Step {step} of {totalSteps}
              </div>
            </div>
            <CardDescription>
              {step === 1 && "Tell us a bit about yourself"}
              {step === 2 && "Set up your collaboration preferences"}
              {step === 3 && "Customize how you manage tasks"}
              {step === 4 &&
                "Connect your existing tools for a seamless experience"}
              {step === 5 &&
                "Configure AI features to enhance your productivity"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="job-title">Job Title</Label>
                  <Input
                    id="job-title"
                    placeholder="Product Manager"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">Company/Organization</Label>
                  <Input
                    id="company"
                    placeholder="Acme Inc."
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Your Role</Label>
                  <RadioGroup value={roleInTeam} onValueChange={setRoleInTeam}>
                    <div className="flex items-center space-x-2 rounded-md border p-3 hover:bg-muted/50">
                      <RadioGroupItem value="team-lead" id="team-lead" />
                      <Label htmlFor="team-lead" className="flex flex-col">
                        <span className="font-medium">Team Lead/Manager</span>
                        <span className="text-xs text-muted-foreground">
                          I manage a team and their tasks
                        </span>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 rounded-md border p-3 hover:bg-muted/50">
                      <RadioGroupItem value="team-member" id="team-member" />
                      <Label htmlFor="team-member" className="flex flex-col">
                        <span className="font-medium">Team Member</span>
                        <span className="text-xs text-muted-foreground">
                          I collaborate with others on tasks
                        </span>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 rounded-md border p-3 hover:bg-muted/50">
                      <RadioGroupItem value="solo" id="solo" />
                      <Label htmlFor="solo" className="flex flex-col">
                        <span className="font-medium">Solo User</span>
                        <span className="text-xs text-muted-foreground">
                          I primarily manage my own tasks
                        </span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="team-size">Team Size</Label>
                  <Select value={teamSize} onValueChange={setTeamSize}>
                    <SelectTrigger id="team-size">
                      <SelectValue placeholder="Select team size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="just-me">Just me</SelectItem>
                      <SelectItem value="2-5">2-5 people</SelectItem>
                      <SelectItem value="6-10">6-10 people</SelectItem>
                      <SelectItem value="11-25">11-25 people</SelectItem>
                      <SelectItem value="26+">26+ people</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>How do you typically work?</Label>
                  <RadioGroup value={workStyle} onValueChange={setWorkStyle}>
                    <div className="flex items-center space-x-2 rounded-md border p-3 hover:bg-muted/50">
                      <RadioGroupItem value="individual" id="individual" />
                      <Label htmlFor="individual" className="flex flex-col">
                        <span className="font-medium">
                          Individual contributor
                        </span>
                        <span className="text-xs text-muted-foreground">
                          I work independently on most tasks
                        </span>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 rounded-md border p-3 hover:bg-muted/50">
                      <RadioGroupItem value="team" id="team" />
                      <Label htmlFor="team" className="flex flex-col">
                        <span className="font-medium">Team-based work</span>
                        <span className="text-xs text-muted-foreground">
                          I collaborate closely with my team
                        </span>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 rounded-md border p-3 hover:bg-muted/50">
                      <RadioGroupItem value="hybrid" id="hybrid" />
                      <Label htmlFor="hybrid" className="flex flex-col">
                        <span className="font-medium">Hybrid (both)</span>
                        <span className="text-xs text-muted-foreground">
                          I work both independently and with teams
                        </span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="primary-work">
                    Primary Type of Work/Projects
                  </Label>
                  <Select
                    value={primaryWorkType}
                    onValueChange={setPrimaryWorkType}
                  >
                    <SelectTrigger id="primary-work">
                      <SelectValue placeholder="Select work type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="software">
                        Software Development
                      </SelectItem>
                      <SelectItem value="marketing">
                        Marketing Campaigns
                      </SelectItem>
                      <SelectItem value="client">Client Projects</SelectItem>
                      <SelectItem value="personal">Personal Tasks</SelectItem>
                      <SelectItem value="academic">
                        Academic Research
                      </SelectItem>
                      <SelectItem value="content">Content Creation</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="team-emails">
                    Invite Team Members (Optional)
                  </Label>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      Enter email addresses separated by commas
                    </span>
                  </div>
                  <Textarea
                    id="team-emails"
                    placeholder="colleague1@example.com, colleague2@example.com"
                    value={teamEmails}
                    onChange={(e) => setTeamEmails(e.target.value)}
                    className="h-20"
                  />
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="biggest-challenge">
                    Biggest Task Management Challenge
                  </Label>
                  <Select
                    value={biggestChallenge}
                    onValueChange={setBiggestChallenge}
                  >
                    <SelectTrigger id="biggest-challenge">
                      <SelectValue placeholder="Select your biggest challenge" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="prioritizing">
                        Prioritizing tasks
                      </SelectItem>
                      <SelectItem value="deadlines">
                        Meeting deadlines
                      </SelectItem>
                      <SelectItem value="collaboration">
                        Collaborating effectively
                      </SelectItem>
                      <SelectItem value="tracking">
                        Tracking progress
                      </SelectItem>
                      <SelectItem value="overload">
                        Information overload
                      </SelectItem>
                      <SelectItem value="focus">Staying focused</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Preferred Task View</Label>
                  <RadioGroup
                    value={preferredView}
                    onValueChange={setPreferredView}
                  >
                    <div className="grid grid-cols-3 gap-4">
                      <div className="flex flex-col items-center space-y-2 rounded-md border p-3 hover:bg-muted/50">
                        <RadioGroupItem
                          value="list"
                          id="list"
                          className="sr-only"
                        />
                        <LayoutDashboard className="h-6 w-6" />
                        <Label
                          htmlFor="list"
                          className="text-center text-sm font-medium"
                        >
                          List View
                        </Label>
                      </div>
                      <div className="flex flex-col items-center space-y-2 rounded-md border p-3 hover:bg-muted/50">
                        <RadioGroupItem
                          value="kanban"
                          id="kanban"
                          className="sr-only"
                        />
                        <FileStack className="h-6 w-6" />
                        <Label
                          htmlFor="kanban"
                          className="text-center text-sm font-medium"
                        >
                          Kanban Board
                        </Label>
                      </div>
                      <div className="flex flex-col items-center space-y-2 rounded-md border p-3 hover:bg-muted/50">
                        <RadioGroupItem
                          value="calendar"
                          id="calendar"
                          className="sr-only"
                        />
                        <Calendar className="h-6 w-6" />
                        <Label
                          htmlFor="calendar"
                          className="text-center text-sm font-medium"
                        >
                          Calendar
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Current Tools Being Replaced/Used Alongside</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: "trello", label: "Trello" },
                      { id: "asana", label: "Asana" },
                      { id: "jira", label: "Jira" },
                      { id: "notion", label: "Notion" },
                      { id: "google-tasks", label: "Google Tasks" },
                      { id: "spreadsheets", label: "Spreadsheets" },
                      { id: "paper", label: "Pen & Paper" },
                      { id: "other", label: "Other" },
                    ].map((tool) => (
                      <div
                        key={tool.id}
                        className="flex items-center space-x-2 rounded-md border p-2 hover:bg-muted/50"
                      >
                        <Checkbox
                          id={tool.id}
                          checked={currentTools.includes(tool.id)}
                          onCheckedChange={() =>
                            handleCurrentToolToggle(tool.id)
                          }
                        />
                        <Label htmlFor={tool.id}>{tool.label}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>
                    When are you most productive? (Select all that apply)
                  </Label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: "morning", label: "Early morning" },
                      { id: "midday", label: "Mid-day" },
                      { id: "afternoon", label: "Afternoon" },
                      { id: "evening", label: "Evening" },
                    ].map((time) => (
                      <div
                        key={time.id}
                        className="flex items-center space-x-2 rounded-md border p-2 hover:bg-muted/50"
                      >
                        <Checkbox
                          id={time.id}
                          checked={productivityPeaks.includes(time.id)}
                          onCheckedChange={() =>
                            handleProductivityPeakToggle(time.id)
                          }
                        />
                        <Label htmlFor={time.id}>{time.label}</Label>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="rounded-lg border p-3 bg-secondary/5 mb-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-secondary" />
                    <span className="font-medium">Why Connect Your Tools?</span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Connecting your existing tools helps TaskAI provide smarter
                    scheduling, avoid conflicts, and integrate seamlessly with
                    your workflow.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-secondary" />
                    Calendar Integration
                  </Label>
                  <p className="text-xs text-muted-foreground mb-2">
                    Connect your calendar for smart scheduling that avoids
                    conflicts
                  </p>
                  <Select
                    value={calendarIntegration}
                    onValueChange={setCalendarIntegration}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select calendar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="google">Google Calendar</SelectItem>
                      <SelectItem value="outlook">Outlook Calendar</SelectItem>
                      <SelectItem value="apple">Apple Calendar</SelectItem>
                      <SelectItem value="none">None / Skip</SelectItem>
                    </SelectContent>
                  </Select>
                  {calendarIntegration && calendarIntegration !== "none" && (
                    <Button variant="outline" className="w-full mt-2">
                      Connect{" "}
                      {calendarIntegration === "google"
                        ? "Google"
                        : calendarIntegration === "outlook"
                          ? "Outlook"
                          : "Apple"}{" "}
                      Calendar
                    </Button>
                  )}
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4 text-secondary" />
                    Communication Tool
                  </Label>
                  <p className="text-xs text-muted-foreground mb-2">
                    Connect your team communication platform for notifications
                    and task creation
                  </p>
                  <Select
                    value={communicationTool}
                    onValueChange={setCommunicationTool}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select communication tool" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="slack">Slack</SelectItem>
                      <SelectItem value="teams">Microsoft Teams</SelectItem>
                      <SelectItem value="discord">Discord</SelectItem>
                      <SelectItem value="none">None / Skip</SelectItem>
                    </SelectContent>
                  </Select>
                  {communicationTool && communicationTool !== "none" && (
                    <Button variant="outline" className="w-full mt-2">
                      Connect{" "}
                      {communicationTool === "slack"
                        ? "Slack"
                        : communicationTool === "teams"
                          ? "Microsoft Teams"
                          : "Discord"}
                    </Button>
                  )}
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <FileStack className="h-4 w-4 text-secondary" />
                    File Storage
                  </Label>
                  <p className="text-xs text-muted-foreground mb-2">
                    Connect your file storage for seamless file attachments to
                    tasks
                  </p>
                  <Select value={fileStorage} onValueChange={setFileStorage}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select file storage" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="google-drive">Google Drive</SelectItem>
                      <SelectItem value="dropbox">Dropbox</SelectItem>
                      <SelectItem value="onedrive">OneDrive</SelectItem>
                      <SelectItem value="none">None / Skip</SelectItem>
                    </SelectContent>
                  </Select>
                  {fileStorage && fileStorage !== "none" && (
                    <Button variant="outline" className="w-full mt-2">
                      Connect{" "}
                      {fileStorage === "google-drive"
                        ? "Google Drive"
                        : fileStorage === "dropbox"
                          ? "Dropbox"
                          : "OneDrive"}
                    </Button>
                  )}
                </div>
              </motion.div>
            )}

            {step === 5 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-secondary" />
                    AI Features
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Select which AI features {"you'd"} like to enable:
                  </p>

                  <div className="space-y-2 mt-2">
                    {[
                      {
                        id: "suggestions",
                        label: "Task Suggestions",
                        description: "AI suggests tasks based on your habits",
                      },
                      {
                        id: "prioritization",
                        label: "Auto-Prioritization",
                        description: "AI ranks tasks by urgency & importance",
                      },
                      {
                        id: "deadlines",
                        label: "Smart Deadlines",
                        description:
                          "AI suggests optimal times to complete tasks",
                      },
                      {
                        id: "insights",
                        label: "Productivity Insights",
                        description: "AI analyzes your productivity patterns",
                      },
                    ].map((feature) => (
                      <div
                        key={feature.id}
                        className="flex items-start space-x-2 p-2 rounded-md hover:bg-muted/50 border"
                      >
                        <Checkbox
                          id={feature.id}
                          checked={aiFeatures.includes(feature.id)}
                          onCheckedChange={() =>
                            handleAIFeatureToggle(feature.id)
                          }
                          className="mt-1"
                        />
                        <div>
                          <Label htmlFor={feature.id} className="font-medium">
                            {feature.label}
                          </Label>
                          <p className="text-xs text-muted-foreground">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Key Areas for AI Assistance</Label>
                  <p className="text-xs text-muted-foreground mb-2">
                    What would you like AI to help with most?
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: "prioritize", label: "Help me prioritize" },
                      { id: "durations", label: "Suggest task durations" },
                      { id: "summarize", label: "Summarize project progress" },
                      { id: "breakdown", label: "Break down large tasks" },
                      { id: "schedule", label: "Optimize my schedule" },
                      { id: "reminders", label: "Smart reminders" },
                    ].map((area) => (
                      <div
                        key={area.id}
                        className="flex items-center space-x-2 rounded-md border p-2 hover:bg-muted/50"
                      >
                        <Checkbox
                          id={area.id}
                          checked={aiAssistanceAreas.includes(area.id)}
                          onCheckedChange={() =>
                            handleAIAssistanceAreaToggle(area.id)
                          }
                        />
                        <Label htmlFor={area.id}>{area.label}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="primary-goal">
                    Primary Goal for Using TaskAI
                  </Label>
                  <Select value={primaryGoal} onValueChange={setPrimaryGoal}>
                    <SelectTrigger id="primary-goal">
                      <SelectValue placeholder="Select your primary goal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="organized">
                        Get more organized personally
                      </SelectItem>
                      <SelectItem value="team-productivity">
                        Improve team productivity
                      </SelectItem>
                      <SelectItem value="project-planning">
                        Better project planning
                      </SelectItem>
                      <SelectItem value="deadlines">
                        Never miss a deadline
                      </SelectItem>
                      <SelectItem value="work-life">
                        Better work-life balance
                      </SelectItem>
                      <SelectItem value="collaboration">
                        Enhance team collaboration
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="rounded-lg border p-3 bg-secondary/5">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-secondary" />
                    <span className="font-medium">AI Privacy Note</span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    TaskAI uses your task data to provide personalized
                    suggestions. Your data is never shared with third parties
                    and is processed securely. You can adjust these settings
                    anytime.
                  </p>
                </div>
              </motion.div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <div>
              <Button
                variant="outline"
                onClick={handlePreviousStep}
                disabled={step === 1}
              >
                Back
              </Button>
              {step < totalSteps && (
                <Button variant="ghost" onClick={handleSkip} className="ml-2">
                  Skip this step
                </Button>
              )}
            </div>
            <Button onClick={handleNextStep} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Setting up...
                </>
              ) : step === totalSteps ? (
                <span onClick={handleSubmit}>
                  Complete Setup
                  <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              ) : (
                <>
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
