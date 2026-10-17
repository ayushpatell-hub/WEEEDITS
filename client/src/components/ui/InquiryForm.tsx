"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { api } from "@/lib/api";
import { services } from "@/data/services";

const clientTypes = ["Business", "Creator", "College", "Event Organizer", "Individual", "Other"];

type Form = Record<string, string>;

const empty: Form = {
  name: "",
  email: "",
  phone: "",
  brand: "",
  clientType: "Business",
  service: "",
  title: "",
  location: "",
  deadline: "",
  budget: "",
  description: "",
  links: "",
  eventDate: "",
  eventType: "",
  duration: "",
  coverage: "",
  businessType: "",
  videoCount: "",
  platforms: "",
  sourceFootage: "",
  targetPlatform: "",
  style: "",
  audience: "",
  objective: "",
  adPlatform: "",
  adSpend: "",
};

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

const inputClass =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted/70 outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/15";

const labelClass = "mb-1.5 block text-sm font-medium text-foreground";

const groupClass =
  "grid gap-5 rounded-2xl border border-border bg-surface-2/50 p-5 sm:grid-cols-2";

const groupTitle = "text-sm font-semibold text-accent sm:col-span-2";

function Section({ n, title }: { n: number; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent text-xs font-semibold text-white">
        {n}
      </span>
      <p className="font-display text-base font-semibold">{title}</p>
      <span className="h-px flex-1 bg-border" />
    </div>
  );
}

