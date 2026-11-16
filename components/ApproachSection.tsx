"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal, RevealLines } from "./motion/primitives";
import { onScrollFrame, scrollToTarget } from "./motion/scroll";

const STEPS = [
  { key: "Seed", verb: "Understand", desc: "Your goals, your worries, your starting point." },
  { key: "Roots", verb: "Plan", desc: "A simple roadmap with protection and discipline built in." },
  { key: "Growth", verb: "Invest", desc: "The right choices, made patiently and steadily." },
  { key: "Forest", verb: "Review", desc: "We keep tending it, so it can shelter the next generation." },
];
const N = STEPS.length;

// Geometry of /public/footer_logo.png (403 x 369), measured from the asset.
// Base of the trunk where growth starts, and the centre of the enclosing ring.
const ROOT_X = 50; // %
const ROOT_Y = 97; // %
const RING_X = 49.9; // %
const RING_Y = 53.9; // %

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const range = (p: number, start: number, end: number) => clamp((p - start) / (end - start));
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/**
 * "Wealth grows like a tree" — a pinned, scroll-scrubbed section.
 *
 * The section is several screens tall and its content is sticky, so the user
 * scrolls *through* it. Scroll progress is split into four equal chapters and
 * each chapter owns exactly one step of the drawing:
 *   0 Seed   → a gold seed appears at the base
 *   1 Roots  → roots and trunk are uncovered
 *   2 Growth → branches and leaves fill in
 *   3 Forest → the ring closes around the tree
 * The highlighted step in the list is derived from the same number, so the
 * text and the drawing can never drift apart.
 */
