import Link from "next/link";
import { services } from "@/data/site";

export default function ServicesPreview() {
  return (
    <section className="container-x py-24">
      <div className="mb-12 text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">
          What We Do
        </p>
        <h2 className="font-display text-3xl font-bold md:text-5xl">
          Our Services
        </h2>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((item) => (
          <div key={item.title} className="card p-6">
            <div className="mb-4 text-4xl">{item.icon}</div>
            <h3 className="mb-2 text-lg font-semibold">{item.title}</h3>
            <p className="text-sm text-muted">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link href="/services" className="btn-outline">
          View All Services
        </Link>
      </div>
    </section>
  );
}