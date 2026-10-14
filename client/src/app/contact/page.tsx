import { Suspense } from "react";
import InquiryForm from "@/components/ui/InquiryForm";

const info = [
  { id: 1, label: "Email", value: "hello@weeedits.com", href: "mailto:hello@weeedits.com" },
  { id: 2, label: "Phone", value: "+91 00000 00000", href: "" },
  { id: 3, label: "Location", value: "India", href: "" },
];

const socials = [
  {
    id: 1,
    name: "Instagram",
    path: "M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm5 5a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm5.5-1.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z",
  },
  {
    id: 2,
    name: "YouTube",
    path: "M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8ZM10 15V9l5 3-5 3Z",
  },
  {
    id: 3,
    name: "WhatsApp",
    path: "M12 2a10 10 0 0 0-8.6 15.1L2 22l505-1.3A10 10 0 1 0 12 2Zm5.2 13.9c-.2.6-1.2 1.2-1.7 1.2-.5.1-1 .2-3.3-.7-2.8-1.2-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8 0-1.3.7-2 1-2.3.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.6c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1.1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.6.3.1.2.1.8-.1 1.4Z",
  },
];

export default function ContactPage() {
  return (
    <div className="relative overflow-hidden pb-20 pt-28">
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />

      <div className="container-x relative">
        <div className="rounded-2xl border border-border bg-surface p-6 shadow-[0_20px_60px_-30px_rgba(22,35,27,0.35)] sm:p-10 lg:p-14">
          <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground">
            <span>[Contact]</span>
            <span className="text-muted">[Start a Project]</span>
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-2">
            <h1 className="font-display text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl">
              Let&apos;s Work
              <br />
              <span className="text-accent">Together.</span>
            </h1>

            <div className="grid grid-cols-2 gap-6 text-sm lg:pl-10">
              <div>
                <p className="font-semibold">Contact Info</p>
                <ul className="mt-3 space-y-1.5 text-muted">
                  {info.slice(0, 2).map((i) => (
                    <li key={i.id}>
                      {i.href ? (
                        <a href={i.href} className="transition-colors hover:text-foreground">
                          {i.value}
                        </a>
                      ) : (
                        i.value
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-semibold">Location</p>
                <ul className="mt-3 space-y-1.5 text-muted">
                  <li>{info[2].value}</li>
                  <li>Replies within 24 hours</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-14 grid gap-10 lg:grid-cols-2">
            <div className="flex items-end gap-4 lg:min-h-[200px]">
              {socials.map((s) => (
                <a
                  key={s.id}
                  href="#"
                  aria-label={s.name}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-accent hover:bg-accent hover:text-background"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>

            <div>
              <Suspense fallback={<p className="text-muted">Loading form...</p>}>
                <InquiryForm />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}