"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

type Inquiry = {
  id: string;
  name: string;
  email: string;
  phone: string;
  brand: string;
  client_type: string;
  service: string;
  category: string;
  title: string;
  location: string;
  deadline: string;
  budget: string;
  description: string;
  links: string;
  details: Record<string, string>;
  created_at: string;
};

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export default function InquiriesPage() {
  const [list, setList] = useState<Inquiry[]>([]);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const r = await api("/admin/inquiries");
        setList(Array.isArray(r) ? r : []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load");
      }
      setLoading(false);
    };
    load();
  }, []);

  if (loading) return <p className="text-muted">Loading...</p>;
  if (error) return <p className="text-accent">{error}</p>;

  const q = search.trim().toLowerCase();
  const shown = list.filter(
    (i) =>
      !q ||
      [i.name, i.email, i.service, i.title, i.brand]
        .join(" ")
        .toLowerCase()
        .includes(q)
  );

  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-widest text-accent">
        Leads
      </p>
      <h1 className="font-display text-3xl font-bold md:text-4xl">Inquiries</h1>
      <p className="mt-1 text-muted">
        Project requests from the website form. {list.length} total.
      </p>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name, email, service..."
        className="input mt-6 max-w-md"
      />

      {shown.length === 0 && (
        <p className="mt-8 text-center text-sm text-muted">No inquiries found.</p>
      )}

      <div className="mt-6 space-y-3">
        {shown.map((i) => {
          const isOpen = open === i.id;
          const extra = Object.entries(i.details || {}).filter(([, v]) => v);
          return (
            <div key={i.id} className="card overflow-hidden">
              <button
                onClick={() => setOpen(isOpen ? null : i.id)}
                className="flex w-full items-center justify-between gap-4 p-5 text-left"
              >
                <div className="min-w-0">
                  <p className="truncate font-display text-lg font-semibold">
                    {i.title}
                  </p>
                  <p className="truncate text-sm text-muted">
                    {i.name} · {i.service}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-sm">{i.budget || "No budget"}</p>
                  <p className="text-xs text-muted">{formatDate(i.created_at)}</p>
                </div>
              </button>

              {isOpen && (
                <div className="space-y-3 border-t border-border p-5 text-sm">
                  <p className="text-muted">{i.description}</p>
                  <div className="grid gap-2 sm:grid-cols-2">
                    <p><span className="text-muted">Email: </span>{i.email}</p>
                    {i.phone && <p><span className="text-muted">Phone: </span>{i.phone}</p>}
                    {i.brand && <p><span className="text-muted">Brand: </span>{i.brand}</p>}
                    {i.client_type && <p><span className="text-muted">Client type: </span>{i.client_type}</p>}
                    {i.location && <p><span className="text-muted">Location: </span>{i.location}</p>}
                    {i.deadline && <p><span className="text-muted">Deadline: </span>{i.deadline}</p>}
                    {i.links && <p className="break-all"><span className="text-muted">Links: </span>{i.links}</p>}
                    {extra.map(([k, v]) => (
                      <p key={k}>
                        <span className="text-muted">{k}: </span>
                        {v}
                      </p>
                    ))}
                  </div>
                  <a
                    href={`mailto:${i.email}?subject=${encodeURIComponent("Re: " + i.title)}`}
                    className="btn-primary !py-2 text-sm"
                  >
                    Reply by email
                  </a>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}