"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Github, Loader2 } from "lucide-react";

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
import { authClient } from "@/lib/auth-client";

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleGithubLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const { data, error } = await authClient.signIn.social({
      provider: "github",
      callbackURL: "/dashboard",
    });
    // Simulate API call
    // setTimeout(() => {
    //   setIsLoading(false)
    //   window.location.href = "/dashboard"
    // }, 1500)
  };
  const handleGoogleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const { data, error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
    });
    // Simulate API call
    // setTimeout(() => {
    //   setIsLoading(false)
    //   window.location.href = "/dashboard"
    // }, 1500)
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const { data, error } = await authClient.signIn.email(
      {
        email,
        password,
        callbackURL: "/dashboard",
      },
      {
        onSuccess: (ctx) => {
          setIsLoading(false);
          const authToken = ctx.response.headers.get("set-auth-token"); // get the token from the response headers
          // Store the token securely (e.g., in localStorage)
          localStorage.setItem("bearer_token", authToken);
          console.log(ctx);

          window.location.href = "/dashboard";
        },
        onError: (response) => {
          setIsLoading(false);
          if (response.error.status === 403) {
            window.location.href = "/email-not-verified";
          }
        },
        onRequest: (response) => {
          setIsLoading(true);
        },
      }
    );
    // Simulate API call
    // setTimeout(() => {
    //   setIsLoading(false)
    //   window.location.href = "/dashboard"
    // }, 1500)
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
            <CardTitle className="text-2xl font-bold">Sign in</CardTitle>
            <CardDescription>
              Enter your email and password to access your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <Button
                onClick={handleGithubLogin}
                variant="outline"
                className="w-full"
                type="button"
              >
                <Github className="mr-2 h-4 w-4" />
                Continue with Github
              </Button>
              <Button
                onClick={handleGoogleLogin}
                variant="outline"
                className="w-full"
                type="button"
              >
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                  <path d="M1 1h22v22H1z" fill="none" />
                </svg>
                Continue with Google
              </Button>
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
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
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/forgot-password"
                    className="text-xs text-primary hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button className="w-full" type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-center text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link href="/sign-up" className="text-primary hover:underline">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
