"use client";

import { useEffect, useRef, useState } from "react";

const STEPS = [
  { key: "Seed", verb: "Understand", desc: "Your goals, your worries, your starting point." },
  { key: "Roots", verb: "Plan", desc: "A simple roadmap with protection and discipline built in." },
  { key: "Growth", verb: "Invest", desc: "The right choices, made patiently and steadily." },
  { key: "Forest", verb: "Review", desc: "We keep tending it, so it can shelter the next generation." },
];

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

export default function ApproachSection() {
  const cardRef = useRef<HTMLDivElement>(null);
  const treeRef = useRef<HTMLImageElement>(null);
  const ringRef = useRef<HTMLImageElement>(null);
  const seedRef = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const card = cardRef.current;
    const tree = treeRef.current;
    const ring = ringRef.current;
    const seed = seedRef.current;
    if (!card || !tree || !ring || !seed) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let target = 0;
    let current = 0;
    let raf = 0;
    let lastStep = -1;

    const setMask = (el: HTMLElement, value: string) => {
      el.style.maskImage = value;
      el.style.webkitMaskImage = value;
    };

    const paint = (p: number) => {
      // 1. Seed: a single gold point at the base, absorbed as the roots break out.
      const seedIn = easeOut(range(p, 0, 0.12));
      const seedOut = range(p, 0.18, 0.32);
      seed.style.opacity = String(seedIn * (1 - seedOut));
      seed.style.transform = `translate(-50%, -50%) scale(${0.4 + 0.6 * seedIn - 0.5 * seedOut})`;

      // 2–3. Roots → Growth: the tree is uncovered outward from the base of the
      // trunk, so roots and trunk appear first, branches next, leaves last.
      const grow = easeInOut(range(p, 0.14, 0.78));
      const w = tree.clientWidth || 1;
      const radius = grow * w * 0.82; // covers the furthest leaf
      const feather = Math.max(1, w * 0.08);
      setMask(
        tree,
        `radial-gradient(circle at ${ROOT_X}% ${ROOT_Y}%, #000 ${Math.max(0, radius - feather)}px, transparent ${radius}px)`
      );
      tree.style.transform = `scale(${0.96 + 0.04 * grow})`;

      // 4. Forest: the ring closes over the tree from both sides, meeting at the top.
      const close = easeInOut(range(p, 0.66, 0.98));
      const deg = close * 180;
      setMask(
        ring,
        `conic-gradient(from 180deg at ${RING_X}% ${RING_Y}%, #000 0deg ${deg}deg, transparent ${deg}deg ${360 - deg}deg, #000 ${360 - deg}deg)`
      );

      const step = p >= 0.82 ? 3 : p >= 0.5 ? 2 : p >= 0.2 ? 1 : 0;
      if (step !== lastStep) {
        lastStep = step;
        setActive(step);
      }
    };

    const measure = () => {
      // 0 when the card enters the lower part of the viewport, 1 once its top
      // reaches the upper fifth — the tree grows over ~0.7 of a screen of scroll.
      const vh = window.innerHeight;
      const top = card.getBoundingClientRect().top;
      target = reduced ? 1 : clamp((vh * 0.9 - top) / (vh * 0.7));
    };

    const tick = () => {
      // Light inertia so wheel-step scrolling still reads as continuous growth.
      current += (target - current) * 0.12;
      if (Math.abs(target - current) < 0.0005) current = target;
      paint(current);
      raf = current === target ? 0 : requestAnimationFrame(tick);
    };

    const onScroll = () => {
      measure();
      if (!raf) raf = requestAnimationFrame(tick);
    };

    measure();
    current = reduced ? 1 : target;
    paint(current);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="w-full bg-[#F5F1E8] py-20 border-b border-[#e8e2d4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Content */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#bda15f]">
              OUR APPROACH
            </span>
            <h2 className="font-editorial-heading text-[#1F3A2C]">
              <span>Wealth grows </span>
              <span className="text-[#8fa868]">like a tree.</span>
            </h2>
            <p className="text-sm sm:text-base text-[#5d7064] font-sans leading-relaxed max-w-lg">
              We start with where you are, learn where you&apos;re going and grow from there.
            </p>

            <ol className="space-y-6 pt-4">
              {STEPS.map((item, idx) => {
                const reached = idx <= active;
                return (
                  <li
                    key={item.key}
                    className={`flex items-start gap-4 transition-opacity duration-500 ${
                      reached ? "opacity-100" : "opacity-40"
                    }`}
                  >
                    <div className="flex items-center gap-2 shrink-0 mt-1">
                      <div className="relative w-6 h-0.5 bg-[#e0d6bd] overflow-hidden">
                        <div
                          className={`absolute inset-0 bg-[#bda15f] origin-left transition-transform duration-500 ${
                            reached ? "scale-x-100" : "scale-x-0"
                          }`}
                        />
                      </div>
                      <div
                        className={`w-2 h-2 rounded-full transition-colors duration-500 ${
                          idx === active ? "bg-[#bda15f]" : "bg-[#1F3A2C]"
                        }`}
                      />
                    </div>
                    <div>
                      <h4 className="font-serif text-xl font-semibold text-[#1F3A2C]">
                        {item.key} {item.verb}
                      </h4>
                      <p className="text-xs sm:text-sm text-[#5d7064] font-sans mt-0.5">{item.desc}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Right: the brand emblem, grown by scroll */}
          <div className="lg:col-span-5 flex justify-center">
            <div
              ref={cardRef}
              className="relative w-72 h-80 sm:w-88 sm:h-96 rounded-3xl bg-[#1F3A2C] shadow-sm overflow-hidden"
            >
              <div className="absolute inset-x-10 top-10 sm:inset-x-12 sm:top-12">
                <div className="relative w-full" style={{ aspectRatio: "403 / 369" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    ref={ringRef}
                    src="/logo_ring.png"
                    alt=""
                    aria-hidden
                    className="absolute inset-0 w-full h-full select-none"
                    draggable={false}
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    ref={treeRef}
                    src="/logo_tree.png"
                    alt="Green Shoot Wealth tree emblem"
                    className="absolute inset-0 w-full h-full select-none will-change-transform"
                    style={{ transformOrigin: `${ROOT_X}% ${ROOT_Y}%` }}
                    draggable={false}
                  />
                  <span
                    ref={seedRef}
                    aria-hidden
                    className="absolute w-2.5 h-2.5 rounded-full bg-[#bda15f]"
                    style={{ left: `${ROOT_X}%`, top: `${ROOT_Y}%`, opacity: 0 }}
                  />
                </div>
              </div>

              {/* Stage caption */}
              <div className="absolute inset-x-0 bottom-6 flex items-center justify-center gap-3 text-[11px] font-semibold tracking-[0.2em] uppercase">
                <span className="text-[#bda15f] tabular-nums">0{active + 1}</span>
                <span className="w-6 h-px bg-[#bda15f]/50" />
                <span key={active} className="text-white/80 stage-in">
                  {STEPS[active].key}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
