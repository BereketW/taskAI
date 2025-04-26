"use client";

import { motion } from "framer-motion";

export function MessageSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="flex justify-start mb-6"
    >
      <div className="flex max-w-[85%] gap-3">
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white">
          <div className="h-5 w-5 bg-black rounded-sm"></div>
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-medium text-muted-foreground">
              Sense AI
            </span>
            <span className="text-xs text-muted-foreground">
              {new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>

          <div className="message-bubble ai-message">
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
      </div>
    </motion.div>
  );
}
