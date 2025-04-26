import type React from "react";
import { DashboardHeader } from "@/components/dashboard/header";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeProvider } from "next-themes";
// import { NotificationProvider } from "@/components/ui/notification-bar";
// import { NotificationDemo } from "@/components/notification-demo";
// import { checkDeadline } from "@/lib/cron";
// import { ThemeProvider } from "@/components/theme-provider";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // setInterval(async () => {
  //   await checkDeadline();
  // }, 1000);
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {/* <NotificationProvider> */}
      <div className="flex gap-4  ">
        <div className="">
          <AppSidebar />
        </div>
        <main className="flex-1 max-h-svh ">
          <DashboardHeader />
          {children}
        </main>
      </div>
      {/* <NotificationDemo /> */}
      {/* </NotificationProvider> */}
    </ThemeProvider>
  );
}
