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

const filters = [
  "all",
  "pending",
  "in_progress",
  "review",
  "completed",
  "cancelled",
];

export default function RequestsPage() {
  const [items, setItems] = useState<RequestItem[]>([]);
  const [active, setActive] = useState("all");
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

  const shown =
    active === "all" ? items : items.filter((i) => i.status === active);

  return (
    <div>
      <h1 className="font-display text-3xl font-bold">Requests</h1>
      <p className="mt-1 text-muted">All client requests.</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={`rounded-full border px-4 py-1.5 text-sm capitalize transition ${
              active === f
                ? "border-accent bg-accent text-white"
                : "border-border text-muted hover:text-foreground"
            }`}
          >
            {f.replace("_", " ")}
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-3">
        {loading && <p className="text-muted">Loading...</p>}
        {error && <p className="text-accent">{error}</p>}
        {!loading && !error && shown.length === 0 && (
          <p className="text-sm text-muted">No requests found.</p>
        )}
        {shown.map((r) => (
          <Link
            key={r.id}
            href={`/requests/${r.id}`}
            className="card flex flex-col gap-2 transition hover:border-accent sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="font-display font-semibold">{r.title}</p>
              <p className="text-sm text-muted">
                {r.service}
                {r.budget ? ` • ₹${r.budget}` : ""} •{" "}
                {new Date(r.created_at).toLocaleDateString()}
              </p>
            </div>
            <span className="text-xs uppercase tracking-widest text-muted">
              {r.status.replace("_", " ")}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}