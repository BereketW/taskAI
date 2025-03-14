import type React from "react";
import type { Metadata } from "next";
import { Inter, Pacifico } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { NotificationProvider } from "@/components/ui/notification-bar";

const inter = Inter({ subsets: ["latin"] });

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
});

export const metadata: Metadata = {
  title: "TaskAI - Smart Task Management",
  description: "AI-powered task manager for optimized productivity",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${pacifico.variable}`}>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <NotificationProvider>
            <div className="relative min-h-screen">
              {children}
              <Toaster />
            </div>
          </NotificationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
