import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";

const values = [
  {
    id: 1,
    emoji: "🎯",
    title: "Quality First",
    description: "Every video gets the same care and attention to detail.",
  },
  {
    id: 2,
    emoji: "⚡",
    title: "Fast Delivery",
    description: "We respect your posting schedule and deliver on time.",
  },
  {
    id: 3,
    emoji: "🤝",
    title: "Creator Focused",
    description: "Your growth is our success. We work like your own team.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        label="About"
        title="About WEEEDITS"
        description="A video editing and paid promotion agency built for creators."
      />

      <section className="py-20">
        <div className="container-x">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-3xl font-bold">Our Story</h2>
            <p className="mt-4 text-muted">
              WEEEDITS started with a simple idea: creators should focus on
              ideas while experts handle editing and promotion. We combine
              cinematic editing with smart paid promotion to help channels
              grow faster.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {values.map((v) => (
              <div key={v.id} className="card text-center">
                <div className="text-4xl">{v.emoji}</div>
                <h3 className="mt-4 font-display text-xl font-semibold">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm text-muted">{v.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link href="/contact" className="btn-primary">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}