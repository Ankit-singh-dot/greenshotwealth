"use client";

import React, { useEffect, useRef, useState } from "react";
import { onScrollFrame, clamp } from "./motion/scroll";

/* ------------------------------------------------------------------ */
/* Data: 14 Principles across 4 Pillars from the Official Charter     */
/* ------------------------------------------------------------------ */

export type Principle = {
  num: string;
  title: string;
  desc: string;
};

export type PillarPlate = {
  cardNum: string;
  roman: string;
  tagline: string;
  title: string;
  thesis: string;
  bg: string;
  textColor: string;
  subtextColor: string;
  borderColor: string;
  hairlineColor: string;
  folioColor: string;
  numColor: string;
  watermarkColor: string;
  principles: Principle[];
};

const PILLARS: PillarPlate[] = [
  {
    cardNum: "01",
    roman: "I",
    tagline: "Core Fiduciary",
    title: "The Client at the Centre",
    thesis: "Every recommendation starts with your life, your family, and your goals.",
    bg: "#FAF8F5",
    textColor: "text-[#1F3A2C]",
    subtextColor: "text-[#4a5f51]",
    borderColor: "border-[#1F3A2C]/12",
    hairlineColor: "border-[#1F3A2C]/10",
    folioColor: "text-[#52704e]",
    numColor: "text-[#bda15f]",
    watermarkColor: "text-[#1F3A2C]/[0.035]",
    principles: [
      {
        num: "01",
        title: "Client First. Only.",
        desc: "Every recommendation begins and ends with one question: is this right for you?",
      },
      {
        num: "02",
        title: "We Tell You the Market Truth",
        desc: "What markets are really doing, even when it is uncomfortable. Clarity over comfort.",
      },
      {
        num: "03",
        title: "We Choose Our Clients, With Care",
        desc: "Lasting partnerships need shared values, so every client gets our full attention.",
      },
    ],
  },
  {
    cardNum: "02",
    roman: "II",
    tagline: "Fiduciary Discipline",
    title: "Integrity in Every Decision",
    thesis: "No shortcuts, no speculative noise. Built on deep due diligence and honesty.",
    bg: "#FAF4E8",
    textColor: "text-[#1F3A2C]",
    subtextColor: "text-[#564e3c]",
    borderColor: "border-[#bda15f]/25",
    hairlineColor: "border-[#bda15f]/20",
    folioColor: "text-[#8c6f28]",
    numColor: "text-[#bda15f]",
    watermarkColor: "text-[#bda15f]/[0.06]",
    principles: [
      {
        num: "04",
        title: "No Shortcuts",
        desc: "No quick wins, no hot tips. Wealth built properly takes time.",
      },
      {
        num: "05",
        title: "We Promise Only What We Can Deliver",
        desc: "We do not overcommit. When we give our word, we keep it.",
      },
      {
        num: "06",
        title: "Integrity First, in Holistic Planning",
        desc: "Your whole financial life, not a single product, guided by honesty.",
      },
      {
        num: "07",
        title: "We Believe in Ethical Investing",
        desc: "How money grows matters as much as how much it grows.",
      },
    ],
  },
  {
    cardNum: "03",
    roman: "III",
    tagline: "Generational Horizon",
    title: "Patience and Perspective",
    thesis: "Markets fluctuate. Our discipline does not. Built for decades, not quarters.",
    bg: "#F2F5EC",
    textColor: "text-[#1F3A2C]",
    subtextColor: "text-[#3f5344]",
    borderColor: "border-[#52704e]/25",
    hairlineColor: "border-[#52704e]/18",
    folioColor: "text-[#385c46]",
    numColor: "text-[#52704e]",
    watermarkColor: "text-[#385c46]/[0.04]",
    principles: [
      {
        num: "08",
        title: "Long-Term, Goal-Based Planning",
        desc: "Every rupee has a purpose: a home, an education, a retirement, a legacy.",
      },
      {
        num: "09",
        title: "Markets Fluctuate. Our Discipline Does Not.",
        desc: "We prepare you for the ups and downs before they arrive, so you stay steady.",
      },
      {
        num: "10",
        title: "Quality Over Quantity",
        desc: "Fewer clients, served deeply. In every portfolio and every conversation.",
      },
    ],
  },
  {
    cardNum: "04",
    roman: "IV",
    tagline: "Human Impact",
    title: "Purpose Beyond Returns",
    thesis: "Measuring success in the peace of mind, confidence, and freedom you gain.",
    bg: "#162B20",
    textColor: "text-[#F5F1E8]",
    subtextColor: "text-[#c2d6bf]",
    borderColor: "border-[#c5a963]/35",
    hairlineColor: "border-white/12",
    folioColor: "text-[#e6cb85]",
    numColor: "text-[#c5a963]",
    watermarkColor: "text-white/[0.04]",
    principles: [
      {
        num: "11",
        title: "We Exist to Transform Lives",
        desc: "We measure success in peace of mind, confidence and freedom you gain.",
      },
      {
        num: "12",
        title: "Your Trusted Financial Partner",
        desc: "Through every season of life, we stand beside you.",
      },
      {
        num: "13",
        title: "We Grow Together: Founder & Team",
        desc: "We learn and rise together; every member carries this ethos as their own.",
      },
      {
        num: "14",
        title: "Be Good. Do Good.",
        desc: "In business and in life, we lead with kindness and give back.",
      },
    ],
  },
];

