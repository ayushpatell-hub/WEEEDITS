import { stats } from "@/data/site";

export default function Stats() {
  return (
    <section className="border-y border-border bg-surface">
      <div className="container-x grid grid-cols-2 gap-8 py-12 md:grid-cols-4">
        {stats.map((item) => (
          <div key={item.label} className="text-center">
            <p className="font-display text-4xl font-bold text-accent">
              {item.value}
            </p>
            <p className="mt-1 text-sm text-muted">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}