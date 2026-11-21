"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { LinkedinIcon, InstagramIcon, YoutubeIcon } from "@/components/Icons";
import { IconArrow, IconArrowUpRight } from "@/components/LineIcons";
import { RevealLines, Reveal, Marquee } from "@/components/motion/primitives";
import { onScrollFrame, clamp, prefersReducedMotion, lockScroll } from "@/components/motion/scroll";

/* ------------------------------------------------------------------ */
/* People                                                              */
/* ------------------------------------------------------------------ */

type FounderExtended = {
  bio?: string;
  education?: string;
  goal?: string;
  storyHeadline?: string;
  storyBody?: string;
  story?: string;
  why?: { quote: string; context?: string };
  whatSetsApart?: string[];
  expertise?: string[];
  personalSide?: { intro: string; points: string[] };
  closing?: string;
};

type FounderItem = {
  name: string;
  first: string;
  role: string;
  title: string;
  line: string;
  quote: string;
  photo: string;
  linkedin: string;
  contactTopic: string;
  contactCta: string;
  extended: FounderExtended;
};

const FOUNDERS: FounderItem[] = [
  {
    name: "Saloni Mehta",
    first: "Saloni",
    role: "Founder",
    title: "Financial therapist & wealth architect",
    line: "Started Green Shoots so advice would begin with the person, not the product. Contact Saloni for comprehensive financial advisory, goal mapping, and wealth architecture.",
    quote: "Money is never just money. It's the school fees, the parents' care, the year off you've been promising yourself.",
    photo: "/team/saloni_mehta_new.webp",
    linkedin: "https://www.linkedin.com/in/the-saloni-mehta/",
    contactTopic: "Financial Advisory (Saloni Mehta)",
    contactCta: "Connect with Saloni",
    extended: {
      education: "IIM-K Alumni",
      goal: "Making Finance Work for Everyone | Helping 1 Million People Build Wealth",
      storyHeadline:
        "20 years in capital markets taught me one thing: financial knowledge shouldn't be a privilege.",
      storyBody:
        "After 8 years of helping the wealthy grow wealthier, I chose a different path. Today, as the Founder of Green Shoots Wealth, I'm on a mission to make financial literacy accessible to all.",
      why: {
        quote: "Financial independence isn't just about money – it's about giving people the power to shape their own future.",
        context: "Experience comes from my own childhood background.",
      },
      whatSetsApart: [
        "Building wealth for both Indian & Global investors through data-driven strategies.",
        "Transforming start-ups from idea to execution with battle-tested frameworks.",
        "Delivering personalised financial guidance that actually works.",
        "Creating practical roadmaps for financial independence.",
      ],
      expertise: [
        "Wealth Management",
        "Startup Consulting",
        "Strategic Planning",
        "Financial Education",
        "Investment Strategy",
      ],
      personalSide: {
        intro: "When I'm not democratizing finance, you'll find me:",
        points: [
          "Chasing sunsets at beach cafes with a book and coffee in hand.",
          "Experimenting in my kitchen (and usually succeeding!).",
          "Morning gym sessions (to balance my love for Mumbai's famous Vada Pav).",
          "Journaling ideas that might just change someone's financial future.",
        ],
      },
      closing:
        "Let's challenge the status quo of financial freedom together. Whether you're passionate about finance, entrepreneurship, or just enjoy a good Vada Pav conversation – I'd love to connect!",
    },
  },
  {
    name: "Kaushal Kapasi",
    first: "Kaushal",
    role: "Co-founder",
    title: "Chartered Accountant & Wealth Architect",
    line: "14 years in finance taught me one thing: wealth isn't built by products, it's built by structure. Helping families and individuals build wealth the way great businesses are built: with discipline, clarity and a design that lasts generations.",
    quote: "I don't merely advise. I bring clarity, direction and structure to your financial journey, as a trusted advisor and a partner in your growth.",
    photo: "/team/kaushal_kapasi_new.webp",
    linkedin: "https://www.linkedin.com/in/ca-kaushal-kapasi-bbb1b150/",
    contactTopic: "Tax Advisory (Kaushal Kapasi)",
    contactCta: "Connect with Kaushal",
    extended: {
      education: "Chartered Accountant | ICAI",
      goal: "Helping Families Build Wealth Like Great Businesses: Disciplined, Clear & Built to Last",
      storyHeadline:
        "14 years in finance taught me one thing: wealth isn't built by products, it's built by structure.",
      storyBody:
        "As a Chartered Accountant, I've spent over a decade inside the numbers. Today, as Co-Founder of Green Shoots Wealth, I help families and individuals build wealth the way great businesses are built: with discipline, clarity and a design that lasts generations.",
      why: {
        quote:
          "I don't merely advise. I bring clarity, direction and structure to your financial journey, as a trusted advisor and a partner in your growth.",
      },
      whatSetsApart: [
        "Architecting the wealth of families and individuals like a business: disciplined, clear and built to last.",
        "Bringing a CA's rigour to every financial decision, from tax to investments to long-term planning.",
        "Offering structure and direction instead of scattered advice.",
        "Acting as a partner in your growth, not just a voice on the sidelines.",
      ],
      expertise: [
        "Chartered Accountancy",
        "Financial Planning",
        "Tax-Efficient Investing",
        "Family Wealth Structuring",
      ],
      personalSide: {
        intro: "A fellow builder at heart, you'll find me:",
        points: [
          "Googling about AI or new tech in the market.",
          "Cycling in the morning to burn my fats and stay fit.",
        ],
      },
      closing:
        "Let's build something that outlasts us. Whether you're planning for your family, your business or the next generation, I'd love to connect.",
    },
  },
];

