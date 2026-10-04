"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";

interface UserInfo {
  id: string;
  email: string;
  name: string | null;
  role: string;
  created_at: string;
}

export default function ProfilePage() {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        await api.post("/auth/register", {});
        const data = await api.get<{ user: UserInfo }>("/auth/me");
        setUser(data.user);
      } catch (err: any) {
        setError(err.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <p className="text-muted">Loading...</p>;

  if (error || !user) {
    return <p className="text-accent">{error || "Profile not found"}</p>;
  }

  const rows = [
    { label: "Name", value: user.name || "-" },
    { label: "Email", value: user.email },
    { label: "Role", value: user.role },
    {
      label: "Member since",
      value: new Date(user.created_at).toLocaleDateString(),
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-bold">Profile</h1>

      <div className="card divide-y divide-border">
        {rows.map((r) => (
          <div
            key={r.label}
            className="flex items-center justify-between gap-4 px-6 py-4"
          >
            <p className="text-sm text-muted">{r.label}</p>
            <p className="font-medium capitalize-none">{r.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}