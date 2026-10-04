"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import StatsCard from "@/components/StatsCard";

type Stats = {
  totalRequests: number;
  totalClients: number;
  totalContacts: number;
  byStatus?: unknown;
  byService?: unknown;
  perMonth?: unknown;
};

const toEntries = (v: unknown): [string, number][] => {
  if (!v) return [];
  if (Array.isArray(v)) {
    return v.map((x) => {
      const o = x as Record<string, unknown>;
      const label = String(
        o.month ?? o.label ?? o.name ?? o.service ?? o.status ?? ""
      );
      const num = Number(o.count ?? o.total ?? o.value ?? 0);
      return [label, num] as [string, number];
    });
  }
  return Object.entries(v as Record<string, unknown>).map(
    ([k, n]) => [k, Number(n)] as [string, number]
  );
};

function BarList({
  title,
  data,
}: {
  title: string;
  data: [string, number][];
}) {
  const max = Math.max(1, ...data.map(([, n]) => n));
  return (
    <div className="card">
      <h2 className="font-display text-lg font-semibold">{title}</h2>
      <div className="mt-4 space-y-3">
        {data.length === 0 && <p className="text-sm text-muted">No data yet.</p>}
        {data.map(([label, n]) => (
          <div key={label}>
            <div className="mb-1 flex justify-between text-sm">
              <span className="capitalize text-muted">
                {label.replace("_", " ")}
              </span>
              <span>{n}</span>
            </div>
            <div className="h-2 w-full rounded-full bg-surface-2">
              <div
                className="h-2 rounded-full bg-accent"
                style={{ width: `${(n / max) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AnalyticsPage() {
  const [stats, setStats] = useState<Stats | null>(null);
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
      setLoading(false);
    };
    load();
  }, []);

  if (loading) return <p className="text-muted">Loading...</p>;
  if (error) return <p className="text-accent">{error}</p>;

  const byStatus = toEntries(stats?.byStatus);
  const byService = toEntries(stats?.byService);
  const perMonth = toEntries(stats?.perMonth).sort((a, b) =>
    a[0].localeCompare(b[0])
  );

  return (
    <div>
      <h1 className="font-display text-3xl font-bold">Analytics</h1>
      <p className="mt-1 text-muted">Numbers about your business.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <StatsCard label="Requests" value={stats?.totalRequests ?? 0} emoji="📥" />
        <StatsCard label="Clients" value={stats?.totalClients ?? 0} emoji="👥" />
        <StatsCard label="Contacts" value={stats?.totalContacts ?? 0} emoji="✉️" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <BarList title="Requests by Status" data={byStatus} />
        <BarList title="Requests by Service" data={byService} />
      </div>

      <div className="mt-6">
        <BarList title="Requests per Month" data={perMonth} />
      </div>
    </div>
  );
}