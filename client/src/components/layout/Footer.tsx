import Link from "next/link";
import { navLinks } from "@/data/site";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="container-x grid gap-10 py-14 md:grid-cols-3">
        <div>
          <Link
            href="/"
            aria-label="WEE EDITS home"
            className="font-display flex items-center gap-2.5 text-2xl font-extrabold tracking-tight"
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
              WEE <span className="text-accent">EDITS</span>
            </span>
          </Link>
          <p className="mt-3 max-w-xs text-sm text-muted">
            Professional video editing and paid promotion for creators and
            brands.
          </p>
        </div>

        <div>
          <p className="mb-4 text-sm font-semibold">Quick Links</p>
          <ul className="space-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-muted transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-4 text-sm font-semibold">Get Started</p>
          <p className="mb-4 text-sm text-muted">
            Have a project in mind? Let&apos;s talk.
          </p>
          <Link href="/contact" className="btn-primary text-sm">
            Start a Project
          </Link>
        </div>
      </div>

      <div className="border-t border-border py-5 text-center text-xs text-muted">
        &copy; {new Date().getFullYear()} WEE EDITS. All rights reserved.
      </div>
    </footer>
  );
}