"use client";

import { useState } from "react";
import Link from "next/link";
// import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { authClient } from "@/lib/auth-client";
// import {
//   createDefaultTaskList,
//   createDefaultWorkspace,
// } from "@/lib/defaultworkspace";

export default function VerifyEmailPage() {
  // const searchParams = useSearchParams();
  // const token = searchParams.get("token");

  const [verificationState] = useState<"loading" | "success" | "error">(
    "loading"
  );
  // function handleVerificationState() {
  //   setVerificationState("loading");
  // }
  // useEffect(() => {
  //   const verifyEmail = async () => {
  //     if (!token) {
  //       setVerificationState("error");
  //       return;
  //     }

  //     try {
  //       const { data, error } = await authClient.auth.verifyEmail({ token });

  //       if (error) {
  //         setVerificationState("error");
  //         return;
  //       }

  //       // Create default workspace and task list after successful verification
  //       if (data?.user?.id) {
  //         await createDefaultTaskList(data.user.id);
  //         await createDefaultWorkspace(data.user.id);
  //       }

  //       setVerificationState("success");
  //     } catch (error) {
  //       console.error(error);
  //       setVerificationState("error");
  //     }
  //   };

  //   verifyEmail();
  // }, [token]);

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
              Email Verification
            </CardTitle>
            <CardDescription>
              {verificationState === "loading" &&
                "Verifying your email address..."}
              {verificationState === "success" &&
                "Your email has been successfully verified!"}
              {verificationState === "error" &&
                "There was a problem verifying your email."}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-8">
            {verificationState === "loading" && (
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-16 w-16 animate-spin text-primary" />
                <p className="text-center text-muted-foreground">
                  Please wait while we verify your email address...
                </p>
              </div>
            )}

            {verificationState === "success" && (
              <div className="flex flex-col items-center gap-4">
                <div className="rounded-full bg-green-100 p-3 dark:bg-green-900/20">
                  <CheckCircle2 className="h-16 w-16 text-green-600 dark:text-green-500" />
                </div>
                <div className="text-center space-y-2">
                  <p className="font-medium">Your email has been verified</p>
                  <p className="text-sm text-muted-foreground">
                    You can now sign in to your account and start using TaskAI.
                  </p>
                </div>
              </div>
            )}

            {verificationState === "error" && (
              <div className="flex flex-col items-center gap-4">
                <div className="rounded-full bg-red-100 p-3 dark:bg-red-900/20">
                  <XCircle className="h-16 w-16 text-red-600 dark:text-red-500" />
                </div>
                <div className="text-center space-y-2">
                  <p className="font-medium">Verification failed</p>
                  <p className="text-sm text-muted-foreground">
                    The verification link may be invalid or expired. Please try
                    again or request a new verification email.
                  </p>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            {verificationState === "success" && (
              <Button asChild className="w-full">
                <Link href="/sign-in">Sign in to your account</Link>
              </Button>
            )}

            {verificationState === "error" && (
              <div className="space-y-2 w-full">
                <Button asChild variant="outline" className="w-full">
                  <Link href="/sign-up">Return to sign up</Link>
                </Button>
                <Button asChild className="w-full">
                  <Link href="/sign-in">Go to sign in</Link>
                </Button>
              </div>
            )}

            {verificationState === "loading" && (
              <Button disabled className="w-full">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Verifying...
              </Button>
            )}
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
