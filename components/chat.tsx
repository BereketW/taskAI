// "use client";

// import type React from "react";

// import { Message, useChat } from "@ai-sdk/react";
// import { useState, useRef, useEffect } from "react";
// import { AnimatePresence } from "framer-motion";
// import { Send, Paperclip, Globe, Eye, MoreHorizontal } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { ChatMessage } from "@/components/chat-message";
// import { MessageSkeleton } from "@/components/message-skeleton";
// import { WelcomeScreen } from "@/components/welcome-screen";
// import { Textarea } from "./ui/textarea";

// export default function Chat({
//   id,
//   initialMessages,
// }: {
//   id?: string | undefined;
//   initialMessages: Message[];
// }) {
//   const [input, setInput] = useState("");
//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const messagesContainerRef = useRef<HTMLDivElement>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [incognito, setIncognito] = useState(false);

//   const {
//     messages,
//     input: chatInput,
//     handleInputChange,
//     handleSubmit,
//     isLoading,
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//     error: chatError,
//   } = useChat({
//     experimental_prepareRequestBody({ messages, id }) {
//       return { message: messages[messages.length - 1], id };
//     },
//     api: "/api/chat",

//     onResponse: (response) => {
//       // Check if the response is ok
//       if (!response.ok) {
//         response
//           .json()
//           .then((data) => {
//             setError(
//               data.error || "An error occurred while fetching the response."
//             );
//           })
//           .catch(() => {
//             setError("An error occurred while fetching the response.");
//           });
//       } else {
//         setError(null);
//       }
//       // Scroll to bottom when a new response starts
//       scrollToBottom();
//     },
//     onError: (error) => {
//       console.error("Chat error:", error);
//       setError(error.message || "An error occurred during the conversation.");
//     },
//     initialMessages,
//     sendExtraMessageFields: true,
//     id,
//   });

//   // Update our local input state when the AI SDK input changes
//   useEffect(() => {
//     setInput(chatInput);
//   }, [chatInput]);

//   // Scroll to bottom function
//   const scrollToBottom = () => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   // Scroll to bottom when messages change
//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const handleFormSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!input.trim()) return;
//     setError(null);
//     handleSubmit(e);
//   };

//   // Auto-resize textarea
//   const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     setInput(e.target.value);
//     handleInputChange(e);

//     // Reset height to auto to get the correct scrollHeight
//     e.target.style.height = "auto";
//     // Set the height to scrollHeight to fit content
//     e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
//   };

//   return (
//     <div className="flex flex-col h-[90vh] overflow-hidden bg-background">
//       <div
//         ref={messagesContainerRef}
//         className="flex-1 overflow-y-auto p-4 pb-6"
//       >
//         {messages.length === 0 ? (
//           <WelcomeScreen />
//         ) : (
//           <div className="py-4">
//             <AnimatePresence initial={false}>
//               {messages.map((message) => (
//                 <ChatMessage key={message.id} message={message} error={error} />
//               ))}
//               {isLoading && <MessageSkeleton />}
//             </AnimatePresence>
//             <div ref={messagesEndRef} />
//           </div>
//         )}
//       </div>

//       <div className="p-4 border-t border-border/20 bg-background">
//         <form onSubmit={handleFormSubmit} className="chat-input">
//           <button type="button" className="chat-input-icon">
//             <Paperclip className="h-5 w-5" />
//           </button>

//           <Textarea
//             value={input}
//             onChange={handleTextareaChange}
//             placeholder="Ask me anything..."
//             className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 flex-1 px-2 min-h-[40px] max-h-[120px] resize-none"
//             disabled={isLoading}
//             rows={1}
//           />

//           <button type="button" className="chat-input-icon">
//             <Globe className="h-5 w-5" />
//           </button>

//           <div className="flex items-center gap-2">
//             <button
//               type="button"
//               className={`chat-input-icon ${incognito ? "text-primary" : ""}`}
//               onClick={() => setIncognito(!incognito)}
//             >
//               <Eye className="h-5 w-5" />
//             </button>

