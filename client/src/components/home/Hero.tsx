import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-accent/20 blur-[140px]" />

      <div className="container-x relative flex min-h-[85vh] flex-col items-center justify-center py-24 text-center">
        <span className="mb-6 rounded-full border border-border bg-surface px-4 py-1.5 text-xs text-muted">
          Video Editing & Paid Promotion Agency
        </span>

        <h1 className="font-display max-w-4xl text-5xl font-bold leading-tight tracking-tight md:text-7xl">
          We Edit. We Promote. <span className="text-accent">You Grow.</span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-muted">
          Cinematic video editing and result-driven ad campaigns for creators
          and brands who want to stand out.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link href="/contact" className="btn-primary">
            Start a Project
          </Link>
          <Link href="/portfolio" className="btn-outline">
            View Our Work
          </Link>
        </div>
      </div>
    </section>
  );
}