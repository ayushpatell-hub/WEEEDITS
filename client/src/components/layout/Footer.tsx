import Link from "next/link";
import { navLinks } from "@/data/site";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="container-x grid gap-10 py-14 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl font-bold">
            WEEE<span className="text-accent">DITS</span>
          </p>
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
        © {new Date().getFullYear()} WEEEDITS. All rights reserved.
      </div>
    </footer>
  );
}