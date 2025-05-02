import type React from "react";
import { MarketingHeader } from "@/components/marketing/header";
import { MarketingFooter } from "@/components/marketing/footer";
import LandingPage from "@/components/landing-page";

export default function MarketingLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <MarketingHeader />
      <main className="flex-1">
        <LandingPage />
      </main>
      <MarketingFooter />
    </div>
  );
}
