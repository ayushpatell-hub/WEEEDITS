"use client";

import Link from "next/link";
import { useEffect, useRef, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const Icon = ({ children }: { children: ReactNode }) => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="shrink-0"
  >
    {children}
  </svg>
);

const icons = {
  user: (
    <Icon>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
    </Icon>
  ),
  dashboard: (
    <Icon>
      <rect x="3" y="3" width="7" height="9" rx="1.5" />
      <rect x="14" y="3" width="7" height="5" rx="1.5" />
      <rect x="14" y="12" width="7" height="9" rx="1.5" />
      <rect x="3" y="16" width="7" height="5" rx="1.5" />
    </Icon>
  ),
  list: (
    <Icon>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M9 8h6M9 12h6M9 16h4" />
    </Icon>
  ),
  rocket: (
    <Icon>
      <path d="M5 15c-1.5 1.5-2 5-2 5s3.5-.5 5-2" />
      <path d="M14 4c3-1 6-1 6-1s0 3-1 6l-6 6-5-5 6-6z" />
      <circle cx="15" cy="9" r="1.5" />
    </Icon>
  ),
  settings: (
    <Icon>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" />
    </Icon>
  ),
  register: (
    <Icon>
      <circle cx="9" cy="8" r="4" />
      <path d="M2 21c0-4 3-6 7-6s7 2 7 6" />
      <path d="M19 8v6M16 11h6" />
    </Icon>
  ),
  login: (
    <Icon>
      <path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3" />
      <path d="M10 17l5-5-5-5" />
      <path d="M15 12H3" />
    </Icon>
  ),
  logout: (
    <Icon>
      <path d="M9 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h3" />
      <path d="M16 17l5-5-5-5" />
      <path d="M21 12H9" />
    </Icon>
  ),
};

export default function ProfileMenu() {
  const { profile, loading, logout } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const close = () => setOpen(false);

  const handleLogout = async () => {
    close();
    await logout();
    router.push("/");
  };

  const label = profile ? profile.name || profile.email : "";
  const initial = (label[0] || "U").toUpperCase();
  const handle = profile ? "@" + profile.email.split("@")[0] : "";

  const itemClass =
    "flex items-center gap-4 px-5 py-3.5 text-[15px] font-semibold text-foreground transition-colors hover:bg-surface-2";

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        aria-label="Open profile menu"
        className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm font-bold transition-transform hover:scale-105 ${
          profile
            ? "border-accent bg-accent text-white"
            : "border-border bg-surface text-foreground"
        }`}
      >
        {profile ? initial : icons.user}
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-72 max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl shadow-black/60">
          {loading ? (
            <p className="px-5 py-4 text-sm text-muted">Loading...</p>
          ) : profile ? (
            <>
              <div className="px-5 pb-4 pt-5">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-accent to-red-900 font-display text-2xl font-bold text-white">
                  {initial}
                </div>
                <p className="mt-3 truncate font-display text-xl font-bold">
                  {profile.name || "My Account"}
                </p>
                <p className="truncate text-sm text-muted">{handle}</p>
                <span className="mt-3 inline-block rounded-full border border-border bg-surface-2 px-3 py-1 text-xs capitalize text-muted">
                  {profile.role}
                </span>
              </div>

              <div className="border-t border-border py-2">
                <Link href="/dashboard/profile" onClick={close} className={itemClass}>
                  {icons.user}
                  Profile
                </Link>
                <Link href="/dashboard" onClick={close} className={itemClass}>
                  {icons.dashboard}
                  Dashboard
                </Link>
                <Link href="/dashboard/requests" onClick={close} className={itemClass}>
                  {icons.list}
                  My Requests
                </Link>
                <Link href="/contact" onClick={close} className={itemClass}>
                  {icons.rocket}
                  Get Started
                </Link>
              </div>

              <div className="border-t border-border py-2">
                <Link href="/dashboard/profile" onClick={close} className={itemClass}>
                  {icons.settings}
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className={`${itemClass} w-full text-left text-accent`}
                >
                  {icons.logout}
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="px-5 pb-4 pt-5">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-border bg-surface-2 text-muted">
                  {icons.user}
                </div>
                <p className="mt-3 font-display text-xl font-bold">
                  Welcome to WEEEDITS
                </p>
                <p className="text-sm text-muted">Login or create an account.</p>
              </div>

              <div className="border-t border-border py-2">
                <Link href="/login" onClick={close} className={itemClass}>
                  {icons.login}
                  Login
                </Link>
                <Link href="/signup" onClick={close} className={itemClass}>
                  {icons.register}
                  Register
                </Link>
                <Link href="/contact" onClick={close} className={itemClass}>
                  {icons.rocket}
                  Get Started
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}