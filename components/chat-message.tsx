/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import type { Message } from "ai";
import type { Error } from "ai";
import { motion } from "framer-motion";
import { ThumbsUp, ThumbsDown, Copy, Pencil } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import { CopyButton } from "./copy-button";
import { useState, useRef, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Image from "next/image";

interface ChatMessageProps {
  message: Message;
  error: Error;
}

export function ChatMessage({ message, error }: ChatMessageProps) {
  const isUser = message.role === "user";
  const { data: session } = authClient.useSession();
  const user = {
    name: session?.user.name,
    image: session?.user.image,
  };

  const codeBlockCount = useRef(0);
  const hasImage =
    message.content.includes("![") || message.content.includes("<img");

  // Reset code block count when message changes
  useEffect(() => {
    codeBlockCount.current = 0;
  }, [message.content]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-10  relative group`}
    >
      {!isUser && (
        <div className="reaction-panel opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="reaction-button" aria-label="Like">
            <ThumbsUp className="h-4 w-4" />
          </button>
          <button className="reaction-button" aria-label="Dislike">
            <ThumbsDown className="h-4 w-4" />
          </button>
          <button className="reaction-button" aria-label="Copy">
            <Copy className="h-4 w-4" />
          </button>
        </div>
      )}

      <div className="flex max-w-[85%] gap-3 overflow-hidden">
        <div
          className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${
            isUser ? "bg-primary text-white" : ""
          }`}
        >
          {isUser ? (
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.image} alt="User" />
              <AvatarFallback>{user.name[0]}</AvatarFallback>
            </Avatar>
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
              <div className="h-5 w-5 rounded-full bg-gradient-to-r from-indigo-300 to-rose-300" />
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-medium text-muted-foreground">
              {isUser ? user.name : "Task AI"}
            </span>
            <span className="text-xs text-muted-foreground">
              {new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>

          <div
            className={`message-bubble ${isUser ? "user-message " : "ai-message bg-none"} overflow-hidden`}
          >
            {isUser ? (
              <>
                <p className="whitespace-pre-wrap">{message.content}</p>
                {error && (
                  <div className="m-4 rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-destructive">
                    <p className="text-sm font-medium">Error: {error}</p>
                  </div>
                )}
              </>
            ) : (
              <div className="markdown-body">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeRaw, rehypeHighlight]}
                  components={{
                    h1: ({ node, ...props }) => (
                      <h1 className="text-xl font-bold mt-4 mb-2" {...props} />
                    ),
                    h2: ({ node, ...props }) => (
                      <h2 className="text-lg font-bold mt-3 mb-2" {...props} />
                    ),
                    h3: ({ node, ...props }) => (
                      <h3 className="text-md font-bold mt-3 mb-1" {...props} />
                    ),
                    h4: ({ node, ...props }) => (
                      <h4
                        className="text-base font-bold mt-2 mb-1"
                        {...props}
                      />
                    ),
                    p: ({ node, ...props }) => (
                      <p className="mb-2" {...props} />
                    ),
                    ul: ({ node, ...props }) => (
                      <ul className="list-disc pl-5 mb-2" {...props} />
                    ),
                    ol: ({ node, ...props }) => (
                      <ol className="list-decimal pl-5 mb-2" {...props} />
                    ),
                    li: ({ node, ...props }) => (
                      <li className="mb-1" {...props} />
                    ),
                    a: ({ node, ...props }) => (
                      <a
                        className="text-primary hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                        {...props}
                      />
                    ),
                    blockquote: ({ node, ...props }) => (
                      <blockquote
                        className="border-l-4 border-primary/30 pl-4 italic my-2"
                        {...props}
                      />
                    ),
                    code: ({ node, inline, className, children, ...props }) => {
                      const match = /language-(\w+)/.exec(className || "");
                      const language = match ? match[1] : "";
                      const codeContent = String(children).replace(/\n$/, "");

                      if (inline) {
                        return (
                          <code
                            className="bg-primary/10 text-primary px-1 py-0.5 rounded text-sm font-mono"
                            {...props}
                          >
                            {children}
                          </code>
                        );
                      }

                      // Store code content for copy button
                      const index = codeBlockCount.current++;
                      setCodeBlocks((prev) => ({
                        ...prev,
                        [index]: codeContent,
                      }));

                      return (
                        <div className="relative my-2 code-block">
                          <div className="absolute top-0 right-0 bg-muted-foreground/20 text-xs px-2 py-1 rounded-bl font-mono">
                            {language || "code"}
                          </div>
                          <CopyButton text={codeContent} />
                          <pre className="!mt-0 !mb-0">
                            <code
                              className={`${className} block bg-black/80 p-3 pt-8 rounded-md text-xs overflow-x-auto`}
                              {...props}
                            >
                              {children}
                            </code>
                          </pre>
                        </div>
                      );
                    },
                    table: ({ node, ...props }) => (
                      <div className="overflow-x-auto my-2">
                        <table
                          className="min-w-full divide-y divide-border"
                          {...props}
                        />
                      </div>
                    ),
                    thead: ({ node, ...props }) => (
                      <thead className="bg-muted/50" {...props} />
                    ),
                    th: ({ node, ...props }) => (
                      <th
                        className="px-3 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
                        {...props}
                      />
                    ),
                    td: ({ node, ...props }) => (
                      <td className="px-3 py-2 text-sm" {...props} />
                    ),
                    hr: ({ node, ...props }) => (
                      <hr className="my-4 border-border" {...props} />
                    ),
                    img: ({ node, alt, ...props }) => (
                      <div className="image-container">
                        <Image
                          fill
                          className="max-w-full h-auto rounded-lg"
                          alt={alt || ""}
                          {...props}
                        />
                      </div>
                    ),
                  }}
                >
                  {message.content}
                </ReactMarkdown>

                {hasImage && (
                  <button className="image-edit-button">
                    <Pencil className="h-3 w-3" />
                    <span>Edit images</span>
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
