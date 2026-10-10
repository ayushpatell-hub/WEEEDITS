"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const clipsA = [
  { w: "w-24", c: "bg-red-500/70" },
  { w: "w-16", c: "bg-rose-400/60" },
  { w: "w-32", c: "bg-red-400/65" },
  { w: "w-20", c: "bg-orange-400/60" },
  { w: "w-28", c: "bg-red-500/70" },
  { w: "w-14", c: "bg-rose-400/60" },
];

const clipsB = [
  { w: "w-20", c: "bg-sky-400/50" },
  { w: "w-32", c: "bg-indigo-400/50" },
  { w: "w-16", c: "bg-sky-400/50" },
  { w: "w-28", c: "bg-indigo-400/50" },
  { w: "w-20", c: "bg-sky-400/50" },
];

const wave = [30, 55, 40, 75, 50, 85, 35, 65, 45, 90, 40, 60, 30, 70, 50, 80, 38, 62, 48, 72, 34, 58, 44, 68, 36, 78];

function Laptop({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <div className="rounded-2xl border border-white/15 bg-[#121216] p-3 shadow-2xl shadow-black/60">
        <div className="mb-3 flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
          <span className="ml-3 text-[10px] tracking-widest text-white/50">
            WEEEDITS STUDIO - final_cut
          </span>
        </div>

        <div className="grid grid-cols-[1fr_2fr_1fr] gap-3">
          <div className="rounded-lg border border-white/10 bg-white/[0.05] p-3">
            <p className="mb-2 text-[9px] uppercase tracking-widest text-white/50">Media</p>
            <div className="grid grid-cols-2 gap-2">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="aspect-video rounded bg-gradient-to-br from-red-500/60 to-zinc-800" />
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-black/40 p-3">
            <div className="relative flex aspect-video items-center justify-center rounded bg-gradient-to-br from-red-800/70 via-zinc-900 to-indigo-800/60">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-white/80">▶</div>
              <span className="absolute bottom-2 right-3 text-[10px] text-white/60">00:01:24:08</span>
            </div>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/[0.05] p-3">
            <p className="mb-2 text-[9px] uppercase tracking-widest text-white/50">Color</p>
            {[70, 45, 85, 55].map((v, i) => (
              <div key={i} className="mb-2.5 h-1.5 rounded-full bg-white/15">
                <div className="h-1.5 rounded-full bg-accent" style={{ width: `${v}%` }} />
              </div>
            ))}
          </div>
        </div>

        <div className="relative mt-3 rounded-lg border border-white/10 bg-white/[0.04] p-3">
          <div className="absolute bottom-3 left-[42%] top-3 w-px bg-accent">
            <span className="absolute -left-1 -top-1 h-2 w-2 rounded-full bg-accent" />
          </div>
          <div className="mb-2 flex gap-1.5">
            {clipsA.map((x, i) => (
              <div key={i} className={`h-6 shrink-0 rounded ${x.w} ${x.c}`} />
            ))}
          </div>
          <div className="mb-2 flex gap-1.5 pl-8">
            {clipsB.map((x, i) => (
              <div key={i} className={`h-6 shrink-0 rounded ${x.w} ${x.c}`} />
            ))}
          </div>
          <div className="flex h-8 items-center gap-1 overflow-hidden">
            {wave.map((h, i) => (
              <div key={i} className="w-1.5 shrink-0 rounded bg-white/30" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto h-3 w-[104%] -translate-x-[2%] rounded-b-3xl bg-gradient-to-b from-zinc-600/50 to-zinc-900/10" />
    </div>
  );
}

function EditorScene() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -left-24 top-0 h-[28rem] w-[28rem] rounded-full bg-accent/25 blur-[130px]" />
      <div className="absolute -right-24 bottom-0 h-[28rem] w-[28rem] rounded-full bg-indigo-500/20 blur-[130px]" />
      <div className="absolute left-1/3 top-1/2 h-72 w-72 rounded-full bg-rose-500/10 blur-[110px]" />

      <Laptop className="absolute -left-20 top-[8%] w-[640px] max-w-none -rotate-6 opacity-90 md:-left-10" />
      <Laptop className="absolute -right-24 bottom-[6%] hidden w-[560px] max-w-none rotate-6 opacity-80 md:block" />

      <div className="absolute inset-0 bg-background/45" />
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/50" />
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

      <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-surface/60 p-8 shadow-2xl shadow-black/70 backdrop-blur-xl">
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
              <label className="mb-2 block