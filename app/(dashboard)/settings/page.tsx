"use client";

import { useState } from "react";
import {
  Bell,
  Globe,
  Lock,
  Moon,
  Palette,
  Settings,
  Sparkles,
  Sun,
  User,
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

export default function SettingsPage() {
  const { toast } = useToast();
  const [theme, setTheme] = useState("system");
  const [language, setLanguage] = useState("en");
  const {
    data: session,
    isPending, //loading state
    error, //error object
    refetch, //refetch the session
  } = authClient.useSession();
  // Account Setup State
  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [jobTitle, setJobTitle] = useState("Product Manager");
  const [company, setCompany] = useState("Acme Inc.");
  const [workStyle, setWorkStyle] = useState("individual");
  const [productivityPeaks, setProductivityPeaks] = useState<string[]>([]);
  const [aiFeatures, setAiFeatures] = useState<string[]>([
    "suggestions",
    "prioritization",
    "insights",
  ]);

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

  const handleSaveChanges = () => {
    toast({
      title: "Settings Updated",
      description: "Your changes have been saved successfully.",
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
        <TabsList>
          <TabsTrigger value="account">
            <User className="mr-2 h-4 w-4" />
            Account
          </TabsTrigger>
          <TabsTrigger value="setup">
            <Settings className="mr-2 h-4 w-4" />
            Account Setup
          </TabsTrigger>
          <TabsTrigger value="appearance">
            <Palette className="mr-2 h-4 w-4" />
            Appearance
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="mr-2 h-4 w-4" />
            Notifications
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
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>{session?.user.name}</AvatarFallback>
                  </Avatar>
                  <Button variant="outline">Change Avatar</Button>
                </div>
                <Separator />
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First name</Label>
                      <Input id="firstName" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last name</Label>
                      <Input id="lastName" placeholder="Doe" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Input id="bio" placeholder="Tell us about yourself" />
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
              <CardTitle>Preferences</CardTitle>
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
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="setup" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Account Setup</CardTitle>
              <CardDescription>
                Configure your account preferences and AI features
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* User Profile Section */}
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="h-20 w-20 rounded-full border-2 border-muted bg-muted/50 p-1">
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-muted">
                      <span className="text-2xl font-semibold text-muted-foreground">
                        {session?.user.name[0]}
                      </span>
                    </div>
                  </div>
                  <Button
                    size="icon"
                    variant="outline"
                    className="absolute -bottom-2 -right-2 h-6 w-6 rounded-full"
                  >
                    <Sparkles className="h-3 w-3" />
                    <span className="sr-only">Update profile picture</span>
                  </Button>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">
                    {session?.user.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {session?.user.email}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="setup-firstName">First name</Label>
                      <Input
                        id="setup-firstName"
                        placeholder="John"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="setup-lastName">Last name</Label>
                      <Input
                        id="setup-lastName"
                        placeholder="Doe"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="setup-email">Email</Label>
                    <Input
                      id="setup-email"
                      type="email"
                      placeholder="john@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="setup-job-title">Job Title</Label>
                  <Input
                    id="setup-job-title"
                    placeholder="Product Manager"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="setup-company">Company/Organization</Label>
                  <Input
                    id="setup-company"
                    placeholder="Acme Inc."
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
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

              <Separator />

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-secondary" />
                    AI Features
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Update your AI feature preferences:
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

                <div className="rounded-lg border p-3 bg-secondary/5">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-secondary" />
                    <span className="font-medium">AI Privacy Note</span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Your AI preferences help us provide personalized
                    suggestions. You can adjust these settings anytime in your
                    account settings.
                  </p>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSaveChanges}>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Theme</CardTitle>
              <CardDescription>Customize the app appearance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
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

        <TabsContent value="notifications" className="space-y-4">
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
        </TabsContent>
      </Tabs>
    </div>
  );
}
