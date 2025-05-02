import { cookies, headers } from "next/headers";

import { Chat } from "@/components/chat";
import { DEFAULT_CHAT_MODEL } from "@/lib/ai/models";
import { generateUUID } from "@/lib/utils";
import { DataStreamHandler } from "@/components/data-stream-handler";
// import { auth } from '../(auth)/auth';
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function Page() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/sign-in");
  }

  const id = generateUUID();

  const cookieStore = await cookies();
  const modelIdFromCookie = cookieStore.get("chat-model");

  // if (!modelIdFromCookie) {
  //   return (
  //     <>
  //       <Chat
  //         key={id}
  //         id={id}
  //         initialMessages={[]}
  //         selectedChatModel={DEFAULT_CHAT_MODEL}
  //         //   selectedVisibilityType="private"
  //         isReadonly={false}
  //         //   session={session}
  //       />
  //       <DataStreamHandler id={id} />
  //     </>
  //   );
  // }

  return (
    <>
      <Chat
        key={id}
        id={id}
        initialMessages={[]}
        selectedChatModel={"chat-model-reasoning"}
        // selectedVisibilityType="private"
        isReadonly={false}
        // session={session}
      />
      <DataStreamHandler id={id} />
    </>
  );
}
