import Link from "next/link";
import { portfolio } from "@/data/portfolio";

export default function FeaturedPortfolio() {
  const featured = portfolio.slice(0, 6);

  return (
    <section className="py-20">
      <div className="container-x">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="mb-2 text-sm uppercase tracking-widest text-accent">
              Our Work
            </p>
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              Featured Portfolio
            </h2>
          </div>
          <Link href="/portfolio" className="btn-outline hidden md:inline-flex">
            View All
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((item) => (
            <div key={item.id} className="card overflow-hidden p-0">
              <div
                className="flex aspect-video items-center justify-center text-5xl"
                style={{ background: item.gradient }}
              >
                ▶
              </div>
              <div className="p-4">
                <h3 className="font-display text-lg font-semibold">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm text-muted">
                  {item.category} • {item.views} views
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 md:hidden">
          <Link href="/portfolio" className="btn-outline w-full">
            View All
          </Link>
        </div>
      </div>
    </section>
  );
}