import Link from "next/link";
import { plans } from "@/data/pricing";

export default function PricingPreview() {
  return (
    <section className="py-20">
      <div className="container-x">
        <div className="mb-10 text-center">
          <p className="mb-2 text-sm uppercase tracking-widest text-accent">
            Pricing
          </p>
          <h2 className="font-display text-3xl font-bold md:text-4xl">
            Simple Plans For Every Creator
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`card relative ${
                plan.popular ? "border-accent" : ""
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-white">
                  Most Popular
                </span>
              )}
              <h3 className="font-display text-xl font-semibold">
                {plan.name}
              </h3>
              <p className="mt-2 font-display text-3xl font-bold">
                {plan.price}
                <span className="ml-1 text-sm font-normal text-muted">
                  {plan.period}
                </span>
              </p>
              <p className="mt-2 text-sm text-muted">{plan.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="/pricing" className="btn-primary">
            See Full Pricing
          </Link>
        </div>
      </div>
    </section>
  );
}