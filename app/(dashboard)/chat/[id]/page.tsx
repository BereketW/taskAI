import Chat from "@/components/chat";
import { loadChat } from "@/hooks/chat-store";

export default async function page(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params; // get the chat ID from the URL
  const messages = await loadChat(id); // load the chat messages
  return (
    <main className="flex flex-col items-center justify-center bg-background p-0 h-[90vh] overflow-hidden">
      <div className="w-[60svw] max-sm:w-full h-full">
        <Chat id={id} initialMessages={messages} />
      </div>
    </main>
  );
}
