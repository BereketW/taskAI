"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Loader2, Mail } from "lucide-react";

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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { authClient } from "@/lib/auth-client";

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await authClient.forgetPassword({
        email: email,
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        throw error;
      }

      setResetSent(true);
    } catch (error) {
      console.error(error);
      alert("Failed to send password reset email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (resetSent) {
    return (
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="backdrop-blur-lg bg-white/10 dark:bg-gray-950/30 border-muted/40">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">
                Check your email
              </CardTitle>
              <CardDescription>
                {" We've"} sent a password reset link to{" "}
                <span className="font-medium">{email}</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert className="bg-primary/10 border-primary/20">
                <Mail className="h-4 w-4 text-primary" />
                <AlertDescription>
                  Please check your inbox and click the password reset link to
                  create a new password.
                </AlertDescription>
              </Alert>

              <div className="text-sm text-muted-foreground">
                <p>
                  If you {"don't"} see the email in your inbox, check your spam
                  folder. The link will expire in 24 hours.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-sm text-center text-muted-foreground">
                <Button variant="link" asChild className="h-auto p-0">
                  <Link href="/sign-in" className="inline-flex items-center">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Return to sign in
                  </Link>
                </Button>
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="backdrop-blur-lg bg-white/10 dark:bg-gray-950/30 border-muted/40">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">
              Forgot password
            </CardTitle>
            <CardDescription>
              Enter your email address and {"we'll"} send you a reset link
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <Button className="w-full" type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending reset link...
                  </>
                ) : (
                  <>
                    Send reset link
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-center text-muted-foreground">
              <Button variant="link" asChild className="h-auto p-0">
                <Link href="/sign-in" className="inline-flex items-center">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to sign in
                </Link>
              </Button>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
