"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { api } from "@/lib/api";
import StatusBadge from "@/components/dashboard/StatusBadge";
import ChatBox from "@/components/dashboard/ChatBox";

interface RequestItem {
  id: string;
  title: string;
  service: string;
  description: string;
  budget: string | null;
  deadline: string | null;
  status: string;
  created_at: string;
}

export default function RequestDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [request, setRequest] = useState<RequestItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get<{ request: RequestItem }>(`/requests/${id}`)
      .then((d) => setRequest(d.request))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="text-muted">Loading...</p>;

  if (error || !request) {
    return (
      <div className="space-y-4">
        <p className="text-accent">{error || "Request not found"}</p>
        <Link href="/dashboard/requests" className="text-sm text-muted">
          Back to requests
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link href="/dashboard/requests" className="text-sm text-muted">
        &larr; Back to requests
      </Link>

      <div className="card space-y-4 p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="font-display text-3xl font-bold">{request.title}</h1>
            <p className="mt-1 text-sm text-muted">{request.service}</p>
          </div>
          <StatusBadge status={request.status} />
        </div>

        <p className="whitespace-pre-wrap text-foreground">{request.description}</p>

        <div className="grid gap-4 border-t border-border pt-4 text-sm sm:grid-cols-3">
          <div>
            <p className="text-muted">Budget</p>
            <p>{request.budget || "-"}</p>
          </div>
          <div>
            <p className="text-muted">Deadline</p>
            <p>
              {request.deadline
                ? new Date(request.deadline).toLocaleDateString()
                : "-"}
            </p>
          </div>
          <div>
            <p className="text-muted">Created</p>
            <p>{new Date(request.created_at).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      <ChatBox requestId={request.id} />
    </div>
  );
}