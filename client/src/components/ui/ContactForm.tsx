"use client";

import { useState } from "react";
import { api } from "@/lib/api";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    service: "Video Editing",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      await api.post("/contact", form);
      setSuccess(true);
      setForm({ name: "", email: "", service: "Video Editing", message: "" });
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-border bg-surface px-4 py-3 text-foreground placeholder:text-muted outline-none focus:border-accent";

  return (
    <form onSubmit={onSubmit} className="card space-y-4 p-6">
      <input
        name="name"
        value={form.name}
        onChange={onChange}
        placeholder="Your name"
        required
        className={inputClass}
      />
      <input
        name="email"
        type="email"
        value={form.email}
        onChange={onChange}
        placeholder="Your email"
        required
        className={inputClass}
      />
      <select
        name="service"
        value={form.service}
        onChange={onChange}
        className={inputClass}
      >
        <option>Video Editing</option>
        <option>Paid Promotion</option>
        <option>Thumbnail Design</option>
        <option>Other</option>
      </select>
      <textarea
        name="message"
        value={form.message}
        onChange={onChange}
        placeholder="Tell us about your project"
        rows={5}
        required
        className={inputClass}
      />

      {error && <p className="text-sm text-accent">{error}</p>}
      {success && (
        <p className="text-sm text-foreground">Message sent. We will contact you soon.</p>
      )}

      <button type="submit" disabled={loading} className="btn-primary w-full">
        {loading ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}