"use client";

import type React from "react";

import { motion } from "framer-motion";
import {
  BarChart3,
  Calendar,
  CheckSquare,
  Clock,
  Compass,
  Flag,
  FolderKanban,
  LayoutDashboard,
  ListTodo,
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
        "after:absolute after:inset-0 after:rounded-xl after:bg-white/20 after:opacity-0 after:transition-opacity group-hover/button:after:opacity-100"
      )}
    >
      {children}
    </div>
  );

  return (
    <SidebarProvider>
      <Sidebar className="border-r border-[#f0f0f5] bg-[#fafafa]/70 backdrop-blur-xl">
        <SidebarHeader className="border-b border-[#f0f0f5] px-2 py-4">
          <Link href="/dashboard" className="flex items-center gap-2 px-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80">
              <CheckSquare className="h-5 w-5 text-primary-foreground" />
            </div>
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className="flex-1 text-lg font-semibold"
            >
              TaskAI
            </motion.div>
          </Link>
        </SidebarHeader>
        <SidebarContent className="px-2 py-4">
          <SidebarGroup>
            <SidebarGroupLabel className="px-4 text-xs font-medium text-muted-foreground/70">
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
                          <item.icon className="h-5 w-5 text-white" />
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
            <SidebarGroupLabel className="px-4 text-xs font-medium text-muted-foreground/70">
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
                          <item.icon className="h-5 w-5 text-white" />
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
            <SidebarGroupLabel className="px-4 text-xs font-medium text-muted-foreground/70">
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
                          <item.icon className="h-5 w-5 text-white" />
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
        <SidebarFooter className="border-t border-[#f0f0f5] p-4">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                variant="outline"
                className="group/button relative px-4"
              >
                <Link href="/settings">
                  <IconWrapper color="from-gray-600 to-gray-700">
                    <Settings className="h-5 w-5 text-white" />
                  </IconWrapper>
                  <span>Settings</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </SidebarProvider>
  );
}
