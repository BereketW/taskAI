import type React from "react";
import { DashboardHeader } from "@/components/dashboard/header";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeProvider } from "next-themes";
// import { ThemeProvider } from "@/components/theme-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <DashboardHeader />
      <div className="flex gap-10 py-6 px-4 ">
        <div className="">
          <AppSidebar />
        </div>
        <main className="flex-1">{children}</main>
      </div>
    </ThemeProvider>
  );
}
