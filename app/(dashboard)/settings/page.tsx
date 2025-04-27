"use client";

import { useState } from "react";
import {
  Globe,
  Lock,
  Moon,
  Settings,
  Sparkles,
  Sun,
  User,
  Users,
  Calendar,
  MessageSquare,
  FileBox,
  LayoutDashboard,
  Target,
  Briefcase,
  Laptop,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { authClient } from "@/lib/auth-client";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

export default function SettingsPage() {
  const { toast } = useToast();
  const [theme, setTheme] = useState("system");
  const [language, setLanguage] = useState("en");
  const { data: session } = authClient.useSession();

  // Account Setup State
  const [jobTitle, setJobTitle] = useState("Product Manager");
  const [company, setCompany] = useState("Acme Inc.");
  const [workStyle, setWorkStyle] = useState("individual");
  const [teamSize, setTeamSize] = useState("2-5");
  const [roleInTeam, setRoleInTeam] = useState("manager");
  const [workType, setWorkType] = useState("software");
  const [taskView, setTaskView] = useState("list");
  const [taskChallenge, setTaskChallenge] = useState("prioritizing");
  const [currentTools, setCurrentTools] = useState<string[]>(["spreadsheets"]);
  const [productivityPeaks, setProductivityPeaks] = useState<string[]>([]);
  const [aiFeatures, setAiFeatures] = useState<string[]>([
    "suggestions",
    "prioritization",
    "insights",
  ]);
  const [aiAssistance, setAiAssistance] = useState<string[]>(["prioritize"]);
  const [primaryGoal, setPrimaryGoal] = useState("organize");
  const [inviteEmails, setInviteEmails] = useState("");

  const handleProductivityPeakToggle = (value: string) => {
    setProductivityPeaks(
      productivityPeaks.includes(value)
        ? productivityPeaks.filter((peak) => peak !== value)
        : [...productivityPeaks, value]
    );
  };

  const handleAIFeatureToggle = (value: string) => {
    setAiFeatures(
      aiFeatures.includes(value)
        ? aiFeatures.filter((feature) => feature !== value)
        : [...aiFeatures, value]
    );
  };

  const handleAIAssistanceToggle = (value: string) => {
    setAiAssistance(
      aiAssistance.includes(value)
        ? aiAssistance.filter((area) => area !== value)
        : [...aiAssistance, value]
    );
  };

  const handleCurrentToolsToggle = (value: string) => {
    setCurrentTools(
      currentTools.includes(value)
        ? currentTools.filter((tool) => tool !== value)
        : [...currentTools, value]
    );
  };

  const handleSaveChanges = () => {
    toast({
      title: "Settings Updated",
      description: "Your changes have been saved successfully.",
    });
  };

  const handleInviteTeam = () => {
    if (inviteEmails.trim()) {
      toast({
        title: "Team Invitations Sent",
        description:
          "Invitations have been sent to the provided email addresses.",
      });
      setInviteEmails("");
    }
  };

  const handleConnectCalendar = () => {
    toast({
      title: "Calendar Connected",
      description: "Your calendar has been successfully connected.",
    });
  };

  const handleConnectCommunication = () => {
    toast({
      title: "Communication Tool Connected",
      description: "Your communication tool has been successfully connected.",
    });
  };

  const handleConnectStorage = () => {
    toast({
      title: "Storage Connected",
      description: "Your file storage has been successfully connected.",
    });
  };

  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>
      </div>

      <Tabs defaultValue="account" className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-6">
          <TabsTrigger value="account">
            <User className="mr-2 h-4 w-4" />
            Account
          </TabsTrigger>
          <TabsTrigger value="team">
            <Users className="mr-2 h-4 w-4" />
            Team
          </TabsTrigger>
          <TabsTrigger value="preferences">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Preferences
          </TabsTrigger>
          <TabsTrigger value="integrations">
            <Calendar className="mr-2 h-4 w-4" />
            Integrations
          </TabsTrigger>
          <TabsTrigger value="ai">
            <Sparkles className="mr-2 h-4 w-4" />
            AI Features
          </TabsTrigger>
          <TabsTrigger value="security">
            <Lock className="mr-2 h-4 w-4" />
            Security
          </TabsTrigger>
        </TabsList>

        <TabsContent value="account" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>
                Update your personal information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage
                      src={session?.user.image || "/placeholder.svg"}
                    />
                    <AvatarFallback>
                      {session?.user.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <Button variant="outline">Change Avatar</Button>
                </div>
                <Separator />
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First name</Label>
                      <Input
                        defaultValue={session?.user.name?.split(" ")[0]}
                        id="firstName"
                        placeholder="John"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last name</Label>
                      <Input
                        defaultValue={session?.user.name?.split(" ")[1]}
                        id="lastName"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue={session?.user.email}
                      placeholder="john@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea id="bio" placeholder="Tell us about yourself" />
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={handleSaveChanges}>Save Changes</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Professional Information</CardTitle>
              <CardDescription>Update your work details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="jobTitle">Job Title</Label>
                  <Input
                    id="jobTitle"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="Product Manager"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company/Organization</Label>
                  <Input
                    id="company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Acme Inc."
                  />
                </div>
                <div className="space-y-2">
                  <Label>Primary Goal for Using TaskMaster</Label>
                  <Select value={primaryGoal} onValueChange={setPrimaryGoal}>
                    <SelectTrigger>
                      <Target className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Select your primary goal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="organize">
                        Get more organized personally
                      </SelectItem>
                      <SelectItem value="productivity">
                        Improve team productivity
                      </SelectItem>
                      <SelectItem value="planning">
                        Better project planning
                      </SelectItem>
                      <SelectItem value="deadlines">
                        Never miss a deadline
                      </SelectItem>
                      <SelectItem value="collaboration">
                        Enhance team collaboration
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={handleSaveChanges}>Save Changes</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>App Preferences</CardTitle>
              <CardDescription>Manage your app preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Language</Label>
                    <p className="text-sm text-muted-foreground">
                      Select your preferred language
                    </p>
                  </div>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger className="w-[180px]">
                      <Globe className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Time Zone</Label>
                    <p className="text-sm text-muted-foreground">
                      Set your local time zone
                    </p>
                  </div>
                  <Select defaultValue="utc">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utc">UTC</SelectItem>
                      <SelectItem value="est">EST</SelectItem>
                      <SelectItem value="pst">PST</SelectItem>
                      <SelectItem value="cet">CET</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Theme Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Select your preferred theme
                    </p>
                  </div>
                  <Select value={theme} onValueChange={setTheme}>
                    <SelectTrigger className="w-[180px]">
                      {theme === "light" ? (
                        <Sun className="mr-2 h-4 w-4" />
                      ) : theme === "dark" ? (
                        <Moon className="mr-2 h-4 w-4" />
                      ) : (
                        <Settings className="mr-2 h-4 w-4" />
                      )}
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Settings</CardTitle>
              <CardDescription>
                Configure your team and collaboration preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Team Size</Label>
                  <RadioGroup value={teamSize} onValueChange={setTeamSize}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="just-me" id="just-me" />
                      <Label htmlFor="just-me">Just me</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="2-5" id="2-5" />
                      <Label htmlFor="2-5">2-5 people</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="6-10" id="6-10" />
                      <Label htmlFor="6-10">6-10 people</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="11+" id="11+" />
                      <Label htmlFor="11+">11+ people</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Your Role in the Team</Label>
                  <RadioGroup value={roleInTeam} onValueChange={setRoleInTeam}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="manager" id="manager" />
                      <Label htmlFor="manager">Team Lead/Manager</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="member" id="member" />
                      <Label htmlFor="member">Team Member</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="solo" id="solo" />
                      <Label htmlFor="solo">Solo User</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>How do you typically work?</Label>
                  <RadioGroup value={workStyle} onValueChange={setWorkStyle}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="individual" id="individual" />
                      <Label htmlFor="individual">Individual contributor</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="team" id="team" />
                      <Label htmlFor="team">Team-based work</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="hybrid" id="hybrid" />
                      <Label htmlFor="hybrid">Hybrid (both)</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Primary Type of Work/Projects</Label>
                  <Select value={workType} onValueChange={setWorkType}>
                    <SelectTrigger>
                      <Briefcase className="mr-2 h-4 w-4" />
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
                      <SelectItem value="research">
                        Academic Research
                      </SelectItem>
                      <SelectItem value="content">Content Creation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <Label>Invite Team Members</Label>
                <p className="text-sm text-muted-foreground">
                  Invite your team members to collaborate on tasks and projects
                </p>
                <div className="space-y-2">
                  <Textarea
                    placeholder="Enter email addresses (separated by commas)"
                    value={inviteEmails}
                    onChange={(e) => setInviteEmails(e.target.value)}
                  />
                  <Button onClick={handleInviteTeam} className="w-full">
                    <Users className="mr-2 h-4 w-4" />
                    Send Invitations
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
              <CardDescription>
                Manage your team members and their permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md border">
                  <div className="flex items-center justify-between p-4">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage
                          src={session?.user.image || "/placeholder.svg"}
                        />
                        <AvatarFallback>
                          {session?.user.name?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{session?.user.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {session?.user.email}
                        </p>
                      </div>
                    </div>
                    <Badge>Owner</Badge>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground text-center">
                  No other team members yet. Invite them above to get started.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Task Management Preferences</CardTitle>
              <CardDescription>
                Customize how you manage and view your tasks
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Preferred Task View</Label>
                  <RadioGroup value={taskView} onValueChange={setTaskView}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="list" id="list-view" />
                      <Label htmlFor="list-view">List View</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="kanban" id="kanban-view" />
                      <Label htmlFor="kanban-view">Kanban Board</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="calendar" id="calendar-view" />
                      <Label htmlFor="calendar-view">Calendar View</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Biggest Task Management Challenge</Label>
                  <Select
                    value={taskChallenge}
                    onValueChange={setTaskChallenge}
                  >
                    <SelectTrigger>
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
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Current Tools Being Replaced/Used Alongside</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: "trello", label: "Trello" },
                      { id: "asana", label: "Asana" },
                      { id: "jira", label: "Jira" },
                      { id: "gtasks", label: "Google Tasks" },
                      { id: "spreadsheets", label: "Spreadsheets" },
                      { id: "paper", label: "Pen & Paper" },
                    ].map((tool) => (
                      <div
                        key={tool.id}
                        className="flex items-center space-x-2"
                      >
                        <Checkbox
                          id={`tool-${tool.id}`}
                          checked={currentTools.includes(tool.id)}
                          onCheckedChange={() =>
                            handleCurrentToolsToggle(tool.id)
                          }
                        />
                        <Label htmlFor={`tool-${tool.id}`}>{tool.label}</Label>
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
                        className="flex items-center space-x-2"
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
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Choose how you want to be notified
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive updates via email
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive browser notifications
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Task Reminders</Label>
                    <p className="text-sm text-muted-foreground">
                      Get reminded about upcoming tasks
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Team Updates</Label>
                    <p className="text-sm text-muted-foreground">
                      Notifications about team activity
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Calendar Integration</CardTitle>
              <CardDescription>
                Connect your calendar for smart scheduling
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Calendar Integration</p>
                      <p className="text-sm text-muted-foreground">
                        Connect your calendar for smart scheduling
                        recommendations
                      </p>
                    </div>
                  </div>
                  <Button onClick={handleConnectCalendar}>Connect</Button>
                </div>
              </div>
              <div className="text-sm text-muted-foreground">
                <p>
                  Connecting your calendar helps our AI understand your
                  availability and schedule tasks more effectively.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Communication Tools</CardTitle>
              <CardDescription>
                Connect your communication platforms
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <MessageSquare className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Communication Tools</p>
                      <p className="text-sm text-muted-foreground">
                        Connect Slack, Microsoft Teams, or other communication
                        tools
                      </p>
                    </div>
                  </div>
                  <Button onClick={handleConnectCommunication}>Connect</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>File Storage</CardTitle>
              <CardDescription>
                Connect your file storage services
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <FileBox className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">File Storage</p>
                      <p className="text-sm text-muted-foreground">
                        Connect Google Drive, Dropbox, or OneDrive
                      </p>
                    </div>
                  </div>
                  <Button onClick={handleConnectStorage}>Connect</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                AI Features
              </CardTitle>
              <CardDescription>
                Configure your AI feature preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-base font-medium">
                    Enable AI Features
                  </Label>
                  <p className="text-sm text-muted-foreground mb-2">
                    Select which AI features you want to enable:
                  </p>

                  <div className="space-y-2">
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
                        className="flex items-start space-x-2 p-2 rounded-md hover:bg-muted/50"
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

                <Separator />

                <div className="space-y-2">
                  <Label className="text-base font-medium">
                    Key Areas for AI Assistance
                  </Label>
                  <p className="text-sm text-muted-foreground mb-2">
                    What would you like AI to help you with most?
                  </p>

                  <div className="space-y-2">
                    {[
                      {
                        id: "prioritize",
                        label: "Help me prioritize tasks",
                        description:
                          "AI will suggest which tasks to focus on first",
                      },
                      {
                        id: "durations",
                        label: "Suggest task durations",
                        description:
                          "AI will estimate how long tasks might take",
                      },
                      {
                        id: "summarize",
                        label: "Summarize project progress",
                        description:
                          "AI will provide summaries of overall progress",
                      },
                      {
                        id: "breakdown",
                        label: "Break down large tasks",
                        description:
                          "AI will help divide complex tasks into smaller steps",
                      },
                    ].map((area) => (
                      <div
                        key={area.id}
                        className="flex items-start space-x-2 p-2 rounded-md hover:bg-muted/50"
                      >
                        <Checkbox
                          id={`ai-area-${area.id}`}
                          checked={aiAssistance.includes(area.id)}
                          onCheckedChange={() =>
                            handleAIAssistanceToggle(area.id)
                          }
                          className="mt-1"
                        />
                        <div>
                          <Label
                            htmlFor={`ai-area-${area.id}`}
                            className="font-medium"
                          >
                            {area.label}
                          </Label>
                          <p className="text-xs text-muted-foreground">
                            {area.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-lg border p-3 bg-secondary/5">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-secondary" />
                  <span className="font-medium">AI Privacy Note</span>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Your AI preferences help us provide personalized suggestions.
                  You can adjust these settings anytime in your account
                  settings. We prioritize your privacy and only use your data to
                  improve your experience.
                </p>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSaveChanges}>Save AI Preferences</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>Change your password</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    placeholder="Enter current password"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    placeholder="Enter new password"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm new password"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={handleSaveChanges}>Update Password</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
              <CardDescription>
                Add an extra layer of security to your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable two-factor authentication for enhanced security
                  </p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Login Sessions</CardTitle>
              <CardDescription>
                Manage your active login sessions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-md border">
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                      <Laptop className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Current Session</p>
                      <p className="text-xs text-muted-foreground">
                        Started: Today at {new Date().toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  <Badge>Active</Badge>
                </div>
              </div>
              <div className="flex justify-end">
                <Button variant="destructive">Sign Out All Devices</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
