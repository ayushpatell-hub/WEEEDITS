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
  deadline: string | null;
  created_at: string;
}

export default function MyRequestsPage() {
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold">My Requests</h1>
        <Link href="/dashboard/requests/new" className="btn-primary">
          New Request
        </Link>
      </div>

      {error && <p className="text-sm text-accent">{error}</p>}

      <div className="card p-5">
        {loading ? (
          <p className="text-muted">Loading...</p>
        ) : requests.length === 0 ? (
          <p className="text-muted">No requests yet.</p>
        ) : (
          <ul className="divide-y divide-border">
            {requests.map((r) => (
              <li key={r.id}>
                <Link
                  href={`/dashboard/requests/${r.id}`}
                  className="flex items-center justify-between gap-4 py-4"
                >
                  <div className="min-w-0">
                    <p className="truncate font-medium">{r.title}</p>
                    <p className="text-sm text-muted">
                      {r.service} · {new Date(r.created_at).toLocaleDateString()}
                    </p>
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