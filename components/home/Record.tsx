"use client";

import React, { useEffect, useRef, useState } from "react";
import { onScrollFrame, clamp, easeOutCubic, prefersReducedMotion } from "../motion/scroll";
import { IconSunset, IconCap, IconHome, IconUmbrella, IconStream, IconLayers, IconPlane } from "../LineIcons";

/**
 * The record. One number holds the centre and counts as you scroll, while the
 * evidence drifts past behind it in three depths: real client words, the goals
 * families plan with us, the work itself. Nothing in the field is invented —
 * quotes are verbatim fragments of approved testimonials.
 */

type Beat = { to: number; format: (n: number) => string; line: React.ReactNode };

const BEATS: Beat[] = [
  { to: 20, format: (n) => `${n}${n >= 20 ? "+" : ""}`, line: <>years of doing this, <em>one family at a time.</em></> },
  { to: 566, format: (n) => n.toLocaleString("en-IN"), line: <>families have trusted us <em>with their plans.</em></> },
  { to: 545, format: (n) => `₹${n} Cr`, line: <>of goals planned. <em>₹110 Cr already reached.</em></> },
  { to: 19, format: (n) => `${n} in 20`, line: <>families stay with us, <em>year after year.</em></> },
];

/* ---------------- the field ---------------- */

type Card =
  | { kind: "quote"; text: string; name: string; role: string }
  | { kind: "goal"; title: string; note: string; Icon: React.ComponentType<{ className?: string; strokeWidth?: number }> }
  | { kind: "chip"; text: string };

type Placed = Card & { x: number; y: number; w: number; d: 0 | 1 | 2 };

const P = { name: "Parina Shah", role: "Deputy Manager, Deloitte" };
const J = { name: "Capt. Jatin Y Vora", role: "Captain, Air India Express" };
const S = { name: "Sejal Shah", role: "Deputy Manager, Deloitte" };
const R = { name: "Ronil Doshi", role: "Corporate Tax Manager, KPMG" };

// x: left edge in % of width · y: top in vh on the canvas · w: px · d: depth (0 far … 2 near)
const FIELD: Placed[] = [
  { kind: "quote", text: "Her expertise, personalized guidance, and proactive approach helped me lay a strong financial foundation.", ...P, x: 4, y: 8, w: 340, d: 2 },
  { kind: "goal", title: "Retirement", note: "The later years, yours to choose.", Icon: IconSunset, x: 70, y: 4, w: 230, d: 1 },
  { kind: "chip", text: "SIP", x: 42, y: 2, w: 0, d: 0 },
  { kind: "quote", text: "A seamless, stress-free, uncomplicated experience.", ...J, x: 76, y: 26, w: 300, d: 2 },
  { kind: "goal", title: "Child education", note: "Ready before the admission letter.", Icon: IconCap, x: 26, y: 30, w: 220, d: 0 },
  { kind: "chip", text: "Term & health cover", x: 58, y: 22, w: 0, d: 1 },
  { kind: "quote", text: "Working with you has always been transparent and honest.", ...S, x: 2, y: 50, w: 280, d: 1 },
  { kind: "goal", title: "Buying a home", note: "The down payment, and the EMIs after.", Icon: IconHome, x: 64, y: 52, w: 240, d: 0 },
  { kind: "quote", text: "A top-notch investment advisor.", ...R, x: 80, y: 64, w: 260, d: 1 },
  { kind: "chip", text: "GIFT City IFSC", x: 14, y: 72, w: 0, d: 2 },
  { kind: "goal", title: "Emergency fund", note: "The base every plan stands on.", Icon: IconUmbrella, x: 4, y: 92, w: 230, d: 2 },
  { kind: "quote", text: "Every time I consider investments, you're the first person I think of.", ...S, x: 70, y: 88, w: 320, d: 2 },
  { kind: "chip", text: "Mutual funds", x: 40, y: 84, w: 0, d: 0 },
  { kind: "goal", title: "Passive income", note: "Income that doesn't wait for payday.", Icon: IconStream, x: 30, y: 106, w: 230, d: 1 },
  { kind: "quote", text: "Not just for short-term goals but long-term.", ...P, x: 74, y: 118, w: 270, d: 0 },
  { kind: "quote", text: "Saloni ensures your funds are strategically placed, aligned with your risk appetite, and diligently reviews them.", ...R, x: 3, y: 128, w: 330, d: 1 },
  { kind: "chip", text: "Estate planning", x: 62, y: 136, w: 0, d: 2 },
  { kind: "goal", title: "Wealth creation", note: "Patient, disciplined, compounding.", Icon: IconLayers, x: 78, y: 150, w: 230, d: 2 },
  { kind: "quote", text: "Giving me good returns while I stay focused on flying.", ...J, x: 22, y: 156, w: 290, d: 2 },
  { kind: "chip", text: "Retirement planning", x: 46, y: 170, w: 0, d: 1 },
  { kind: "goal", title: "Investing from abroad", note: "India, for NRIs, done properly.", Icon: IconPlane, x: 6, y: 184, w: 250, d: 0 },
  { kind: "quote", text: "Working with you has always been transparent and honest.", ...S, x: 72, y: 186, w: 280, d: 1 },
  { kind: "quote", text: "A strong financial foundation — not just for short-term goals but long-term.", ...P, x: 30, y: 204, w: 320, d: 0 },
  { kind: "goal", title: "Retirement", note: "The later years, yours to choose.", Icon: IconSunset, x: 4, y: 214, w: 230, d: 2 },
  { kind: "chip", text: "SIP", x: 82, y: 214, w: 0, d: 2 },
];

