"use client";

import { motion } from "framer-motion";
import { Bot } from "lucide-react";

export function MessageSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="flex justify-start"
    >
      <div className="flex max-w-[80%] items-start gap-3 rounded-lg bg-muted p-3 text-foreground">
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/20">
          <Bot className="h-4 w-4 text-primary" />
        </div>
        <div className="flex-1 space-y-2">
          <div className="flex items-center space-x-2">
            <div
              className="h-2 w-2 rounded-full bg-primary animate-bounce"
              style={{ animationDelay: "0ms" }}
            ></div>
            <div
              className="h-2 w-2 rounded-full bg-primary animate-bounce"
              style={{ animationDelay: "300ms" }}
            ></div>
            <div
              className="h-2 w-2 rounded-full bg-primary animate-bounce"
              style={{ animationDelay: "600ms" }}
            ></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
