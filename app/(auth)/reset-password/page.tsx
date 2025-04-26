"use client";

import type React from "react";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Check, Loader2, Lock, XCircle } from "lucide-react";

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

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetStatus, setResetStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");

  // Get token from URL
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      setResetStatus("error");
      setErrorMessage(
        "Invalid or missing reset token. Please request a new password reset link."
      );
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      if (!token) {
        throw new Error("Invalid reset token");
      }

      const { error } = await authClient.resetPassword({
        token,
        newPassword: password,
      });

      if (error) {
        throw error;
      }

      setResetStatus("success");

      // Redirect to sign in after 3 seconds
      setTimeout(() => {
        router.push("/sign-in");
      }, 3000);
    } catch (error) {
      console.error(error);
      setResetStatus("error");
      setErrorMessage("Failed to reset password. The link may have expired.");
    } finally {
      setIsLoading(false);
    }
  };

  if (resetStatus === "success") {
    return (
      <Suspense>
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="backdrop-blur-lg bg-white/10 dark:bg-gray-950/30 border-muted/40">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold">
                  Password reset successful
                </CardTitle>
                <CardDescription>
                  Your password has been reset successfully
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col items-center justify-center py-6">
                  <div className="rounded-full bg-green-100 p-3 dark:bg-green-900/20">
                    <Check className="h-10 w-10 text-green-600 dark:text-green-500" />
                  </div>
                  <p className="mt-4 text-center text-muted-foreground">
                    You will be redirected to the sign in page in a few
                    seconds...
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <a href="/sign-in">
                    Sign in now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </Suspense>
    );
  }

  if (resetStatus === "error" && !token) {
    return (
      <Suspense>
        <div className="w-full max-w-md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="backdrop-blur-lg bg-white/10 dark:bg-gray-950/30 border-muted/40">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold">
                  Invalid reset link
                </CardTitle>
                <CardDescription>
                  The password reset link is invalid or has expired
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col items-center justify-center py-6">
                  <div className="rounded-full bg-red-100 p-3 dark:bg-red-900/20">
                    <XCircle className="h-10 w-10 text-red-600 dark:text-red-500" />
                  </div>
                  <p className="mt-4 text-center text-muted-foreground">
                    {errorMessage ||
                      "Please request a new password reset link."}
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <a href="/forgot-password">
                    Request new reset link
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </Suspense>
    );
  }

  return (
    <Suspense>
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="backdrop-blur-lg bg-white/10 dark:bg-gray-950/30 border-muted/40">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">
                Reset password
              </CardTitle>
              <CardDescription>Enter your new password below</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {errorMessage && (
                <Alert variant="destructive">
                  <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
              )}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">New Password</Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Password must be at least 8 characters long
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <Button className="w-full" type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Resetting password...
                    </>
                  ) : (
                    <>
                      Reset password
                      <Lock className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-sm text-center text-muted-foreground">
                <Button variant="link" asChild className="h-auto p-0">
                  <a href="/sign-in">Return to sign in</a>
                </Button>
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </Suspense>
  );
}
// import React from "react";

// export default function page() {
//   return <div>page</div>;
// }
