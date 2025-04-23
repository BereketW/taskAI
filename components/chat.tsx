"use client";

import type React from "react";

import { useChat } from "@ai-sdk/react";
import { useRef, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Send, Bot, Sparkles, X, StopCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChatMessage } from "@/components/chat-message";
import { MessageSkeleton } from "@/components/message-skeleton";
import { cn } from "@/lib/utils";

export default function Chat() {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const {
    status,
    stop,
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
  } = useChat();

  // Scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    try {
      await handleSubmit();
    } catch (e: any) {
      console.error("Submission error:", e);
    }
  };

  return (
    <div className="flex h-[80vh] overflow-scroll flex-col">
      <div className="flex items-center justify-between   p-4">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Bot className="h-6 w-6 text-primary" />
            <span className="absolute -right-1 -top-1 flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex h-3 w-3 rounded-full bg-primary"></span>
            </span>
          </div>
          <h1 className="font-pacifico text-lg font-semibold text-foreground">
            Elegant AI
          </h1>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground">
          <Sparkles className="h-3 w-3 text-primary" />
          <span>Powered by GPT-4o</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-scroll p-4 scrollbar-thin">
        {error && (
          <div className="mb-4 rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-destructive">
            <p className="text-sm font-medium">
              Error: {error.message || error}
            </p>
          </div>
        )}

        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <div className="mb-4 rounded-full bg-primary/10 p-4">
              <Bot className="h-8 w-8 text-primary" />
            </div>
            <h2 className="mb-2 text-xl font-semibold text-foreground">
              How can I help you today?
            </h2>
            <p className="max-w-md text-muted-foreground">
              Ask me anything and I'll do my best to assist you with thoughtful
              answers.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence initial={false}>
              {messages.map((message, index) => (
                <ChatMessage key={message.id || index} message={message} />
              ))}
              {isLoading && <MessageSkeleton />}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      <div className="border-t border-border bg-card/80 p-4">
        <form onSubmit={handleFormSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Type your message..."
            className="form-input-elegant"
            disabled={isLoading}
          />
          {input && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="flex-shrink-0"
              onClick={() =>
                handleInputChange({ target: { value: "" } } as any)
              }
            >
              <X className="h-4 w-4" />
            </Button>
          )}
          <div className="flex items-center gap-2">
            <Button
              type="submit"
              disabled={!(status === "streaming" || status === "submitted")}
              onClick={stop}
              className={cn(
                "bg-red-500",
                (!input.trim() || isLoading) && "opacity-50",
                !(status === "streaming" || status === "submitted") && "hidden"
              )}
            >
              <StopCircle className="h-4 w-4 text-white" />
            </Button>
            <Button
              disabled={isLoading || !input.trim()}
              className={cn(
                "btn-gradient btn-primary-gradient",
                (!input.trim() || isLoading) && "opacity-50"
              )}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
