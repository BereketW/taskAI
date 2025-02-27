import type React from "react";
import "./globals.css";
import { DashboardHeader } from "@/components/dashboard/header";
import { AppSidebar } from "@/components/app-sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col bg-[#fcfcfd]">
      <DashboardHeader />
      <div className="flex flex-1">
        <AppSidebar />
        <main className="flex-1 overflow-auto px-6 py-4">{children}</main>
      </div>
    </div>
  );
}
