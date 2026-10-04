type StatsCardProps = {
  label: string;
  value: number | string;
  emoji: string;
};

export default function StatsCard({ label, value, emoji }: StatsCardProps) {
  return (
    <div className="card flex items-center gap-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-surface-2 text-2xl">
        {emoji}
      </div>
      <div>
        <p className="text-xs uppercase tracking-widest text-muted">{label}</p>
        <p className="font-display text-3xl font-bold">{value}</p>
      </div>
    </div>
  );
}