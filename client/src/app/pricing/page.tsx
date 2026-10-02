import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";
import { plans } from "@/data/pricing";

const faqs = [
  {
    q: "Can I change my plan later?",
    a: "Yes. You can upgrade or downgrade any time.",
  },
  {
    q: "How do revisions work?",
    a: "Send your feedback and we fix the video quickly.",
  },
  {
    q: "What does paid promotion include?",
    a: "We run targeted ads to help your videos reach more people.",
  },
  {
    q: "How do I pay?",
    a: "Online payment with Razorpay will be available soon.",
  },
];

export default function PricingPage() {
  return (
    <>
      <PageHeader
        label="Pricing"
        title="Simple Plans For Every Creator"
        description="Pick a plan that fits your content. No hidden fees."
      />

      <section className="py-20">
        <div className="container-x">
          <div className="grid gap-6 md:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`card relative flex flex-col ${
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
                <p className="mt-2 font-display text-4xl font-bold">
                  {plan.price}
                  <span className="ml-1 text-sm font-normal text-muted">
                    {plan.period}
                  </span>
                </p>
                <p className="mt-2 text-sm text-muted">{plan.description}</p>
                <ul className="mt-6 flex-1 space-y-2 text-sm">
                  {plan.features.map((f) => (
                    <li key={f}>
                      <span className="mr-2 text-accent">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={`mt-8 ${
                    plan.popular ? "btn-primary" : "btn-outline"
                  }`}
                >
                  Choose {plan.name}
                </Link>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-20 max-w-3xl">
            <h2 className="mb-8 text-center font-display text-3xl font-bold">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((f) => (
                <div key={f.q} className="card">
                  <h3 className="font-display text-lg font-semibold">{f.q}</h3>
                  <p className="mt-1 text-sm text-muted">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}