const TEAM = [
  { topic: "Financial advisory", name: "Saloni Mehta", role: "Founder & Financial Advisor", photo: "/team/saloni_mehta_new.webp", tint: "#F5F1E8" },
  { topic: "Tax advisory & compliance", name: "Kaushal Kapasi", role: "Co-founder & Chartered Accountant", photo: "/team/kaushal_kapasi_new.webp", tint: "#EEF0D9" },
  { topic: "Research & investment analysis", name: "Hetvi Soni", role: "Research & Investment Analysis", photo: "/team/hetvi_soni.webp", tint: "#E4ECDF" },
  { topic: "Client onboarding & analysis", name: "Vedant Thorve", role: "Client Onboarding & Analysis", photo: "/team/vedant_pdf.webp", tint: "#F8F4EA" },
  { topic: "Transaction support", name: "Sameer Shinde", role: "Transaction Support", photo: "/team/sameer_coat_pant.webp", tint: "#F5F1E8" },
  { topic: "Admin & operations", name: "Ruhi Waghmare", role: "Admin & Operations", photo: "/team/other_girl.jpg", tint: "#F1E7D2" },
];

const VALUES = [
  { word: "Integrity", line: "Honest, even when it's inconvenient.", bg: "#FBF8F1", accent: "#52704e" },
  { word: "Empathy", line: "The person before the portfolio.", bg: "#EEF0D9", accent: "#52704e" },
  { word: "Discipline", line: "Long-term plans, kept long-term.", bg: "#F1E7D2", accent: "#9a7d3c" },
  { word: "Learning", line: "Better at this every year.", bg: "#E4ECDF", accent: "#52704e" },
];

/** Hero portrait cloud: symmetrical architectural framing flanking the central headline. */
const CLOUD = [
  { src: FOUNDERS[0].photo, alt: FOUNDERS[0].name, x: 4.5, y: 12, w: 13.5, depth: 0.35 },
  { src: FOUNDERS[1].photo, alt: FOUNDERS[1].name, x: 82, y: 12, w: 13.5, depth: 0.35 },
  { src: TEAM[3].photo, alt: TEAM[3].name, x: 9.5, y: 46, w: 12, depth: 0.5 },
  { src: TEAM[2].photo, alt: TEAM[2].name, x: 78.5, y: 46, w: 12, depth: 0.5 },
  { src: TEAM[5].photo, alt: TEAM[5].name, x: 4, y: 68, w: 11.5, depth: 0.65 },
  { src: TEAM[4].photo, alt: TEAM[4].name, x: 84.5, y: 68, w: 11.5, depth: 0.65 },
];

/* ------------------------------------------------------------------ */
/* Scroll helper                                                       */
/* ------------------------------------------------------------------ */

/** Calls `fn` every scroll frame with the element's rect while it's near the viewport. */
function useScrollFx<T extends HTMLElement>(fn: (r: DOMRect, vh: number, vw: number) => void, deps: React.DependencyList = []) {
  const ref = useRef<T>(null);
  const fnRef = useRef(fn);
  useEffect(() => {
    fnRef.current = fn;
  });
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    return onScrollFrame(({ vh, vw }) => {
      const r = el.getBoundingClientRect();
      if (r.bottom < -vh * 0.5 || r.top > vh * 1.5) return;
      fnRef.current(r, vh, vw);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return ref;
}

/* ------------------------------------------------------------------ */
/* Hero — a floating cloud of faces at different depths                 */
/* ------------------------------------------------------------------ */

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const tiles = useRef<(HTMLDivElement | null)[]>([]);
  const headline = useRef<HTMLDivElement>(null);

  // One rAF loop, only while the hero is on screen. Scroll comes from Lenis
  // (via the shared scroll store); pointer and float are eased here, and every
  // tile gets a single transform per frame — no stacked CSS transitions.
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const hover = !window.matchMedia("(hover: none)").matches;
    let scrollY = 0;
    let tx = 0, ty = 0, mx = 0, my = 0;
    let raf = 0;
    let visible = true;

    const unsub = onScrollFrame(({ y }) => {
      scrollY = y;
    });
    const move = (e: PointerEvent) => {
      tx = e.clientX / window.innerWidth - 0.5;
      ty = e.clientY / window.innerHeight - 0.5;
    };
    if (hover) window.addEventListener("pointermove", move, { passive: true });

    const tick = (t: number) => {
      raf = 0;
      if (!visible) return;
      mx += (tx - mx) * 0.06;
      my += (ty - my) * 0.06;
      const h = el.offsetHeight || 1;
      tiles.current.forEach((n, i) => {
        if (!n) return;
        const c = CLOUD[i];
        const pair = Math.floor(i / 2);
        const float = Math.sin(t / 1800 + pair * 1.3) * (i % 2 === 0 ? 5 : -5);
        const x = -mx * c.depth * 30;
        const y = -scrollY * c.depth - my * c.depth * 30 + float;
        n.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
      });
      if (headline.current) {
        const p = clamp(scrollY / h);
        headline.current.style.transform = `translate3d(0, ${(scrollY * 0.25).toFixed(1)}px, 0) scale(${(1 - p * 0.08).toFixed(4)})`;
        headline.current.style.opacity = String(Math.max(0, 1 - p * 1.2));
      }
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !raf) raf = requestAnimationFrame(tick);
    });
    io.observe(el);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      unsub();
      window.removeEventListener("pointermove", move);
    };
  }, []);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden min-h-[92vh] sm:min-h-[100vh] flex items-center"
      style={{
        background:
          "radial-gradient(60vw 60vw at 0% 0%, #EEF0D9 0%, rgba(238,240,217,0) 60%), radial-gradient(55vw 55vw at 100% 100%, #F1E2C4 0%, rgba(241,226,196,0) 60%), #F5F1E8",
      }}
      aria-label="Our team"
    >
      {/* portrait cloud — architectural symmetrical framing */}
      <div className="absolute inset-0 hidden md:block pointer-events-none" aria-hidden>
        {CLOUD.map((c, i) => (
          <div
            key={c.src}
            ref={(n) => {
              tiles.current[i] = n;
            }}
            className="absolute will-change-transform"
            style={{ left: `${c.x}%`, top: `${c.y}%`, width: `${c.w}vw` }}
          >
            <div className="relative aspect-[3/4] rounded-[24px] overflow-hidden shadow-[0_24px_50px_-20px_rgba(31,58,44,0.3)] ring-1 ring-white/70 bg-[#e7e1d5]">
              <Image src={c.src} alt="" fill sizes="16vw" className="object-cover object-center" priority={i < 2} />
            </div>
          </div>
        ))}
      </div>

      <div ref={headline} className="gs-container relative z-10 text-center py-24">
        <p className="gs-eyebrow text-[#52704e] justify-center">The Green Shoots team</p>
        <RevealLines
          as="h1"
          className="font-cormorant font-normal text-[clamp(3.2rem,9vw,10rem)] leading-[0.88] tracking-[-0.035em] mt-6 mx-auto"
          lines={[<>The people who&apos;ll</>, <em key="e" className="text-[#52704e]">know your name.</em>]}
        />
        <Reveal delay={350}>
          <p className="text-[17px] leading-relaxed text-[#3d5446] mt-8 max-w-md mx-auto">
            A small team, on purpose. You&apos;ll always know who you&apos;re talking to, and they&apos;ll know your plan.
          </p>
        </Reveal>

        {/* mobile: a simple face row */}
        <div className="md:hidden mt-10 flex justify-center -space-x-3">
          {CLOUD.map((c) => (
            <span key={c.src} className="relative w-14 h-14 rounded-full overflow-hidden ring-4 ring-[#F5F1E8]">
              <Image src={c.src} alt={c.alt} fill sizes="56px" className="object-cover object-top" />
            </span>
          ))}
        </div>

      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Founder — portrait with depth, a giant name sliding behind           */
