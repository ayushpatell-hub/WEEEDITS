"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const clips = [
  { w: "w-24", c: "bg-red-500/50" },
  { w: "w-16", c: "bg-rose-400/40" },
  { w: "w-32", c: "bg-red-400/45" },
  { w: "w-20", c: "bg-orange-400/40" },
  { w: "w-28", c: "bg-red-500/50" },
  { w: "w-14", c: "bg-rose-400/40" },
];

const clipsB = [
  { w: "w-20", c: "bg-sky-400/30" },
  { w: "w-32", c: "bg-indigo-400/30" },
  { w: "w-16", c: "bg-sky-400/30" },
  { w: "w-28", c: "bg-indigo-400/30" },
  { w: "w-20", c: "bg-sky-400/30" },
];

const wave = [30, 55, 40, 75, 50, 85, 35, 65, 45, 90, 40, 60, 30, 70, 50, 80, 38, 62, 48, 72, 34, 58, 44, 68, 36, 78];

function EditorScene() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -left-32 top-10 h-96 w-96 rounded-full bg-accent/15 blur-[120px]" />
      <div className="absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-indigo-500/10 blur-[120px]" />

      <div className="absolute left-1/2 top-1/2 w-[min(1100px,130vw)] -translate-x-1/2 -translate-y-1/2 opacity-40 [transform:translate(-50%,-50%)_perspective(1400px)_rotateX(8deg)]">
        <div className="rounded-2xl border border-white/10 bg-[#0f0f12] p-3 shadow-2xl">
          <div className="mb-3 flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
            <span className="ml-3 text-[10px] tracking-widest text-white/30">
              WEEEDITS STUDIO - project_final_cut
            </span>
          </div>

          <div className="grid grid-cols-[1fr_2fr_1fr] gap-3">
            <div className="rounded-lg border border-white/5 bg-white/[0.03] p-3">
              <p className="mb-2 text-[9px] uppercase tracking-widest text-white/30">Media</p>
              <div className="grid grid-cols-2 gap-2">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="aspect-video rounded bg-gradient-to-br from-red-500/30 to-zinc-800" />
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-white/5 bg-black/40 p-3">
              <div className="relative flex aspect-video items-center justify-center rounded bg-gradient-to-br from-red-900/50 via-zinc-900 to-indigo-900/40">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white/60">▶</div>
                <span className="absolute bottom-2 right-3 text-[10px] text-white/40">00:01:24:08</span>
              </div>
            </div>

            <div className="rounded-lg border border-white/5 bg-white/[0.03] p-3">
              <p className="mb-2 text-[9px] uppercase tracking-widest text-white/30">Color</p>
              {[70, 45, 85, 55].map((v, i) => (
                <div key={i} className="mb-2.5 h-1.5 rounded-full bg-white/10">
                  <div className="h-1.5 rounded-full bg-accent/60" style={{ width: `${v}%` }} />
                </div>
              ))}
            </div>
          </div>

          <div className="relative mt-3 rounded-lg border border-white/5 bg-white/[0.02] p-3">
            <div className="absolute bottom-3 top-3 left-[42%] w-px bg-accent">
              <span className="absolute -left-1 -top-1 h-2 w-2 rounded-full bg-accent" />
            </div>
            <div className="mb-2 flex gap-1.5">
              {clips.map((x, i) => (
                <div key={i} className={`h-6 rounded ${x.w} ${x.c}`} />
              ))}
            </div>
            <div className="mb-2 flex gap-1.5 pl-8">
              {clipsB.map((x, i) => (
                <div key={i} className={`h-6 rounded ${x.w} ${x.c}`} />
              ))}
            </div>
            <div className="flex h-8 items-center gap-1">
              {wave.map((h, i) => (
                <div key={i} className="w-1.5 rounded bg-white/20" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>
        </div>
        <div className="mx-auto h-3 w-[110%] -translate-x-[4.5%] rounded-b-3xl bg-gradient-to-b from-zinc-700/40 to-zinc-900/10" />
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/40 to-background/80" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/70" />
    </div>
  );
}

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
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4">
      <EditorScene />

      <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-surface/70 p-8 shadow-2xl shadow-black/60 backdrop-blur-xl">
        <div className="text-center">
          <p className="font-display text-2xl font-bold tracking-tight">
            WEEE<span className="text-accent">DITS</span>
          </p>
          <p className="mt-1 text-xs uppercase tracking-[0.3em] text-muted">
            Admin Studio
          </p>
        </div>

        <h1 className="mt-6 text-center font-display text-3xl font-bold">
          Welcome back
        </h1>
        <p className="mt-1 text-center text-sm text-muted">
          Sign in to manage projects, clients and requests.
        </p>

        {notAdmin ? (
          <div className="mt-6 text-center">
            <p className="text-sm text-muted">This account is not an admin.</p>
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

        <p className="mt-6 text-center text-xs text-muted">
          Authorized admins only
        </p>
      </div>
    </div>
  );
}