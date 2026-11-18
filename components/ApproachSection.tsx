"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal, RevealLines } from "./motion/primitives";
import { onScrollFrame, scrollToTarget } from "./motion/scroll";

const CARDS = [
  {
    step: "01",
    season: "Seed",
    verb: "Understand",
    title: "Start with a conversation, not a product.",
    desc: "Your goals, your worries, what you already own and what you owe. We listen deeply to understand your story before recommending anything.",
    tags: ["Goal Discovery", "Risk Profiling", "Fiduciary Baseline"],
    bg: "#FCFBF7",
    border: "rgba(31, 58, 44, 0.12)",
  },
  {
    step: "02",
    season: "Roots",
    verb: "Plan",
    title: "A written plan you can actually read.",
    desc: "We turn your story into a clear asset allocation, with tax optimisation, emergency reserves, and protective coverage built in from day one.",
    tags: ["Asset Allocation", "Tax Efficiency", "Emergency Reserve"],
    bg: "#F6F8F0",
    border: "rgba(82, 112, 78, 0.18)",
  },
  {
    step: "03",
    season: "Growth",
    verb: "Invest",
    title: "Disciplined choices, compounded steadily.",
    desc: "Putting the plan to work across curated mutual funds, goal-linked SIPs, fixed income, and global IFSC opportunities — chosen for your timeline, not last year's returns.",
    tags: ["Goal-linked SIPs", "Global IFSC Portfolios", "Patience over Timing"],
    bg: "#F0F5EC",
    border: "rgba(68, 112, 85, 0.2)",
  },
  {
    step: "04",
    season: "Forest",
    verb: "Review",
    title: "Continuous tending for generations.",
    desc: "Markets move and life transitions happen: marriage, children, retirement. We review regularly and rebalance alongside you, so wealth shelters future generations.",
    tags: ["Quarterly Audits", "Dedicated Family Adviser", "Legacy Transition"],
    bg: "#EEF3E8",
    border: "rgba(42, 80, 56, 0.22)",
  },
];

const N = CARDS.length;

