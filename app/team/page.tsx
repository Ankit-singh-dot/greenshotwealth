"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LinkedinIcon, InstagramIcon, YoutubeIcon } from "@/components/Icons";
import { IconArrow } from "@/components/LineIcons";
import { RevealLines, Reveal, Marquee } from "@/components/motion/primitives";
import { onScrollFrame, clamp, prefersReducedMotion } from "@/components/motion/scroll";

/* ------------------------------------------------------------------ */
/* People                                                              */
/* ------------------------------------------------------------------ */

const FOUNDERS = [
  {
    name: "Saloni Mehta",
    first: "Saloni",
    role: "Founder",
    title: "Financial therapist & wealth architect",
    line: "Started Green Shoots so advice would begin with the person, not the product.",
    quote: "Money is never just money. It's the school fees, the parents' care, the year off you've been promising yourself.",
    photo: "/saloni_mehta.jpeg",
    linkedin: "https://www.linkedin.com/in/the-saloni-mehta/",
  },
  {
    name: "Kaushal Kapasi",
    first: "Kaushal",
    role: "Co-founder",
    title: "Chartered Accountant",
    line: "Brings a CA's eye to every plan: the numbers, the tax and the fine print.",
    quote: "A good plan should survive a bad year. I read the fine print so you never have to be surprised by it.",
    photo: "/images/team/kaushal_kapasi.jpg",
    linkedin: "https://www.linkedin.com/in/ca-kaushal-kapasi-bbb1b150/",
  },
];

/**
 * PLACEHOLDER TEAM — these names and photos came from the previous design
 * ("dummy names & profiles") and are not real people. Replace each entry with
 * a real team member before publishing.
 */
const TEAM = [
  { topic: "Equity & mutual funds", name: "Rohan Mehta", role: "Head of Equity Research", photo: "/images/advisor_1.jpg", tint: "#F8F4EA" },
  { topic: "Family & goal plans", name: "Priya Varma", role: "Senior Wealth Architect", photo: "/images/advisor_2.jpg", tint: "#F1E7D2" },
  { topic: "Debt & fixed income", name: "Amit Sen", role: "Debt & Treasury Lead", photo: "/images/advisor_3.jpg", tint: "#E4ECDF" },
  { topic: "Insurance & protection", name: "Neha Deshmukh", role: "Risk & Protection Lead", photo: "/images/advisor_4.jpg", tint: "#F3EBDD" },
  { topic: "Global & GIFT City", name: "Siddharth Iyer", role: "Global & GIFT City Lead", photo: "/images/advisor_5.jpg", tint: "#E8EEDB" },
];

const VALUES = [
  { word: "Integrity", line: "Honest, even when it's inconvenient.", bg: "#FBF8F1", accent: "#52704e" },
  { word: "Empathy", line: "The person before the portfolio.", bg: "#EEF0D9", accent: "#52704e" },
  { word: "Discipline", line: "Long-term plans, kept long-term.", bg: "#F1E7D2", accent: "#9a7d3c" },
  { word: "Learning", line: "Better at this every year.", bg: "#E4ECDF", accent: "#52704e" },
];

