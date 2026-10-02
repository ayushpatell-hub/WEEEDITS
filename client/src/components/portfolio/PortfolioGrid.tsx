"use client";

import { useEffect, useState } from "react";
import { categories, portfolio } from "@/data/portfolio";

export default function PortfolioGrid() {
  const filters = ["All", ...categories.filter((c) => c !== "All")];
  const [active, setActive] = useState("All");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const items =
    active === "All"
      ? portfolio
      : portfolio.filter((p) => p.category === active);

  const selected = portfolio.find((p) => p.id === selectedId) || null;

  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedId(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [selected]);

  return (
    <>
      <div className="mb-10 flex flex-wrap justify-center gap-3">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={`rounded-full border px-5 py-2 text-sm transition ${
              active === f
                ? "border-accent bg-accent text-white"
                : "border-border text-muted hover:text-foreground"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => setSelectedId(item.id)}
            className="card overflow-hidden p-0 text-left transition hover:border-accent"
          >
            <div
              className="flex aspect-video items-center justify-center text-5xl"
              style={{ background: item.gradient }}
            >
              ▶
            </div>
            <div className="p-4">
              <h3 className="font-display text-lg font-semibold">
                {item.title}
              </h3>
              <p className="mt-1 text-sm text-muted">
                {item.category} • {item.views} views
              </p>
            </div>
          </button>
        ))}
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setSelectedId(null)}
        >
          <button
            onClick={() => setSelectedId(null)}
            className="absolute right-6 top-6 text-3xl text-foreground"
            aria-label="Close"
          >
            ✕
          </button>
          <div
            className="w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="flex aspect-video w-full items-center justify-center rounded-xl text-7xl"
              style={{ background: selected.gradient }}
            >
              ▶
            </div>
            <h3 className="mt-4 font-display text-2xl font-semibold">
              {selected.title}
            </h3>
            <p className="text-sm text-muted">
              {selected.category} • {selected.views} views
            </p>
          </div>
        </div>
      )}
    </>
  );
}