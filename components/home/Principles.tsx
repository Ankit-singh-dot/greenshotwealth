"use client";

import React from "react";
import { Reveal, RevealLines, useInView } from "../motion/primitives";

/* One-stroke glyphs, drawn when the row enters and redrawn on hover. */

function GlyphQuestion() {
  return (
    <>
      <path pathLength={1} d="M38 44c0-15 11-24 23-24s23 8 23 21c0 16-22 18-22 34v6" />
      <circle className="gs-glyph-dot" cx="62" cy="98" r="3.2" fill="currentColor" stroke="none" style={{ ["--gd" as string]: "1.2s" }} />
    </>
  );
}

function GlyphYears() {
  return (
    <>
      <path pathLength={1} d="M8 58c22-16 38 14 56 0s34-16 48-4" />
      <path pathLength={1} d="M8 72c22-16 38 14 56 0s34-16 48-4" style={{ ["--gd" as string]: "0.25s" }} />
      {[16, 36, 56, 76, 96].map((x, i) => (
        <line pathLength={1} key={x} x1={x} x2={x} y1="94" y2="102" style={{ ["--gd" as string]: `${0.9 + i * 0.12}s` }} />
      ))}
    </>
  );
}

function GlyphPlain() {
  return <path pathLength={1} d="M8 64c2-34 40-34 32-6-6 20-32 12-24-8 8-22 42-6 30 14-8 12-14-8 2-8 10 0 14 8 26 8h36" />;
}

function GlyphNo() {
  return (
    <>
      <circle pathLength={1} cx="60" cy="60" r="36" />
      <line pathLength={1} x1="35" y1="85" x2="85" y2="35" style={{ ["--gd" as string]: "0.9s" }} />
    </>
  );
}

const PROMISES = [
  { title: "Questions before products.", line: "We learn your life before we name a single fund.", Glyph: GlyphQuestion },
  { title: "One adviser, for years.", line: "No handovers. The person you meet is the person who stays.", Glyph: GlyphYears },
  { title: "Plain words only.", line: "If your family can't follow the plan, we rewrite it.", Glyph: GlyphPlain },
  { title: "Sometimes we say no.", line: "To products that would pay us more than they help you.", Glyph: GlyphNo },
];

function PromiseRow({ i, title, line, Glyph }: (typeof PROMISES)[number] & { i: number }) {
  const [ref, inView] = useInView<HTMLLIElement>({ threshold: 0.45 });
  return (
    <li
      ref={ref}
      className={`gs-promise group grid grid-cols-[2.5rem_1fr] sm:grid-cols-[4rem_1fr_9rem] lg:grid-cols-[5rem_1.2fr_1fr_10rem] items-center gap-x-4 gap-y-3 py-9 sm:py-12 border-b border-[#1F3A2C]/15 ${inView ? "is-in" : ""}`}
    >
      <span className="gs-index text-[#bda15f] self-start sm:self-center pt-2 sm:pt-0">0{i + 1}</span>
      <h3 className="font-cormorant text-[clamp(2rem,4.4vw,3.6rem)] leading-[1] tracking-[-0.015em] text-[#1F3A2C] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2">
        {title}
      </h3>
      <p className="col-start-2 sm:col-start-2 lg:col-start-3 text-[14.5px] leading-relaxed text-[#5d7064] max-w-sm">{line}</p>
      <svg
        viewBox="0 0 120 120"
        className="gs-glyph hidden sm:block row-start-1 row-span-2 lg:row-span-1 sm:col-start-3 lg:col-start-4 w-24 h-24 lg:w-28 lg:h-28 justify-self-end text-[#1F3A2C]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <Glyph />
      </svg>
    </li>
  );
}

export default function Principles() {
  return (
    <section className="relative bg-[#F5F1E8] py-24 sm:py-32" aria-label="Four promises">
      <div className="gs-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6 sm:mb-10">
          <div className="lg:col-span-8">
            <Reveal variant="fade"><span className="gs-eyebrow text-[#bda15f]">Four promises</span></Reveal>
            <RevealLines
              as="h2"
              className="gs-h1 text-[#1F3A2C] mt-6"
              lines={[<>How it feels to</>, <>work <em key="w" className="text-[#8fa868]">with us.</em></>]}
            />
          </div>
        </div>

        <ol className="border-t border-[#1F3A2C]/15">
          {PROMISES.map((p, i) => (
            <PromiseRow key={p.title} i={i} {...p} />
          ))}
        </ol>
      </div>
    </section>
  );
}
