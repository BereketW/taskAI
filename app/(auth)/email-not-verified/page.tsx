"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { AlertCircle, ArrowLeft, Loader2, Mail, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { authClient } from "@/lib/auth-client";

export default function EmailNotVerifiedPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const {
    data: session,
    isPending, //loading state
    error, //error object
    refetch, //refetch the session
  } = authClient.useSession();
  const handleResendVerification = async () => {
    setIsLoading(true);
    try {
      //   if (!session?.user?.email) {
      //     throw new Error("No email found");
      //   }

      const { data, error } = await authClient.sendVerificationEmail({
        email: "anonytempo5@gmail.com",
        // email: session?.user.email,
        callbackURL: "/verify-email",
      });

      setShowSuccess(true);
      // Hide success message after 5 seconds
      setTimeout(() => setShowSuccess(false), 5000);
    } catch (error) {
      console.error(error);
      alert("Failed to resend verification email. Please try again.");
    } finally {
      setIsLoading(false);
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
            <CardTitle className="text-2xl font-bold">
              Email Not Verified
            </CardTitle>
            <CardDescription>
              Please verify your email address to access all features
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert
              variant="destructive"
              className="border-destructive/30 bg-destructive/10"
            >
              <AlertCircle className="h-4 w-4 text-destructive" />
              <AlertDescription>
                Your email address has not been verified. Please check your
                inbox for a verification link.
              </AlertDescription>
            </Alert>

            {showSuccess && (
              <Alert className="border-primary/30 bg-primary/10">
                <Mail className="h-4 w-4 text-primary" />
                <AlertDescription>
                  Verification email sent! Please check your inbox and spam
                  folder.
                </AlertDescription>
              </Alert>
            )}

            <div className="rounded-lg border p-4 space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Mail className="h-4 w-4" />
                Why verify your email?
              </div>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside ml-4">
                <li>Access all features of TaskAI</li>
                <li>Receive important notifications</li>
                <li>Secure your account</li>
                <li>Collaborate with team members</li>
              </ul>
            </div>

            <Button
              className="w-full"
              onClick={handleResendVerification}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending verification email...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Resend Verification Email
                </>
              )}
            </Button>
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
