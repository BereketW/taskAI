import ResetPasswordPage from "@/components/reset-password"
import React, { Suspense } from "react"
// import ResetPasswordPage from "@/components/reset-password"
export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordPage />
    </Suspense>
  )
}