export default function ApproachSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const treeRef = useRef<HTMLImageElement>(null);
  const ringRef = useRef<HTMLImageElement>(null);
  const seedRef = useRef<HTMLSpanElement>(null);
  const railRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const tickRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const tree = treeRef.current;
    const ring = ringRef.current;
    const seed = seedRef.current;
    if (!section || !tree || !ring || !seed) return;

    let lastStep = -1;

    const setMask = (el: HTMLElement, value: string) => {
      el.style.maskImage = value;
      el.style.webkitMaskImage = value;
    };

    const paint = (p: number) => {
      const s = p * N; // 0 → 4, one unit per chapter

      // Chapter 0 — Seed: a gold point appears, then is absorbed as roots break out.
      const seedIn = easeOut(range(s, 0.05, 0.6));
      const seedOut = range(s, 1.0, 1.45);
      seed.style.opacity = String(seedIn * (1 - seedOut));
      seed.style.transform = `translate(-50%, -50%) scale(${0.4 + 1.1 * seedIn - 1.1 * seedOut})`;

      // Chapters 1–2 — Roots, then Growth: the tree is uncovered outward from the
      // base of the trunk. Roots/trunk fill the first chapter, crown the second.
      const roots = easeInOut(range(s, 1.05, 1.85));
      const crown = easeInOut(range(s, 2.05, 2.85));
      const w = tree.clientWidth || 1;
      const radius = w * (0.4 * roots + 0.44 * crown);
      const feather = Math.max(1, w * 0.08);
      setMask(
        tree,
        `radial-gradient(circle at ${ROOT_X}% ${ROOT_Y}%, #000 ${Math.max(0, radius - feather)}px, transparent ${radius}px)`
      );
      tree.style.transform = `scale(${0.96 + 0.04 * crown})`;

      // Chapter 3 — Forest: the ring closes over the tree from both sides.
      const close = easeInOut(range(s, 3.05, 3.85));
      const deg = close * 180;
      setMask(
        ring,
        `conic-gradient(from 180deg at ${RING_X}% ${RING_Y}%, #000 0deg ${deg}deg, transparent ${deg}deg ${360 - deg}deg, #000 ${360 - deg}deg)`
      );

      // Rail between steps in the list + the four ticks on the card.
      railRefs.current.forEach((el, i) => {
        if (el) el.style.transform = `scaleY(${clamp(s - i)})`;
      });
      tickRefs.current.forEach((el, i) => {
        if (el) el.style.transform = `scaleX(${clamp(s - i)})`;
      });

      const step = Math.min(N - 1, Math.floor(s));
      if (step !== lastStep) {
        lastStep = step;
        setActive(step);
      }
    };

    return onScrollFrame(({ vh }) => {
      const r = section.getBoundingClientRect();
      const run = Math.max(1, r.height - vh);
      paint(clamp(-r.top / run));
    });
  }, []);

  /* Click a step → scroll to the point in its chapter where that drawing is complete. */
  const goTo = (i: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const top = section.getBoundingClientRect().top + window.scrollY;
    const run = section.offsetHeight - window.innerHeight;
    scrollToTarget(top + run * ((i + 0.92) / N), 0);
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#F5F1E8] border-b border-[#e8e2d4] h-[400svh]"
      aria-label="Our approach: wealth grows like a tree"
    >
      <div className="sticky top-0 h-[100svh] flex items-center overflow-hidden">
        <div className="gs-container w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-12 items-center">
            {/* Left: copy + the four steps */}
            <div className="lg:col-span-7 order-2 lg:order-1">
              <div className="hidden lg:block space-y-6">
                <Reveal variant="fade"><span className="gs-eyebrow text-[#bda15f]">Our approach</span></Reveal>
                <RevealLines as="h2" className="gs-h1 text-[#1F3A2C]" lines={[<>Wealth grows</>, <em key="b" className="text-[#8fa868]">like a tree.</em>]} />
                <p className="gs-lead text-[#5d7064] max-w-lg">
                  We start with where you are, learn where you&apos;re going and grow from there.
                </p>
              </div>

              <ol className="lg:pt-10">
                {STEPS.map((item, idx) => {
                  const isActive = idx === active;
                  const reached = idx <= active;
                  return (
                    <li key={item.key} className={`relative ${idx < N - 1 ? "pb-4 sm:pb-6" : ""}`}>
                      {/* connector to the next step, filled by scroll */}
                      {idx < N - 1 && (
                        <span aria-hidden className="absolute left-[5px] top-[1.35rem] -bottom-[0.55rem] w-px bg-[#1F3A2C]/12 overflow-hidden">
                          <span
                            ref={(el) => { railRefs.current[idx] = el; }}
                            className="absolute inset-0 bg-[#bda15f] origin-top"
                            style={{ transform: "scaleY(0)" }}
                          />
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={() => goTo(idx)}
                        aria-current={isActive ? "step" : undefined}
                        className={`group w-full text-left flex items-start gap-5 transition-opacity duration-500 ${
                          reached ? "opacity-100" : "opacity-40 hover:opacity-70"
                        }`}
                      >
                        <span
                          aria-hidden
                          className={`relative mt-[0.6rem] w-[11px] h-[11px] shrink-0 rounded-full border transition-all duration-500 ${
                            isActive
                              ? "bg-[#bda15f] border-[#bda15f] shadow-[0_0_0_5px_rgba(189,161,95,0.18)]"
                              : reached
                              ? "bg-[#1F3A2C] border-[#1F3A2C]"
                              : "bg-[#F5F1E8] border-[#1F3A2C]/40"
                          }`}
                        />
                        <span className="block">
                          <span className="flex items-baseline gap-3">
                            <span className="gs-index text-[#bda15f]">0{idx + 1}</span>
                            <span className={`font-cormorant text-[1.35rem] sm:text-[1.6rem] leading-tight transition-colors duration-500 ${isActive ? "text-[#1F3A2C]" : "text-[#1F3A2C]/90"}`}>
                              {item.key} <em className={isActive ? "text-[#8fa868]" : ""}>— {item.verb}</em>
                            </span>
                          </span>
                          {/* On small screens only the active step shows its line, so it all fits one screen. */}
                          <span
                            className={`grid transition-[grid-template-rows,opacity] duration-500 lg:grid-rows-[1fr] lg:opacity-100 ${
                              isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                            }`}
                          >
                            <span className="overflow-hidden">
                              <span className="block text-xs sm:text-sm text-[#5d7064] font-sans mt-1">{item.desc}</span>
                            </span>
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>

              <p className="hidden lg:block mt-10 gs-index text-[#5d7064]/70">Scroll to grow · or tap a stage</p>
            </div>

            {/* Right: the brand emblem, grown by scroll */}
            <div className="lg:col-span-5 order-1 lg:order-2 flex flex-col items-center gap-5">
              <div className="lg:hidden self-start">
                <span className="gs-eyebrow text-[#bda15f]">Our approach</span>
                <h2 className="gs-h2 text-[#1F3A2C] mt-3">
                  Wealth grows <em className="text-[#8fa868]">like a tree.</em>
                </h2>
              </div>

              <div className="relative w-56 h-60 sm:w-[24rem] sm:h-[27rem] lg:w-[26rem] lg:h-[30rem] rounded-[28px] sm:rounded-[32px] bg-[#1F3A2C] shadow-sm overflow-hidden">
                <div className="absolute inset-x-8 top-7 sm:inset-x-12 sm:top-12">
                  <div className="relative w-full" style={{ aspectRatio: "403 / 369" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      ref={ringRef}
                      src="/logo_ring.png"
                      alt=""
                      aria-hidden
                      className="absolute inset-0 w-full h-full select-none"
                      style={{ maskImage: "linear-gradient(transparent, transparent)", WebkitMaskImage: "linear-gradient(transparent, transparent)" }}
                      draggable={false}
                    />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      ref={treeRef}
                      src="/logo_tree.png"
                      alt="Green Shoots Wealth tree emblem"
                      className="absolute inset-0 w-full h-full select-none will-change-transform"
                      style={{ transformOrigin: `${ROOT_X}% ${ROOT_Y}%`, maskImage: "linear-gradient(transparent, transparent)", WebkitMaskImage: "linear-gradient(transparent, transparent)" }}
                      draggable={false}
                    />
                    <span
                      ref={seedRef}
                      aria-hidden
                      className="absolute w-2.5 h-2.5 rounded-full bg-[#d8bd78] shadow-[0_0_18px_4px_rgba(216,189,120,0.55)]"
                      style={{ left: `${ROOT_X}%`, top: `${ROOT_Y}%`, opacity: 0 }}
                    />
                  </div>
                </div>

                {/* Stage caption + four ticks, filled by the same scroll value */}
                <div className="absolute inset-x-0 bottom-4 sm:bottom-6 flex flex-col items-center gap-3">
                  <div className="flex items-center gap-3 text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] uppercase">
                    <span className="text-[#bda15f] tabular-nums">0{active + 1}</span>
                    <span className="w-6 h-px bg-[#bda15f]/50" />
                    <span key={active} className="text-white/85 stage-in">
                      {STEPS[active].key} · {STEPS[active].verb}
                    </span>
                  </div>
                  <div className="flex gap-1.5" aria-hidden>
                    {STEPS.map((s, i) => (
                      <span key={s.key} className="relative w-7 sm:w-9 h-[2px] rounded-full bg-white/15 overflow-hidden">
                        <span
                          ref={(el) => { tickRefs.current[i] = el; }}
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
