import Chat from "@/components/chat";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center bg-background p-0 h-[90vh] overflow-hidden">
      <div className="w-[60svw] max-sm:w-full h-full">
        <Chat />
      </div>
    </main>
  );
}
