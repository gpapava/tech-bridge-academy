"use client";

import dynamic from "next/dynamic";

const StakeholderMap = dynamic(
  () => import("@/components/map/StakeholderMap").then((m) => m.StakeholderMap),
  { ssr: false, loading: () => <div className="h-[70vh] w-full rounded-2xl bg-slate-100 animate-pulse" /> }
);

export function MapLoader() {
  return <StakeholderMap />;
}
