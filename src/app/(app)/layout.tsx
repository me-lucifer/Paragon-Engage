import { Suspense } from "react";
import AppLayoutClient from "./layout-client";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading...</div>}>
      <AppLayoutClient>{children}</AppLayoutClient>
    </Suspense>
  );
}
