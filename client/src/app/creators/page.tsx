import Link from "next/link";
import type { CSSProperties } from "react";

const creators = [
  {
    name: "Utkarsh Chaudhary",
    role: "Lead Video Editor",
    experience: "6 years",
    projects: "120+",
    bio: "Cinematic storytelling for YouTube, brand films and long-form content. Sharp cuts, clean color and strong sound.",
    skills: ["Premiere Pro", "DaVinci Resolve", "Color Grading", "Sound Design"],
    image: "/creators/utkarsh-chaudhary.jpeg",
    size: "cover",
    pos: "50% 30%",
    tone: "#2f5d43",
  },
  {
    name: "Tarun",
    role: "Reels & Shorts Editor",
    experience: "4 years",
    projects: "200+",
    bio: "Fast, trending short-form edits with captions, transitions and hooks that keep viewers watching.",
    skills: ["CapCut", "After Effects", "Captions", "Trend Edits"],
    image: "/creators/tarun.jpeg",
    size: "cover",
    pos: "50% 30%",
    tone: "#5d8a6e",
  },
  {
    name: "Parikshit Dahiya",
    role: "Motion Graphics Artist",
    experience: "5 years",
    projects: "90+",
    bio: "Animated titles, logo reveals and visual effects that give every video a premium look.",
    skills: ["After Effects", "Blender", "Logo Animation", "VFX"],
    image: "/creators/parikshit-dahiya.jpeg",
    size: "auto 112%",
    pos: "50% 40%",
    tone: "#16231b",
  },
  {
    name: "Rockey",
    role: "Paid Promotion Manager",
    experience: "5 years",
    projects: "75+",
    bio: "Plans and runs Meta, Google and YouTube ad campaigns that turn views into real growth.",
    skills: ["Meta Ads", "Google Ads", "YouTube Ads", "Analytics"],
    image: "/creators/rockey.jpeg",
    size: "cover",
    pos: "50% 20%",
    tone: "#3d7556",
  },
];

const serif: CSSProperties = { fontFamily: "var(--font-serif), Georgia, serif" };

const shape =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 108 200'%3E%3Ccircle cx='54' cy='54' r='54'/%3E%3Ccircle cx='54' cy='146' r='54'/%3E%3C/svg%3E\")";

const maskStyle: CSSProperties = {
  WebkitMaskImage: shape,
  maskImage: shape,
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
  WebkitMaskSize: "contain",
  maskSize: "contain",
  WebkitMaskPosition: "center",
  maskPosition: "center",
};

const photoStyle = (c: (typeof creators)[number]): CSSProperties =>
  c.image
    ? {
        backgroundImage: `url(${c.image})`,
        backgroundSize: c.size,
        backgroundPosition: c.pos,
        backgroundRepeat: "no-repeat",
      }
    : { background: "linear-gradient(160deg, #eef1e6, #d2d9c8)" };

const pill =
  "inline-block rounded-full border border-foreground px-7 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-foreground transition-colors hover:bg-foreground hover:text-background";

const label = "text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground";

export default function CreatorsPage() {
  return (
    <div>
      <section className="px-4 pb-14 pt-10 sm:px-8">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <p className={label}>Creators</p>
            <h1
              className="mt-6 font-normal uppercase leading-[0.9] tracking-[-0.02em] text-accent"
              style={{ ...serif, fontSize: "clamp(3.2rem, 9vw, 8rem)" }}
            >
              Meet
              <br />
              The
              <br />
              Creators
            </h1>
          </div>

          <div className="flex flex-col justify-end gap-8">
            <p className="max-w-md text-lg leading-snug">
              The team behind every edit and every campaign at WEE EDITS.
            </p>
            <ul className="max-w-lg border-t border-foreground/40">
              {creators.map((c, i) => (
                <li key={c.name} className="border-b border-foreground/40">
                  <a
                    href={`#creator-${i + 1}`}
                    className="flex items-center justify-between py-4 transition-colors hover:text-accent"
                  >
                    <span>
                      <span className="mr-4 text-xs text-muted">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {c.name}
                    </span>
                    <span className="text-xs uppercase tracking-[0.12em] text-muted">
                      {c.role}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {creators.map((c, i) => {
        const [first, ...rest] = c.name.split(" ");
        const last = rest.join(" ");
        return (
          <section
            key={c.name}
            id={`creator-${i + 1}`}
            className="scroll-mt-20 border-t border-foreground/40 px-4 py-10 sm:px-8"
          >
            <div className="grid border border-foreground/40 md:grid-cols-[2fr_3fr]">
              <div
                className="flex items-center justify-center p-6 sm:p-8"
                style={{ background: c.tone }}
              >
                <div
                  role="img"
                  aria-label={c.name}
                  className="flex aspect-[108/200] w-full max-w-[200px] items-center justify-center"
                  style={{ ...maskStyle, ...photoStyle(c) }}
                >
                  {!c.image && (
                    <span
                      className="text-7xl text-accent"
                      style={serif}
                      aria-hidden="true"
                    >
                      {first[0]}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex min-w-0 flex-col justify-between gap-8 bg-surface-2 p-6 sm:p-10">
                <div>
                  <p className="text-xs text-muted">{String(i + 1).padStart(2, "0")}</p>
                  <h2
                    className="mt-3 break-words font-normal uppercase leading-[0.95] tracking-[-0.02em] text-accent"
                    style={{ ...serif, fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
                  >
                    {first} {last}
                  </h2>
                  <p className="mt-3 text-sm uppercase tracking-[0.14em]">{c.role}</p>
                </div>

                <p
                  className="max-w-xl text-xl leading-[1.25] text-accent"
                  style={serif}
                >
                  {c.bio}
                </p>

                <div>
                  <p className="text-sm text-muted">
                    {c.experience} experience &middot; {c.projects} projects
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {c.skills.map((s) => (
                      <li
                        key={s}
                        className="rounded-full border border-foreground/40 px-4 py-1.5 text-xs uppercase tracking-[0.12em]"
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <Link href="/contact" className={pill}>
                    Work with {first}
                  </Link>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      <section className="bg-surface-2 px-4 py-24 text-center sm:px-8">
        <h2
          className="font-normal leading-[1] tracking-[-0.02em] text-accent"
          style={{ ...serif, fontSize: "clamp(2.6rem, 8vw, 7rem)" }}
        >
          Let&apos;s create together
        </h2>
        <div className="mt-10">
          <Link href="/contact" className={pill}>
            Start a project
          </Link>
        </div>
      </section>
    </div>
  );
}