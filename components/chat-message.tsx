"use client";

import type { Message } from "ai";
import { motion } from "framer-motion";
import { Bot, User } from "lucide-react";
import { Markdown } from "./markdown";

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";
  console.log(message);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`flex max-w-[80%] items-start gap-3 rounded-lg p-3 ${
          isUser
            ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground hover-glow"
            : "bg-muted text-foreground"
        }`}
      >
        <div
          className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${
            isUser ? "bg-primary/20" : "bg-primary/20"
          }`}
        >
          {isUser ? (
            <User className="h-4 w-4 text-primary" />
          ) : (
            <Bot className="h-4 w-4 text-primary" />
          )}
        </div>
        <div className="flex-1">
          <Markdown>{message.content}</Markdown>
        </div>
      </div>
    </motion.div>
  );
}
