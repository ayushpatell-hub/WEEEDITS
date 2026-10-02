"use client";

import Link from "next/link";
import { useState } from "react";
import { navLinks } from "@/data/site";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <div className="container-x flex h-16 items-center justify-between">
        <Link href="/" className="font-display text-2xl font-bold tracking-tight">
          WEEE<span className="text-accent">DITS</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Link href="/login" className="text-sm text-muted hover:text-foreground">
            Login
          </Link>
          <Link href="/contact" className="btn-primary !py-2 text-sm">
            Start a Project
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="text-2xl md:hidden"
          aria-label="Toggle menu"
        >
          {open ? "✕" : "☰"}
        </button>
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
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="btn-primary"
            >
              Start a Project
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}