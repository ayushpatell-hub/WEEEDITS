"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { api } from "@/lib/api";
import ChatBox from "@/components/ChatBox";

type RequestDetail = {
  id: string;
  title: string;
  service: string;
  description: string;
  budget: string | number | null;
  deadline: string | null;
  status: string;
  created_at: string;
};

const statuses = ["pending", "in_progress", "review", "completed", "cancelled"];

export default function RequestDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const [item, setItem] = useState<RequestDetail | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const r = await api(`/requests/${id}`);
        setItem(r?.request ?? r);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load");
      }
      setLoading(false);
    };
    load();
  }, [id]);

  const changeStatus = async (status: string) => {
    if (!item || item.status === status) return;
    setSaving(true);
    setError("");
    try {
      await api(`/requests/${id}/status`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
      setItem({ ...item, status });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update");
    }
    setSaving(false);
  };

  if (loading) return <p className="text-muted">Loading...</p>;
  if (!item) return <p className="text-accent">{error || "Request not found"}</p>;

  return (
    <div>
      <Link href="/requests" className="text-sm text-muted hover:text-foreground">
        ← Back to requests
      </Link>

      <h1 className="mt-3 font-display text-3xl font-bold">{item.title}</h1>
      <p className="mt-1 text-muted">
        {item.service} • {new Date(item.created_at).toLocaleDateString()}
      </p>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="card">
            <h2 className="font-display text-lg font-semibold">Details</h2>
            <p className="mt-3 whitespace-pre-wrap text-sm text-muted">
              {item.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-6 text-sm">
              <div>
                <p className="text-xs uppercase tracking-widest text-muted">
                  Budget
                </p>
                <p>{item.budget ? `₹${item.budget}` : "Not set"}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-muted">
                  Deadline
                </p>
                <p>
                  {item.deadline
                    ? new Date(item.deadline).toLocaleDateString()
                    : "Not set"}
                </p>
              </div>
            </div>
          </div>

          <div className="card">
            <h2 className="font-display text-lg font-semibold">Status</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {statuses.map((s) => (
                <button
                  key={s}
                  disabled={saving}
                  onClick={() => changeStatus(s)}
                  className={`rounded-full border px-4 py-1.5 text-sm capitalize transition ${
                    item.status === s
                      ? "border-accent bg-accent text-white"
                      : "border-border text-muted hover:text-foreground"
                  }`}
                >
                  {s.replace("_", " ")}
                </button>
              ))}
            </div>
            {error && <p className="mt-3 text-sm text-accent">{error}</p>}
          </div>
        </div>

        <ChatBox requestId={item.id} />
      </div>
    </div>
  );
}