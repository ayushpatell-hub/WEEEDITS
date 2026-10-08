"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

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
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const close = () => setOpen(false);

  const handleLogout = async () => {
    close();
    await logout();
    router.push("/");
  };

  const itemClass =
    "block px-4 py-2.5 text-sm text-muted transition-colors hover:bg-surface-2 hover:text-foreground";

  const label = profile ? profile.name || profile.email : "";
  const initial = (label[0] || "U").toUpperCase();

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
        {profile ? (
          initial
        ) : (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="8" r="4" />
            <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
          </svg>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-60 overflow-hidden rounded-xl border border-border bg-surface shadow-xl">
          {loading ? (
            <p className="px-4 py-3 text-sm text-muted">Loading...</p>
          ) : profile ? (
            <>
              <div className="border-b border-border px-4 py-3">
                <p className="truncate text-sm font-semibold">
                  {profile.name || "My Account"}
                </p>
                <p className="truncate text-xs text-muted">{profile.email}</p>
              </div>

              <Link href="/dashboard" onClick={close} className={itemClass}>
                Dashboard
              </Link>
              <Link
                href="/dashboard/requests"
                onClick={close}
                className={itemClass}
              >
                My Requests
              </Link>
              <Link
                href="/dashboard/profile"
                onClick={close}
                className={itemClass}
              >
                View Profile
              </Link>
              <Link href="/contact" onClick={close} className={itemClass}>
                Start a Project
              </Link>

              <button
                onClick={handleLogout}
                className="block w-full border-t border-border px-4 py-2.5 text-left text-sm text-accent transition-colors hover:bg-surface-2"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" onClick={close} className={itemClass}>
                Login
              </Link>
              <Link href="/signup" onClick={close} className={itemClass}>
                Register
              </Link>
              <Link
                href="/contact"
                onClick={close}
                className="block border-t border-border px-4 py-2.5 text-sm font-semibold text-accent transition-colors hover:bg-surface-2"
              >
                Start a Project
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
}