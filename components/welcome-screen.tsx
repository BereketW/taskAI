"use client";

import { motion } from "framer-motion";

export function WelcomeScreen() {
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

      <h1 className="text-2xl font-medium text-gray-200 mb-2">Hi, Anonymous</h1>
      <h2 className="text-3xl font-medium text-white mb-4">
        Can I help you with anything?
      </h2>

      <p className="text-muted-foreground max-w-md text-center">
        Ready to assist you with anything you need? From answering questions,
        generation to providing recommendations.
        {" Let's"} get started!
      </p>
    </motion.div>
  );
}
