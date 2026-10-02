export default function Showreel() {
  return (
    <section className="container-x py-24">
      <div className="mb-10 text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">
          Showreel
        </p>
        <h2 className="font-display text-3xl font-bold md:text-5xl">
          See Our Best Work
        </h2>
      </div>

      <div className="relative mx-auto aspect-video max-w-4xl overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-accent/30 via-surface to-background">
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            aria-label="Play showreel"
            className="flex h-20 w-20 items-center justify-center rounded-full bg-accent text-3xl text-white transition-transform hover:scale-110"
          >
            ▶
          </button>
        </div>
        <p className="absolute bottom-4 left-5 text-sm text-muted">
          WEEEDITS Showreel 2026
        </p>
      </div>
    </section>
  );
}