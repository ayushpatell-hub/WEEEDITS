"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

type Client = {
  id: string;
  name: string | null;
  email: string;
  role: string;
  created_at: string;
};

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export default function ClientsPage() {
  const [items, setItems] = useState<Client[]>([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const r = await api("/admin/clients");
        const list = r?.clients ?? r ?? [];
        setItems(Array.isArray(list) ? list : []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load");
      }
      setLoading(false);
    };
    load();
  }, []);

  const q = search.trim().toLowerCase();
  const shown = items.filter(
    (c) =>
      (c.name ?? "").toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q)
  );

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-accent">
        People
      </p>
      <h1 className="font-display text-3xl font-bold md:text-4xl">Clients</h1>
      <p className="mt-1 text-muted">All registered clients. {items.length} total.</p>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name or email..."
        className="input mt-6 max-w-md"
      />

      {loading && <p className="mt-6 text-muted">Loading...</p>}
      {error && <p className="mt-6 text-accent">{error}</p>}
      {!loading && !error && shown.length === 0 && (
        <div className="card mt-6 p-10 text-center">
          <div className="text-4xl">👥</div>
          <p className="mt-3 font-display text-lg font-semibold">No clients found</p>
          <p className="mt-1 text-sm text-muted">
            Clients appear here after they sign up on the website.
          </p>
        </div>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {shown.map((c) => (
          <div key={c.id} className="card p-5 transition hover:border-accent/60">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent to-red-900 font-display text-lg font-bold uppercase text-white">
                {(c.name || c.email).charAt(0)}
              </div>
              <div className="min-w-0">
                <p className="truncate font-display font-semibold">
                  {c.name || "No name"}
                </p>
                <p className="truncate text-sm text-muted">{c.email}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
              <p className="text-xs uppercase tracking-widest text-muted">
                Joined {formatDate(c.created_at)}
              </p>
              <a
                href={`mailto:${c.email}`}
                className="text-sm text-accent hover:underline"
              >
                Email
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}