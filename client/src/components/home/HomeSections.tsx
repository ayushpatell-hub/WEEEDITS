import Link from "next/link";
import { categories, services } from "@/data/services";

export function TrustStrip() {
  const items = [
    "Creators",
    "Local businesses",
    "Cafes and restaurants",
    "Colleges and events",
    "Startups and brands",
  ];
  return (
    <section className="border-y border-border bg-surface">
      <div className="container-x py-8 text-center">
        <p className="text-xs uppercase tracking-widest text-muted">
          WEEEDITS works with
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          {items.map((i) => (
            <span
              key={i}
              className="rounded-full border border-border bg-surface-2 px-4 py-1.5 text-sm text-foreground"
            >
              {i}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

const categoryInfo: Record<string, { emoji: string; text: string }> = {
  "Social Media Content": { emoji: "📱", text: "Reels, Shorts and monthly content." },
  "Commercial Videos": { emoji: "🏬", text: "Videos for cafes, shops and brands." },
  "Event Videography": { emoji: "🎤", text: "Coverage and highlight films." },
  "Video Editing": { emoji: "🎬", text: "Editing, color, sound and motion." },
  "Paid Promotions": { emoji: "📈", text: "Ad creatives and campaigns." },
  "Creator Services": { emoji: "⭐", text: "Content for creators and influencers." },
};

export function CategoryServices() {
  const list = categories.filter((c) => c !== "All Services");
  return (
    <section className="container-x py-24">
      <div className="mb-12 text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">
          What We Do
        </p>
        <h2 className="font-display text-3xl font-bold md:text-5xl">
          Our Services
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted">
          One reel or a full production. Pick what fits your project.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((c) => {
          const count = services.filter((s) => s.category === c).length;
          return (
            <Link
              key={c}
              href="/services"
              className="card group p-6 transition hover:border-accent"
            >
              <div className="text-4xl transition-transform duration-300 group-hover:scale-110">
                {categoryInfo[c]?.emoji}
              </div>
              <h3 className="mt-4 font-display text-xl font-semibold">{c}</h3>
              <p className="mt-2 text-sm text-muted">{categoryInfo[c]?.text}</p>
              <p className="mt-4 text-xs text-accent">
                {count} service{count > 1 ? "s" : ""} →
              </p>
            </Link>
          );
        })}
      </div>

      <div className="mt-12 text-center">
        <Link href="/services" className="btn-outline">
          View All Services
        </Link>
      </div>
    </section>
  );
}

type ShowcaseProps = {
  label: string;
  title: string;
  text: string;
  points: string[];
  note?: string;
  emoji: string;
  gradient: string;
  cta: string;
  href: string;
  reverse?: boolean;
};

function Showcase({
  label,
  title,
  text,
  points,
  note,
  emoji,
  gradient,
  cta,
  href,
  reverse,
}: ShowcaseProps) {
  return (
    <section className="container-x py-16">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div className={reverse ? "md:order-2" : ""}>
          <div
            className={`flex aspect-video items-center justify-center overflow-hidden rounded-2xl border border-border bg-gradient-to-br ${gradient}`}
          >
            <span className="text-7xl">{emoji}</span>
          </div>
        </div>

        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">
            {label}
          </p>
          <h2 className="font-display text-3xl font-bold md:text-4xl">{title}</h2>
          <p className="mt-4 text-muted">{text}</p>
          <ul className="mt-5 space-y-2 text-sm">
            {points.map((p) => (
              <li key={p}>
                <span className="mr-2 text-accent">•</span>
                {p}
              </li>
            ))}
          </ul>
          {note && <p className="mt-4 text-xs text-muted">{note}</p>}
          <Link href={href} className="btn-primary mt-6">
            {cta}
          </Link>
        </div>
      </div>
    </section>
  );
}

export function CommercialSection() {
  return (
    <Showcase
      label="Commercial Video Production"
      title="Videos That Bring Customers In"
      text="For businesses that want to show their products, space and service. Example: a cafe gets reels of its ambience, menu, food preparation and customer experience."
      points={[
        "Restaurants, cafes, gyms, salons and clothing stores",
        "Hotels, coaching institutes, colleges and startups",
        "Brand films, product demos and property showcases",
      ]}
      note="Packages can include planning, shooting, editing, music, captions and delivery. What is included depends on the package."
      emoji="☕"
      gradient="from-amber-600/50 to-zinc-900"
      cta="Discuss Your Project"
      href="/contact?service=Business%20and%20Product%20Promotion"
    />
  );
}

export function EventsSection() {
  return (
    <Showcase
      reverse
      label="Event Videography"
      title="Your Event, Told as a Film"
      text="From college fests to corporate launches, we cover the moments and turn them into a highlight film and short reels."
      points={[
        "Fests, farewells, concerts, conferences and sports events",
        "Birthdays, engagements and private celebrations",
        "Highlight film, event reels and speaker clips",
      ]}
      note="Crew size, shooting hours, deliverables and turnaround depend on the project."
      emoji="🎤"
      gradient="from-purple-600/50 to-zinc-900"
      cta="Book Event Coverage"
      href="/contact?service=College%20and%20Cultural%20Events"
    />
  );
}

export function EditingSection() {
  return (
    <Showcase
      label="Editing Studio"
      title="Send Your Footage. Get a Finished Video."
      text="Already have the footage? Our editing studio handles the rest, remotely."
      points={[
        "Reels, Shorts and YouTube long-form",
        "Podcasts, interviews and documentaries",
        "Color grading, motion graphics, captions and sound",
      ]}
      note="Remote editing means you provide the footage. Production means our team also films."
      emoji="🎬"
      gradient="from-red-700/50 to-zinc-900"
      cta="Get Editing Help"
      href="/contact?service=YouTube%20and%20Long-Form%20Editing"
    />
  );
}

export function PromotionsSection() {
  return (
    <Showcase
      reverse
      label="Paid Promotions"
      title="Creative Ads, Managed Clearly"
      text="We plan campaigns and make the ad creatives for Instagram, Facebook and YouTube."
      points={[
        "Campaign planning and ad creatives",
        "Product launch and local awareness campaigns",
        "Performance reporting",
      ]}
      note="Our fee is separate from your ad budget. We do not guarantee sales, views or leads."
      emoji="📈"
      gradient="from-blue-600/50 to-zinc-900"
      cta="Plan a Campaign"
      href="/contact?service=Paid%20Social%20Campaigns"
    />
  );
}