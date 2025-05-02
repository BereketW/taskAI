/* eslint-disable @typescript-eslint/no-explicit-any */
// import Chat from "@/components/chat";
// import { loadChat } from "@/hooks/chat-store";

// export default async function page(props: { params: Promise<{ id: string }> }) {
//   const { id } = await props.params; // get the chat ID from the URL
//   const messages = await loadChat(id); // load the chat messages
//   return (
//     <main className="flex flex-col items-center justify-center bg-background p-0 h-[90vh] overflow-hidden">
//       <div className="w-[60svw] max-sm:w-full h-full">
//         <Chat id={id} initialMessages={messages} />
//       </div>
//     </main>
//   );
// }
import { cookies, headers } from "next/headers";
import { notFound, redirect } from "next/navigation";

// import { auth } from "@/app/(auth)/auth";
import { Chat } from "@/components/chat";
// import { getChatById, getMessagesByChatId } from "@/lib/db/queries";
import { DataStreamHandler } from "@/components/data-stream-handler";
import { DEFAULT_CHAT_MODEL } from "@/lib/ai/models";
// import type { DBMessage } from "@/lib/db/schema";
import type { Attachment, UIMessage } from "ai";
import { getChatById, getMessagesByChatId } from "@/actions/chat";
import { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;
  const chat = await getChatById({ id });
  console.log("fetched chat response", chat);
  if (!chat) {
    notFound();
  }

  const session = await auth.api.getSession({
    query: {
      disableCookieCache: true,
    },
    headers: await headers(),
  });

  // console.log("user session", );

  if (!session) {
    redirect("/sign-in");
  }

  if (chat?.visibility === "private") {
    if (!session?.user) {
      return notFound();
    }

    if (session?.user.id !== chat.userId) {
      return notFound();
    }
  }

  const messagesFromDb = await getMessagesByChatId({
    id,
  });

  function convertToUIMessages(messages: Array<any>): Array<UIMessage> {
    return messages.map((message) => ({
      id: message.id,
      parts: message.parts as UIMessage["parts"],
      role: message.role as UIMessage["role"],
      // Note: content will soon be deprecated in @ai-sdk/react
      content: "",
      createdAt: message.createdAt,
      experimental_attachments:
        (message.attachments as Array<Attachment>) ?? [],
    }));
  }

  const cookieStore = await cookies();
  const chatModelFromCookie = cookieStore.get("chat-model");

  if (!chatModelFromCookie) {
    return (
      <>
        <Chat
          id={chat.id}
          initialMessages={convertToUIMessages(messagesFromDb)}
          selectedChatModel={DEFAULT_CHAT_MODEL}
          selectedVisibilityType={chat.visibility}
          isReadonly={session?.user?.id !== chat.userId}
          session={session}
        />
        <DataStreamHandler id={id} />
      </>
    );
  }

  return (
    <>
      <Chat
        id={chat.id}
        initialMessages={convertToUIMessages(messagesFromDb)}
        selectedChatModel={chatModelFromCookie.value}
        selectedVisibilityType={chat.visibility}
        isReadonly={session?.user?.id !== chat.userId}
        session={session}
      />
      <DataStreamHandler id={id} />
    </>
  );
}
