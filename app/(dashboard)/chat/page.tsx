// import { Chat } from "@/components/chat";

import Chat from "@/components/chat";

// import { Chat } from "@/components/chat";

export default async function Home() {
  return (
    <main className="flex  flex-col items-center  bg-background p-4  dark hero-gradient">
      <div className="relative w-full max-w-4xl">
        <div className="absolute -top-20 -left-20 dashboard-decoration decoration-1 opacity-60"></div>
        <div className="absolute -bottom-20 -right-20 dashboard-decoration decoration-2 opacity-60"></div>
        <div className="card-elegant backdrop-blur-sm">
          <Chat />
        </div>
      </div>
    </main>
  );
}
