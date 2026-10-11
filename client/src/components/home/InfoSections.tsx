"use client";

import { useState } from "react";
import Link from "next/link";

const steps = [
  { n: "01", title: "Tell Us", text: "Share your idea, service and deadline." },
  { n: "02", title: "Plan", text: "We discuss the concept, scope and quote." },
  { n: "03", title: "Create", text: "We shoot and edit, or edit your footage." },
  { n: "04", title: "Review", text: "You check the cut and request changes." },
  { n: "05", title: "Deliver", text: "Final files in platform-ready formats." },
];

export function ProcessSection() {
  return (
    <section className="border-y border-border bg-surface py-24">
      <div className="container-x">
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">
            How It Works
          </p>
          <h2 className="font-display text-3xl font-bold md:text-5xl">
            Our Process
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((s) => (
            <div key={s.n} className="card p-6">
              <p className="font-display text-3xl font-bold text-accent">{s.n}</p>
              <h3 className="mt-3 font-display text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const packages = [
  {
    name: "Social Media Starter",
    fit: "Creators and small brands starting with reels.",
    items: ["Short-form videos", "Captions and music", "Platform-ready export"],
  },
  {
    name: "Monthly Content Package",
    fit: "Businesses that need regular content.",
    items: ["Monthly plan", "Set number of videos", "Steady posting support"],
  },
  {
    name: "Commercial Production",
    fit: "Cafes, shops, hotels and brands.",
    items: ["Planning and shoot", "Edited promo videos", "Delivery in all formats"],
  },
  {
    name: "Event Coverage",
    fit: "Fests, launches and celebrations.",
    items: ["Event coverage", "Highlight film", "Short event reels"],
  },
  {
    name: "Professional Editing",
    fit: "People who already have footage.",
    items: ["Editing and pacing", "Color and sound", "Titles and subtitles"],
  },
  {
    name: "Paid Promotion Campaign",
    fit: "Businesses that want more reach.",
    items: ["Campaign plan", "Ad creatives", "Performance reports"],
  },
];

export function PackagesSection() {
  return (
    <section className="container-x py-24">
      <div className="mb-12 text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">
          Packages
        </p>
        <h2 className="font-display text-3xl font-bold md:text-5xl">
          Flexible Ways To Work With Us
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted">
          Price depends on video count, duration, shoot days, location and crew.
          Tell us your project and we will send a quote.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {packages.map((p) => (
          <div key={p.name} className="card flex flex-col p-6">
            <h3 className="font-display text-xl font-semibold">{p.name}</h3>
            <p className="mt-1 text-sm text-muted">{p.fit}</p>
            <ul className="mt-4 flex-1 space-y-1 text-sm">
              {p.items.map((i) => (
                <li key={i}>
                  <span className="mr-2 text-accent">•</span>
                  {i}
                </li>
              ))}
            </ul>
            <Link
              href={`/contact?service=${encodeURIComponent(p.name)}`}
              className="btn-outline mt-6 w-full"
            >
              Request a Quote
            </Link>
          </div>
        ))}
      </div>
      <p className="mt-8 text-center text-sm text-muted">
        Need something different?{" "}
        <Link href="/contact" className="text-accent hover:underline">
          Ask for a custom proposal
        </Link>
      </p>
    </section>
  );
}

const reasons = [
  { icon: "🎯", title: "One Team, Many Services", text: "Shooting, editing and promotion in one place." },
  { icon: "🎬", title: "Cinematic Quality", text: "Clean cuts, good color and sound." },
  { icon: "💬", title: "Clear Communication", text: "Chat with us and track your project." },
  { icon: "🤝", title: "Honest Promises", text: "No fake guarantees. Clear scope and fees." },
];

export function WhyChoose() {
  return (
    <section className="border-y border-border bg-surface py-24">
      <div className="container-x">
        <div className="mb-12 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">
            Why WEEEDITS
          </p>
          <h2 className="font-display text-3xl font-bold md:text-5xl">
            Why Choose Us
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((r) => (
            <div key={r.title} className="card p-6">
              <div className="text-4xl">{r.icon}</div>
              <h3 className="mt-4 font-display text-lg font-semibold">{r.title}</h3>
              <p className="mt-2 text-sm text-muted">{r.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const faqs = [
  {
    q: "Do you only make Instagram Reels?",
    a: "No. We also do commercial videos, event coverage, long-form editing and paid promotion.",
  },
  {
    q: "Can you edit footage I already have?",
    a: "Yes. Send your footage and we edit it. We can also shoot it for you.",
  },
  {
    q: "How much does it cost?",
    a: "It depends on the project. Send your details and we will give a quote.",
  },
  {
    q: "Do you guarantee views or sales?",
    a: "No. We make strong creatives and run campaigns carefully, but results are never guaranteed.",
  },
  {
    q: "Is the ad budget included?",
    a: "No. Our fee is separate from the budget you spend on ads.",
  },
  {
    q: "How long does a project take?",
    a: "It depends on the scope. We confirm the timeline after we understand your project.",
  },
];

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="container-x py-24">
      <div className="mb-12 text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">
          FAQ
        </p>
        <h2 className="font-display text-3xl font-bold md:text-5xl">
          Common Questions
        </h2>
      </div>
      <div className="mx-auto max-w-3xl space-y-3">
        {faqs.map((f, i) => (
          <div key={f.q} className="card overflow-hidden">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              aria-expanded={open === i}
              className="flex w-full items-center justify-between gap-4 p-5 text-left font-semibold"
            >
              {f.q}
              <span className="text-xl text-accent">{open === i ? "−" : "+"}</span>
            </button>
            {open === i && (
              <p className="px-5 pb-5 text-sm text-muted">{f.a}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}