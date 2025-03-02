"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Loader2, Sparkles } from "lucide-react";

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

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Step 1 - Personal Info
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");

  // Step 2 - Preferences
  const [workStyle, setWorkStyle] = useState("individual");
  const [productivityPeaks, setProductivityPeaks] = useState<string[]>([]);

  // Step 3 - AI Features
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

  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        window.location.href = "/dashboard";
      }, 1500);
    }
  };

  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  return (
    <div className="w-full max-w-md">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="backdrop-blur-lg bg-white/10 dark:bg-gray-950/30 border-muted/40">
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-bold">
                Set up your account
              </CardTitle>
              <div className="text-sm text-muted-foreground">
                Step {step} of 3
              </div>
            </div>
            <CardDescription>
              {step === 1 && "Tell us a bit about yourself"}
              {step === 2 && "Customize your productivity preferences"}
              {step === 3 && "Configure AI features to enhance your experience"}
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
                  <Label className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-secondary" />
                    AI Features
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Select which AI features you'd like to enable:
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
            <Button
              variant="outline"
              onClick={handlePreviousStep}
              disabled={step === 1}
            >
              Back
            </Button>
            <Button onClick={handleNextStep} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Setting up...
                </>
              ) : step === 3 ? (
                <>
                  Complete Setup
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
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
