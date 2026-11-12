"use client";

import { useEffect, useRef } from "react";
import { onScrollFrame, clamp, range, prefersReducedMotion } from "../motion/scroll";

/**
 * "What we actually do" — Noise to Clarity
 *
 *   1. The noise arrives: pills cascade in around "Too many options."
 *   2. The cut: most pills are struck through and fall away.
 *   3. The plan: eight pills are kept. Each glides to its column and *becomes*
 *      a plain-words line — one element morphing from pill to card, not a
 *      crossfade between two.
 *
 * Scroll sets a target; the scene eases toward it every frame, so even a
 * coarse mouse wheel reads as one continuous movement.
 */

interface Keep {
  col: 0 | 1 | 2 | 3; // Understand, Plan, Invest, Review
  slot: 0 | 1;
  line: string;
}

type Variant = "forest" | "gold" | "sage" | "outline" | "cream";

interface Pill {
  text: string;
  x: number;
  y: number;
  rot: number;
  edge: "T" | "L" | "R" | "B";
  enterStart: number;
  enterEnd: number;
  variant: Variant;
  keep?: Keep;
}

const PILLS: Pill[] = [
  { text: "Hot tips",                   x: 50, y: 14, rot: -2, edge: "T", enterStart: 0.02, enterEnd: 0.07, variant: "outline" },
  { text: "Trending funds",             x: 16, y: 28, rot: 2,  edge: "L", enterStart: 0.06, enterEnd: 0.11, variant: "gold" },
  { text: "What your neighbour bought", x: 78, y: 22, rot: -2, edge: "R", enterStart: 0.10, enterEnd: 0.15, variant: "outline",
    keep: { col: 0, slot: 0, line: "Your goals, in your words." } },
  { text: "My uncle's portfolio",       x: 50, y: 84, rot: 1,  edge: "B", enterStart: 0.14, enterEnd: 0.19, variant: "cream" },
  { text: "NFO closing today",          x: 32, y: 18, rot: -3, edge: "T", enterStart: 0.18, enterEnd: 0.23, variant: "outline" },
  { text: "Last year's winner",         x: 18, y: 44, rot: 2,  edge: "L", enterStart: 0.21, enterEnd: 0.26, variant: "forest",
    keep: { col: 3, slot: 1, line: "Rebalanced when life changes, not when markets do." } },
  { text: "Crypto",                     x: 84, y: 34, rot: -3, edge: "R", enterStart: 0.24, enterEnd: 0.29, variant: "sage" },
  { text: "Buy the dip",                x: 28, y: 74, rot: 3,  edge: "B", enterStart: 0.27, enterEnd: 0.32, variant: "cream" },
  { text: "5X returns",                 x: 68, y: 16, rot: 2,  edge: "T", enterStart: 0.30, enterEnd: 0.35, variant: "outline" },
  { text: "WhatsApp forwards",          x: 12, y: 36, rot: -2, edge: "L", enterStart: 0.32, enterEnd: 0.37, variant: "gold" },
  { text: "Market timing",              x: 72, y: 34, rot: 2,  edge: "R", enterStart: 0.34, enterEnd: 0.39, variant: "gold",
    keep: { col: 3, slot: 0, line: "Reviewed every year, with the same adviser." } },
  { text: "FD is safest",               x: 76, y: 72, rot: -2, edge: "B", enterStart: 0.36, enterEnd: 0.41, variant: "sage",
    keep: { col: 0, slot: 1, line: "How much risk still lets you sleep." } },
  { text: "YouTube experts",            x: 14, y: 56, rot: 3,  edge: "L", enterStart: 0.38, enterEnd: 0.43, variant: "sage" },
  { text: "Insurance as investment",    x: 82, y: 48, rot: -2, edge: "R", enterStart: 0.40, enterEnd: 0.45, variant: "forest",
    keep: { col: 1, slot: 0, line: "Term cover, kept separate from investing." } },
  { text: "Real estate first",          x: 36, y: 84, rot: -1, edge: "B", enterStart: 0.41, enterEnd: 0.46, variant: "gold" },
  { text: "Guaranteed returns",         x: 86, y: 60, rot: 2,  edge: "R", enterStart: 0.42, enterEnd: 0.47, variant: "outline" },
  { text: "Small cap craze",            x: 22, y: 64, rot: -3, edge: "L", enterStart: 0.43, enterEnd: 0.48, variant: "outline" },
  { text: "Tax saving ELSS",            x: 12, y: 76, rot: 2,  edge: "B", enterStart: 0.44, enterEnd: 0.49, variant: "forest",
    keep: { col: 1, slot: 1, line: "Tax planned all year, not in March." } },
  { text: "SIP of ₹500 = crore",        x: 64, y: 82, rot: 2,  edge: "B", enterStart: 0.45, enterEnd: 0.50, variant: "gold",
    keep: { col: 2, slot: 0, line: "A monthly SIP sized to each goal and its date." } },
  { text: "Gold will rally",            x: 84, y: 22, rot: 1,  edge: "T", enterStart: 0.46, enterEnd: 0.51, variant: "cream" },
  { text: "AI stock picks",             x: 86, y: 74, rot: -3, edge: "B", enterStart: 0.47, enterEnd: 0.52, variant: "gold" },
  { text: "Diversification is overrated",x: 44, y: 76, rot: 1, edge: "B", enterStart: 0.48, enterEnd: 0.53, variant: "sage",
    keep: { col: 2, slot: 1, line: "Spread across assets, in India and abroad." } },
  { text: "Sector rotation",            x: 18, y: 86, rot: -2, edge: "B", enterStart: 0.49, enterEnd: 0.54, variant: "outline" },
  { text: "Just follow trends",         x: 72, y: 62, rot: -1, edge: "R", enterStart: 0.50, enterEnd: 0.55, variant: "forest" },
];

