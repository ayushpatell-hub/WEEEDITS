import { testimonials } from "@/data/testimonials";

export default function Testimonials() {
  return (
    <section className="py-20">
      <div className="container-x">
        <div className="mb-10 text-center">
          <p className="mb-2 text-sm uppercase tracking-widest text-accent">
            Testimonials
          </p>
          <h2 className="font-display text-3xl font-bold md:text-4xl">
            What Creators Say
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.id} className="card">
              <p className="text-accent">{"★".repeat(t.rating)}</p>
              <p className="mt-3 text-foreground">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-2 text-xl">
                  {t.emoji}
                </div>
                <div>
                  <p className="font-display text-sm font-semibold">
                    {t.name}
                  </p>
                  <p className="text-xs text-muted">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}