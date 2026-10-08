"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function ProfileMenu() {
  const { profile, logout } = useAuth();
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

  if (!profile) return null;

  const label = profile.name || profile.email;
  const initial = (label[0] || "U").toUpperCase();

  const handleLogout = async () => {
    setOpen(false);
    await logout();
    router.push("/");
  };

  const itemClass =
    "block px-4 py-2 text-sm text-muted transition-colors hover:bg-surface-2 hover:text-foreground";

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        aria-label="Open profile menu"
        className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-sm font-bold text-white transition-transform hover:scale-105"
      >
        {initial}
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-56 overflow-hidden rounded-xl border border-border bg-surface shadow-xl">
          <div className="border-b border-border px-4 py-3">
            <p className="truncate text-sm font-semibold">
              {profile.name || "My Account"}
            </p>
            <p className="truncate text-xs text-muted">{profile.email}</p>
          </div>

          <Link href="/dashboard" onClick={() => setOpen(false)} className={itemClass}>
            Dashboard
          </Link>
          <Link
            href="/dashboard/requests"
            onClick={() => setOpen(false)}
            className={itemClass}
          >
            My Requests
          </Link>
          <Link
            href="/dashboard/profile"
            onClick={() => setOpen(false)}
            className={itemClass}
          >
            View Profile
          </Link>

          <button
            onClick={handleLogout}
            className="block w-full border-t border-border px-4 py-2 text-left text-sm text-accent transition-colors hover:bg-surface-2"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}