const COLUMNS = [
  { n: "01", t: "Understand" },
  { n: "02", t: "Plan" },
  { n: "03", t: "Invest" },
  { n: "04", t: "Review" },
];

const KEPT = PILLS.map((p, i) => ({ ...p, i })).filter((p) => p.keep) as (Pill & { i: number; keep: Keep })[];
const REJECTED = PILLS.map((p, i) => ({ ...p, i })).filter((p) => !p.keep);

const VARIANT_CLASSES: Record<Variant, string> = {
  forest:  "bg-[#1F3A2C] text-[#F5F1E8] border-[#1F3A2C]",
  gold:    "bg-[#c5a963] text-[#1F3A2C] border-[#c5a963]",
  sage:    "bg-[#d5deba] text-[#2a3f2e] border-[#d5deba]",
  outline: "bg-transparent text-[#1F3A2C] border-[#1F3A2C]/25",
  cream:   "bg-[#eae5d8] text-[#3a4f3e] border-[#ddd7c8]",
};

/** Fill and border of each pill variant, and of the card they become (r,g,b,a). */
const FILL: Record<Variant, [number, number, number, number]> = {
  forest: [31, 58, 44, 1], gold: [197, 169, 99, 1], sage: [213, 222, 186, 1], outline: [255, 255, 255, 0], cream: [234, 229, 216, 1],
};
const EDGE: Record<Variant, [number, number, number, number]> = {
  forest: [31, 58, 44, 1], gold: [197, 169, 99, 1], sage: [213, 222, 186, 1], outline: [31, 58, 44, 0.25], cream: [221, 215, 200, 1],
};
const CARD_FILL: [number, number, number, number] = [255, 253, 248, 1];
const rgba = (c: number[]) => `rgba(${c[0]},${c[1]},${c[2]},${c[3]})`;
const CARD_EDGE: [number, number, number, number] = [31, 58, 44, 0.1];

const mix = (a: number[], b: number[], t: number) =>
  `rgba(${Math.round(a[0] + (b[0] - a[0]) * t)},${Math.round(a[1] + (b[1] - a[1]) * t)},${Math.round(a[2] + (b[2] - a[2]) * t)},${(a[3] + (b[3] - a[3]) * t).toFixed(3)})`;

