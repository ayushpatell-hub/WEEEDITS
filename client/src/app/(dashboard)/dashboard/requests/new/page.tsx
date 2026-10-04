"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

export default function NewRequestPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    service: "Video Editing",
    description: "",
    budget: "",
    deadline: "",
  });
  const [loading, setLoading] = useState(false);
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

    try {
      await api.post("/auth/register", {});
      const data = await api.post<{ request: { id: string } }>("/requests", {
        ...form,
        deadline: form.deadline || undefined,
      });
      router.push(`/dashboard/requests/${data.request.id}`);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-border bg-surface px-4 py-3 text-foreground placeholder:text-muted outline-none focus:border-accent";

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-bold">New Request</h1>

      <form onSubmit={onSubmit} className="card space-y-4 p-6">
        <input
          name="title"
          value={form.title}
          onChange={onChange}
          placeholder="Project title"
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
          name="description"
          value={form.description}
          onChange={onChange}
          placeholder="Describe your project"
          rows={6}
          required
          className={inputClass}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <input
            name="budget"
            value={form.budget}
            onChange={onChange}
            placeholder="Budget (optional)"
            className={inputClass}
          />
          <input
            name="deadline"
            type="date"
            value={form.deadline}
            onChange={onChange}
            className={inputClass}
          />
        </div>

        {error && <p className="text-sm text-accent">{error}</p>}

        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? "Submitting..." : "Submit Request"}
        </button>
      </form>
    </div>
  );
}