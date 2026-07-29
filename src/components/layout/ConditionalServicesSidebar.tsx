"use client";

import { usePathname } from "next/navigation";
import { ServicesSidebar } from "@/components/layout/ServicesSidebar";

export function ConditionalServicesSidebar() {
  const pathname = usePathname();
  const hidden = pathname.startsWith("/admin") || pathname.startsWith("/auth");

  if (hidden) return null;
  return <ServicesSidebar />;
}
