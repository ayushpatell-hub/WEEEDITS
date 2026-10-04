"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

const links = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/requests", label: "My Requests" },
  { href: "/dashboard/requests/new", label: "New Request" },
  { href: "/dashboard/profile", label: "Profile" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <aside className="md:w-56 md:shrink-0">
      <nav className="card flex gap-2 overflow-x-auto p-3 md:flex-col md:overflow-visible">
        {links.map((l) => {
          const active = pathname === l.href;
          return (
            <Link
              key={l.href}
              href={l.href}
              className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition ${
                active
                  ? "bg-accent text-white"
                  : "text-muted hover:bg-surface-2 hover:text-foreground"
              }`}
            >
              {l.label}
            </Link>
          );
        })}
        <button
          onClick={logout}
          className="whitespace-nowrap rounded-lg px-4 py-2 text-left text-sm font-medium text-muted transition hover:bg-surface-2 hover:text-foreground md:mt-4"
        >
          Logout
        </button>
      </nav>
    </aside>
  );
}