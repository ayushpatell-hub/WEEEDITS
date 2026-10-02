import Link from "next/link";
import { creators } from "@/data/creators";

export default function CreatorsPreview() {
  const preview = creators.slice(0, 4);

  return (
    <section className="py-20">
      <div className="container-x">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="mb-2 text-sm uppercase tracking-widest text-accent">
              Creators
            </p>
            <h2 className="font-display text-3xl font-bold md:text-4xl">
              Creators We Work With
            </h2>
          </div>
          <Link href="/creators" className="btn-outline hidden md:inline-flex">
            View All
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {preview.map((creator) => (
            <div key={creator.id} className="card text-center">
              <div
                className="mx-auto flex h-20 w-20 items-center justify-center rounded-full text-4xl"
                style={{ background: creator.gradient }}
              >
                {creator.emoji}
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold">
                {creator.name}
              </h3>
              <p className="text-sm text-muted">{creator.role}</p>
              <p className="mt-2 text-sm text-accent">
                {creator.followers} followers
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 md:hidden">
          <Link href="/creators" className="btn-outline w-full">
            View All
          </Link>
        </div>
      </div>
    </section>
  );
}