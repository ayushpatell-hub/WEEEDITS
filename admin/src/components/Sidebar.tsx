"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

function Icon({ name }: { name: string }) {
  const p = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  } as const;

  switch (name) {
    case "overview":
      return (
        <svg {...p}>
          <rect x="3" y="3" width="7" height="9" rx="1" />
          <rect x="14" y="3" width="7" height="5" rx="1" />
          <rect x="14" y="12" width="7" height="9" rx="1" />
          <rect x="3" y="16" width="7" height="5" rx="1" />
        </svg>
      );
    case "inquiries":
      return (
        <svg {...p}>
          <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
          <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
        </svg>
      );
    case "requests":
      return (
        <svg {...p}>
          <rect x="8" y="2" width="8" height="4" rx="1" />
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
          <path d="M12 11h4" />
          <path d="M12 16h4" />
          <path d="M8 11h.01" />
          <path d="M8 16h.01" />
        </svg>
      );
    case "clients":
      return (
        <svg {...p}>
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case "contacts":
      return (
        <svg {...p}>
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      );
    case "analytics":
      return (
        <svg {...p}>
          <path d="M3 3v18h18" />
          <path d="m19 9-5 5-4-4-3 3" />
        </svg>
      );
    case "logout":
      return (
        <svg {...p}>
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
      );
    default:
      return null;
  }
}

const links = [
  { href: "/", label: "Overview", icon: "overview" },
  { href: "/inquiries", label: "Inquiries", icon: "inquiries" },
  { href: "/requests", label: "Requests", icon: "requests" },
  { href: "/clients", label: "Clients", icon: "clients" },
  { href: "/contacts", label: "Contacts", icon: "contacts" },
  { href: "/analytics", label: "Analytics", icon: "analytics" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <aside className="rounded-b-2xl bg-accent text-white md:fixed md:inset-y-3 md:left-3 md:flex md:w-60 md:flex-col md:rounded-2xl">
      <div className="flex items-center justify-between px-5 py-5">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface text-accent">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
          <div>
            <p className="font-display text-lg font-bold leading-none">
              WEE <span className="text-[#b7d9c3]">EDITS</span>
            </p>
            <p className="mt-1 text-[10px] uppercase tracking-widest text-white/60">
              Admin
            </p>
          </div>
        </div>
        <button
          onClick={() => logout()}
          className="text-sm text-white/80 hover:text-white md:hidden"
        >
          Logout
        </button>
      </div>

      <p className="hidden px-5 pb-2 text-[11px] font-semibold uppercase tracking-widest text-white/50 md:block">
        Menu
      </p>

      <nav className="flex gap-1 overflow-x-auto px-3 pb-3 md:flex-col md:overflow-visible md:pb-0">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={`flex items-center gap-3 whitespace-nowrap rounded-xl px-4 py-2.5 text-sm transition ${
              isActive(l.href)
                ? "bg-surface font-semibold text-accent"
                : "text-white/75 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Icon name={l.icon} />
            {l.label}
          </Link>
        ))}
      </nav>

      <div className="hidden px-3 pb-3 md:mt-auto md:block">
        <div className="rounded-xl bg-white/10 p-3">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-surface text-sm font-bold text-accent">
              A
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white">Admin</p>
              <p className="text-xs text-white/60">WEEEDITS</p>
            </div>
          </div>
          <button
            onClick={() => logout()}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm font-medium text-white transition hover:bg-white/20"
          >
            <Icon name="logout" />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
}