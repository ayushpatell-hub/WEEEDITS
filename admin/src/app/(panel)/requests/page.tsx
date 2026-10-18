"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";

type RequestItem = {
  id: string;
  title: string;
  service: string;
  budget: string | number | null;
  status: string;
  created_at: string;
};

const filters = ["all", "pending", "in_progress", "review", "completed", "cancelled"];

const badge: Record<string, string> = {
  pending: "bg-amber-500/15 text-amber-400",
  in_progress: "bg-blue-500/15 text-blue-400",
  review: "bg-purple-500/15 text-purple-400",
  completed: "bg-green-500/15 text-green-400",
  cancelled: "bg-zinc-500/15 text-zinc-400",
};

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export default function RequestsPage() {
  const [items, setItems] = useState<RequestItem[]>([]);
  const [active, setActive] = useState("all");
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const r = await api("/requests");
        const list = r?.requests ?? r ?? [];
        setItems(Array.isArray(list) ? list : []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load");
      }
      setLoading(false);
    };
    load();
  }, []);

  const count = (f: string) =>
    f === "all" ? items.length : items.filter((i) => i.status === f).length;

  const q = search.trim().toLowerCase();
  const shown = items.filter(
    (i) =>
      (active === "all" || i.status === active) &&
      (!q || `${i.title} ${i.service}`.toLowerCase().includes(q))
  );

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-accent">
        Projects
      </p>
      <h1 className="font-display text-3xl font-bold md:text-4xl">Requests</h1>
      <p className="mt-1 text-muted">All client requests. {items.length} total.</p>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by title or service..."
        className="input mt-6 max-w-md"
      />

      <div className="mt-4 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={`rounded-full border px-4 py-1.5 text-sm capitalize transition ${
              active === f
                ? "border-accent bg-accent text-white"
                : "border-border bg-surface text-muted hover:text-foreground"
            }`}
          >
            {f.replace("_", " ")}
            <span className="ml-2 text-xs opacity-70">{count(f)}</span>
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-3">
        {loading && <p className="text-muted">Loading...</p>}
        {error && <p className="text-accent">{error}</p>}
        {!loading && !error && shown.length === 0 && (
          <div className="card p-10 text-center">
            <div className="text-4xl">📥</div>
            <p className="mt-3 font-display text-lg font-semibold">No requests found</p>
            <p className="mt-1 text-sm text-muted">
              Requests from the client dashboard will appear here.
            </p>
          </div>
        )}
        {shown.map((r) => (
          <Link
            key={r.id}
            href={`/requests/${r.id}`}
            className="card flex flex-col gap-3 p-5 transition hover:border-accent/60 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="min-w-0">
              <p className="truncate font-display text-lg font-semibold">{r.title}</p>
              <p className="text-sm text-muted">
                {r.service}
                {r.budget ? ` · ₹${r.budget}` : ""} · {formatDate(r.created_at)}
              </p>
            </div>
            <span
              className={`w-fit shrink-0 rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                badge[r.status] ?? "bg-surface-2 text-muted"
              }`}
            >
              {r.status.replace("_", " ")}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}