import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import { creators } from "@/data/creators";

export default function CreatorsPage() {
  return (
    <>
      <PageHeader
        label="Creators"
        title="Creators We Work With"
        description="Meet some of the creators who grow with WEEEDITS."
      />

      <section className="py-20">
        <div className="container-x">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {creators.map((creator) => (
              <div key={creator.id} className="card text-center">
                <div
                  className="mx-auto flex h-24 w-24 items-center justify-center rounded-full text-5xl"
                  style={{ background: creator.gradient }}
                >
                  {creator.emoji}
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold">
                  {creator.name}
                </h3>
                <p className="text-sm text-muted">{creator.role}</p>
                <div className="mt-4 flex items-center justify-center gap-3 text-sm">
                  <span className="rounded-full border border-border px-3 py-1 text-muted">
                    {creator.niche}
                  </span>
                  <span className="text-accent">
                    {creator.followers} followers
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/contact" className="btn-primary">
              Work With Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}