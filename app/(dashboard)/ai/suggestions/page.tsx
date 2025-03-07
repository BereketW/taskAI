import { generateInsights } from "@/actions/insights";
import AISuggestionsPage from "@/components/ai/suggestions";
import React from "react";

export default async function page() {
  const { insights } = await generateInsights();
  console.log("insights", insights);
  // console.log(suggestions);
  return <AISuggestionsPage insights={insights} />;
}
