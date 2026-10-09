import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";

const creators = [
  {
    name: "Aarav Sharma",
    role: "Lead Video Editor",
    experience: "6 years",
    projects: "120+",
    bio: "Cinematic storytelling for YouTube, brand films and long-form content. Sharp cuts, clean color and strong sound.",
    skills: ["Premiere Pro", "DaVinci Resolve", "Color Grading", "Sound Design"],
    gradient: "from-red-600/70 to-zinc-900",
  },
  {
    name: "Riya Mehta",
    role: "Reels & Shorts Editor",
    experience: "4 years",
    projects: "200+",
    bio: "Fast, trending short-form edits with captions, transitions and hooks that keep viewers watching.",
    skills: ["CapCut", "After Effects", "Captions", "Trend Edits"],
    gradient: "from-pink-600/70 to-zinc-900",
  },
  {
    name: "Kabir Verma",
    role: "Motion Graphics Artist",
    experience: "5 years",
    projects: "90+",
    bio: "Animated titles, logo reveals and visual effects that give every video a premium look.",
    skills: ["After Effects", "Blender", "Logo Animation", "VFX"],
    gradient: "from-purple-600/70 to-zinc-900",
  },
  {
    name: "Neha Kapoor",
    role: "Paid Promotion Manager",
    experience: "5 years",
    projects: "75+",
    bio: "Plans and runs Meta, Google and YouTube ad campaigns that turn views into real growth.",
    skills: ["Meta Ads", "Google Ads", "YouTube Ads", "Analytics"],
    gradient: "from-blue-600/70 to-zinc-900",
  },
];

export default function CreatorsPage() {
  return (
    <>
      <PageHeader
        label="Creators"
        title="Meet The Creators"
        description="The team behind every edit and every campaign at WEEEDITS."
      />

      <section className="container-x py-16">
        <div className="grid gap-6 md:grid-cols-2">
          {creators.map((c) => (
            <div key={c.name} className="card overflow-hidden">
              <div
                className={`flex h-40 items-center justify-center bg-gradient-to-br ${c.gradient}`}
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-white/40 bg-black/30 font-display text-3xl font-bold">
                  {c.name[0]}
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-display text-2xl font-bold">{c.name}</h3>
                <p className="mt-1 text-sm font-semibold text-accent">
                  {c.role}
                </p>

                <p className="mt-4 text-sm text-muted">{c.bio}</p>

                <div className="mt-5 grid grid-cols-2 gap-4 border-y border-border py-4 text-center">
                  <div>
                    <p className="font-display text-xl font-bold">
                      {c.experience}
                    </p>
                    <p className="text-xs text-muted">Experience</p>
                  </div>
                  <div>
                    <p className="font-display text-xl font-bold">
                      {c.projects}
                    </p>
                    <p className="text-xs text-muted">Projects</p>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {c.skills.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-border bg-surface-2 px-3 py-1 text-xs text-muted"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <Link href="/contact" className="btn-outline mt-6 w-full">
                  Work With {c.name.split(" ")[0]}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}