export default function InquiryForm() {
  const params = useSearchParams();
  const preset = params.get("service") || "";

  const [form, setForm] = useState<Form>({ ...empty, service: preset });
  const [errors, setErrors] = useState<Form>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const selected = services.find((s) => s.name === form.service);
  const cat = selected?.category || "";

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const e: Form = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!emailOk(form.email)) e.email = "Enter a valid email";
    if (!form.service) e.service = "Choose a service";
    if (!form.title.trim()) e.title = "Add a project title or event name";
    if (form.description.trim().length < 10)
      e.description = "Please describe your project (at least 10 characters)";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setError("");
    if (!validate()) return;
    setLoading(true);
    try {
      await api.post("/inquiries", { ...form, category: cat });
      setDone(true);
    } catch (err: any) {
      setError(err?.message || "Could not send your request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="py-6">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12.5 10 17.5 19 7.5" />
          </svg>
        </div>
        <h2 className="mt-5 font-display text-3xl font-semibold">Request received</h2>
        <p className="mt-3 text-muted">
          Thanks, {form.name.split(" ")[0]}. We will review your project and
          contact you at {form.email}.
        </p>
        <button
          onClick={() => {
            setForm({ ...empty });
            setDone(false);
          }}
          className="btn-outline mt-6"
        >
          Send another request
        </button>
      </div>
    );
  }

  const field = (
    name: string,
    label: string,
    props: { type?: string; placeholder?: string; required?: boolean; optional?: boolean } = {}
  ) => (
    <div>
      <label htmlFor={name} className={labelClass}>
        {label}
        {props.required && <span className="text-accent"> *</span>}
        {props.optional && <span className="font-normal text-muted"> (optional)</span>}
      </label>
      <input
        id={name}
        name={name}
        type={props.type || "text"}
        value={form[name]}
        onChange={onChange}
        placeholder={props.placeholder}
        className={inputClass}
      />
      {errors[name] && <p className="mt-1 text-xs text-accent">{errors[name]}</p>}
    </div>
  );

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-8">
      <div className="space-y-5">
        <Section n={1} title="About you" />
        <div className="grid gap-5 sm:grid-cols-2">
          {field("name", "Full name", { required: true, placeholder: "Your name" })}
          {field("email", "Email address", { type: "email", required: true, placeholder: "you@example.com" })}
          {field("phone", "Phone or WhatsApp", { optional: true })}
          {field("brand", "Business or brand", { optional: true })}
          <div className="sm:col-span-2">
            <label htmlFor="clientType" className={labelClass}>
              I am a
            </label>
            <select id="clientType" name="clientType" value={form.clientType} onChange={onChange} className={inputClass}>
              {clientTypes.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-5">
        <Section n={2} title="Your project" />
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="service" className={labelClass}>
              Required service <span className="text-accent">*</span>
            </label>
            <select id="service" name="service" value={form.service} onChange={onChange} className={inputClass}>
              <option value="">Select a service</option>
              {services.map((s) => (
                <option key={s.id} value={s.name}>
                  {s.name}
                </option>
              ))}
              {preset && !selected && <option value={preset}>{preset}</option>}
            </select>
            {errors.service && <p className="mt-1 text-xs text-accent">{errors.service}</p>}
          </div>
          <div className="sm:col-span-2">
            {field("title", "Project title or event name", { required: true, placeholder: "e.g. Cafe launch reel" })}
          </div>
          {field("location", "Project location", { optional: true, placeholder: "If filming is needed" })}
          {field("deadline", "Preferred deadline", { type: "date", optional: true })}
        </div>

        {cat === "Event Videography" && (
          <div className={groupClass}>
            <p className={groupTitle}>Event details</p>
            {field("eventDate", "Event date", { type: "date" })}
            {field("eventType", "Event type", { placeholder: "Fest, wedding, launch..." })}
            {field("duration", "Event duration", { placeholder: "e.g. 4 hours" })}
            {field("coverage", "Expected coverage", { placeholder: "Highlight film, reels..." })}
          </div>
        )}

        {(cat === "Commercial Videos" || cat === "Social Media Content") && (
          <div className={groupClass}>
            <p className={groupTitle}>Production details</p>
            {field("businessType", "Business type", { placeholder: "Cafe, gym, salon..." })}
            {field("videoCount", "Number of videos")}
            <div className="sm:col-span-2">
              {field("platforms", "Intended platforms", { placeholder: "Instagram, YouTube..." })}
            </div>
          </div>
        )}

        {(cat === "Video Editing" || cat === "Creator Services") && (
          <div className={groupClass}>
            <p className={groupTitle}>Editing details</p>
            {field("duration", "Video duration", { placeholder: "e.g. 10 minutes" })}
            {field("sourceFootage", "Source footage available?", { placeholder: "Yes / No / Partly" })}
            {field("targetPlatform", "Target platform")}
            {field("style", "Editing style", { placeholder: "Cinematic, fast, clean..." })}
          </div>
        )}

        {cat === "Paid Promotions" && (
          <div className={groupClass}>
            <p className={groupTitle}>Campaign details</p>
            {field("audience", "Target audience")}
            {field("objective", "Campaign objective", { placeholder: "Awareness, leads..." })}
            {field("adPlatform", "Advertising platform", { placeholder: "Instagram, YouTube..." })}
            {field("adSpend", "Approximate ad spend")}
            <p className="text-xs text-muted sm:col-span-2">
              Ad spend is paid by you. Our fee is separate. Results are never guaranteed.
            </p>
          </div>
        )}
      </div>

      <div className="space-y-5">
        <Section n={3} title="Brief and budget" />
        <div>
          <label htmlFor="description" className={labelClass}>
            Project description <span className="text-accent">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            rows={5}
            value={form.description}
            onChange={onChange}
            placeholder="Tell us about your project"
            className={`${inputClass} resize-none`}
          />
          {errors.description && <p className="mt-1 text-xs text-accent">{errors.description}</p>}
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {field("budget", "Estimated budget", { optional: true, placeholder: "e.g. Rs 15,000 or flexible" })}
          {field("links", "Reference links", { optional: true, placeholder: "Videos you like" })}
        </div>
      </div>

      {error && (
        <div role="alert" className="rounded-xl border border-accent/40 bg-accent/10 px-4 py-3 text-sm text-accent">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full disabled:opacity-60"
      >
        {loading ? "Sending..." : "Send Project Request"}
      </button>
    </form>
  );
}