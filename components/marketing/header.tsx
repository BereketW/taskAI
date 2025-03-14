"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function MarketingHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Features", href: "/#features" },
    { name: "Pricing", href: "/#pricing" },
    { name: "Testimonials", href: "/#testimonials" },
    { name: "Blog", href: "/blog" },
  ];

  return (
    <motion.header
      className={`sticky top-0 z-50 w-full ${
        isScrolled
          ? "bg-[#030303]/80 backdrop-blur-md border-b border-white/5"
          : "bg-transparent"
      } transition-all duration-200`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
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
        <nav className="hidden md:flex gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors hover:text-white ${
                pathname === item.href ? "text-white" : "text-white/60"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4">
            <ModeToggle />
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="text-white/70 hover:text-white hover:bg-white/5"
            >
              <Link href="/sign-in">Sign In</Link>
            </Button>
            <Button
              asChild
              size="sm"
              className="rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white"
            >
              <Link href="/sign-up">Sign Up</Link>
            </Button>
          </div>
          <div className="md:hidden flex items-center gap-4">
            <ModeToggle />
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Menu"
                  className="text-white/70 hover:text-white hover:bg-white/5"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[300px] sm:w-[400px] bg-[#030303]/95 border-white/10"
              >
                <div className="flex flex-col gap-6 py-6">
                  <Link href="/" className="flex items-center gap-2">
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
                  <nav className="flex flex-col gap-4">
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`text-sm font-medium transition-colors hover:text-white ${
                          pathname === item.href
                            ? "text-white"
                            : "text-white/60"
                        }`}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </nav>
                  <div className="flex flex-col gap-2 mt-auto">
                    <Button
                      asChild
                      variant="outline"
                      className="w-full border-white/10 text-white/70 hover:text-white hover:bg-white/5"
                    >
                      <Link href="/sign-in">Sign In</Link>
                    </Button>
                    <Button
                      asChild
                      className="w-full rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white"
                    >
                      <Link href="/sign-up">Sign Up</Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
