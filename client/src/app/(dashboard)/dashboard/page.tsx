"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import StatusBadge from "@/components/dashboard/StatusBadge";

interface RequestItem {
  id: string;
  title: string;
  service: string;
  status: string;
  created_at: string;
}

export default function DashboardHome() {
  const [requests, setRequests] = useState<RequestItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get<{ requests: RequestItem[] }>("/requests")
      .then((data) => setRequests(data.requests))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const count = (s: string) => requests.filter((r) => r.status === s).length;

  const stats = [
    { label: "Total", value: requests.length },
    { label: "Pending", value: count("pending") },
    { label: "In Progress", value: count("in_progress") },
    { label: "Completed", value: count("completed") },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold">Dashboard</h1>
        <Link href="/dashboard/requests/new" className="btn-primary">
          New Request
        </Link>
      </div>

      {error && <p className="text-sm text-accent">{error}</p>}

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="card p-5">
            <p className="text-sm text-muted">{s.label}</p>
            <p className="mt-2 font-display text-3xl font-bold">
              {loading ? "-" : s.value}
            </p>
          </div>
        ))}
      </div>

      <div className="card p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold">Recent Requests</h2>
          <Link href="/dashboard/requests" className="text-sm text-accent">
            View all
          </Link>
        </div>

        {loading ? (
          <p className="text-muted">Loading...</p>
        ) : requests.length === 0 ? (
          <p className="text-muted">No requests yet.</p>
        ) : (
          <ul className="divide-y divide-border">
            {requests.slice(0, 5).map((r) => (
              <li key={r.id}>
                <Link
                  href={`/dashboard/requests/${r.id}`}
                  className="flex items-center justify-between gap-4 py-3"
                >
                  <div className="min-w-0">
                    <p className="truncate font-medium">{r.title}</p>
                    <p className="text-sm text-muted">{r.service}</p>
                  </div>
                  <StatusBadge status={r.status} />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}