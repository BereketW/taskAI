import { cookies } from "next/headers";

// import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ChatSidebar } from "@/components/chat-sidebar";
import { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
import { Toaster } from "sonner";
// import { Toaster } from "@/components/ui/toaster";
// import { auth } from '../(auth)/auth';
// import Script from 'next/script';

export const experimental_ppr = true;

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  //   const [session, cookieStore] = await Promise.all([auth(), cookies()]);
  //   const isCollapsed = cookieStore.get("sidebar:state")?.value !== "true";
  const { data: session } = authClient.getSession();

  return (
    <>
      <SidebarProvider>
        <Toaster position="bottom-right" />
        <ChatSidebar user={session?.user} />
        <SidebarInset>{children}</SidebarInset>
      </SidebarProvider>
    </>
  );
}
