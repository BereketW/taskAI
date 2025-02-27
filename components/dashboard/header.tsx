"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bell, CheckSquare, Menu, Plus, Search, Settings, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function DashboardHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full ${
        isScrolled ? "bg-background/80 backdrop-blur-md border-b" : "bg-background border-b"
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
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
                    <CheckSquare className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <span className="text-lg font-semibold">TaskAI</span>
                </Link>
                {/* Mobile navigation will be rendered here */}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <Link href="/dashboard" className="flex items-center gap-2 mr-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
            <CheckSquare className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold">TaskAI</span>
        </Link>

        <div className="relative hidden md:flex items-center w-full max-w-sm">
          <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search tasks..." className="pl-8 w-full" />
        </div>

        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary"></span>
            <span className="sr-only">Notifications</span>
          </Button>

          <Button variant="outline" size="sm" className="hidden md:flex">
            <Plus className="mr-2 h-4 w-4" />
            New Task
          </Button>

          <ModeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-user.jpg" alt="User" />
                  <AvatarFallback>U</AvatarFallback>
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
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