/* Smooth, symmetric easings (no snap at either end). */
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const easeOutQuint = (t: number) => 1 - Math.pow(1 - t, 5);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function seeded(s: number) {
  return () => { s = (s * 16807) % 2147483647; return (s - 1) / 2147483646; };
}

/** Column heads and card slots, in % of the pinned screen. */
function layout(narrow: boolean) {
  if (!narrow) {
    const xs = [16, 38.7, 61.3, 84];
    return {
      head: (c: number) => ({ x: xs[c], y: 42 }),
      slot: (c: number, s: number) => ({ x: xs[c], y: 55.5 + s * 15 }),
    };
  }
  const xs = [27, 73];
  const ys = [35, 66.5];
  return {
    head: (c: number) => ({ x: xs[c % 2], y: ys[Math.floor(c / 2)] }),
    slot: (c: number, s: number) => ({ x: xs[c % 2], y: ys[Math.floor(c / 2)] + 10.5 + s * 11.5 }),
  };
}

/* ---------------- timeline (scroll progress 0 → 1) ---------------- */
const T = {
  aOut: [0.55, 0.62] as const, // "Too many options" leaves
  strike: [0.55, 0.62] as const, // strikes run top → bottom across this window
  fall: 0.07, // each struck pill takes this long to fall
  bIn: [0.66, 0.74] as const, // "One plan" arrives
  heads: 0.68, // column heads start
  travel: [0.64, 0.78] as const, // keepers glide to their slots (staggered by column)
  morph: 0.08, // pill → card, once each keeper has landed
};

