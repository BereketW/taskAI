"use client";

// import type { User } from "next-auth";
import { useRouter } from "next/navigation";

import { PlusIcon } from "@/components/icons";
import { SidebarHistory } from "@/components/sidebar-history";
import { SidebarUserNav } from "@/components/sidebar-user-nav";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { User } from "better-auth";

export function ChatSidebar({ user }: { user: User | undefined }) {
  const router = useRouter();
  const { setOpenMobile } = useSidebar();

  return (
    <Sidebar className="group-data-[side=left]:border-r bg-white/10  ">
      <SidebarHeader>
        <SidebarMenu>
          <div className="flex flex-col justify-between items-center">
            <div className="flex flex-col gap-6 py-6">
              <Link href="/dashboard" className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                  <div className="h-4 w-4 rounded-full bg-gradient-to-r from-indigo-300 to-rose-300" />
                </div>
                <span className="text-lg font-semibold text-white">
                  Task
                  <span className="font-pacifico bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300">
                    AI
                  </span>
                </span>
              </Link>
              {/* Mobile navigation will be rendered here */}
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  type="button"
                  className="p-3 h-fit w-full bg-secondary text-white"
                  onClick={() => {
                    setOpenMobile(false);
                    router.push("/chat");
                    router.refresh();
                  }}
                >
                  New Chat
                </Button>
              </TooltipTrigger>
              <TooltipContent align="end" className="bg-secondary">
                New Chat
              </TooltipContent>
            </Tooltip>
          </div>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarHistory />
      </SidebarContent>
      <SidebarFooter>{user && <SidebarUserNav />}</SidebarFooter>
    </Sidebar>
  );
}
