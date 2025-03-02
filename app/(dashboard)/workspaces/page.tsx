import WorkspacesPage from "@/components/workspace/workspace";
import React, { Suspense } from "react";
import Loading from "./loading";
// export const experimental_ppr = true;
export default function page() {
  return (
    // <Suspense fallback={<Loading />}>
    <WorkspacesPage />
    // </Suspense>
  );
}
