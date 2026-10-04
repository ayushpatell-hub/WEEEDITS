"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const links = [
  { href: "/", label: "Overview", emoji: "📊" },
  { href: "/requests", label: "Requests", emoji: "📥" },
  { href: "/clients", label: "Clients", emoji: "👥" },
  { href: "/contacts", label: "Contacts", emoji: "✉️" },
  { href: "/analytics", label: "Analytics", emoji: "📈" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <aside className="border-b border-border bg-surface md:fixed md:inset-y-0 md:left-0 md:w-60 md:border-b-0 md:border-r">
      <div className="flex items-center justify-between px-5 py-4 md:block">
        <div>
          <p className="font-display text-xl font-bold">
            WEEE<span className="text-accent">DITS</span>
          </p>
          <p className="text-xs uppercase tracking-widest text-muted">Admin</p>
        </div>
        <button
          onClick={() => logout()}
          className="text-sm text-muted hover:text-foreground md:hidden"
        >
          Logout
        </button>
      </div>

      <nav className="flex gap-1 overflow-x-auto px-3 pb-3 md:flex-col md:px-3 md:pb-0">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={`flex items-center gap-3 whitespace-nowrap rounded-lg px-4 py-2 text-sm transition ${
              isActive(l.href)
                ? "bg-accent text-white"
                : "text-muted hover:bg-surface-2 hover:text-foreground"
            }`}
          >
            <span>{l.emoji}</span>
            {l.label}
          </Link>
        ))}
      </nav>

      <div className="hidden px-3 py-4 md:absolute md:bottom-0 md:left-0 md:right-0 md:block">
        <button
          onClick={() => logout()}
          className="w-full rounded-lg border border-border px-4 py-2 text-sm text-muted transition hover:text-foreground"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}