"use client";

import { useState } from "react";
import Link from "next/link";
import { categories, services } from "@/data/services";

export default function ServicesPage() {
  const [active, setActive] = useState<string>("All Services");

  const list =
    active === "All Services"
      ? services
      : services.filter((s) => s.category === active);

  return (
    <>
      <section className="container-x pt-8 md:pt-10">
        <div className="relative overflow-hidden rounded-3xl bg-accent px-6 py-14 text-white md:px-14 md:py-20">
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10" />
          <div className="pointer-events-none absolute -bottom-24 right-24 h-56 w-56 rounded-full bg-white/5" />

          <div className="relative max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs uppercase tracking-[0.2em]">
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
              Our Services
            </p>
            <h1 className="mt-6 text-4xl font-extrabold leading-tight md:text-6xl">
              Everything your content needs, in one place.
            </h1>
            <p className="mt-5 max-w-2xl text-base text-white/80 md:text-lg">
              From a single reel to a full commercial shoot, event coverage,
              editing and paid promotion.
            </p>

            <div className="mt-8 flex flex-wrap gap-8">
              <div>
                <p className="text-3xl font-extrabold">{services.length}</p>
                <p className="text-xs uppercase tracking-widest text-white/70">
                  Services
                </p>
              </div>
              <div>
                <p className="text-3xl font-extrabold">
                  {categories.length - 1}
                </p>
                <p className="text-xs uppercase tracking-widest text-white/70">
                  Categories
                </p>
              </div>
              <div>
                <p className="text-3xl font-extrabold">1</p>
                <p className="text-xs uppercase tracking-widest text-white/70">
                  Team for all
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="container-x">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`rounded-full border px-4 py-2 text-sm transition ${
                  active === c
                    ? "border-accent bg-accent text-white"
                    : "border-border bg-surface text-muted hover:border-accent hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="mt-10 border-t border-border">
            {list.map((s, i) => (
              <div
                key={s.id}
                className="group grid gap-5 border-b border-border py-8 transition-colors hover:bg-surface md:grid-cols-12 md:items-start md:px-4"
              >
                <div className="flex items-center gap-4 md:col-span-5">
                  <span className="w-8 text-sm font-semibold text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-surface-2 text-3xl transition-transform duration-300 group-hover:scale-110">
                    {s.emoji}
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-accent">
                      {s.category}
                    </p>
                    <h3 className="mt-1 text-xl font-semibold">{s.name}</h3>
                  </div>
                </div>

                <div className="md:col-span-5">
                  <p className="text-sm text-muted">{s.description}</p>
                  <p className="mt-2 text-xs text-muted">
                    <span className="font-semibold text-foreground">For:</span>{" "}
                    {s.audience}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {s.deliverables.map((d) => (
                      <span
                        key={d}
                        className="rounded-full border border-border bg-surface px-3 py-1 text-xs"
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-2 md:text-right">
                  <Link
                    href={`/contact?service=${encodeURIComponent(s.name)}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-accent transition-all group-hover:gap-3"
                  >
                    Discuss Your Project <span>→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <p className="mx-auto mt-10 max-w-2xl text-center text-xs text-muted">
            Deliverables, crew size and turnaround depend on the project. For
            paid promotions, our fee is separate from your ad budget and results
            are not guaranteed.
          </p>
        </div>
      </section>
    </>
  );
}