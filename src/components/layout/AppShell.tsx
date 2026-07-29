"use client";

import { usePathname } from "next/navigation";
import { ServicesSidebar } from "@/components/layout/ServicesSidebar";
import { cn } from "@/lib/utils";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showSidebar = !pathname.startsWith("/admin") && !pathname.startsWith("/auth");

  return (
    <>
      {showSidebar && <ServicesSidebar />}
      <div className={cn(showSidebar && "lg:pl-20")}>{children}</div>
    </>
  );
}
