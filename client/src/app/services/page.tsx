"use client";

import { useState } from "react";
import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import { categories, services } from "@/data/services";

export default function ServicesPage() {
  const [active, setActive] = useState<string>("All Services");

  const list =
    active === "All Services"
      ? services
      : services.filter((s) => s.category === active);

  return (
    <>
      <PageHeader
        label="Services"
        title="What We Do"
        description="From a single reel to a full commercial shoot, event coverage, editing and paid promotion."
      />

      <section className="py-16">
        <div className="container-x">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`rounded-full border px-4 py-2 text-sm transition ${
                  active === c
                    ? "border-accent bg-accent text-white"
                    : "border-border bg-surface text-muted hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((s) => (
              <div key={s.id} className="card group overflow-hidden">
                <div
                  className={`flex h-36 items-center justify-center bg-gradient-to-br ${s.gradient} text-5xl transition-transform duration-500 group-hover:scale-105`}
                >
                  {s.emoji}
                </div>
                <div className="p-6">
                  <p className="text-xs uppercase tracking-widest text-accent">
                    {s.category}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-semibold">
                    {s.name}
                  </h3>
                  <p className="mt-2 text-sm text-muted">{s.description}</p>
                  <p className="mt-3 text-xs text-muted">
                    <span className="text-foreground">For:</span> {s.audience}
                  </p>
                  <ul className="mt-4 space-y-1 text-sm">
                    {s.deliverables.map((d) => (
                      <li key={d}>
                        <span className="mr-2 text-accent">•</span>
                        {d}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/contact?service=${encodeURIComponent(s.name)}`}
                    className="btn-outline mt-6 w-full"
                  >
                    Discuss Your Project
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