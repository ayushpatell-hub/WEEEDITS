import Link from "next/link";
import type { CSSProperties } from "react";

const creators = [
  {
    name: "Aarav Sharma",
    role: "Lead Video Editor",
    experience: "6 years",
    projects: "120+",
    bio: "Cinematic storytelling for YouTube, brand films and long-form content. Sharp cuts, clean color and strong sound.",
    skills: ["Premiere Pro", "DaVinci Resolve", "Color Grading", "Sound Design"],
    image: "",
    tone: "#2f5d43",
  },
  {
    name: "Riya Mehta",
    role: "Reels & Shorts Editor",
    experience: "4 years",
    projects: "200+",
    bio: "Fast, trending short-form edits with captions, transitions and hooks that keep viewers watching.",
    skills: ["CapCut", "After Effects", "Captions", "Trend Edits"],
    image: "",
    tone: "#5d8a6e",
  },
  {
    name: "Kabir Verma",
    role: "Motion Graphics Artist",
    experience: "5 years",
    projects: "90+",
    bio: "Animated titles, logo reveals and visual effects that give every video a premium look.",
    skills: ["After Effects", "Blender", "Logo Animation", "VFX"],
    image: "",
    tone: "#16231b",
  },
  {
    name: "Neha Kapoor",
    role: "Paid Promotion Manager",
    experience: "5 years",
    projects: "75+",
    bio: "Plans and runs Meta, Google and YouTube ad campaigns that turn views into real growth.",
    skills: ["Meta Ads", "Google Ads", "YouTube Ads", "Analytics"],
    image: "",
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
        const flip = i % 2 === 1;
        return (
          <section
            key={c.name}
            id={`creator-${i + 1}`}
            className="scroll-mt-20 border-t border-foreground/40 px-4 py-14 sm:px-8"
          >
            <div className="grid gap-10 md:grid-cols-2">
              <div
                className={`flex flex-col justify-between gap-12 md:min-h-[520px] ${
                  flip ? "md:order-2" : ""
                }`}
              >
                <div>
                  <p className="text-xs text-muted">{String(i + 1).padStart(2, "0")}</p>
                  <h2
                    className="mt-4 font-normal uppercase leading-[0.9] tracking-[-0.02em] text-accent"
                    style={{ ...serif, fontSize: "clamp(3rem, 8vw, 7rem)" }}
                  >
                    {first}
                    <br />
                    {last}
                  </h2>
                </div>
                <p className="text-lg uppercase leading-snug tracking-wide">
                  {c.role}
                </p>
              </div>

              <div
                className={`flex items-center justify-center p-6 sm:p-10 ${
                  flip ? "md:order-1" : ""
                }`}
                style={{ background: c.tone }}
              >
                <div
                  className="flex aspect-[108/200] w-full max-w-[340px] items-center justify-center"
                  style={{
                    ...maskStyle,
                    background: c.image
                      ? `center / cover no-repeat url(${c.image})`
                      : "linear-gradient(160deg, #eef1e6, #d2d9c8)",
                  }}
                >
                  {!c.image && (
                    <span
                      className="text-8xl text-accent"
                      style={serif}
                      aria-hidden="true"
                    >
                      {first[0]}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-14 grid gap-4 border-t border-foreground/40 pt-8 md:grid-cols-[180px_1fr]">
              <p className={label}>About {first}</p>
              <p
                className="max-w-4xl text-2xl leading-[1.2] text-accent sm:text-4xl"
                style={serif}
              >
                {c.bio}
              </p>
            </div>

            <div className="mt-12 grid gap-6 border-t border-foreground/40 pt-8 md:grid-cols-[180px_1fr_auto]">
              <p className={label}>Skills</p>
              <div>
                <p className="max-w-lg text-lg leading-snug">
                  {c.experience} experience &middot; {c.projects} projects
                </p>
                <ul className="mt-6 max-w-lg border-t border-foreground/40">
                  {c.skills.map((s) => (
                    <li key={s} className="border-b border-foreground/40 py-4">
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