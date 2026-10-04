"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

type Contact = {
  id: string;
  name: string;
  email: string;
  service: string | null;
  message: string;
  created_at: string;
};

export default function ContactsPage() {
  const [items, setItems] = useState<Contact[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const r = await api("/admin/contacts");
        const list = r?.contacts ?? r ?? [];
        setItems(Array.isArray(list) ? list : []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load");
      }
      setLoading(false);
    };
    load();
  }, []);

  return (
    <div>
      <h1 className="font-display text-3xl font-bold">Contacts</h1>
      <p className="mt-1 text-muted">Messages from the website contact form.</p>

      <div className="mt-6 space-y-4">
        {loading && <p className="text-muted">Loading...</p>}
        {error && <p className="text-accent">{error}</p>}
        {!loading && !error && items.length === 0 && (
          <p className="text-sm text-muted">No contact messages yet.</p>
        )}
        {items.map((c) => (
          <div key={c.id} className="card">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-display font-semibold">{c.name}</p>
                <a
                  href={`mailto:${c.email}`}
                  className="text-sm text-accent"
                >
                  {c.email}
                </a>
              </div>
              <div className="text-xs uppercase tracking-widest text-muted sm:text-right">
                <p>{c.service || "General"}</p>
                <p>{new Date(c.created_at).toLocaleDateString()}</p>
              </div>
            </div>
            <p className="mt-4 whitespace-pre-wrap text-sm text-muted">
              {c.message}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}