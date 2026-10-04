"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function AdminLoginPage() {
  const { user, isAdmin, loading, login, logout } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && user && isAdmin) router.replace("/");
  }, [loading, user, isAdmin, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await login(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    }
    setBusy(false);
  };

  const notAdmin = !loading && user && !isAdmin;

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="card w-full max-w-md">
        <p className="text-center text-sm uppercase tracking-widest text-accent">
          WEEEDITS
        </p>
        <h1 className="mt-2 text-center font-display text-3xl font-bold">
          Admin Login
        </h1>

        {notAdmin ? (
          <div className="mt-6 text-center">
            <p className="text-sm text-muted">
              This account is not an admin.
            </p>
            <button onClick={() => logout()} className="btn-outline mt-4 w-full">
              Logout
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="mb-2 block text-sm text-muted">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="input"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm text-muted">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                className="input"
              />
            </div>
            {error && <p className="text-sm text-accent">{error}</p>}
            <button type="submit" disabled={busy} className="btn-primary w-full">
              {busy ? "Please wait..." : "Login"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}