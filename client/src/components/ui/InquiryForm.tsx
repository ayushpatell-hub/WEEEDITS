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
  "w-full rounded-lg border border-border bg-surface px-4 py-3 text-foreground placeholder:text-muted outline-none focus:border-accent";

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
      <div className="card p-10 text-center">
        <div className="text-5xl">✅</div>
        <h2 className="mt-4 font-display text-3xl font-bold">Request received</h2>
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
    props: { type?: string; placeholder?: string; required?: boolean } = {}
  ) => (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm text-muted">
        {label}
        {props.required && <span className="text-accent"> *</span>}
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
    <form onSubmit={onSubmit} noValidate className="card space-y-5 p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        {field("name", "Full name", { required: true })}
        {field("email", "Email address", { type: "email", required: true })}
        {field("phone", "Phone or WhatsApp (optional)")}
        {field("brand", "Business or brand name (optional)")}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="clientType" className="mb-1.5 block text-sm text-muted">
            I am a
          </label>
          <select id="clientType" name="clientType" value={form.clientType} onChange={onChange} className={inputClass}>
            {clientTypes.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="service" className="mb-1.5 block text-sm text-muted">
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
      </div>

      {field("title", "Project title or event name", { required: true })}

      <div className="grid gap-4 sm:grid-cols-2">
        {field("location", "Project location (if filming is needed)")}
        {field("deadline", "Preferred date or deadline", { type: "date" })}
      </div>

      {cat === "Event Videography" && (
        <div className="grid gap-4 rounded-xl border border-border bg-surface-2 p-4 sm:grid-cols-2">
          <p className="text-xs uppercase tracking-widest text-accent sm:col-span-2">Event details</p>
          {field("eventDate", "Event date", { type: "date" })}
          {field("eventType", "Event type", { placeholder: "Fest, wedding, launch..." })}
          {field("duration", "Event duration", { placeholder: "e.g. 4 hours" })}
          {field("coverage", "Expected coverage", { placeholder: "Highlight film, reels..." })}
        </div>
      )}

      {(cat === "Commercial Videos" || cat === "Social Media Content") && (
        <div className="grid gap-4 rounded-xl border border-border bg-surface-2 p-4 sm:grid-cols-2">
          <p className="text-xs uppercase tracking-widest text-accent sm:col-span-2">Production details</p>
          {field("businessType", "Business type", { placeholder: "Cafe, gym, salon..." })}
          {field("videoCount", "Number of videos")}
          {field("platforms", "Intended platforms", { placeholder: "Instagram, YouTube..." })}
        </div>
      )}

      {(cat === "Video Editing" || cat === "Creator Services") && (
        <div className="grid gap-4 rounded-xl border border-border bg-surface-2 p-4 sm:grid-cols-2">
          <p className="text-xs uppercase tracking-widest text-accent sm:col-span-2">Editing details</p>
          {field("duration", "Video duration", { placeholder: "e.g. 10 minutes" })}
          {field("sourceFootage", "Source footage available?", { placeholder: "Yes / No / Partly" })}
          {field("targetPlatform", "Target platform")}
          {field("style", "Editing style", { placeholder: "Cinematic, fast, clean..." })}
        </div>
      )}

      {cat === "Paid Promotions" && (
        <div className="grid gap-4 rounded-xl border border-border bg-surface-2 p-4 sm:grid-cols-2">
          <p className="text-xs uppercase tracking-widest text-accent sm:col-span-2">Campaign details</p>
          {field("audience", "Target audience")}
          {field("objective", "Campaign objective", { placeholder: "Awareness, leads..." })}
          {field("adPlatform", "Advertising platform", { placeholder: "Instagram, YouTube..." })}
          {field("adSpend", "Approximate ad spend")}
          <p className="text-xs text-muted sm:col-span-2">
            Ad spend is paid by you. Our fee is separate. Results are never guaranteed.
          </p>
        </div>
      )}

      {field("budget", "Estimated budget", { placeholder: "e.g. Rs 15,000 or flexible" })}

      <div>
        <label htmlFor="description" className="mb-1.5 block text-sm text-muted">
          Project description <span className="text-accent">*</span>
        </label>
        <textarea
          id="description"
          name="description"
          rows={5}
          value={form.description}
          onChange={onChange}
          placeholder="Tell us about your project"
          className={inputClass}
        />
        {errors.description && <p className="mt-1 text-xs text-accent">{errors.description}</p>}
      </div>

      {field("links", "Reference links (optional)", { placeholder: "Paste links to videos you like" })}

      {error && (
        <div role="alert" className="rounded-xl border border-accent/40 bg-accent/10 px-4 py-3 text-sm text-accent">
          {error}
        </div>
      )}

      <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60">
        {loading ? "Sending..." : "Send Project Request"}
      </button>
    </form>
  );
}