export default function NoiseToClarity() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const pillRefs = useRef<(HTMLDivElement | null)[]>([]);
  const strikeRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const keepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const keepLabelRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const keepCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const keepWashRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const measurePillRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const measureCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const headARef = useRef<HTMLDivElement>(null);
  const headBRef = useRef<HTMLDivElement>(null);
  const colRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const rand = seeded(77);
    const offscreen = PILLS.map((p) => {
      switch (p.edge) {
        case "L": return { sx: -30, sy: p.y };
        case "R": return { sx: 130, sy: p.y };
        case "T": return { sx: p.x, sy: -20 };
        case "B": return { sx: p.x, sy: 120 };
      }
    });
    const drops = PILLS.map(() => ({ dy: 55 + rand() * 30, dx: (rand() - 0.5) * 14, rot: (rand() - 0.5) * 40 }));

    // Strikes and falls run top-to-bottom, in reading order.
    const order = [...REJECTED].sort((a, b) => a.y - b.y || a.x - b.x);
    const rejectRank = new Map(order.map((r, k) => [r.i, k / Math.max(1, order.length - 1)]));

    /* Sizes for the morph: each keeper's pill size and its card size. */
    let narrow = window.innerWidth < 768;
    let sizes: { pw: number; ph: number; cw: number; ch: number }[] = [];
    const measure = () => {
      narrow = window.innerWidth < 768;
      const cw = narrow ? window.innerWidth * 0.42 : Math.min(window.innerWidth * 0.19, 270);
      sizes = KEPT.map((_, j) => {
        const mp = measurePillRefs.current[j];
        const mc = measureCardRefs.current[j];
        if (mc) mc.style.width = `${cw}px`;
        return { pw: mp?.offsetWidth ?? 160, ph: mp?.offsetHeight ?? 36, cw, ch: mc?.offsetHeight ?? 80 };
      });
    };
    measure();

    const render = (p: number) => {
      const L = layout(narrow);

      /* The noise that gets cut */
      for (const r of REJECTED) {
        const el = pillRefs.current[r.i];
        if (!el) continue;
        const off = offscreen[r.i]!;
        const enter = easeOut(range(p, r.enterStart, r.enterEnd));
        const rank = rejectRank.get(r.i) ?? 0;
        const sStart = lerp(T.strike[0], T.strike[1] - 0.025, rank);
        const strike = easeOutQuint(range(p, sStart, sStart + 0.025));
        const fall = ease(range(p, sStart + 0.015, sStart + 0.015 + T.fall));
        const d = drops[r.i];
        const x = lerp(off.sx, r.x, enter) + d.dx * fall;
        const y = lerp(off.sy, r.y, enter) + d.dy * fall * fall;
        const rot = r.rot + d.rot * fall;
        const scale = (0.7 + 0.3 * enter) * (1 - 0.15 * fall);
        const opacity = enter * (1 - range(fall, 0.35, 0.95)) * (1 - 0.25 * strike);
        el.style.left = `${x.toFixed(3)}%`;
        el.style.top = `${y.toFixed(3)}%`;
        el.style.opacity = opacity.toFixed(3);
        el.style.transform = `translate(-50%,-50%) scale(${scale.toFixed(4)}) rotate(${rot.toFixed(2)}deg)`;
        const s = strikeRefs.current[r.i];
        if (s) s.style.transform = `scaleX(${strike.toFixed(4)})`;
      }

      /* The keepers: travel, then become their line */
      KEPT.forEach((k, j) => {
        const el = keepRefs.current[j];
        if (!el) return;
        const off = offscreen[k.i]!;
        const sz = sizes[j];
        const enter = easeOut(range(p, k.enterStart, k.enterEnd));
        const stagger = k.keep.col * 0.012 + k.keep.slot * 0.008;
        const travel = ease(range(p, T.travel[0] + stagger, T.travel[1] - 0.03 + stagger));
        const landAt = T.travel[1] - 0.03 + stagger;
        const morph = ease(range(p, landAt - 0.02, landAt - 0.02 + T.morph));

        const slot = L.slot(k.keep.col, k.keep.slot);
        const restX = lerp(off.sx, k.x, enter);
        const restY = lerp(off.sy, k.y, enter);
        // A gentle arc on the way: rise a little before settling.
        const arc = Math.sin(travel * Math.PI) * -4;
        const x = lerp(restX, slot.x, travel);
        const y = lerp(restY, slot.y, travel) + arc;
        const rot = k.rot * (1 - travel);
        const scale = 0.7 + 0.3 * enter;

        el.style.left = `${x.toFixed(3)}%`;
        el.style.top = `${y.toFixed(3)}%`;
        el.style.opacity = enter.toFixed(3);
        el.style.transform = `translate(-50%,-50%) scale(${scale.toFixed(4)}) rotate(${rot.toFixed(2)}deg)`;
        el.style.width = `${lerp(sz.pw, sz.cw, morph).toFixed(1)}px`;
        el.style.height = `${lerp(sz.ph, sz.ch, morph).toFixed(1)}px`;
        el.style.borderRadius = `${lerp(sz.ph / 2, 14, morph).toFixed(1)}px`;
        el.style.backgroundColor = rgba(FILL[k.variant]); // pill keeps its colour; the card blooms over it
        const wash = keepWashRefs.current[j];
        if (wash) wash.style.clipPath = `circle(${(ease(range(morph, 0.05, 0.8)) * 101).toFixed(2)}% at 50% 50%)`;
        el.style.borderColor = mix(EDGE[k.variant], CARD_EDGE, morph);
        el.style.boxShadow = `0 ${(10 * morph).toFixed(1)}px ${(30 * morph).toFixed(1)}px -18px rgba(13,31,22,${(0.35 * morph).toFixed(3)})`;

        const label = keepLabelRefs.current[j];
        if (label) {
          label.style.opacity = (1 - range(morph, 0, 0.45)).toFixed(3);
          label.style.transform = `translateY(${(-6 * morph).toFixed(2)}px)`;
        }
        const card = keepCardRefs.current[j];
        if (card) {
          const c = range(morph, 0.4, 1);
          card.style.opacity = c.toFixed(3);
          card.style.transform = `translateY(${((1 - c) * 6).toFixed(2)}px)`;
        }
      });

      /* Headlines */
      const aOut = ease(range(p, T.aOut[0], T.aOut[1]));
      if (headARef.current) {
        headARef.current.style.opacity = (1 - aOut).toFixed(3);
        headARef.current.style.transform = `translate3d(0,${(-aOut * 24).toFixed(2)}px,0) scale(${(1 - 0.03 * aOut).toFixed(4)})`;
        headARef.current.style.filter = `blur(${(aOut * 4).toFixed(2)}px)`;
      }
      const bIn = ease(range(p, T.bIn[0], T.bIn[1]));
      if (headBRef.current) {
        headBRef.current.style.opacity = bIn.toFixed(3);
        headBRef.current.style.transform = `translate3d(0,${((1 - bIn) * 18).toFixed(2)}px,0)`;
        headBRef.current.style.filter = `blur(${((1 - bIn) * 4).toFixed(2)}px)`;
      }

      /* Column heads */
      colRefs.current.forEach((el, c) => {
        if (!el) return;
        const h = L.head(c);
        const t = ease(range(p, T.heads + c * 0.012, T.heads + 0.07 + c * 0.012));
        el.style.left = `${h.x}%`;
        el.style.top = `${h.y}%`;
        el.style.opacity = t.toFixed(3);
        el.style.transform = `translate(-50%,-50%) translateY(${((1 - t) * 12).toFixed(2)}px)`;
      });
    };

    if (prefersReducedMotion()) {
      render(1);
      const onResize = () => { measure(); render(1); };
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }

    /* Scroll sets the target; the scene eases toward it. */
    let target = 0;
    let current = -1;
    let raf = 0;
    const step = () => {
      const delta = target - current;
      current = Math.abs(delta) < 0.0004 ? target : current + delta * 0.14;
      render(current);
      raf = current === target ? 0 : requestAnimationFrame(step);
    };
    const unsub = onScrollFrame(({ vh }) => {
      const r = wrap.getBoundingClientRect();
      target = clamp(-r.top / (r.height - vh));
      if (current < 0) current = target; // first paint: no catch-up
      if (r.bottom < -vh || r.top > vh * 2) return;
      if (!raf) raf = requestAnimationFrame(step);
    });
    const onResize = () => { measure(); render(current < 0 ? 0 : current); };
    window.addEventListener("resize", onResize);
    document.fonts?.ready.then(onResize).catch(() => {});

    return () => {
      unsub();
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section ref={wrapRef} className="relative h-[380vh] bg-[#F5F1E8]" aria-label="From noise to a clear plan">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* ── Noise that gets cut ── */}
        {REJECTED.map((pill) => (
          <div
            key={pill.i}
            ref={(el) => { pillRefs.current[pill.i] = el; }}
            className={`absolute rounded-full border font-medium whitespace-nowrap select-none pointer-events-none will-change-transform text-[12px] sm:text-[13px] px-4 py-2 sm:px-5 sm:py-2.5 shadow-[0_4px_16px_rgba(0,0,0,0.04)] ${VARIANT_CLASSES[pill.variant]}`}
            style={{ left: "-30%", top: "-20%", opacity: 0, transform: `translate(-50%,-50%) scale(0.7) rotate(${pill.rot}deg)`, letterSpacing: "0.01em" }}
            aria-hidden
          >
            {pill.text}
            <span
              ref={(el) => { strikeRefs.current[pill.i] = el; }}
              className="absolute left-3 right-3 top-1/2 h-[1.5px] -mt-px bg-current origin-left"
              style={{ transform: "scaleX(0)" }}
            />
          </div>
        ))}

        {/* ── Keepers: one element that morphs from pill to card ── */}
        {KEPT.map((k, j) => (
          <div
            key={k.text}
            ref={(el) => { keepRefs.current[j] = el; }}
            className="absolute z-20 border overflow-hidden select-none pointer-events-none will-change-transform [background-clip:padding-box]"
            style={{ left: "-30%", top: "-20%", opacity: 0, transform: "translate(-50%,-50%) scale(0.7)" }}
          >
            <span
              ref={(el) => { keepLabelRefs.current[j] = el; }}
              className={`absolute inset-0 z-[1] grid place-items-center whitespace-nowrap font-medium text-[12px] sm:text-[13px] ${VARIANT_CLASSES[k.variant].split(" ").find((c) => c.startsWith("text-"))}`}
              style={{ letterSpacing: "0.01em" }}
              aria-hidden
            >
              {k.text}
            </span>
            <span
              ref={(el) => { keepWashRefs.current[j] = el; }}
              aria-hidden
              className="absolute inset-0"
              style={{ backgroundColor: rgba(CARD_FILL), clipPath: "circle(0% at 50% 50%)" }}
            />
            <div ref={(el) => { keepCardRefs.current[j] = el; }} className="absolute inset-0 z-[2] px-3.5 py-3 sm:px-4 sm:py-3.5 text-left" style={{ opacity: 0 }}>
              <p className="text-[11.5px] sm:text-[13.5px] leading-snug text-[#1F3A2C]">{k.keep.line}</p>
              <p className="text-[10px] sm:text-[11px] text-[#9aa79d] mt-1.5 line-through decoration-[#c5a963]/70">{k.text}</p>
            </div>
          </div>
        ))}

        {/* Measuring rigs for the morph (never visible) */}
        <div aria-hidden className="absolute -left-[9999px] top-0 invisible">
          {KEPT.map((k, j) => (
            <div key={k.text}>
              <span ref={(el) => { measurePillRefs.current[j] = el; }} className="inline-block whitespace-nowrap border font-medium text-[12px] sm:text-[13px] px-4 py-2 sm:px-5 sm:py-2.5" style={{ letterSpacing: "0.01em" }}>
                {k.text}
              </span>
              <div ref={(el) => { measureCardRefs.current[j] = el; }} className="border px-3.5 py-3 sm:px-4 sm:py-3.5">
                <p className="text-[11.5px] sm:text-[13.5px] leading-snug">{k.keep.line}</p>
                <p className="text-[10px] sm:text-[11px] mt-1.5">{k.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Phase A: the noise headline ── */}
        <div ref={headARef} className="absolute inset-0 flex items-center justify-center will-change-transform pointer-events-none z-10">
          <div className="text-center px-6 max-w-2xl">
            <p className="text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-[#bda15f] font-semibold mb-5">What we actually do</p>
            <h2 className="font-cormorant text-[clamp(2rem,5vw,4.2rem)] leading-[1.1] tracking-[-0.015em] text-[#1F3A2C]">
              Too many options.
              <br />
              <em className="text-[#8fa868]">Too many opinions.</em>
            </h2>
            <p className="text-[14px] sm:text-[15px] text-[#5d7064] mt-5 max-w-sm mx-auto leading-relaxed">
              Tips, trends, last year&apos;s winners — every voice pulling somewhere different.
            </p>
          </div>
        </div>

        {/* ── Phase B: the plan ── */}
        <div ref={headBRef} className="absolute inset-x-0 top-[13vh] sm:top-[14vh] text-center px-6 will-change-transform pointer-events-none z-10" style={{ opacity: 0 }}>
          <p className="text-[10px] sm:text-[11px] tracking-[0.3em] uppercase text-[#bda15f] font-semibold mb-4">What we actually do</p>
          <h2 className="font-cormorant text-[clamp(2rem,4.4vw,3.8rem)] leading-[1.05] tracking-[-0.015em] text-[#1F3A2C]">
            One plan. <em className="text-[#8fa868]">In plain words.</em>
          </h2>
        </div>

        {COLUMNS.map((c, i) => (
          <div
            key={c.t}
            ref={(el) => { colRefs.current[i] = el; }}
            className="absolute z-10 text-center pointer-events-none w-[42vw] md:w-[20vw]"
            style={{ left: "-50%", top: "-50%", opacity: 0 }}
          >
            <span className="text-[10px] tracking-[0.25em] text-[#c5a963] font-bold tabular-nums">{c.n}</span>
            <p className="font-cormorant text-[1.45rem] sm:text-[1.8rem] leading-none text-[#1F3A2C] mt-1">{c.t}</p>
            <span className="block mx-auto mt-3 h-px w-10 bg-[#1F3A2C]/25" />
          </div>
        ))}

        {/* The finished plan, for screen readers */}
        <ol className="sr-only">
          {COLUMNS.map((c, ci) => (
            <li key={c.t}>
              {c.t}: {KEPT.filter((k) => k.keep.col === ci).map((k) => k.keep.line).join(" ")}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
