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

export default function OverviewPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recent, setRecent] = useState<RequestItem[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const s = await api("/admin/stats");
        const r = await api("/requests");
        setStats(s?.stats ?? s);
        const list = r?.requests ?? r ?? [];
        setRecent(Array.isArray(list) ? list.slice(0, 5) : []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load");
      }
      setLoading(false);
    };
    load();
  }, []);

  if (loading) return <p className="text-muted">Loading...</p>;
  if (error) return <p className="text-accent">{error}</p>;

  return (
    <div>
      <h1 className="font-display text-3xl font-bold">Overview</h1>
      <p className="mt-1 text-muted">Welcome back to WEEEDITS admin.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <StatsCard label="Requests" value={stats?.totalRequests ?? 0} emoji="📥" />
        <StatsCard label="Clients" value={stats?.totalClients ?? 0} emoji="👥" />
        <StatsCard label="Contacts" value={stats?.totalContacts ?? 0} emoji="✉️" />
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {["pending", "in_progress", "review", "completed", "cancelled"].map(
          (s) => (
            <div key={s} className="card text-center">
              <p className="font-display text-2xl font-bold">
                {stats?.byStatus?.[s] ?? 0}
              </p>
              <p className="text-xs uppercase tracking-widest text-muted">
                {s.replace("_", " ")}
              </p>
            </div>
          )
        )}
      </div>

      <div className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold">Recent Requests</h2>
          <Link href="/requests" className="text-sm text-accent">
            View all
          </Link>
        </div>
        <div className="space-y-3">
          {recent.length === 0 && (
            <p className="text-sm text-muted">No requests yet.</p>
          )}
          {recent.map((r) => (
            <Link
              key={r.id}
              href={`/requests/${r.id}`}
              className="card flex items-center justify-between transition hover:border-accent"
            >
              <div>
                <p className="font-display font-semibold">{r.title}</p>
                <p className="text-sm text-muted">{r.service}</p>
              </div>
              <span className="text-xs uppercase tracking-widest text-muted">
                {r.status.replace("_", " ")}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}