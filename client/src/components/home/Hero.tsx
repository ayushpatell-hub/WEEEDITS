"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

const VIDEO =
  "https://zxdefgavgwfxastwmmjm.supabase.co/storage/v1/object/public/assets/stillwater.mp4";

const rise = (ms: number) => ({ animationDelay: `${ms}ms` });

export default function Hero() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const play = () => {
      v.play().catch(() => {});
    };
    v.addEventListener("canplay", play);
    window.addEventListener("load", play);
    play();
    return () => {
      v.removeEventListener("canplay", play);
      window.removeEventListener("load", play);
    };
  }, []);

  return (
    <section className="relative -mt-16 flex min-h-screen flex-col overflow-hidden bg-[#f6f8f4] text-[#16231b]">
      <style>{`
        @keyframes blurFadeUp {
          from { opacity: 0; filter: blur(20px); transform: translateY(36px); }
          to { opacity: 1; filter: blur(0); transform: translateY(0); }
        }
        .rise { opacity: 0; animation: blurFadeUp 1s cubic-bezier(.2,.7,.2,1) forwards; }
        @media (prefers-reduced-motion: reduce) {
          .rise { animation: none; opacity: 1; filter: none; transform: none; }
        }
      `}</style>

      <video
        ref={ref}
        className="absolute inset-0 z-0 h-full w-full object-cover"
        src={VIDEO}
        autoPlay
        muted
        loop
        playsInline
      />

      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(246,248,244,.52) 0%, rgba(246,248,244,0) 72%), linear-gradient(to bottom, rgba(246,248,244,.66) 0%, rgba(246,248,244,.06) 34%, rgba(246,248,244,.06) 66%, rgba(246,248,244,.58) 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 z-[2] backdrop-blur-[6px]"
        style={{
          WebkitMaskImage: "linear-gradient(to top, #000 0%, transparent 22%)",
          maskImage: "linear-gradient(to top, #000 0%, transparent 22%)",
        }}
      />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pb-24 pt-32 text-center">
        <span
          className="rise inline-flex items-center gap-2 rounded-full border border-[#2f5d43]/25 bg-[#f6f8f4]/60 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.3em] text-[#2f5d43] backdrop-blur-md sm:text-[11px]"
          style={rise(440)}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#2f5d43]" />
          Video Editing &amp; Paid Promotion
        </span>

        <h1
          className="rise font-display mt-7 max-w-5xl text-[clamp(44px,8vw,104px)] font-bold leading-[0.98] tracking-[-0.045em] text-[#16231b]"
          style={{ ...rise(540), textShadow: "0 2px 40px rgba(246,248,244,.55)" }}
        >
          We Edit. We Promote. You Grow.
        </h1>

        <p
          className="rise mt-6 max-w-[540px] text-[17px] leading-relaxed text-[#16231b]/70 sm:text-[19px]"
          style={rise(680)}
        >
          Cinematic video editing and result-driven ad campaigns for creators
          and brands who want to stand out.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-5">
          <Link
            href="/contact"
            className="rise font-display inline-flex items-center gap-2 rounded-full bg-[#2f5d43] px-7 py-3.5 text-[15px] font-semibold text-[#f2f6ef] shadow-[0_10px_30px_rgba(47,93,67,.35),inset_0_1px_0_rgba(255,255,255,.18)] transition hover:-translate-y-0.5 hover:bg-[#356a4c]"
            style={rise(800)}
          >
            Start a Project
            <span aria-hidden>→</span>
          </Link>
          <Link
            href="/portfolio"
            className="rise group inline-flex items-center gap-2 text-[15px] font-medium text-[#16231b]/70 transition hover:text-[#16231b]"
            style={rise(900)}
          >
            View Our Work
            <span
              aria-hidden
              className="transition-transform group-hover:translate-x-1"
            >
              →
            </span>
          </Link>
        </div>
      </div>

      <div
        className="rise absolute inset-x-0 bottom-7 z-10 flex items-center justify-center gap-4 px-6 font-mono text-[10px] uppercase tracking-[0.3em] text-[#16231b]/50"
        style={rise(1020)}
      >
        <span className="h-px w-[26px] bg-[#16231b]/25" />
        WEEEDITS — Edit. Promote. Grow.
        <span className="h-px w-[26px] bg-[#16231b]/25" />
      </div>
    </section>
  );
}