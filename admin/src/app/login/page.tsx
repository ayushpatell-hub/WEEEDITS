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
];

const clipsB = [
  { w: "w-20", c: "bg-sky-400/50" },
  { w: "w-32", c: "bg-indigo-400/50" },
  { w: "w-16", c: "bg-sky-400/50" },
  { w: "w-28", c: "bg-indigo-400/50" },
];

const wave = [30, 55, 40, 75, 50, 85, 35, 65, 45, 90, 40, 60, 30, 70, 50, 80, 38, 62, 48, 72, 34, 58, 44, 68];

const features = [
  { icon: "📥", text: "Manage client requests in one place" },
  { icon: "💬", text: "Chat with clients in real time" },
  { icon: "📈", text: "Track growth with simple analytics" },
];

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
          <div className="mb-2 flex gap-1.5 overflow-hidden">
            {clipsA.map((x, i) => (
              <div key={i} className={`h-6 shrink-0 rounded ${x.w} ${x.c}`} />
            ))}
          </div>
          <div className="mb-2 flex gap-1.5 overflow-hidden pl-8">
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

function BrandPanel() {
  return (
    <div className="relative hidden overflow-hidden border-r border-white/10 bg-[#0c0c0f] lg:flex lg:w-1/2">
      <div className="absolute -left-24 top-0 h-[28rem] w-[28rem] rounded-full bg-accent/25 blur-[130px]" />
      <div className="absolute -right-20 bottom-0 h-[28rem] w-[28rem] rounded-full bg-indigo-500/20 blur-[130px]" />

      <div className="relative z-10 flex w-full flex-col p-12">
        <p className="font-display text-2xl font-bold tracking-tight">
          WEEE<span className="text-accent">DITS</span>
          <span className="ml-3 text-xs font-normal uppercase tracking-[0.3em] text-muted">
            Admin Studio
          </span>
        </p>

        <h2 className="mt-14 max-w-md font-display text-5xl font-bold leading-tight">
          Cut. Review. <span className="text-accent">Deliver.</span>
        </h2>
        <p className="mt-4 max-w-md text-muted">
          Your control room for every edit, every campaign and every client.
        </p>

        <ul className="mt-8 space-y-3">
          {features.map((f) => (
            <li key={f.text} className="flex items-center gap-3 text-sm text-foreground/90">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5">
                {f.icon}
              </span>
              {f.text}
            </li>
          ))}
        </ul>
      </div>

      <Laptop className="absolute -bottom-16 left-16 w-[640px] max-w-none -rotate-3 opacity-90 xl:left-24" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0c0c0f] to-transparent" />
    </div>
  );
}

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export default function AdminLoginPage() {
  const { user, isAdmin, loading, login, logout } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [touched, setTouched] = useState({ email: false, password: false });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && user && isAdmin) router.replace("/");
  }, [loading, user, isAdmin, router]);

  const emailErr =
    touched.email && !email
      ? "Email is required"
      : touched.email && !emailOk(email)
      ? "Enter a valid email address"
      : "";
  const passErr = touched.password && !password ? "Password is required" : "";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    setError("");
    if (!emailOk(email) || !password) return;
    setBusy(true);
    try {
      await login(email, password);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Login failed";
      setError(
        msg.toLowerCase().includes("invalid")
          ? "Wrong email or password. Please try again."
          : msg
      );
    }
    setBusy(false);
  };

  const notAdmin = !loading && user && !isAdmin;
  const fieldClass = (bad: boolean) =>
    `input !h-12 ${bad ? "!border-accent" : ""}`;

  return (
    <div className="flex min-h-screen bg-background">
      <BrandPanel />

      <div className="relative flex flex-1 items-center justify-center overflow-hidden px-4 py-10">
        <div className="absolute -right-20 top-0 h-80 w-80 rounded-full bg-accent/15 blur-[120px]" />
        <div className="absolute -left-10 bottom-0 h-72 w-72 rounded-full bg-indigo-500/10 blur-[120px]" />

        <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-surface/60 p-8 shadow-2xl shadow-black/70 backdrop-blur-xl">
          <div className="text-center lg:hidden">
            <p className="font-display text-2xl font-bold tracking-tight">
              WEEE<span className="text-accent">DITS</span>
            </p>
            <p className="mt-1 text-xs uppercase tracking-[0.3em] text-muted">
              Admin Studio
            </p>
          </div>

          <h1 className="mt-6 font-display text-3xl font-bold lg:mt-0">
            Welcome back
          </h1>
          <p className="mt-1 text-sm text-muted">
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
            <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
              <div>
                <label className="mb-2 block text-sm text-muted">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setTouched((t) => ({ ...t, email: true }))}
                  placeholder="admin@example.com"
                  autoComplete="email"
                  className={fieldClass(!!emailErr)}
                />
                {emailErr && <p className="mt-1.5 text-xs text-accent">{emailErr}</p>}
              </div>

              <div>
                <label className="mb-2 block text-sm text-muted">Password</label>
                <div className="relative">
                  <input
                    type={show ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={() => setTouched((t) => ({ ...t, password: true }))}
                    placeholder="Your password"
                    autoComplete="current-password"
                    className={`${fieldClass(!!passErr)} !pr-14`}
                  />
                  <button
                    type="button"
                    onClick={() => setShow(!show)}
                    aria-label={show ? "Hide password" : "Show password"}
                    className="absolute right-1 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-lg text-muted transition hover:text-foreground"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
                      <circle cx="12" cy="12" r="3" />
                      {!show && <path d="M4 4l16 16" />}
                    </svg>
                  </button>
                </div>
                {passErr && <p className="mt-1.5 text-xs text-accent">{passErr}</p>}
              </div>

              {error && (
                <div className="rounded-xl border border-accent/40 bg-accent/10 px-4 py-3 text-sm text-accent">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={busy}
                className="btn-primary !h-12 w-full disabled:opacity-60"
              >
                {busy ? "Signing in..." : "Login"}
              </button>
            </form>
          )}

          <p className="mt-6 text-center text-xs text-muted">
            Authorized admins only
          </p>
        </div>
      </div>
    </div>
  );
}