//             <button type="button" className="chat-input-icon">
//               <MoreHorizontal className="h-5 w-5" />
//             </button>

//             <Button
//               type="submit"
//               disabled={isLoading || !input.trim()}
//               className="rounded-full bg-primary hover:bg-primary/90 h-8 w-8 p-0 flex items-center justify-center"
//             >
//               <Send className="h-4 w-4" />
//             </Button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

"use client";

import type { Attachment, UIMessage } from "ai";
import { useChat } from "@ai-sdk/react";
import { useState } from "react";
import useSWR, { useSWRConfig } from "swr";
// import { ChatHeader } from '@/components/chat-header';
// import type { Vote } from '@/lib/db/schema';
import { fetcher, generateUUID } from "@/lib/utils";
import { Artifact } from "./artifact";
import { MultimodalInput } from "./multimodal-input";
import { Messages } from "./messages";
import type { VisibilityType } from "./visibility-selector";
import { useArtifactSelector } from "@/hooks/use-artifact";
import { unstable_serialize } from "swr/infinite";
import { getChatHistoryPaginationKey } from "./sidebar-history";
import { toast } from "./toast";
import { Vote } from "@prisma/client";
// import type { Session } from "next-auth";

export function Chat({
  id,
  initialMessages,
  selectedChatModel,
  // selectedVisibilityType,
  isReadonly,
  // session,
}: {
  id: string;
  initialMessages: Array<UIMessage>;
  selectedChatModel: string;
  // selectedVisibilityType: VisibilityType;
  isReadonly: boolean;
  // session: Session;
}) {
  const { mutate } = useSWRConfig();

  const {
    messages,
    setMessages,
    handleSubmit,
    input,
    setInput,
    append,
    status,
    stop,
    reload,
  } = useChat({
    id,
    initialMessages,
    experimental_throttle: 100,
    sendExtraMessageFields: true,
    generateId: generateUUID,
    experimental_prepareRequestBody: (body) => ({
      id,
      message: body.messages.at(-1),
      selectedChatModel,
    }),
    onFinish: () => {
      mutate(unstable_serialize(getChatHistoryPaginationKey));
    },
    onError: (error) => {
      toast({
        type: "error",
        description: error.message,
      });
    },
  });

  const { data: votes } = useSWR<Array<Vote>>(
    messages.length >= 2 ? `/api/vote?chatId=${id}` : null,
    fetcher
  );

  const [attachments, setAttachments] = useState<Array<Attachment>>([]);
  const isArtifactVisible = useArtifactSelector((state) => state.isVisible);

  return (
    <>
      <div className="flex flex-col min-w-0 h-dvh bg-background">
        {/* <ChatHeader
          chatId={id}
          selectedModelId={selectedChatModel}
          selectedVisibilityType={selectedVisibilityType}
          isReadonly={isReadonly}
          session={session}
        /> */}

        <Messages
          chatId={id}
          status={status}
          votes={votes}
          messages={messages}
          setMessages={setMessages}
          reload={reload}
          isReadonly={isReadonly}
          isArtifactVisible={isArtifactVisible}
        />

        <form className="flex mx-auto px-4 bg-background pb-4 md:pb-6 gap-2 w-full md:max-w-3xl">
          {!isReadonly && (
            <MultimodalInput
              chatId={id}
              input={input}
              setInput={setInput}
              handleSubmit={handleSubmit}
              status={status}
              stop={stop}
              attachments={attachments}
              setAttachments={setAttachments}
              messages={messages}
              setMessages={setMessages}
              append={append}
            />
          )}
        </form>
      </div>

      <Artifact
        chatId={id}
        input={input}
        setInput={setInput}
        handleSubmit={handleSubmit}
        status={status}
        stop={stop}
        attachments={attachments}
        setAttachments={setAttachments}
        append={append}
        messages={messages}
        setMessages={setMessages}
        reload={reload}
        votes={votes}
        isReadonly={isReadonly}
      />
    </>
  );
}
