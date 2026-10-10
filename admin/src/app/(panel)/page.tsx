"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import StatsCard from "@/components/StatsCard";

type Stats = {
  totalRequests: number;
  totalClients: number;
  totalContacts: number;
  byStatus: Record<string, number>;
};

type RequestItem = {
  id: string;
  title: string;
  service: string;
  status: string;
  created_at: string;
};

const statusStyle: Record<string, { dot: string; badge: string }> = {
  pending: { dot: "bg-amber-400", badge: "bg-amber-500/15 text-amber-400" },
  in_progress: { dot: "bg-blue-400", badge: "bg-blue-500/15 text-blue-400" },
  review: { dot: "bg-purple-400", badge: "bg-purple-500/15 text-purple-400" },
  completed: { dot: "bg-green-400", badge: "bg-green-500/15 text-green-400" },
  cancelled: { dot: "bg-zinc-400", badge: "bg-zinc-500/15 text-zinc-400" },
};

const statuses = ["pending", "in_progress", "review", "completed", "cancelled"];

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export default function OverviewPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recent, setRecent] = useState<RequestItem[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const s = await api("/admin/stats");
        setStats(s?.stats ?? s);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load");
      }
      try {
        const r = await api("/requests");
        const list = r?.requests ?? r ?? [];
        setRecent(Array.isArray(list) ? list.slice(0, 6) : []);
      } catch {
        setRecent([]);
      }
      setLoading(false);
    };
    load();
  }, []);

  if (loading) return <p className="text-muted">Loading...</p>;
  if (error) return <p className="text-accent">{error}</p>;

  const total = stats?.totalRequests ?? 0;

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">
            Dashboard
          </p>
          <h1 className="font-display text-3xl font-bold md:text-4xl">
            Overview
          </h1>
          <p className="mt-1 text-muted">Welcome back to WEEEDITS admin.</p>
        </div>
        <Link href="/requests" className="btn-primary !py-2 text-sm">
          View Requests
        </Link>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <StatsCard label="Requests" value={total} emoji="📥" hint="All time" />
        <StatsCard
          label="Clients"
          value={stats?.totalClients ?? 0}
          emoji="👥"
          hint="Registered clients"
        />
        <StatsCard
          label="Contacts"
          value={stats?.totalContacts ?? 0}
          emoji="✉️"
          hint="Contact form messages"
        />
      </div>

      <div className="card mt-6 p-5">
        <h2 className="font-display text-lg font-semibold">Request Status</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {statuses.map((s) => {
            const n = stats?.byStatus?.[s] ?? 0;
            return (
              <div
                key={s}
                className="rounded-xl border border-border bg-surface-2 p-4"
              >
                <div className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${statusStyle[s].dot}`} />
                  <p className="text-xs uppercase tracking-widest text-muted">
                    {s.replace("_", " ")}
                  </p>
                </div>
                <p className="mt-2 font-display text-3xl font-bold">{n}</p>
                <div className="mt-3 h-1.5 w-full rounded-full bg-background">
                  <div
                    className={`h-1.5 rounded-full ${statusStyle[s].dot}`}
                    style={{ width: `${total ? (n / total) * 100 : 0}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="card mt-6 p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold">Recent Requests</h2>
          <Link href="/requests" className="text-sm text-accent hover:underline">
            View all
          </Link>
        </div>

        {recent.length === 0 && (
          <p className="py-6 text-center text-sm text-muted">
            No requests yet.
          </p>
        )}

        <div className="divide-y divide-border">
          {recent.map((r) => (
            <Link
              key={r.id}
              href={`/requests/${r.id}`}
              className="flex items-center justify-between gap-4 py-3 transition hover:opacity-80"
            >
              <div className="min-w-0">
                <p className="truncate font-display font-semibold">{r.title}</p>
                <p className="text-sm text-muted">
                  {r.service} · {formatDate(r.created_at)}
                </p>
              </div>
              <span
                className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                  statusStyle[r.status]?.badge ?? "bg-surface-2 text-muted"
                }`}
              >
                {r.status.replace("_", " ")}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}