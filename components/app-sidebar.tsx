"use client";

import type React from "react";

import {
  BarChart3,
  Calendar,
  Clock,
  Compass,
  Flag,
  FolderKanban,
  LayoutDashboard,
  ListTodo,
  LogOut,
  MessageCircleCode,
  Settings,
  Sparkles,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "./theme-provider";

export function AppSidebar() {
  const pathname = usePathname();

  const mainNavItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      badge: null,
      color: "from-blue-600 to-indigo-600",
    },
    {
      title: "Tasks",
      href: "/tasks",
      icon: ListTodo,
      badge: "12",
      color: "from-purple-600 to-pink-600",
    },
    {
      title: "Calendar",
      href: "/calendar",
      icon: Calendar,
      badge: null,
      color: "from-orange-600 to-red-600",
    },
    {
      title: "Projects",
      href: "/projects",
      icon: FolderKanban,
      badge: "3",
      color: "from-emerald-600 to-teal-600",
    },
    {
      title: "Chat with ai",
      href: "/app/chat",
      icon: MessageCircleCode,
      badge: null,
      color: "from-blue-600 to-indigo-600",
    },
  ];

  const workspaceItems = [
    {
      title: "Team",
      href: "/team",
      icon: Users,
      badge: null,
      color: "from-cyan-600 to-blue-600",
    },
    {
      title: "Progress",
      href: "/progress",
      icon: BarChart3,
      badge: null,
      color: "from-violet-600 to-purple-600",
    },
    {
      title: "Goals",
      href: "/goals",
      icon: Flag,
      badge: "2",
      color: "from-rose-600 to-pink-600",
    },
  ];

  const aiFeatures = [
    {
      title: "AI Suggestions",
      href: "/ai/suggestions",
      icon: Sparkles,
      badge: "3",
      color: "from-amber-600 to-orange-600",
    },
    {
      title: "Smart Schedule",
      href: "/ai/schedule",
      icon: Clock,
      badge: null,
      color: "from-lime-600 to-green-600",
    },
    {
      title: "Task Discovery",
      href: "/ai/discovery",
      icon: Compass,
      badge: "New",
      color: "from-fuchsia-600 to-pink-600",
    },
  ];

  const IconWrapper = ({
    children,
    color,
  }: {
    children: React.ReactNode;
    color: string;
  }) => (
    <div
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br",
        color,
        "transition-transform duration-200 ease-in-out group-hover/button:scale-[0.95] group-hover/button:opacity-90",
        "after:absolute after:inset-0 after:rounded-xl after:bg-background/20 after:opacity-0 after:transition-opacity group-hover/button:after:opacity-100"
      )}
    >
      {children}
    </div>
  );

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SidebarProvider>
        <Sidebar className="border-r border-border bg-background/70 backdrop-blur-xl">
          <SidebarHeader className="border-b border-border px-2 py-4">
            <Link href="/dashboard" className="flex items-center gap-2 px-4">
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
          </SidebarHeader>
          <SidebarContent className="px-2 py-4">
            <SidebarGroup>
              <SidebarGroupLabel className="px-4 text-xs font-medium text-muted-foreground">
                MAIN MENU
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {mainNavItems.map((item) => (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === item.href}
                        className="group/button relative px-4"
                      >
                        <Link href={item.href}>
                          <IconWrapper color={item.color}>
                            <item.icon className="h-4 w-4 text-white" />
                          </IconWrapper>
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                      {item.badge && (
                        <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>
                      )}
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarSeparator className="my-4" />
            <SidebarGroup>
              <SidebarGroupLabel className="px-4 text-xs font-medium text-muted-foreground">
                WORKSPACE
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {workspaceItems.map((item) => (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === item.href}
                        className="group/button relative px-4"
                      >
                        <Link href={item.href}>
                          <IconWrapper color={item.color}>
                            <item.icon className="h-4 w-4 text-white" />
                          </IconWrapper>
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                      {item.badge && (
                        <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>
                      )}
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarSeparator className="my-4" />
            <SidebarGroup>
              <SidebarGroupLabel className="px-4 text-xs font-medium text-muted-foreground">
                AI FEATURES
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {aiFeatures.map((item) => (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === item.href}
                        className="group/button relative px-4"
                      >
                        <Link href={item.href}>
                          <IconWrapper color={item.color}>
                            <item.icon className="h-4 w-4 text-white" />
                          </IconWrapper>
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                      {item.badge && (
                        <SidebarMenuBadge
                          className={cn(
                            item.badge === "New" &&
                              "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                          )}
                        >
                          {item.badge}
                        </SidebarMenuBadge>
                      )}
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="border-t border-border p-4">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  variant="outline"
                  className="group/button relative px-4"
                >
                  <Link href="/settings">
                    <IconWrapper color="from-gray-600 to-gray-700">
                      <Settings className="h-4 w-4 text-white" />
                    </IconWrapper>
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  variant="outline"
                  className="group/button relative px-4"
                >
                  <Link href="/settings">
                    <IconWrapper color="from-red-600 to-red-700">
                      <LogOut className="h-4 w-4 text-white" />
                    </IconWrapper>
                    <span>Logout</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>
      </SidebarProvider>
    </ThemeProvider>
  );
}
