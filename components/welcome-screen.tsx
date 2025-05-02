"use client";

import { authClient } from "@/lib/auth-client";
import { motion } from "framer-motion";

export function WelcomeScreen() {
  const { data: session } = authClient.useSession();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="welcome-screen flex flex-col items-center justify-center h-full"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white mb-6">
        <div className="h-8 w-8 bg-black rounded-sm"></div>
      </div>

      <h1 className="text-2xl font-medium text-gray-200 mb-2">
        Hi, {session?.user.name.split(" ")[0]}
      </h1>
      <h2 className="text-3xl font-medium text-white mb-4">
        I’m your AI task buddy. Ready to get things done?
      </h2>
    </motion.div>
  );
}
