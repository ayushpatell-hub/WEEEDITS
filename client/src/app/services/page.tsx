import Link from "next/link";
import PageHeader from "@/components/ui/PageHeader";

const allServices = [
  {
    id: 1,
    emoji: "🎬",
    title: "Video Editing",
    description: "Clean, fast and cinematic edits for any platform.",
    points: ["YouTube videos", "Reels and Shorts", "Ads and promos"],
  },
  {
    id: 2,
    emoji: "✨",
    title: "Motion Graphics",
    description: "Smooth titles, captions and animated graphics.",
    points: ["Animated titles", "Auto captions", "Logo animation"],
  },
  {
    id: 3,
    emoji: "🎨",
    title: "Color and Sound",
    description: "Pro color grading and clean audio mixing.",
    points: ["Color grading", "Noise removal", "Music and SFX"],
  },
  {
    id: 4,
    emoji: "📣",
    title: "Paid Promotion",
    description: "Reach the right audience and grow your channel fast.",
    points: ["Targeted ads", "Channel growth", "Monthly reports"],
  },
  {
    id: 5,
    emoji: "🖼️",
    title: "Thumbnails",
    description: "Eye-catching thumbnails that get more clicks.",
    points: ["Custom design", "A/B variants", "Fast delivery"],
  },
  {
    id: 6,
    emoji: "🚀",
    title: "Channel Strategy",
    description: "Plans and ideas to grow your content step by step.",
    points: ["Content plan", "Trend research", "Growth advice"],
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        label="Services"
        title="What We Do"
        description="Everything you need to edit, post and grow your content."
      />

      <section className="py-20">
        <div className="container-x">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {allServices.map((s) => (
              <div key={s.id} className="card">
                <div className="text-4xl">{s.emoji}</div>
                <h3 className="mt-4 font-display text-xl font-semibold">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm text-muted">{s.description}</p>
                <ul className="mt-4 space-y-1 text-sm">
                  {s.points.map((p) => (
                    <li key={p} className="text-foreground">
                      <span className="mr-2 text-accent">•</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/contact" className="btn-primary">
              Start Your Project
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}