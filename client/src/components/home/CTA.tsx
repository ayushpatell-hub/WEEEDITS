import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-20">
      <div className="container-x">
        <div className="card flex flex-col items-center py-16 text-center">
          <h2 className="font-display text-3xl font-bold md:text-5xl">
            Ready To Level Up Your Content?
          </h2>
          <p className="mt-4 max-w-xl text-muted">
            Join creators who trust WEEEDITS for cinematic edits and paid
            promotion that grows their channel.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link href="/contact" className="btn-primary">
              Get Started
            </Link>
            <Link href="/pricing" className="btn-outline">
              View Pricing
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}