"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { navLinks } from "@/data/site";
import ProfileMenu from "@/components/ui/ProfileMenu";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight - 100);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const light = pathname === "/" && !scrolled && !open;

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-colors duration-300 ${
        light
          ? "border-b border-transparent bg-transparent"
          : "border-b border-border bg-background/80 backdrop-blur"
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between">
        <Link
          href="/"
          aria-label="WEE EDITS home"
          className={`font-display flex items-center gap-2.5 text-2xl font-extrabold tracking-tight ${
            light ? "text-[#16231b]" : "text-foreground"
          }`}
        >
          <svg
            width="34"
            height="34"
            viewBox="0 0 34 34"
            fill="none"
            aria-hidden="true"
          >
            <rect width="34" height="34" rx="9" fill="#2f5d43" />
            <path d="M13 10.5 L25 17 L13 23.5 Z" fill="#eef1e6" />
            <rect x="8" y="26" width="18" height="2.5" rx="1.25" fill="#eef1e6" opacity="0.55" />
          </svg>
          <span>
            WEE <span className={light ? "text-[#2f5d43]" : "text-accent"}>EDITS</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors ${
                light
                  ? "text-[#16231b]/70 hover:text-[#16231b]"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ProfileMenu />
          <button
            onClick={() => setOpen(!open)}
            className={`text-2xl md:hidden ${light ? "text-[#16231b]" : "text-foreground"}`}
            aria-label="Toggle menu"
          >
            {open ? "\u2715" : "\u2630"}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="container-x flex flex-col gap-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-muted hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}