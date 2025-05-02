"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Bell,
  Menu,
  Plus,
  Search,
  Settings,
  User,
  X,
  CheckCircle,
  AlertTriangle,
  Info,
  AlertCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { authClient } from "@/lib/auth-client";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { io } from "socket.io-client";

// Notification types and interfaces
export type NotificationType = "info" | "success" | "warning" | "error";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const socket = io("http://localhost:5000");
export function DashboardHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "success",
      title: "Task completed",
      message: "You've completed the 'Project Documentation' task",
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      read: false,
    },
    {
      id: "2",
      type: "info",
      title: "Meeting reminder",
      message: "Team standup meeting in 15 minutes",
      timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
      read: false,
      action: {
        label: "Join now",
        onClick: () => window.alert("Joining meeting..."),
      },
    },
    {
      id: "3",
      type: "warning",
      title: "Approaching deadline",
      message: "The 'UI Design Review' task is due tomorrow",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      read: true,
    },
  ]);

  // const pathname = usePathname();
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const unreadCount = notifications.filter((n) => !n.read).length;
  useEffect(() => {
    socket.on("taskUpdateNotification", (task: Task) => {
      const newNotification: Notification = {
        id: task.id,
        title: task.title,
        message: `You have a new update for the "${task.title}" task.`,
        type: "success",
        timestamp: new Date(),
        read: false,
      };

      setNotifications((prev) => [...prev, newNotification]);
      toast.success(`New Task Update: ${task.title}`, {
        position: "top-right",
      });
    });
    socket.on("taskUpdateNotification", (task: Task) => {
      const newNotification: Notification = {
        id: task.id,
        title: task.title,
        message: `You have completed the "${task.title}" task.`,
        type: "success",
        timestamp: new Date(),
        read: false,
      };

      setNotifications((prev) => [...prev, newNotification]);
      toast.success(`New Task Update: ${task.title}`, {
        position: "top-right",
      });
    });

    return () => {
      socket.off("taskUpdateNotification");
      socket.off("taskCompletedNotification");
    };
  }, []);
  async function onSignOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
      },
    });
  }

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true }))
    );
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-emerald-500" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case "info":
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b"
          : "bg-background border-b"
      } transition-all duration-200`}
    >
      <div className="container flex h-16 items-center px-4 md:px-6">
        <div className="md:hidden mr-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
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
            </SheetContent>
          </Sheet>
        </div>

        <div className="relative hidden md:flex items-center w-full max-w-sm">
          <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search tasks..."
            className="pl-8 w-full"
          />
        </div>

        <div className="ml-auto flex items-center gap-2">
          {/* Notification Bell with Dropdown */}
          <div className="relative">
            <DropdownMenu
              open={notificationsOpen}
              onOpenChange={setNotificationsOpen}
            >
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                      {unreadCount}
                    </span>
                  )}
                  <span className="sr-only">Notifications</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 p-0">
                <div className="flex items-center justify-between p-4 border-b">
                  <DropdownMenuLabel className="text-base">
                    Notifications
                  </DropdownMenuLabel>
                  <div className="flex gap-1">
                    {unreadCount > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={markAllAsRead}
                        className="text-xs h-8"
                      >
                        Mark all as read
                      </Button>
                    )}
                    {notifications.length > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearAllNotifications}
                        className="text-xs h-8"
                      >
                        Clear all
                      </Button>
                    )}
                  </div>
                </div>

                <div className="max-h-[60vh] overflow-y-auto">
                  <AnimatePresence>
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <motion.div
                          key={notification.id}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className={cn(
                            "relative p-4 border-b last:border-b-0 transition-colors",
                            notification.read ? "bg-background" : "bg-muted/30"
                          )}
                          onClick={() => markAsRead(notification.id)}
                        >
                          <div className="flex gap-3">
                            <div className="flex-shrink-0 mt-0.5">
                              {getNotificationIcon(notification.type)}
                            </div>
                            <div className="flex-1 space-y-1">
                              <div className="flex justify-between items-start">
                                <p className="font-medium text-sm">
                                  {notification.title}
                                </p>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeNotification(notification.id);
                                  }}
                                  className="text-muted-foreground hover:text-foreground rounded-full p-1 -mt-1 -mr-1"
                                >
                                  <X className="h-3 w-3" />
                                </button>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {notification.message}
                              </p>
                              <div className="flex justify-between items-center pt-1">
                                <p className="text-xs text-muted-foreground">
                                  {formatTimeAgo(notification.timestamp)}
                                </p>
                                {notification.action && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-7 text-xs"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      notification.action?.onClick();
                                      markAsRead(notification.id);
                                    }}
                                  >
                                    {notification.action.label}
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <div className="flex flex-col items-center justify-center py-8 text-center">
                        <div className="rounded-full bg-muted p-3">
                          <Bell className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <h3 className="mt-4 text-sm font-medium">
                          No notifications
                        </h3>
                        <p className="mt-2 text-xs text-muted-foreground px-4">
                          When you have notifications, {"they'll"} appear here.
                        </p>
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="hidden md:flex"
            asChild
          >
            <Link href="/tasks/new">
              <Plus className="mr-2 h-4 w-4" />
              New Task
            </Link>
          </Button>

          <ModeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={session?.user?.image} alt="User" />
                  <AvatarFallback>{session?.user?.name[0]}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onSignOut}>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