/** Hero portrait cloud: position (%), size (vw-ish), depth for parallax. */
const CLOUD = [
  { src: FOUNDERS[0].photo, alt: FOUNDERS[0].name, x: 6, y: 14, w: 15, depth: 0.35, r: -4 },
  { src: FOUNDERS[1].photo, alt: FOUNDERS[1].name, x: 80, y: 10, w: 15, depth: 0.55, r: 3 },
  { src: TEAM[0].photo, alt: TEAM[0].name, x: 70, y: 58, w: 11, depth: 0.85, r: -2 },
  { src: TEAM[1].photo, alt: TEAM[1].name, x: 16, y: 62, w: 10, depth: 0.7, r: 5 },
  { src: TEAM[2].photo, alt: TEAM[2].name, x: 88, y: 40, w: 8, depth: 1.1, r: 6 },
  { src: TEAM[3].photo, alt: TEAM[3].name, x: 42, y: 78, w: 9, depth: 0.95, r: -5 },
  { src: TEAM[4].photo, alt: TEAM[4].name, x: 0, y: 44, w: 7, depth: 1.25, r: 2 },
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
        const float = Math.sin(t / 1400 + i * 1.7) * 8;
        const x = -mx * c.depth * 46;
        const y = -scrollY * c.depth - my * c.depth * 46 + float;
        n.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) rotate(${c.r}deg)`;
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
      {/* portrait cloud */}
      <div className="absolute inset-0 hidden md:block" aria-hidden>
        {CLOUD.map((c, i) => (
          <div
            key={c.src}
            ref={(n) => {
              tiles.current[i] = n;
            }}
            className="absolute"
            style={{ left: `${c.x}%`, top: `${c.y}%`, width: `${c.w}vw`, transform: `rotate(${c.r}deg)` }}
          >
            <div className="relative aspect-[3/4] rounded-[22px] overflow-hidden shadow-[0_30px_60px_-30px_rgba(31,58,44,0.45)] ring-1 ring-white/60">
              <Image src={c.src} alt="" fill sizes="16vw" className="object-cover object-top" priority={i < 2} />
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
          {CLOUD.slice(0, 5).map((c) => (
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

function Founder({ f, index }: { f: (typeof FOUNDERS)[number]; index: number }) {
  const flip = index % 2 === 1;
  const nameRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  const ref = useScrollFx<HTMLElement>((r, vh) => {
    const p = clamp((vh - r.top) / (vh + r.height)); // 0 → 1 across the viewport
    const c = p - 0.5;
    if (nameRef.current) nameRef.current.style.transform = `translate3d(${(flip ? 1 : -1) * c * 38}vw, 0, 0)`;
    if (imgRef.current) imgRef.current.style.transform = `translate3d(0, ${(c * -14).toFixed(2)}%, 0) scale(1.18)`;
    if (quoteRef.current) quoteRef.current.style.transform = `translate3d(0, ${(c * -160).toFixed(1)}px, 0)`;
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
              <div ref={imgRef} className="absolute inset-0" style={{ transform: "scale(1.18)" }}>
                <Image src={f.photo} alt={`${f.name}, ${f.role}`} fill sizes="(min-width:1024px) 40vw, 100vw" className="object-cover object-top" />
              </div>
              <span className="absolute top-5 left-5 px-3.5 py-1.5 rounded-full text-[11px] font-semibold tracking-[0.12em] uppercase bg-[#F5F1E8] text-[#1F3A2C]">
                {f.role}
              </span>
            </div>
          </Reveal>
          {/* floating quote card — travels faster than the portrait */}
          <div
            ref={quoteRef}
            className={`hidden sm:block absolute -bottom-10 ${flip ? "-left-8 lg:-left-24" : "-right-8 lg:-right-24"} w-[min(340px,80%)]`}
          >
            <div className="rounded-[22px] bg-[#FBF9F4] p-6 shadow-[0_30px_60px_-30px_rgba(31,58,44,0.4)] border border-white">
              <span className="font-cormorant text-[3.5rem] leading-[0.5] text-[#c5a963]" aria-hidden>
                &ldquo;
              </span>
              <p className="font-cormorant italic text-[1.3rem] leading-snug text-[#1F3A2C] mt-2">{f.quote}</p>
            </div>
          </div>
        </div>

        {/* words */}
        <div className={`lg:col-span-6 ${flip ? "lg:col-start-1 lg:order-1" : "lg:col-start-7"}`}>
          <span className="gs-index text-[#bda15f]">0{index + 1} — {f.role}</span>
          <RevealLines
            as="h2"
            className="font-cormorant text-[clamp(3rem,6.4vw,6.4rem)] leading-[0.92] tracking-[-0.02em] mt-5"
            lines={[f.name.split(" ")[0], <em key="l" className="text-[#52704e]">{f.name.split(" ").slice(1).join(" ")}</em>]}
          />
          <Reveal delay={200}>
            <p className="font-cormorant italic text-[1.5rem] text-[#52704e] mt-5">{f.title}</p>
            <p className="text-[16px] leading-relaxed text-[#4a5f51] mt-5 max-w-md">{f.line}</p>
            <p className="sm:hidden font-cormorant italic text-[1.25rem] leading-snug mt-6 border-l-2 border-[#c5a963] pl-4">{f.quote}</p>
            <a
              href={f.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-3 rounded-full border border-[#1F3A2C]/20 pl-2 pr-5 py-2 text-[14px] font-medium hover:bg-[#1F3A2C] hover:text-[#F5F1E8] transition-colors"
            >
              <span className="w-9 h-9 rounded-full bg-[#1F3A2C] text-[#F5F1E8] grid place-items-center">
                <LinkedinIcon className="w-3.5 h-3.5" />
              </span>
              Connect with {f.first}
            </a>
          </Reveal>
        </div>
      </div>
    </section>
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
              <div ref={screenRef} className="absolute -inset-y-[12%] inset-x-0">
                <Image src={FOUNDERS[0].photo} alt="" fill sizes="(min-width:1024px) 55vw, 100vw" className="object-cover object-[50%_20%] transition-transform duration-[1.2s] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-105" />
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
/* Specialists — a pinned horizontal reel on desktop                    */
/* ------------------------------------------------------------------ */

function Specialists() {
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const cardImgs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const set = () => setDesktop(mq.matches && !prefersReducedMotion());
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);

  const ref = useScrollFx<HTMLElement>(
    (r, vh, vw) => {
      const track = trackRef.current;
      if (!track) return;
      if (!desktop) {
        track.style.transform = "";
        return;
      }
      const p = clamp(-r.top / (r.height - vh));
      const max = track.scrollWidth - vw;
      track.style.transform = `translate3d(${(-p * max).toFixed(1)}px, 0, 0)`;
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
      setActive(Math.min(TEAM.length - 1, Math.round(p * (TEAM.length - 1))));
      // each portrait slides inside its frame relative to screen centre
      cardImgs.current.forEach((img) => {
        if (!img) return;
        const cr = img.parentElement!.getBoundingClientRect();
        const off = (cr.left + cr.width / 2 - vw / 2) / vw;
        img.style.transform = `translate3d(${(off * -18).toFixed(2)}%, 0, 0) scale(1.25)`;
      });
    },
    [desktop]
  );

  return (
    <section
      ref={ref}
      className="relative bg-[#EEF0D9] lg:h-[420vh]"
      aria-label="Who to call for what"
    >
      <div className="lg:sticky lg:top-0 lg:h-screen lg:overflow-hidden flex flex-col justify-center py-24 lg:py-0 lg:pt-[calc(var(--nav-h)-20px)]">
        {/* big faint topic word that swaps as you travel */}
        <div className="absolute right-[-2vw] top-[8vh] font-cormorant italic text-[clamp(6rem,16vw,16rem)] leading-none text-[#1F3A2C]/[0.05] pointer-events-none select-none hidden lg:block" aria-hidden>
          0{active + 1}
        </div>

        <div className="gs-container relative flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <p className="gs-eyebrow text-[#52704e]">The specialists</p>
            <h2 className="gs-h1 mt-4">
              Who to call <em className="text-[#52704e]">for what.</em>
            </h2>
          </div>
          <p className="text-[15.5px] text-[#4a5f51] max-w-sm">
            Every client gets a named lead. When something specific comes up, the right specialist steps in.
          </p>
        </div>

        <div className="mt-10 lg:mt-14 overflow-x-auto lg:overflow-visible snap-x snap-mandatory [scrollbar-width:none]" data-lenis-prevent-touch>
          <div ref={trackRef} className="flex gap-5 lg:gap-8 w-max px-[var(--gutter)]">
            {TEAM.map((t, i) => (
              <article
                key={t.name}
                className={`snap-start shrink-0 w-[78vw] sm:w-[46vw] lg:w-[30vw] xl:w-[26vw] rounded-[28px] p-3 transition-transform duration-700 ${desktop && i === active ? "lg:-translate-y-3" : ""}`}
                style={{ background: t.tint }}
              >
                <div className="relative aspect-[4/5] rounded-[22px] overflow-hidden bg-white/40">
                  <div
                    ref={(n) => {
                      cardImgs.current[i] = n;
                    }}
                    className="absolute inset-0"
                    style={{ transform: "scale(1.25)" }}
                  >
                    <Image src={t.photo} alt={`${t.name}, ${t.role}`} fill sizes="(min-width:1024px) 30vw, 78vw" className="object-cover object-top" />
                  </div>
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#F5F1E8] text-[11px] font-semibold tracking-[0.12em] uppercase text-[#1F3A2C]">
                    {t.topic}
                  </span>
                  <span className="absolute bottom-3 right-4 font-cormorant italic text-[5rem] leading-none text-white/85 drop-shadow" aria-hidden>
                    0{i + 1}
                  </span>
                </div>
                <div className="px-3 pt-5 pb-3 flex items-end justify-between gap-4">
                  <div>
                    <h3 className="font-cormorant text-[2rem] leading-none">{t.name}</h3>
                    <p className="text-[13.5px] text-[#4a5f51] mt-2">{t.role}</p>
                  </div>
                  <Link
                    href={`/contact?topic=${encodeURIComponent(`${t.topic} (${t.name})`)}`}
                    aria-label={`Book time with ${t.name}`}
                    className="shrink-0 w-12 h-12 rounded-full bg-[#1F3A2C] text-[#F5F1E8] grid place-items-center hover:bg-[#c5a963] hover:text-[#1F3A2C] transition-colors"
                  >
                    <IconArrow className="w-4 h-4 -rotate-45" />
                  </Link>
                </div>
              </article>
            ))}
            {/* end card */}
            <div className="snap-start shrink-0 w-[78vw] sm:w-[46vw] lg:w-[26vw] rounded-[28px] border border-dashed border-[#1F3A2C]/25 grid place-items-center p-10 text-center">
              <div>
                <p className="font-cormorant italic text-[2.2rem] leading-tight">Not sure who you need?</p>
                <p className="text-[14.5px] text-[#4a5f51] mt-3">Start with a conversation. We&apos;ll route you.</p>
                <Link href="/contact" className="gs-btn gs-btn-dark !pr-2.5 mt-7 inline-flex">
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
        <div className="gs-container mt-10 hidden lg:flex items-center gap-6" aria-live="polite">
          <span className="gs-index text-[#1F3A2C]">0{active + 1}</span>
          <span className="relative flex-1 h-px bg-[#1F3A2C]/15 overflow-hidden">
            <span ref={barRef} className="absolute inset-0 bg-[#c5a963] origin-left" style={{ transform: "scaleX(0)" }} />
          </span>
          <span className="gs-index text-[#1F3A2C]/50">0{TEAM.length}</span>
          <span className="font-cormorant italic text-[1.35rem] min-w-[22ch] text-right">
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
      <div className="rounded-[36px] bg-[#EEF0D9] py-20 sm:py-28">
        <div className="gs-container flex flex-col lg:flex-row lg:items-end justify-between gap-10">
          <RevealLines
            as="h2"
            className="gs-h1"
            lines={["Come and meet us.", <em key="e" className="text-[#52704e]">The chai&apos;s on us.</em>]}
          />
          <Link href="/contact" className="gs-btn gs-btn-dark !pr-2.5 w-fit">
            <span>Book a consultation</span>
            <span className="gs-btn-arrow">
              <IconArrow className="w-3.5 h-3.5" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function TeamPage() {
  return (
    <div className="w-full flex flex-col bg-[#F5F1E8] text-[#1F3A2C]" data-motion-managed>
      <Hero />
      {FOUNDERS.map((f, i) => (
        <Founder key={f.name} f={f} index={i} />
      ))}
      <InPublic />
      <Specialists />
      <Values />
      <Close />
    </div>
  );
}
