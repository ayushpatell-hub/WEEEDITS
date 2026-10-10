type StatsCardProps = {
  label: string;
  value: number | string;
  emoji: string;
  hint?: string;
};

export default function StatsCard({ label, value, emoji, hint }: StatsCardProps) {
  return (
    <div className="card group relative overflow-hidden p-5 transition hover:border-accent/60">
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-accent/10 blur-2xl transition group-hover:bg-accent/20" />
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-muted">
            {label}
          </p>
          <p className="mt-2 font-display text-4xl font-bold">{value}</p>
          {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-surface-2 text-2xl">
          {emoji}
        </div>
      </div>
    </div>
  );
}