// Geometry of /public/footer_logo.png (403 x 369), measured from the asset.
const ROOT_X = 50; // %
const ROOT_Y = 97; // %
const RING_X = 49.9; // %
const RING_Y = 53.9; // %

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const range = (p: number, start: number, end: number) => clamp((p - start) / (end - start));
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export default function ApproachSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const treeRef = useRef<HTMLImageElement>(null);
  const ringRef = useRef<HTMLImageElement>(null);
  const tickRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const paintRef = useRef<((s: number) => void) | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const tree = treeRef.current;
    const ring = ringRef.current;
    if (!section || !tree || !ring) return;

    let target = 0;
    let current = 0;
    let rafId = 0;
    let lastStep = -1;

    const setMask = (el: HTMLElement, value: string) => {
      el.style.maskImage = value;
      el.style.webkitMaskImage = value;
    };

    const paint = (s: number) => {
      // s ranges from 0.0 to 3.0 (4 stages total: 0 = Seed, 1 = Roots, 2 = Growth, 3 = Forest)
      const w = tree.clientWidth || 320;

      // 1. CARDS STACK TRANSITIONS (cards stacking smoothly over one another)
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        if (s < i) {
          // Card is entering from below
          const t = range(s, i - 0.85, i);
          const y = (1 - t) * 44;
          const scale = 0.95 + 0.05 * t;
          const opacity = t;
          card.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0) scale(${scale.toFixed(3)})`;
          card.style.opacity = opacity.toFixed(2);
          card.style.zIndex = String(20 + i);
        } else {
          // Card is active or stacking into the background deck
          const past = s - i;
          const t = Math.min(1.0, past);
          const y = -14 * t;
          const scale = 1.0 - 0.045 * t;
          const opacity = Math.max(0.2, 1.0 - 0.35 * t);
          card.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0) scale(${scale.toFixed(3)})`;
          card.style.opacity = opacity.toFixed(2);
          card.style.zIndex = String(20 + i - Math.floor(past * 4));
        }
      });

      // 2. SYNCHRONIZED TREE ANIMATION
      // A) Tree Roots & Canopy Growth
      const roots = easeInOut(range(s, 0.0, 1.0));
      const crown = easeInOut(range(s, 1.0, 2.0));
      const minRadius = w * 0.16; // initial sprout always visible
      const radius = minRadius + w * (0.35 * roots + 0.52 * crown);
      const feather = Math.max(2, w * 0.08);
      setMask(
        tree,
        `radial-gradient(circle at ${ROOT_X}% ${ROOT_Y}%, #000 ${Math.max(0, radius - feather).toFixed(1)}px, transparent ${radius.toFixed(1)}px)`
      );
      tree.style.transform = `scale(${(0.96 + 0.04 * crown).toFixed(3)})`;

      // B) Golden Protective Ring (Chapter 3: Forest closes from 0° to 360°)
      const ringClose = easeInOut(range(s, 2.0, 3.0));
      const deg = ringClose * 180;
      setMask(
        ring,
        `conic-gradient(from 180deg at ${RING_X}% ${RING_Y}%, #000 0deg ${deg.toFixed(1)}deg, transparent ${deg.toFixed(1)}deg ${(360 - deg).toFixed(1)}deg, #000 ${(360 - deg).toFixed(1)}deg)`
      );

      // D) Tree Card 4-Segment Progress Bar
      tickRefs.current.forEach((el, i) => {
        if (el) el.style.transform = `scaleX(${clamp(s - i + 0.15).toFixed(2)})`;
      });

      // Active Stage index
      const step = clamp(Math.round(s), 0, N - 1);
      if (step !== lastStep) {
        lastStep = step;
        setActive(step);
      }
    };

    paintRef.current = (s: number) => {
      target = s;
      if (!rafId) rafId = requestAnimationFrame(tick);
    };

    // Smooth interpolated tick loop (completely prevents jitter or discrete ladder steps)
    const tick = () => {
      current += (target - current) * 0.12;
      if (Math.abs(target - current) < 0.0005) {
        current = target;
      }
      paint(current);
      if (current !== target) {
        rafId = requestAnimationFrame(tick);
      } else {
        rafId = 0;
      }
    };

    // Initial paint
    paint(0);

    const onScroll = ({ vh }: { vh: number }) => {
      const r = section.getBoundingClientRect();
      const run = Math.max(1, r.height - vh);
      target = clamp(-r.top / run) * (N - 1);
      if (!rafId) {
        rafId = requestAnimationFrame(tick);
      }
    };

    const onResize = () => {
      paint(current);
    };
    window.addEventListener("resize", onResize, { passive: true });

    const unbind = onScrollFrame(onScroll);

    return () => {
      window.removeEventListener("resize", onResize);
      unbind();
      cancelAnimationFrame(rafId);
    };
  }, []);

  /* Click a stage pill or card → smoothly glide both cards and tree to that stage */
  const goTo = (i: number) => {
    setActive(i);
    if (paintRef.current) paintRef.current(i);
    const section = sectionRef.current;
    if (!section) return;
    const top = section.getBoundingClientRect().top + window.scrollY;
    const run = section.offsetHeight - window.innerHeight;
    scrollToTarget(top + run * (i / (N - 1)), 0);
  };

  return (
    <section
      id="approach"
      ref={sectionRef}
      className="relative w-full bg-[#F5F1E8] border-b border-[#e8e2d4] h-[280svh]"
      aria-label="Our approach: wealth grows like a tree"
    >
      <div className="sticky top-0 h-[100svh] min-h-[580px] flex flex-col justify-center overflow-hidden">
        <div className="gs-container w-full py-4 sm:py-6 lg:py-8">
          {/* Top Section Header: Title on Left, Stage Navigation Pills on Right */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 lg:gap-8 mb-5 lg:mb-7">
            <div className="space-y-2 max-w-xl">
              <Reveal variant="fade">
                <span className="gs-eyebrow text-[#bda15f]">Our approach</span>
              </Reveal>
              <RevealLines
                as="h2"
                className="gs-h1 text-[#1F3A2C]"
                lines={[<>Wealth grows </>, <em key="b" className="text-[#8fa868]">like a tree.</em>]}
              />
              <p className="gs-lead text-[#5d7064] text-[14.5px] sm:text-[15.5px] max-w-lg">
                We start with where you are, learn where you&apos;re going and grow from there.
              </p>
            </div>

            {/* Stage Navigation Pills: Cleanly right-aligned with the header on desktop */}
            <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Approach stages">
              {CARDS.map((c, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={c.season}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => goTo(i)}
                    className={`relative px-4 py-1.5 rounded-full text-[12px] font-semibold tracking-wide transition-all duration-300 flex items-center justify-center ${
                      isActive
                        ? "bg-[#1F3A2C] text-[#F5F1E8] shadow-md scale-105"
                        : "bg-white/70 hover:bg-white text-[#52704e] border border-[#1F3A2C]/10"
                    }`}
                  >
                    <span>{c.step} {c.season}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Stage: Twin Console Cards (Side-by-Side on Desktop, Responsive Stack on Mobile) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* Left: The Stacking Narrative Card Deck */}
            <div className="lg:col-span-7 relative w-full h-[320px] sm:h-[330px] lg:h-[340px]">
              {CARDS.map((card, i) => (
                <div
                  key={card.season}
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  onClick={() => goTo(i)}
                  className="absolute inset-0 rounded-[28px] sm:rounded-[32px] p-6 sm:p-7 shadow-[0_20px_50px_-15px_rgba(31,58,44,0.14)] border transition-shadow duration-300 cursor-pointer will-change-transform select-none flex flex-col justify-between"
                  style={{
                    backgroundColor: card.bg,
                    borderColor: card.border,
                    transform: i === 0 ? "none" : "translate3d(0, 44px, 0) scale(0.95)",
                    opacity: i === 0 ? 1 : 0,
                    zIndex: 20 + i,
                  }}
                >
                  {/* Card Content Top & Body */}
                  <div>
                    {/* Card Top Row */}
                    <div className="flex items-center justify-between gap-4">
                      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1F3A2C]/8 text-[11px] font-semibold tracking-[0.16em] uppercase text-[#1F3A2C]">
                        <span>{card.step}</span>
                        <span>·</span>
                        <span>{card.season}</span>
                      </span>
                      <span className="font-cormorant italic text-[1.3rem] text-[#52704e]">
                        {card.verb}
                      </span>
                    </div>

                    {/* Card Headline & Narrative */}
                    <h3 className="font-cormorant text-[clamp(1.45rem,2.1vw,1.95rem)] font-normal leading-snug text-[#1F3A2C] mt-3">
                      {card.title}
                    </h3>
                    <p className="text-[13.5px] sm:text-[14.5px] text-[#4a5f51] leading-relaxed mt-2 font-sans">
                      {card.desc}
                    </p>
                  </div>

                  {/* Card Highlight Tags */}
                  <div className="flex flex-wrap gap-2 pt-3 border-t border-[#1F3A2C]/10">
                    {card.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] sm:text-[11.5px] px-2.5 py-1 rounded-lg bg-white/70 border border-[#1F3A2C]/8 text-[#304e3d] font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Right: The Synchronized Tree Emblem Card (Desktop only; cleanly hidden on smaller screens to prevent clipping) */}
            <div className="hidden lg:flex lg:col-span-5 w-full h-[320px] sm:h-[330px] lg:h-[340px]">
              <div className="relative w-full h-full rounded-[28px] sm:rounded-[32px] bg-[#1F3A2C] shadow-[0_24px_60px_-15px_rgba(13,31,22,0.42)] border border-[#2b4c3b] overflow-hidden flex flex-col justify-between p-6 relative">
                {/* Radial ambient background lighting */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_85%,rgba(197,169,99,0.18),transparent_70%)] pointer-events-none" />

                {/* Tree Crest Graphics Container (Precisely matching natural 403x369 asset aspect ratio) */}
                <div className="relative w-full max-w-[245px] aspect-[403/369] mx-auto my-auto flex items-center justify-center">
                  {/* Watermark silhouette — tree is always architecturally visible */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/logo_tree.png"
                    alt=""
                    aria-hidden
                    className="absolute inset-0 w-full h-full select-none opacity-20 filter contrast-125 pointer-events-none object-contain"
                    draggable={false}
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/logo_ring.png"
                    alt=""
                    aria-hidden
                    className="absolute inset-0 w-full h-full select-none opacity-15 pointer-events-none object-contain"
                    draggable={false}
                  />

                  {/* Active dynamic ring layer */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    ref={ringRef}
                    src="/logo_ring.png"
                    alt=""
                    aria-hidden
                    className="absolute inset-0 w-full h-full select-none object-contain"
                    draggable={false}
                  />

                  {/* Active dynamic tree layer */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    ref={treeRef}
                    src="/logo_tree.png"
                    alt="Green Shoots Wealth tree emblem"
                    className="absolute inset-0 w-full h-full select-none will-change-transform object-contain"
                    style={{ transformOrigin: `${ROOT_X}% ${ROOT_Y}%` }}
                    draggable={false}
                  />
                </div>

                {/* Bottom Stage Progress & Active Indicator */}
                <div className="relative z-10 pt-2 flex flex-col items-center gap-2">
                  <div className="flex items-center gap-2.5 text-[11px] font-semibold tracking-[0.2em] uppercase">
                    <span className="text-[#bda15f] tabular-nums">0{active + 1}</span>
                    <span className="w-4 h-px bg-[#bda15f]/50" />
                    <span key={active} className="text-[#F5F1E8] font-medium tracking-[0.16em]">
                      {CARDS[active].season} · {CARDS[active].verb}
                    </span>
                  </div>
                  {/* 4-segment progress bar */}
                  <div className="flex gap-1.5 w-full max-w-[190px]" aria-hidden>
                    {CARDS.map((s, i) => (
                      <span key={s.season} className="relative flex-1 h-[2.5px] rounded-full bg-white/15 overflow-hidden">
                        <span
                          ref={(el) => {
                            tickRefs.current[i] = el;
                          }}
                          className="absolute inset-0 bg-[#bda15f] origin-left"
                          style={{ transform: "scaleX(0)" }}
                        />
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