// The field repeats once below itself so every depth has cards for the whole scroll.
const FIELD_ALL: Placed[] = [...FIELD, ...FIELD.map((c) => ({ ...c, y: c.y + 225 }))];

const DEPTH = [
  { scale: 0.72, speed: 0.55, cls: "rec-far" },
  { scale: 0.86, speed: 0.8, cls: "rec-mid" },
  { scale: 1, speed: 1.12, cls: "rec-near" },
];

function initials(name: string) {
  return name.replace("Capt. ", "").split(" ").map((p) => p[0]).slice(0, 2).join("");
}

function CardView({ c }: { c: Placed }) {
  if (c.kind === "chip") {
    return <span className="rec-chip">{c.text}</span>;
  }
  if (c.kind === "goal") {
    return (
      <div className="rec-card rec-goal" style={{ width: c.w }}>
        <span className="rec-goal-icon"><c.Icon className="w-5 h-5" strokeWidth={1.4} /></span>
        <span>
          <span className="block text-[15px] font-semibold text-[#1F3A2C]">{c.title}</span>
          <span className="block text-[12.5px] text-[#5d7064] mt-0.5 leading-snug">{c.note}</span>
        </span>
      </div>
    );
  }
  return (
    <figure className="rec-card rec-quote" style={{ width: c.w }}>
      <blockquote className="text-[15px] leading-[1.5] text-[#24382c]">{c.text}</blockquote>
      <figcaption className="mt-4 flex items-center gap-3">
        <span className="w-[34px] h-[34px] rounded-full bg-[#EEF0D9] text-[#52704e] grid place-items-center text-[11px] font-bold">{initials(c.name)}</span>
        <span>
          <span className="block text-[13px] font-semibold text-[#1F3A2C]">{c.name}</span>
          <span className="block text-[11.5px] text-[#7a8a80]">{c.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}

/* ---------------- section ---------------- */

export default function Record() {
  const sectionRef = useRef<HTMLElement>(null);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const numRef = useRef<HTMLSpanElement>(null);
  const [beat, setBeat] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const reduced = prefersReducedMotion();
    let px = 0, py = 0, tx = 0, ty = 0, prog = 0, lastBeat = -1, lastText = "";

    const paint = () => {
      layerRefs.current.forEach((el, i) => {
        if (!el) return;
        const { speed } = DEPTH[i];
        // Field starts a little below the fold and travels up past the number.
        const y = (20 - prog * 190) * speed;
        el.style.transform = `translate3d(${(px * (i + 1) * -9).toFixed(1)}px, calc(${y.toFixed(2)}vh + ${(py * (i + 1) * -6).toFixed(1)}px), 0)`;
      });
    };

    const unsub = onScrollFrame(({ vh }) => {
      const r = section.getBoundingClientRect();
      prog = clamp(-r.top / (r.height - vh));
      const b = Math.min(BEATS.length - 1, Math.floor(prog * BEATS.length));
      // Each beat counts over the first 70% of its share of the scroll, then rests.
      const local = reduced ? 1 : clamp((prog * BEATS.length - b) / 0.7);
      if (b !== lastBeat) {
        lastBeat = b;
        setBeat(b);
      }
      const text = BEATS[b].format(Math.round(easeOutCubic(local) * BEATS[b].to));
      if (text !== lastText && numRef.current) {
        numRef.current.textContent = text;
        lastText = text;
      }
      if (!reduced) paint();
    });

    let raf = 0;
    const tick = () => {
      px += (tx - px) * 0.06;
      py += (ty - py) * 0.06;
      paint();
      raf = Math.abs(tx - px) + Math.abs(ty - py) > 0.001 ? requestAnimationFrame(tick) : 0;
    };
    const move = (e: PointerEvent) => {
      tx = e.clientX / window.innerWidth - 0.5;
      ty = e.clientY / window.innerHeight - 0.5;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    if (!reduced && window.matchMedia("(hover: hover)").matches) window.addEventListener("pointermove", move, { passive: true });

    return () => {
      unsub();
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full h-[400vh] bg-[#F5F1E8]" aria-label="Our record in numbers">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* the field */}
        <div className="absolute inset-0" aria-hidden>
          {DEPTH.map((dp, i) => (
            <div key={i} ref={(el) => { layerRefs.current[i] = el; }} className={`absolute inset-x-0 top-0 h-[460vh] will-change-transform ${dp.cls}`}>
              {FIELD_ALL.filter((c) => c.d === i).map((c, k) => (
                <div
                  key={k}
                  className="absolute"
                  style={{ left: `${c.x}%`, top: `${c.y}vh`, transform: `scale(${dp.scale})`, transformOrigin: "0 0" }}
                >
                  <CardView c={c} />
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* a clearing in the middle, so the number always reads */}
        <div aria-hidden className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_50%_40%_at_50%_50%,#F5F1E8_50%,rgba(245,241,232,0.88)_68%,rgba(245,241,232,0)_100%)]" />
        <div aria-hidden className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#F5F1E8] to-transparent pointer-events-none" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#F5F1E8] to-transparent pointer-events-none" />

        {/* the number */}
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
          <div className="font-cormorant text-[#1F3A2C] leading-[0.85] tracking-[-0.045em] text-[clamp(5.5rem,16vw,16rem)] lining-nums tabular-nums whitespace-nowrap">
            <span ref={numRef}>1</span>
          </div>
          <div className="grid mt-6 sm:mt-8">
            {BEATS.map((b, i) => (
              <p
                key={i}
                aria-hidden={i !== beat}
                className={`rec-line font-cormorant text-[clamp(1.5rem,2.6vw,2.4rem)] leading-[1.15] text-[#3d5446] ${i === beat ? "is-active" : i < beat ? "is-past" : ""}`}
              >
                {b.line}
              </p>
            ))}
          </div>

          <div className="absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2.5" aria-hidden>
            {BEATS.map((_, i) => (
              <span key={i} className={`h-[3px] rounded-full transition-all duration-700 ${i === beat ? "w-8 bg-[#1F3A2C]" : "w-3 bg-[#1F3A2C]/20"}`} />
            ))}
          </div>
        </div>

        {/* screen-reader summary */}
        <p className="sr-only">20+ years in finance. 566 families served. ₹545 Cr of goals planned, ₹110 Cr already reached. 19 in 20 families stay.</p>
      </div>
    </section>
  );
}