const N = PILLARS.length;

/* ------------------------------------------------------------------ */
/* BeliefsManifesto — Editorial Pinned Stacking Plates                */
/* ------------------------------------------------------------------ */

export default function BeliefsManifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activePillar, setActivePillar] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let target = 0;
    let current = 0;
    let rafId = 0;
    let lastActive = -1;

    const paint = (s: number) => {
      // s smoothly spans from 0.0 to 3.0
      const activeIdx = Math.min(N - 1, Math.max(0, Math.floor(s + 0.35)));
      if (activeIdx !== lastActive) {
        lastActive = activeIdx;
        setActivePillar(activeIdx);
      }

      cardRefs.current.forEach((card, i) => {
        if (!card) return;

        if (s < i) {
          // Card is entering from below
          const t = clamp((s - (i - 0.9)) / 0.9, 0, 1);
          // High-end smoothstep easing
          const easeT = t * t * (3 - 2 * t);
          const y = (1 - easeT) * 112;
          const scale = 0.95 + 0.05 * easeT;
          const opacity = clamp(easeT * 1.5, 0, 1);
          card.style.transform = `translate3d(0, ${y.toFixed(2)}%, 0) scale(${scale.toFixed(3)})`;
          card.style.opacity = opacity.toFixed(3);
          card.style.zIndex = String(20 + i);
        } else {
          // Card is active or stacking into the background deck
          const past = s - i;
          const t = Math.min(1.0, past);
          const y = -20 * t;
          const scale = 1.0 - 0.025 * Math.min(2, past);
          card.style.transform = `translate3d(0, ${y.toFixed(1)}px, 0) scale(${scale.toFixed(3)})`;
          card.style.opacity = "1";
          card.style.zIndex = String(20 + i);
        }
      });
    };

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

    // Initial paint at stage 0
    paint(0);

    const onScroll = () => {
      const r = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const run = Math.max(1, r.height - vh);
      target = clamp(-r.top / run, 0, 1) * (N - 1);
      if (!rafId) {
        rafId = requestAnimationFrame(tick);
      }
    };

    const unbindLenis = onScrollFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      unbindLenis();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const goToCard = (idx: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const top = section.getBoundingClientRect().top + window.scrollY;
    const run = section.offsetHeight - window.innerHeight;
    const targetY = top + run * (idx / (N - 1));
    window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  return (
    <section
      id="beliefs"
      ref={sectionRef}
      className="relative w-full bg-[#F5F1E8] h-[340vh]"
      aria-label="What we believe: The Green Shoots Charter"
    >
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden py-4 sm:py-6 lg:py-8">
        <div className="gs-container w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* ------------------------------------------------------------- */}
          {/* Left Column: Fixed Editorial Anchor                          */}
          {/* ------------------------------------------------------------- */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div>
              <h2 className="gs-h1 text-[#1F3A2C]">
                What we
                <br />
                <em className="text-[#52704e]">believe.</em>
              </h2>

              <p className="font-cormorant italic text-[clamp(1.6rem,2.5vw,2.3rem)] text-[#1F3A2C] mt-3 leading-tight font-normal">
                Strong Roots. <em className="text-[#52704e]">Enduring Wealth.</em>
              </p>

              <p className="text-[14px] sm:text-[15px] leading-relaxed text-[#4a5f51] mt-3 max-w-md font-sans">
                14 foundational commitments across four pillars, written to govern every portfolio, review, and conversation we have with our families.
              </p>
            </div>

            {/* Architectural Chapter Rail */}
            <div className="mt-8">
              <div className="relative pl-5 border-l border-[#1F3A2C]/15 space-y-4 pt-1">
                {PILLARS.map((p, idx) => {
                  const isActive = activePillar === idx;
                  return (
                    <button
                      key={p.roman}
                      type="button"
                      onClick={() => goToCard(idx)}
                      className="group block text-left w-full transition-all duration-300 relative cursor-pointer"
                    >
                      {/* Active Indicator on Rail */}
                      <span
                        className={`absolute -left-[21px] top-1.5 w-[3px] rounded-full transition-all duration-300 ${
                          isActive
                            ? "h-5 bg-[#52704e] opacity-100"
                            : "h-0 bg-transparent opacity-0 group-hover:h-3 group-hover:bg-[#1F3A2C]/30 group-hover:opacity-100"
                        }`}
                      />

                      <div className="flex items-baseline gap-2.5">
                        <span
                          className={`font-mono text-xs transition-colors duration-200 ${
                            isActive ? "text-[#bda15f] font-bold" : "text-[#7a8c80] group-hover:text-[#1F3A2C]"
                          }`}
                        >
                          {p.cardNum}
                        </span>
                        <span
                          className={`font-cormorant text-[1.1rem] sm:text-[1.25rem] leading-none transition-colors duration-200 ${
                            isActive
                              ? "text-[#1F3A2C] font-semibold"
                              : "text-[#55695c] group-hover:text-[#1F3A2C]"
                          }`}
                        >
                          {p.title}
                        </span>
                      </div>

                      <p
                        className={`text-xs transition-all duration-200 mt-0.5 pl-5 ${
                          isActive
                            ? "text-[#52704e] opacity-100 max-h-5"
                            : "text-[#7a8c80] opacity-0 max-h-0 overflow-hidden group-hover:opacity-60 group-hover:max-h-5"
                        }`}
                      >
                        {p.principles.length} commitments · {p.tagline}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ------------------------------------------------------------- */}
          {/* Right Column: Editorial Dossier Plates Stack                 */}
          {/* ------------------------------------------------------------- */}
          <div className="lg:col-span-7 relative w-full h-[510px] sm:h-[540px] lg:h-[560px] max-w-[650px] mx-auto lg:mr-0 flex items-center justify-center">
            {PILLARS.map((plate, i) => (
              <div
                key={plate.roman}
                ref={(el) => { cardRefs.current[i] = el; }}
                className={`absolute inset-0 rounded-[32px] sm:rounded-[36px] p-6 sm:p-8 lg:p-9 flex flex-col justify-between border shadow-[0_-22px_50px_-20px_rgba(31,58,44,0.32)] ${plate.borderColor} overflow-hidden will-change-transform`}
                style={{
                  background: plate.bg,
                  zIndex: 20 + i,
                  transform: i === 0 ? "translate3d(0, 0px, 0) scale(1)" : "translate3d(0, 112%, 0) scale(0.95)",
                  opacity: i === 0 ? "1" : "0",
                }}
              >
                {/* Background Roman Watermark */}
                <div
                  className={`absolute right-6 -top-4 font-cormorant italic text-[clamp(7.5rem,15vw,11.5rem)] font-light leading-none pointer-events-none select-none ${plate.watermarkColor}`}
                  aria-hidden="true"
                >
                  {plate.roman}
                </div>

                {/* Plate Top Folio */}
                <div className={`relative z-10 pb-4 border-b ${plate.hairlineColor}`}>
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <span className={`text-[11px] font-bold tracking-[0.2em] uppercase ${plate.folioColor}`}>
                      Pillar {plate.roman} · {plate.tagline}
                    </span>
                    <span className="font-mono text-xs opacity-60">
                      Plate 0{i + 1} / 04
                    </span>
                  </div>

                  <h3 className={`font-cormorant text-[2rem] sm:text-[2.35rem] leading-[1.05] font-normal tracking-[-0.01em] ${plate.textColor}`}>
                    {plate.title}.
                  </h3>

                  <p className={`text-[13px] sm:text-[13.8px] mt-1.5 leading-relaxed font-sans ${plate.subtextColor}`}>
                    {plate.thesis}
                  </p>
                </div>

                {/* Plate Content: Refined Editorial Spread (No heavy nested boxes!) */}
                <div className="relative z-10 my-auto py-2">
                  {plate.principles.length === 3 ? (
                    /* 3-item layout: 1 lead feature + 2-column split */
                    <div className="space-y-4">
                      {/* Lead Principle */}
                      <div className={`pb-3.5 border-b ${plate.hairlineColor}`}>
                        <div className="flex items-baseline gap-2.5 mb-1">
                          <span className={`font-mono text-xs font-bold ${plate.numColor}`}>
                            {plate.principles[0].num}
                          </span>
                          <h4 className={`font-cormorant text-[1.38rem] sm:text-[1.5rem] font-semibold leading-snug ${plate.textColor}`}>
                            {plate.principles[0].title}
                          </h4>
                        </div>
                        <p className={`text-[13px] sm:text-[13.5px] leading-relaxed pl-6 font-sans ${plate.subtextColor}`}>
                          {plate.principles[0].desc}
                        </p>
                      </div>

                      {/* Split Principles 2 & 3 */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pt-1">
                        {plate.principles.slice(1).map((pr) => (
                          <div key={pr.num} className="space-y-1">
                            <div className="flex items-baseline gap-2">
                              <span className={`font-mono text-xs font-bold ${plate.numColor}`}>
                                {pr.num}
                              </span>
                              <h4 className={`font-cormorant text-[1.22rem] sm:text-[1.32rem] font-semibold leading-snug ${plate.textColor}`}>
                                {pr.title}
                              </h4>
                            </div>
                            <p className={`text-[12.5px] sm:text-[13px] leading-relaxed pl-5 font-sans ${plate.subtextColor}`}>
                              {pr.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    /* 4-item layout: Balanced 2x2 Editorial Matrix */
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 sm:gap-y-5">
                      {plate.principles.map((pr, pIdx) => (
                        <div
                          key={pr.num}
                          className={`space-y-1 ${
                            pIdx < 2 ? `sm:pb-3.5 sm:border-b ${plate.hairlineColor}` : ""
                          }`}
                        >
                          <div className="flex items-baseline gap-2">
                            <span className={`font-mono text-xs font-bold ${plate.numColor}`}>
                              {pr.num}
                            </span>
                            <h4 className={`font-cormorant text-[1.22rem] sm:text-[1.32rem] font-semibold leading-snug ${plate.textColor}`}>
                              {pr.title}
                            </h4>
                          </div>
                          <p className={`text-[12.5px] sm:text-[13px] leading-relaxed pl-5 font-sans ${plate.subtextColor}`}>
                            {pr.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Plate Bottom Monogram Folio */}
                <div className={`relative z-10 pt-3 border-t ${plate.hairlineColor} flex items-center justify-between text-xs opacity-65 font-sans`}>
                  <span className="text-[11px] tracking-wide">
                    Green Shoots Wealth Fiduciary Standard
                  </span>
                  <div className="flex items-center gap-1.5">
                    {PILLARS.map((_, dotIdx) => (
                      <span
                        key={dotIdx}
                        className={`h-1 rounded-full transition-all duration-300 ${
                          dotIdx === i ? "w-5 bg-current opacity-100" : "w-1 bg-current opacity-30"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
