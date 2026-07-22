"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import AuthUnifiedPage from "@/components/auth/AuthUnifiedPage";

export default function LoginPage() {
  return (
    <Suspense>
      <AuthUnifiedPageWithParams />
    </Suspense>
  );
}

function AuthUnifiedPageWithParams() {
  const params = useSearchParams();
  const tab = params.get("tab") === "signup" ? "signup" : "login";
  return <AuthUnifiedPage initialTab={tab} />;
}
