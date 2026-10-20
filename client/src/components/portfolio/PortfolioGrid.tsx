"use client";

import { useEffect, useState } from "react";
import { categories, portfolio } from "@/data/portfolio";

const tones = [
  ["#2f5d43", "#16231b"],
  ["#3d7556", "#2f5d43"],
  ["#16231b", "#3d7556"],
  ["#5d8a6e", "#2f5d43"],
  ["#2f5d43", "#5d8a6e"],
  ["#1f3a2b", "#3d7556"],
];

const toneFor = (index: number) => {
  const [a, b] = tones[index % tones.length];
  return `linear-gradient(135deg, ${a}, ${b})`;
};

function PlayMark({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#eef1e6" aria-hidden="true">
      <path d="M8 5.5 L19 12 L8 18.5 Z" />
    </svg>
  );
}

export default function PortfolioGrid() {
  const filters = ["All", ...categories.filter((c) => c !== "All")];
  const [active, setActive] = useState("All");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const items =
    active === "All"
      ? portfolio
      : portfolio.filter((p) => p.category === active);

  const selected = portfolio.find((p) => p.id === selectedId) || null;
  const selectedIndex = selected ? portfolio.findIndex((p) => p.id === selected.id) : 0;

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
      <div className="flex flex-wrap gap-x-6 gap-y-2 py-6 font-mono text-sm uppercase">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={`underline-offset-8 transition-colors ${
              active === f
                ? "text-foreground underline decoration-1"
                : "text-muted hover:text-foreground"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div>
        {items.map((item, i) => {
          const realIndex = portfolio.findIndex((p) => p.id === item.id);
          return (
            <article
              key={item.id}
              className="grid gap-6 border-t border-foreground py-10 md:grid-cols-[1fr_1.15fr] md:gap-10"
            >
              <div className="flex flex-col justify-between gap-10 md:min-h-[420px]">
                <div>
                  <p className="font-mono text-xs text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 font-display text-3xl font-extrabold uppercase leading-[1] tracking-[-0.05em] sm:text-4xl lg:text-5xl">
                    {item.title}
                  </h3>
                </div>

                <div>
                  <p className="max-w-xs font-mono text-[13px] leading-relaxed text-foreground">
                    {item.category} &bull; {item.views}
                  </p>
                  <button
                    onClick={() => setSelectedId(item.id)}
                    className="mt-6 border border-foreground px-5 py-3 font-mono text-sm text-foreground transition-colors hover:bg-foreground hover:text-background"
                  >
                    Watch project {"\u2192"}
                  </button>
                </div>
              </div>

              <button
                onClick={() => setSelectedId(item.id)}
                aria-label={`Open ${item.title}`}
                className="group relative block aspect-[4/3] w-full overflow-hidden"
                style={{ background: toneFor(realIndex) }}
              >
                <span className="absolute inset-0 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                  <PlayMark size={72} />
                </span>
                <span className="absolute bottom-4 left-4 font-mono text-xs uppercase tracking-[0.2em] text-[#eef1e6]/80">
                  {item.category}
                </span>
              </button>
            </article>
          );
        })}
        <div className="border-t border-foreground" />
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-foreground/90 p-4"
          onClick={() => setSelectedId(null)}
        >
          <button
            onClick={() => setSelectedId(null)}
            className="absolute right-6 top-6 font-mono text-sm uppercase text-background"
            aria-label="Close"
          >
            Close [x]
          </button>
          <div
            className="w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="flex aspect-video w-full items-center justify-center"
              style={{ background: toneFor(selectedIndex) }}
            >
              <PlayMark size={96} />
            </div>
            <h3 className="mt-4 font-display text-2xl font-extrabold uppercase tracking-[-0.04em] text-background">
              {selected.title}
            </h3>
            <p className="mt-1 font-mono text-sm text-background/70">
              {selected.category} &bull; {selected.views}
            </p>
          </div>
        </div>
      )}
    </>
  );
}