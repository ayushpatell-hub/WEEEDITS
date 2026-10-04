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
      <h1 className="font-display text-3xl font-bold">Clients</h1>
      <p className="mt-1 text-muted">All registered clients.</p>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name or email"
        className="input mt-6 max-w-md"
      />

      <div className="mt-6 space-y-3">
        {loading && <p className="text-muted">Loading...</p>}
        {error && <p className="text-accent">{error}</p>}
        {!loading && !error && shown.length === 0 && (
          <p className="text-sm text-muted">No clients found.</p>
        )}
        {shown.map((c) => (
          <div
            key={c.id}
            className="card flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-2 font-display font-semibold uppercase">
                {(c.name || c.email).charAt(0)}
              </div>
              <div>
                <p className="font-display font-semibold">
                  {c.name || "No name"}
                </p>
                <p className="text-sm text-muted">{c.email}</p>
              </div>
            </div>
            <p className="text-xs uppercase tracking-widest text-muted">
              Joined {new Date(c.created_at).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}