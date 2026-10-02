"use client";

import { useState } from "react";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
    e.currentTarget.reset();
  };

  if (sent) {
    return (
      <div className="card py-16 text-center">
        <div className="text-5xl">✅</div>
        <h3 className="mt-4 font-display text-2xl font-semibold">
          Message Sent
        </h3>
        <p className="mt-2 text-muted">
          Thanks for contacting WEEEDITS. We will reply soon.
        </p>
        <button
          onClick={() => setSent(false)}
          className="btn-outline mt-6"
        >
          Send Another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card space-y-5">
      <div>
        <label className="mb-2 block text-sm text-muted">Name</label>
        <input
          type="text"
          name="name"
          required
          placeholder="Your name"
          className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-accent"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm text-muted">Email</label>
        <input
          type="email"
          name="email"
          required
          placeholder="you@example.com"
          className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-accent"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm text-muted">Service</label>
        <select
          name="service"
          className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-accent"
        >
          <option>Video Editing</option>
          <option>Motion Graphics</option>
          <option>Color and Sound</option>
          <option>Paid Promotion</option>
          <option>Thumbnails</option>
          <option>Channel Strategy</option>
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm text-muted">Message</label>
        <textarea
          name="message"
          required
          rows={5}
          placeholder="Tell us about your project"
          className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground outline-none focus:border-accent"
        />
      </div>

      <button type="submit" className="btn-primary w-full">
        Send Message
      </button>
    </form>
  );
}