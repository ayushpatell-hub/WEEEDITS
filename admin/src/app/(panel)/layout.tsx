"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import ProtectedAdmin from "@/components/ProtectedAdmin";
import Sidebar from "@/components/Sidebar";

const titles: Record<string, string> = {
  "/": "Overview",
  "/inquiries": "Inquiries",
  "/requests": "Requests",
  "/clients": "Clients",
  "/contacts": "Contacts",
  "/analytics": "Analytics",
};

function getTitle(path: string) {
  if (titles[path]) return titles[path];
  if (path.startsWith("/requests/")) return "Request Details";
  const first = "/" + path.split("/")[1];
  return titles[first] ?? "Admin";
}

export default function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [today, setToday] = useState("");

  useEffect(() => {
    setToday(
      new Date().toLocaleDateString("en-IN", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    );
  }, []);

  return (
    <ProtectedAdmin>
      <Sidebar />
      <main className="md:pl-[16.5rem]">
        <header className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-border bg-background/90 px-4 py-3 backdrop-blur md:px-8">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-accent">
              WEEEDITS Admin
            </p>
            <p className="font-display text-lg font-bold leading-tight">
              {getTitle(pathname)}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {today && (
              <span className="hidden rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-muted sm:inline">
                {today}
              </span>
            )}
            <div className="flex items-center gap-2 rounded-full border border-border bg-surface py-1 pl-1 pr-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">
                A
              </span>
              <span className="text-sm font-medium">Admin</span>
            </div>
          </div>
        </header>
        <div className="mx-auto max-w-6xl px-4 py-6 md:px-8">{children}</div>
      </main>
    </ProtectedAdmin>
  );
}