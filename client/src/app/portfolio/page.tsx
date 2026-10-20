import Link from "next/link";
import PortfolioGrid from "@/components/portfolio/PortfolioGrid";
import { portfolio, categories } from "@/data/portfolio";

export default function PortfolioPage() {
  const count = String(portfolio.length).padStart(2, "0");
  const catCount = String(categories.filter((c) => c !== "All").length).padStart(2, "0");

  return (
    <div className="pt-16">
      <div className="border-b border-foreground">
        <div className="overflow-hidden px-4 pb-4 pt-8 sm:px-8">
          <h1
            className="font-display whitespace-nowrap font-black uppercase leading-[0.82] tracking-[-0.06em] text-foreground"
            style={{ fontSize: "16vw" }}
          >
            Portfolio
          </h1>
        </div>

        <div className="grid gap-8 px-4 pb-12 pt-8 sm:px-8 md:grid-cols-2">
          <div className="flex min-h-[260px] flex-col justify-between bg-accent p-6 text-background">
            <p className="font-mono text-xs uppercase tracking-[0.2em] opacity-80">
              Selected work
            </p>
            <div>
              <p className="font-display text-7xl font-black leading-none tracking-[-0.05em] sm:text-8xl">
                {count}
              </p>
              <p className="mt-3 font-mono text-xs uppercase tracking-[0.2em] opacity-80">
                Projects &middot; {catCount} categories
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-10">
            <h2 className="font-display text-2xl font-extrabold uppercase leading-[1.05] tracking-[-0.04em] sm:text-3xl lg:text-4xl">
              Video editing, production and promotion work by WEE EDITS
            </h2>
            <div>
              <p className="max-w-md font-mono text-[13px] leading-relaxed text-foreground">
                Reels, YouTube videos, ads and motion graphics, edited for
                creators and brands. Sample projects are shown for now. Real
                client work will be added here.
              </p>
              <Link
                href="/contact"
                className="mt-6 inline-block border border-foreground px-5 py-3 font-mono text-sm text-foreground transition-colors hover:bg-foreground hover:text-background"
              >
                Start a project {"\u2192"}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <section className="px-4 sm:px-8">
        <PortfolioGrid />
      </section>
    </div>
  );
}