/* ------------------------------------------------------------------ */

function Founder({
  f,
  index,
  onOpenProfile,
}: {
  f: (typeof FOUNDERS)[number];
  index: number;
  onOpenProfile: () => void;
}) {
  const flip = index % 2 === 1;
  const nameRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  const ref = useScrollFx<HTMLElement>((r, vh) => {
    const p = clamp((vh - r.top) / (vh + r.height)); // 0 → 1 across the viewport
    const c = p - 0.5;
    if (nameRef.current) nameRef.current.style.transform = `translate3d(${(flip ? 1 : -1) * c * 38}vw, 0, 0)`;
    if (imgRef.current) imgRef.current.style.transform = `translate3d(0, ${(c * -8).toFixed(2)}%, 0) scale(1.08)`;
    if (quoteRef.current) quoteRef.current.style.transform = `translate3d(0, ${(c * -50).toFixed(1)}px, 0)`;
  });

  return (
    <section
      ref={ref}
      className={`relative overflow-hidden py-24 sm:py-36 ${flip ? "bg-[#EEF0D9]" : "bg-[#F5F1E8]"}`}
      aria-label={`${f.role}: ${f.name}`}
    >
      {/* giant outlined name */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 pointer-events-none select-none" aria-hidden>
        <div ref={nameRef} className="tm-outline whitespace-nowrap font-cormorant italic text-[clamp(7rem,22vw,22rem)] leading-none" style={{ marginLeft: flip ? "-30vw" : "10vw" }}>
          {f.name} · {f.name}
        </div>
      </div>

      <div className="gs-container relative grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
        {/* portrait */}
        <div className={`lg:col-span-5 relative ${flip ? "lg:col-start-8 lg:order-2" : "lg:col-start-1"}`}>
          <Reveal variant="clip">
            <div className="relative aspect-[4/5] rounded-[32px] overflow-hidden bg-[#e7e1d5]">
              <div ref={imgRef} className="absolute inset-0" style={{ transform: "scale(1.08)" }}>
                <Image src={f.photo} alt={`${f.name}, ${f.role}`} fill sizes="(min-width:1024px) 40vw, 100vw" className="object-cover object-[50%_10%]" priority={index === 0} />
              </div>
              <span className="absolute top-5 left-5 px-3.5 py-1.5 rounded-full text-[11px] font-semibold tracking-[0.12em] uppercase bg-[#F5F1E8] text-[#1F3A2C]">
                {f.role}
              </span>
            </div>
          </Reveal>
          {/* floating quote card — positioned on the outer flank away from buttons */}
          <div
            ref={quoteRef}
            className={`hidden sm:block absolute -bottom-6 ${flip ? "-right-4 sm:-right-6 lg:-right-10" : "-left-4 sm:-left-6 lg:-left-10"} w-[min(310px,85%)] z-10 pointer-events-none`}
          >
            <div className="rounded-[22px] bg-[#FBF9F4] p-5 sm:p-6 shadow-[0_30px_60px_-30px_rgba(31,58,44,0.4)] border border-white">
              <span className="font-cormorant text-[3.5rem] leading-[0.5] text-[#c5a963]" aria-hidden>
                &ldquo;
              </span>
              <p className="font-cormorant italic text-[1.25rem] leading-snug text-[#1F3A2C] mt-2">{f.quote}</p>
            </div>
          </div>
        </div>

        {/* words */}
        <div className={`lg:col-span-7 relative z-20 ${flip ? "lg:col-start-1 lg:order-1" : "lg:col-start-6"}`}>
          <span className="gs-index text-[#bda15f]">0{index + 1} — {f.role}</span>
          <RevealLines
            as="h2"
            className="font-cormorant text-[clamp(3rem,6.4vw,6.4rem)] leading-[0.92] tracking-[-0.02em] mt-5"
            lines={[f.name.split(" ")[0], <em key="l" className="text-[#52704e]">{f.name.split(" ").slice(1).join(" ")}</em>]}
          />
          <Reveal delay={200}>
            <p className="font-cormorant italic text-[1.5rem] text-[#52704e] mt-5">{f.title}</p>
            <p className="text-[16px] leading-relaxed text-[#4a5f51] mt-5 max-w-lg">{f.line}</p>
            <p className="sm:hidden font-cormorant italic text-[1.25rem] leading-snug mt-6 border-l-2 border-[#c5a963] pl-4">{f.quote}</p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href={`/contact?topic=${encodeURIComponent(f.contactTopic)}`}
                className="gs-btn gs-btn-dark !pr-3.5 inline-flex"
              >
                <span>{f.contactCta}</span>
                <span className="gs-btn-arrow"><IconArrow className="w-3.5 h-3.5" /></span>
              </Link>
              <a
                href={f.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full border border-[#1F3A2C]/20 pl-2 pr-4 py-2 text-[13.5px] font-medium hover:bg-[#1F3A2C] hover:text-[#F5F1E8] transition-colors"
              >
                <span className="w-7 h-7 rounded-full bg-[#1F3A2C] text-[#F5F1E8] grid place-items-center">
                  <LinkedinIcon className="w-3 h-3" />
                </span>
                <span>LinkedIn</span>
              </a>
              <button
                type="button"
                onClick={onOpenProfile}
                className="group relative inline-flex items-center gap-3 rounded-full border border-[#1F3A2C]/25 bg-white/80 hover:bg-[#1F3A2C] px-5 py-2.5 text-[14px] font-medium text-[#1F3A2C] hover:text-[#F5F1E8] shadow-[0_4px_20px_-4px_rgba(31,58,44,0.15)] hover:shadow-[0_10px_30px_-6px_rgba(31,58,44,0.35)] transition-all duration-300"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8fa868] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#52704e]"></span>
                </span>
                <span>Read full story &amp; profile</span>
                <span className="w-6 h-6 rounded-full bg-[#1F3A2C]/10 group-hover:bg-white/20 grid place-items-center transition-colors">
                  <IconArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Cinematic Founder Stage — Award-Winning 3D Depth Expansion        */
/* ------------------------------------------------------------------ */

function CinematicFounderStage({
  founder,
  onClose,
}: {
  founder: FounderItem | null;
  onClose: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!founder) return;
    lockScroll(true);

    // Ensure reading pane starts at top when opened
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      lockScroll(false);
      window.removeEventListener("keydown", onKey);
    };
  }, [founder, onClose]);

  if (!founder || !mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 lg:p-8 overflow-hidden select-text"
      role="dialog"
      aria-modal="true"
      aria-label={`${founder.name} — Profile`}
      data-lenis-prevent
    >
      {/* 1. Deep Atmospheric Backdrop with Blur */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-[#07130D]/85 backdrop-blur-2xl transition-all duration-500 cursor-pointer"
        aria-hidden="true"
      />

      {/* 2. Kinetic Watermark floating in depth behind the card */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <div className="dossier-watermark font-cormorant italic text-[clamp(6rem,18vw,20rem)] text-white/[0.05] whitespace-nowrap will-change-transform leading-none">
          {founder.name} · {founder.name}
        </div>
      </div>

      {/* 3. The Centered Editorial Dossier Card */}
      <div
        key={founder.name}
        className="dossier-stage-card relative w-full max-w-5xl h-[88vh] max-h-[740px] min-h-[460px] bg-[#FAF8F5] rounded-[24px] sm:rounded-[28px] shadow-[0_30px_90px_rgba(0,0,0,0.65)] border border-white/50 flex flex-col md:flex-row overflow-hidden z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Desktop Left Column: Anchored Identity Panel */}
        <div className="hidden md:flex md:w-[34%] bg-[#EEF0D9]/80 p-6 lg:p-7 flex-col justify-between border-r border-[#1F3A2C]/10 shrink-0 select-none">
          <div className="space-y-4">
            <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-[0.14em] uppercase bg-[#1F3A2C] text-[#F5F1E8]">
              {founder.role}
            </span>

            {/* Portrait */}
            <div className="relative aspect-[4/5] max-h-[240px] w-full rounded-2xl overflow-hidden shadow-[0_12px_28px_-10px_rgba(31,58,44,0.25)] ring-1 ring-[#1F3A2C]/10 bg-[#e7e1d5]">
              <Image
                src={founder.photo}
                alt={founder.name}
                fill
                sizes="300px"
                className="object-cover object-[50%_15%]"
                priority
              />
            </div>

            {/* Identity details */}
            <div className="pt-1">
              <h2 className="font-cormorant text-[2rem] leading-none text-[#1F3A2C]">
                {founder.name}
              </h2>
              <p className="font-cormorant italic text-[1.1rem] text-[#52704e] mt-1 leading-snug">
                {founder.title}
              </p>
            </div>

            {/* Quick credentials */}
            {(founder.extended.education || founder.extended.goal) && (
              <div className="pt-2 space-y-1.5 text-[12px] text-[#3D5245] border-t border-[#1F3A2C]/10">
                {founder.extended.education && (
                  <p><span className="font-semibold text-[#1F3A2C]">Education:</span> {founder.extended.education}</p>
                )}
                {founder.extended.goal && (
                  <p><span className="font-semibold text-[#1F3A2C]">Goal:</span> {founder.extended.goal}</p>
                )}
              </div>
            )}
          </div>

          {/* Bottom actions */}
          <div className="pt-4 space-y-2 border-t border-[#1F3A2C]/10">
            <Link
              href={`/contact?topic=${encodeURIComponent(founder.contactTopic)}`}
              onClick={onClose}
              className="gs-btn gs-btn-dark !w-full !py-2.5 !px-4 text-[13px] inline-flex justify-center items-center gap-2"
            >
              <span>{founder.contactCta}</span>
              <span className="gs-btn-arrow"><IconArrow className="w-3.5 h-3.5" /></span>
            </Link>
            <a
              href={founder.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-[#1F3A2C]/20 bg-white hover:bg-[#1F3A2C] hover:text-[#F5F1E8] py-2 text-[12.5px] font-medium transition-colors"
            >
              <LinkedinIcon className="w-3.5 h-3.5" />
              <span>LinkedIn Profile</span>
            </a>
          </div>
        </div>

        {/* Mobile Top Bar */}
        <div className="md:hidden flex items-center justify-between p-4 bg-[#EEF0D9] border-b border-[#1F3A2C]/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative w-11 h-13 rounded-xl overflow-hidden shrink-0 bg-[#e7e1d5] ring-1 ring-[#1F3A2C]/10">
              <Image
                src={founder.photo}
                alt={founder.name}
                fill
                sizes="50px"
                className="object-cover object-[50%_15%]"
                priority
              />
            </div>
            <div>
              <span className="inline-block px-2 py-0.2 rounded-full text-[9px] font-bold uppercase tracking-wider bg-[#1F3A2C] text-[#F5F1E8]">
                {founder.role}
              </span>
              <h2 className="font-cormorant text-[1.45rem] leading-none text-[#1F3A2C] mt-0.5">
                {founder.name}
              </h2>
            </div>
          </div>
          {/* THE SINGLE CLOSE BUTTON ON MOBILE */}
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white text-[#1F3A2C] grid place-items-center text-sm font-semibold shadow-sm hover:bg-[#1F3A2C] hover:text-white transition-colors"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Right Column: Editorial Reading Flow (No nested cards) */}
        <div className="flex-1 flex flex-col overflow-hidden bg-[#FAF8F5]">
          {/* Desktop Pinned Header with THE SINGLE CLOSE BUTTON */}
          <div className="hidden md:flex items-center justify-between px-8 py-5 border-b border-[#1F3A2C]/10 shrink-0 bg-[#FAF8F5]">
            <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#52704e]">
              About {founder.first}
            </span>
            {/* THE ONLY CLOSE BUTTON */}
            <button
              type="button"
              onClick={onClose}
              className="group flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1F3A2C]/5 hover:bg-[#1F3A2C] text-[#1F3A2C] hover:text-white transition-all text-[12px] font-medium"
              aria-label="Close profile"
            >
              <span>Close</span>
              <span className="w-4 h-4 rounded-full bg-[#1F3A2C]/10 group-hover:bg-white/20 grid place-items-center text-[10px] font-bold">✕</span>
            </button>
          </div>

          {/* Reading Scroll Body */}
          <div
            ref={contentRef}
            className="flex-1 overflow-y-auto px-6 py-6 sm:px-9 sm:py-8 space-y-7 [scrollbar-width:thin] text-[#1F3A2C]"
          >
            {/* 1. Core Story / Headline & Narrative */}
            {(founder.extended.storyHeadline || founder.extended.story) && (
              <div className="space-y-3">
                {founder.extended.storyHeadline && (
                  <p className="font-cormorant text-[1.45rem] sm:text-[1.65rem] leading-snug text-[#1F3A2C] font-normal">
                    {founder.extended.storyHeadline}
                  </p>
                )}
                {founder.extended.storyBody && (
                  <p className="text-[15px] sm:text-[15.5px] leading-relaxed text-[#3D5245]">
                    {founder.extended.storyBody}
                  </p>
                )}
                {!founder.extended.storyHeadline && founder.extended.story && (
                  <p className="text-[15px] sm:text-[15.5px] leading-relaxed text-[#3D5245]">
                    {founder.extended.story}
                  </p>
                )}
              </div>
            )}

            {founder.extended.bio && !founder.extended.storyHeadline && !founder.extended.story && (
              <div className="space-y-4">
                <p className="text-[15.5px] sm:text-[16px] leading-relaxed text-[#2C3E33]">
                  {founder.extended.bio}
                </p>
              </div>
            )}

            {/* 2. Why I do what I do */}
            {founder.extended.why && (
              <div className="border-l-2 border-[#52704e] pl-4 sm:pl-5 py-1 space-y-1.5">
                <p className="text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[#52704e]">
                  Why I do what I do
                </p>
                <blockquote className="font-cormorant italic text-[1.3rem] sm:text-[1.45rem] leading-snug text-[#1F3A2C]">
                  &ldquo;{founder.extended.why.quote}&rdquo;
                </blockquote>
                {founder.extended.why.context && (
                  <p className="text-[13px] text-[#5A7063]">
                    — {founder.extended.why.context}
                  </p>
                )}
              </div>
            )}

            {/* 3. What Sets Me Apart */}
            {founder.extended.whatSetsApart && founder.extended.whatSetsApart.length > 0 && (
              <div className="space-y-3 pt-2">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#52704e]">
                  What sets me apart
                </p>
                <ul className="space-y-2.5">
                  {founder.extended.whatSetsApart.map((pt, i) => (
                    <li key={i} className="flex items-start gap-3 text-[14px] sm:text-[14.5px] text-[#3D5245] leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#52704e] mt-2 shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 4. Core Expertise (Saloni - clean text pills, NO emojis) */}
            {founder.extended.expertise && founder.extended.expertise.length > 0 && (
              <div className="space-y-3 pt-2">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#52704e]">
                  Core Expertise
                </p>
                <div className="flex flex-wrap gap-2">
                  {founder.extended.expertise.map((item, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-[#EEF0D9] text-[12.5px] font-medium text-[#1F3A2C]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* 5. The Personal Side (Saloni) */}
            {founder.extended.personalSide && (
              <div className="space-y-3 pt-2">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#52704e]">
                  The Personal Side
                </p>
                <p className="text-[14px] text-[#3D5245]">
                  {founder.extended.personalSide.intro}
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-0.5">
                  {founder.extended.personalSide.points.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-[13.5px] text-[#4A5F51] leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c5a963] mt-2 shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 6. Closing Note */}
            {founder.extended.closing && (
              <div className="pt-4 border-t border-[#1F3A2C]/10 space-y-4">
                <p className="font-cormorant italic text-[1.25rem] sm:text-[1.35rem] leading-snug text-[#1F3A2C]">
                  {founder.extended.closing}
                </p>
                <Link
                  href={`/contact?topic=${encodeURIComponent(founder.contactTopic)}`}
                  onClick={onClose}
                  className="gs-btn gs-btn-dark !py-2.5 !px-5 text-[13px] inline-flex items-center gap-2"
                >
                  <span>Connect with {founder.first}</span>
                  <span className="gs-btn-arrow"><IconArrow className="w-3.5 h-3.5" /></span>
                </Link>
              </div>
            )}

            {/* Mobile Bottom Actions */}
            <div className="md:hidden pt-4 pb-2 space-y-2 border-t border-[#1F3A2C]/10">
              <a
                href={founder.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-[#1F3A2C]/20 bg-white py-2 text-[12.5px] font-medium text-[#1F3A2C]"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
                <span>LinkedIn Profile</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

/* ------------------------------------------------------------------ */
/* In public — Saloni on Instagram & YouTube                           */
/* ------------------------------------------------------------------ */

const SOCIAL = {
  instagram: { handle: "@wealthwithsaloni", href: "https://www.instagram.com/wealthwithsaloni/" },
  youtube: { handle: "@salonimehtaofficial", href: "https://www.youtube.com/@salonimehtaofficial" },
};

const TOPICS = ["Money & emotions", "Financial therapy", "Investing, simply", "Women & wealth", "Family goals", "Myth-busting"];

function InPublic() {
  const phoneRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const ref = useScrollFx<HTMLElement>((r, vh) => {
    const c = clamp((vh - r.top) / (vh + r.height)) - 0.5;
    if (phoneRef.current) phoneRef.current.style.transform = `translate3d(0, ${(c * -140).toFixed(1)}px, 0) rotate(${(-6 + c * 6).toFixed(2)}deg)`;
    if (screenRef.current) screenRef.current.style.transform = `translate3d(0, ${(c * 60).toFixed(1)}px, 0)`;
  });

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#F5F1E8] py-24 sm:py-32" aria-label="Saloni on Instagram and YouTube">
      <div className="gs-container">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <p className="gs-eyebrow text-[#52704e]">Saloni, in public</p>
            <RevealLines
              as="h2"
              className="gs-h1 mt-4"
              lines={["Get to know us", <em key="e" className="text-[#52704e]">before you meet us.</em>]}
            />
          </div>
          <p className="text-[15.5px] text-[#4a5f51] max-w-sm">
            Saloni shares money conversations every week: plain words, no jargon, no product pitches.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* YouTube */}
          <a
            href={SOCIAL.youtube.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group lg:col-span-7 relative rounded-[32px] overflow-hidden bg-[#E4ECDF] p-3 flex flex-col"
          >
            <div className="relative aspect-[16/10] rounded-[24px] overflow-hidden bg-[#d7dfcf]">
              <div ref={screenRef} className="absolute -inset-y-6 inset-x-0">
                <Image
                  src="/team/saloni_youtube_cover.webp"
                  alt="Saloni Mehta discussing wealth in public"
                  fill
                  sizes="(min-width:1024px) 55vw, 100vw"
                  className="object-cover object-center transition-transform duration-[1.2s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#1F3A2C]/55 via-transparent to-transparent" aria-hidden />
              <span className="absolute inset-0 grid place-items-center" aria-hidden>
                <span className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#F5F1E8] grid place-items-center shadow-xl transition-transform duration-500 group-hover:scale-110">
                  <span className="absolute inset-0 rounded-full border border-[#F5F1E8] tm-ping" />
                  <svg viewBox="0 0 24 24" className="w-7 h-7 ml-1 fill-[#1F3A2C]"><path d="M8 5.5v13l11-6.5z" /></svg>
                </span>
              </span>
              <span className="absolute bottom-5 left-5 right-5 flex items-center gap-3 text-[#F5F1E8]">
                <YoutubeIcon className="w-5 h-5" />
                <span className="text-[13px] font-semibold tracking-[0.14em] uppercase">YouTube</span>
              </span>
            </div>
            <div className="px-4 pt-6 pb-4 flex items-end justify-between gap-4">
              <div>
                <p className="font-cormorant text-[clamp(1.9rem,3vw,2.6rem)] leading-none">Watch the long conversations</p>
                <p className="text-[14px] text-[#4a5f51] mt-2">{SOCIAL.youtube.handle}</p>
              </div>
              <span className="shrink-0 w-12 h-12 rounded-full bg-[#1F3A2C] text-[#F5F1E8] grid place-items-center transition-colors group-hover:bg-[#c5a963] group-hover:text-[#1F3A2C]">
                <IconArrow className="w-4 h-4 -rotate-45" />
              </span>
            </div>
          </a>

          {/* Instagram */}
          <a
            href={SOCIAL.instagram.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group lg:col-span-5 relative rounded-[32px] overflow-hidden bg-[#F1E7D2] p-8 sm:p-10 flex flex-col justify-between min-h-[520px]"
          >
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-3 text-[13px] font-semibold tracking-[0.14em] uppercase">
                <InstagramIcon className="w-5 h-5" /> Instagram
              </span>
              <span className="w-12 h-12 rounded-full bg-[#1F3A2C] text-[#F5F1E8] grid place-items-center transition-colors group-hover:bg-[#c5a963] group-hover:text-[#1F3A2C]">
                <IconArrow className="w-4 h-4 -rotate-45" />
              </span>
            </div>

            {/* phone */}
            <div ref={phoneRef} className="absolute right-[-6%] top-[18%] w-[52%] max-w-[260px]" style={{ transform: "rotate(-6deg)" }} aria-hidden>
              <div className="rounded-[34px] bg-[#1F3A2C] p-2 shadow-[0_40px_70px_-30px_rgba(31,58,44,0.6)]">
                <div className="rounded-[27px] overflow-hidden bg-[#FBF9F4]">
                  <div className="flex items-center gap-2 px-3 py-3">
                    <span className="relative w-8 h-8 rounded-full overflow-hidden ring-2 ring-[#c5a963]">
                      <Image src={FOUNDERS[0].photo} alt="" fill sizes="32px" className="object-cover object-top" />
                    </span>
                    <span className="text-[10.5px] font-semibold text-[#1F3A2C]">wealthwithsaloni</span>
                  </div>
                  <div className="relative aspect-square">
                    <Image src={FOUNDERS[0].photo} alt="" fill sizes="240px" className="object-cover object-top" />
                  </div>
                  <div className="grid grid-cols-3 gap-[2px] mt-[2px]">
                    {["#EEF0D9", "#c5a963", "#52704e"].map((c) => (
                      <span key={c} className="aspect-square grid place-items-center font-cormorant italic text-[1.1rem] text-[#1F3A2C]" style={{ background: c }}>
                        ₹
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="relative max-w-[55%]">
              <p className="font-cormorant text-[clamp(1.9rem,3vw,2.6rem)] leading-none">Money, in a minute</p>
              <p className="text-[14px] text-[#4a5f51] mt-3">Short reels and everyday money truths.</p>
              <p className="text-[14px] font-semibold mt-5">{SOCIAL.instagram.handle}</p>
            </div>
          </a>
        </div>
      </div>

      {/* topic ribbon */}
      <Marquee className="mt-16 sm:mt-20 py-5 border-y border-[#1F3A2C]/10" speed={36}>
        {TOPICS.map((t) => (
          <span key={t} className="flex items-center font-cormorant italic text-[clamp(1.8rem,3.4vw,3rem)] px-8 whitespace-nowrap">
            {t}
            <span className="ml-16 w-2 h-2 rounded-full bg-[#c5a963]" aria-hidden />
          </span>
        ))}
      </Marquee>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Specialists — a pinned horizontal reel on all screen sizes        */
/* ------------------------------------------------------------------ */

function Specialists() {
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const cardImgs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);

  const ref = useScrollFx<HTMLElement>((r, vh, vw) => {
    const track = trackRef.current;
    if (!track) return;
    const p = clamp(-r.top / (r.height - vh));
    const max = track.scrollWidth - vw + (vw * 0.05);
    track.style.transform = `translate3d(${(-p * max).toFixed(1)}px, 0, 0)`;
    if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
    setActive(Math.min(TEAM.length - 1, Math.round(p * (TEAM.length - 1))));
    // each portrait slides inside its frame relative to screen centre
    cardImgs.current.forEach((img) => {
      if (!img) return;
      const cr = img.parentElement!.getBoundingClientRect();
      const off = (cr.left + cr.width / 2 - vw / 2) / vw;
      img.style.transform = `translate3d(${(off * -10).toFixed(2)}%, 0, 0) scale(1.04)`;
    });
  });

  return (
    <section
      ref={ref}
      className="relative bg-[#EEF0D9] h-[360vh] sm:h-[400vh] lg:h-[450vh]"
      aria-label="Who to call for what"
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center py-6 sm:py-8 lg:py-0 lg:pt-[calc(var(--nav-h)-20px)]">
        {/* big faint topic word that swaps as you travel */}
        <div className="absolute right-[-2vw] top-[8vh] font-cormorant italic text-[clamp(6rem,16vw,16rem)] leading-none text-[#1F3A2C]/[0.05] pointer-events-none select-none hidden lg:block" aria-hidden>
          0{active + 1}
        </div>

        <div className="gs-container relative flex flex-col lg:flex-row lg:items-end justify-between gap-4 sm:gap-6">
          <div>
            <p className="gs-eyebrow text-[#52704e]">The specialists</p>
            <h2 className="font-cormorant text-[clamp(2.2rem,5vw,4.4rem)] leading-[0.95] tracking-[-0.02em] mt-2 sm:mt-4">
              Who to call <em className="text-[#52704e]">for what.</em>
            </h2>
          </div>
          <p className="text-[13.5px] sm:text-[15.5px] text-[#4a5f51] max-w-sm">
            Every client gets a named lead. When something specific comes up, the right specialist steps in.
          </p>
        </div>

        <div className="mt-6 sm:mt-10 lg:mt-14 overflow-hidden w-full select-none">
          <div ref={trackRef} className="flex gap-4 sm:gap-6 lg:gap-8 w-max px-[var(--gutter)] will-change-transform">
            {TEAM.map((t, i) => (
              <article
                key={t.name}
                className="shrink-0 w-[74vw] sm:w-[44vw] lg:w-[28vw] xl:w-[24vw] rounded-[24px] sm:rounded-[28px] p-2.5 sm:p-3 transition-transform duration-500"
                style={{ background: t.tint }}
              >
                <div className="relative aspect-[4/5] max-h-[38vh] sm:max-h-[46vh] lg:max-h-none rounded-[18px] sm:rounded-[22px] overflow-hidden bg-white/40">
                  <div
                    ref={(n) => {
                      cardImgs.current[i] = n;
                    }}
                    className="absolute inset-0"
                    style={{ transform: "scale(1.04)" }}
                  >
                    <Image src={t.photo} alt={`${t.name}, ${t.role}`} fill sizes="(min-width:1024px) 28vw, (min-width:640px) 44vw, 74vw" className="object-cover object-center" />
                  </div>
                  <span className="absolute top-3 left-3 sm:top-4 sm:left-4 px-2.5 sm:px-3 py-1 rounded-full bg-[#F5F1E8] text-[10px] sm:text-[11px] font-semibold tracking-[0.12em] uppercase text-[#1F3A2C]">
                    {t.topic}
                  </span>
                  <span className="absolute bottom-2 right-3 sm:bottom-3 sm:right-4 font-cormorant italic text-[3.8rem] sm:text-[5rem] leading-none text-white/85 drop-shadow" aria-hidden>
                    0{i + 1}
                  </span>
                </div>
                <div className="px-2 pt-3 pb-1 sm:px-3 sm:pt-4 sm:pb-2 flex items-end justify-between gap-3">
                  <div>
                    <h3 className="font-cormorant text-[1.6rem] sm:text-[2rem] leading-none">{t.name}</h3>
                    <p className="text-[12px] sm:text-[13.5px] text-[#4a5f51] mt-1 sm:mt-1.5">{t.role}</p>
                  </div>
                  <Link
                    href={`/contact?topic=${encodeURIComponent(`${t.topic} (${t.name})`)}`}
                    aria-label={`Book time with ${t.name}`}
                    className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#1F3A2C] text-[#F5F1E8] grid place-items-center hover:bg-[#c5a963] hover:text-[#1F3A2C] transition-colors"
                  >
                    <IconArrow className="w-3.5 h-3.5 sm:w-4 sm:h-4 -rotate-45" />
                  </Link>
                </div>
              </article>
            ))}
            {/* end card */}
            <div className="shrink-0 w-[74vw] sm:w-[44vw] lg:w-[24vw] rounded-[24px] sm:rounded-[28px] border border-dashed border-[#1F3A2C]/25 grid place-items-center p-6 sm:p-10 text-center">
              <div>
                <p className="font-cormorant italic text-[1.8rem] sm:text-[2.2rem] leading-tight">Not sure who you need?</p>
                <p className="text-[13px] sm:text-[14.5px] text-[#4a5f51] mt-2 sm:mt-3">Start with a conversation. We&apos;ll route you.</p>
                <Link href="/contact" className="gs-btn gs-btn-dark !pr-2.5 mt-5 sm:mt-7 inline-flex text-[13px]">
                  <span>Start here</span>
                  <span className="gs-btn-arrow">
                    <IconArrow className="w-3.5 h-3.5" />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* progress */}
        <div className="gs-container mt-6 sm:mt-8 flex items-center gap-4 sm:gap-6" aria-live="polite">
          <span className="gs-index text-[#1F3A2C] text-[11px] sm:text-xs">0{active + 1}</span>
          <span className="relative flex-1 h-px bg-[#1F3A2C]/15 overflow-hidden">
            <span ref={barRef} className="absolute inset-0 bg-[#c5a963] origin-left" style={{ transform: "scaleX(0)" }} />
          </span>
          <span className="gs-index text-[#1F3A2C]/50 text-[11px] sm:text-xs">0{TEAM.length}</span>
          <span className="font-cormorant italic text-[1.1rem] sm:text-[1.35rem] min-w-[16ch] sm:min-w-[22ch] text-right truncate">
            {TEAM[active].topic} → {TEAM[active].name.split(" ")[0]}
          </span>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Values — cards that stack as you scroll                              */
/* ------------------------------------------------------------------ */

function Values() {
  return (
    <section className="py-24 sm:py-32 bg-[#F5F1E8]" aria-label="What we hold to">
      <div className="gs-container grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-[calc(var(--nav-h)+40px)]">
            <p className="gs-eyebrow text-[#52704e]">Our compass</p>
            <RevealLines as="h2" className="gs-h1 mt-4" lines={["What we", <em key="e" className="text-[#52704e]">hold to.</em>]} />
            <p className="text-[15.5px] text-[#4a5f51] mt-6 max-w-xs">Four words we hire for, review against, and expect you to hold us to.</p>
          </div>
        </div>
        <ul className="lg:col-span-8 flex flex-col gap-6">
          {VALUES.map((v, i) => (
            <li
              key={v.word}
              className="sticky rounded-[32px] p-8 sm:p-12 min-h-[32vh] sm:min-h-[44vh] flex flex-col justify-between border border-[#1F3A2C]/10 shadow-[0_-20px_50px_-30px_rgba(31,58,44,0.35)]"
              style={{ top: `calc(var(--nav-h) + 24px + ${i * 26}px)`, background: v.bg }}
            >
              <div className="flex items-center justify-between">
                <span className="gs-index" style={{ color: v.accent }}>
                  0{i + 1} / 0{VALUES.length}
                </span>
                <span className="w-10 h-10 rounded-full border border-current grid place-items-center opacity-40" aria-hidden>
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                </span>
              </div>
              <div>
                <p className="font-cormorant text-[clamp(3.4rem,8vw,7.5rem)] leading-[0.9] tracking-[-0.02em]">
                  {v.word.slice(0, -1)}
                  <em style={{ color: v.accent }}>{v.word.slice(-1)}.</em>
                </p>
                <p className="text-[17px] text-[#4a5f51] mt-4">{v.line}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Close — a window into why we do this                                 */
/* ------------------------------------------------------------------ */

function Close() {
  return (
    <section className="bg-[#F5F1E8] px-3 sm:px-5 pb-5" aria-label="Meet us">
      <div className="rounded-[36px] bg-[#EEF0D9] p-8 sm:p-14 lg:p-20 overflow-hidden relative">
        <div className="gs-container grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6">
            <p className="gs-eyebrow text-[#52704e]">Our headquarters</p>
            <RevealLines
              as="h2"
              className="gs-h1 mt-3"
              lines={["Come and meet us.", <em key="e" className="text-[#52704e]">Bring your questions.</em>]}
            />
            <p className="text-[16px] text-[#4a5f51] mt-6 max-w-lg leading-relaxed">
              Step into our consultation suite at Sai Fortune Business Centre in Ghatkopar East, Mumbai. Advice that starts in person, around an unhurried table, with people who listen first.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="/contact" className="gs-btn gs-btn-dark !pr-2.5">
                <span>Book a consultation</span>
                <span className="gs-btn-arrow">
                  <IconArrow className="w-3.5 h-3.5" />
                </span>
              </Link>
              <a
                href="https://www.google.com/maps/dir//Green+Shoots+Wealth+Fintech+LLP,+6th+Floor,+Sai+Fortune+Business+Centre,+601,+Tilak+Rd,+Maheshwar+Nagar,+Sindhu+Wadi,+Ghatkopar+East,+Mumbai,+Maharashtra+400077/@19.0773666,72.9090628,15z/data=!4m8!4m7!1m0!1m5!1m1!1s0x219a1a63ada9356f:0xad289e7f7f3cee8a!2m2!1d72.9053625!2d19.0773525"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[14px] font-medium text-[#1F3A2C] underline underline-offset-4 hover:text-[#52704e] transition-colors"
              >
                <span>Get directions on Google Maps</span>
                <IconArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[16/10] rounded-[28px] overflow-hidden shadow-2xl border border-[#1F3A2C]/10 bg-white">
              <Image
                src="/office_image2/office_2.webp"
                alt="Green Shoots Wealth advisory workstations and consultation suite at Sai Fortune, Mumbai"
                fill
                sizes="(min-width:1024px) 45vw, 100vw"
                className="object-cover"
              />
              <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md rounded-2xl px-4 py-2 text-[12px] font-medium text-[#1F3A2C] shadow-md border border-[#1F3A2C]/10 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#8fa868]" />
                <span>Sai Fortune Business Centre · Ghatkopar East, Mumbai</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function TeamPage() {
  const [activeFounder, setActiveFounder] = useState<FounderItem | null>(null);

  return (
    <>
      <div
        className="w-full flex flex-col bg-[#F5F1E8] text-[#1F3A2C] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center"
        style={{
          transform: activeFounder ? "scale(0.95)" : "scale(1)",
          filter: activeFounder ? "blur(6px) brightness(0.65)" : "none",
        }}
        data-motion-managed
      >
        <Hero />
        {FOUNDERS.map((f, i) => (
          <Founder
            key={f.name}
            f={f}
            index={i}
            onOpenProfile={() => setActiveFounder(f)}
          />
        ))}
        <InPublic />
        <Specialists />
        <Values />
        <Close />
      </div>

      {/* Cinematic Award-Winning Depth Expansion Stage */}
      <CinematicFounderStage
        founder={activeFounder}
        onClose={() => setActiveFounder(null)}
      />
    </>
  );
}
