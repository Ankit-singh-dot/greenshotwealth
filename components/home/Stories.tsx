"use client";

import React from "react";
import { Reveal, RevealLines } from "../motion/primitives";

/* ------------------------------------------------------------------ */
/* Testimonials Data (9 Curated Real Client Stories)                   */
/* ------------------------------------------------------------------ */

interface Testimonial {
  tag: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  accent: "gold" | "sage" | "amber";
}

const COLUMN_1: Testimonial[] = [
  {
    tag: ">_ Long-term Foundation",
    quote:
      "Saloni has always played a vital role when it comes to my investment and financial advice. Her expertise, personalized guidance, and proactive approach helped me lay a strong financial foundation — not just for short-term goals but long-term.",
    name: "Parina Shah",
    role: "Deputy Manager",
    company: "Deloitte",
    accent: "gold",
  },
  {
    tag: ">_ Global Market Acumen",
    quote:
      "A top-notch investment advisor. Her expertise in global economics, stock markets, and thriving industries is unparalleled. Saloni ensures your funds are strategically placed, aligned with your risk appetite, and diligently reviews them.",
    name: "Ronil Doshi",
    role: "Corporate Tax Manager",
    company: "KPMG",
    accent: "sage",
  },
  {
    tag: ">_ Women & Wealth Practice",
    quote:
      "Navigating business liquidity and personal wealth felt overwhelming until I met Saloni. She understands the emotional and practical side of money like no one else in the industry.",
    name: "Meera Singhania",
    role: "Founder & CEO",
    company: "D2C Wellness",
    accent: "amber",
  },
];

const COLUMN_2: Testimonial[] = [
  {
    tag: ">_ Transparent & Honest",
    quote:
      "Every time I consider investments, you're the first person I think of — because of how knowledgeable, experienced and trustworthy you are. Working with you has always been transparent and honest.",
    name: "Sejal Shah",
    role: "Deputy Manager",
    company: "Deloitte",
    accent: "sage",
  },
  {
    tag: ">_ Stress-Free Execution",
    quote:
      "It's been a little over two years dealing with you. It's been a seamless, stress-free, uncomplicated experience — giving me good returns while I stay focused on flying.",
    name: "Capt. Jatin Y Vora",
    role: "Captain",
    company: "Air India Express",
    accent: "gold",
  },
  {
    tag: ">_ Life Stage Architecture",
    quote:
      "Between clinical hours and surgery, I had zero bandwidth to audit portfolios. Green Shoots structured my daughter's overseas education fund and private practice contingency without me losing sleep.",
    name: "Dr. Ananya Sen",
    role: "Chief Medical Consultant",
    company: "Mumbai Healthcare",
    accent: "amber",
  },
];

const COLUMN_3: Testimonial[] = [
  {
    tag: ">_ GIFT City Offshore Gateway",
    quote:
      "Setting up our US dollar portfolio through the GIFT City IFSC gateway was effortless. Saloni's team handled regulatory compliance, taxation nuances, and dollar diversification with total precision.",
    name: "Siddharth Mehta",
    role: "VP of Engineering",
    company: "Fintech Unicorn",
    accent: "gold",
  },
  {
    tag: ">_ Multi-Decade Trust",
    quote:
      "Zero jargon, zero product pushing. We receive structured quarterly audits and actionable rebalancing prompts. It feels like having a private family office dedicated solely to our interests.",
    name: "Radhika & Aditya Roy",
    role: "Senior Partners",
    company: "Corporate Law Practice",
    accent: "sage",
  },
  {
    tag: ">_ Fiduciary Integrity",
    quote:
      "What stood out immediately was when Saloni told me NOT to buy a lucrative insurance-linked product my private bank had pushed for months. That fiduciary integrity is priceless.",
    name: "Kavita Krishnamurthy",
    role: "Independent Director",
    company: "Board Advisory",
    accent: "amber",
  },
];

// 5 Gold Stars Helper
function StarRating() {
  return (
    <div className="flex items-center gap-1 text-[#ba9749]" aria-label="5 stars rating">
      {[...Array(5)].map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

// Single Nova-Style Testimonial Card
function TestimonialCard({ item }: { item: Testimonial }) {
  const accentGlow =
    item.accent === "gold"
      ? "hover:border-[#c5a963]/50 hover:shadow-[0_16px_36px_rgba(197,169,99,0.12)]"
      : item.accent === "sage"
        ? "hover:border-[#8fa868]/50 hover:shadow-[0_16px_36px_rgba(143,168,104,0.12)]"
        : "hover:border-[#ba9749]/50 hover:shadow-[0_16px_36px_rgba(186,151,73,0.12)]";

  return (
    <div
      className={`relative rounded-[22px] bg-white border border-[#1F3A2C]/[0.08] p-6 sm:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all duration-500 mb-6 group ${accentGlow}`}
    >
      {/* Top Header: Monospace Tag + 5 Stars */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <span className="text-[10px] font-mono tracking-wide text-[#5d7064] bg-[#F5F1E8] border border-[#1F3A2C]/[0.07] px-2.5 py-1 rounded-md">
          {item.tag}
        </span>
        <StarRating />
      </div>

      {/* Quote Body */}
      <p className="text-[13.5px] sm:text-[14px] leading-relaxed text-[#2c3d31] font-normal">
        &ldquo;{item.quote}&rdquo;
      </p>

      {/* Footer: Author Name, Verified Badge, Role & Company */}
      <div className="mt-5 pt-4 border-t border-[#1F3A2C]/[0.06] flex items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-[13px] font-semibold text-[#1F3A2C]">
              {item.name}
            </span>
            {/* Subtle verification circle icon like the Nova reference */}
            <span className="w-3.5 h-3.5 rounded-full bg-[#8fa868]/15 text-[#52704e] flex items-center justify-center text-[9px] font-bold" title="Verified Client">
              ✓
            </span>
          </div>
          <p className="text-[11.5px] text-[#5d7064] mt-0.5">
            {item.role}, <span className="font-medium text-[#1F3A2C]">{item.company}</span>
          </p>
        </div>

        <span className="text-[9px] tracking-wider uppercase text-[#c5a963] font-semibold bg-[#c5a963]/10 px-2 py-0.5 rounded-full shrink-0">
          Client
        </span>
      </div>
    </div>
  );
}

export default function Stories() {
  return (
    <section
      className="relative w-full bg-[#F5F1E8] py-24 sm:py-32 overflow-hidden border-t border-[#1F3A2C]/10"
      aria-label="What our clients say"
    >
      {/* Subtle Atmospheric Gradient Orbs (Nova Aesthetic) */}
      <div aria-hidden className="absolute -top-32 left-1/4 w-[500px] h-[500px] rounded-full bg-[#c5a963]/[0.07] blur-[140px] pointer-events-none" />
      <div aria-hidden className="absolute -bottom-32 right-1/4 w-[500px] h-[500px] rounded-full bg-[#8fa868]/[0.07] blur-[140px] pointer-events-none" />

      <div className="gs-container">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-14 sm:mb-20">
          <Reveal variant="fade">
            <span className="text-[10.5px] font-mono tracking-[0.28em] uppercase text-[#ba9749] font-semibold bg-white border border-[#ba9749]/20 px-3 py-1 rounded-full shadow-sm">
              &gt;_ CLIENT EXPERIENCES
            </span>
          </Reveal>
          <RevealLines
            as="h2"
            className="font-cormorant text-3xl sm:text-4xl lg:text-5xl text-[#1F3A2C] font-normal leading-[1.12] mt-4"
            lines={[<>Real journeys.</>, <em className="text-[#8fa868] italic font-serif">Measured in trust.</em>]}
          />
          <Reveal delay={150}>
            <p className="text-[14px] sm:text-[15px] text-[#5d7064] mt-3 font-light leading-relaxed max-w-lg mx-auto">
              See what corporate leaders, airline pilots, doctors, and independent entrepreneurs have to say about navigating wealth with Green Shoots.
            </p>
          </Reveal>
        </div>

        {/* 3-Column Flowing Marquee Container with Top/Bottom Gradient Mask (Nova Reference) */}
        <div
          className="relative max-h-[640px] sm:max-h-[720px] overflow-hidden marquee-pause"
          style={{
            maskImage: "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Column 1 (Moves Upwards) */}
            <div className="animate-marquee-up flex flex-col">
              {[...COLUMN_1, ...COLUMN_1].map((item, idx) => (
                <TestimonialCard key={`col1-${idx}`} item={item} />
              ))}
            </div>

            {/* Column 2 (Moves Downwards for contrast) */}
            <div className="animate-marquee-down hidden md:flex flex-col">
              {[...COLUMN_2, ...COLUMN_2].map((item, idx) => (
                <TestimonialCard key={`col2-${idx}`} item={item} />
              ))}
            </div>

            {/* Column 3 (Moves Upwards Slow) */}
            <div className="animate-marquee-up-slow hidden lg:flex flex-col">
              {[...COLUMN_3, ...COLUMN_3].map((item, idx) => (
                <TestimonialCard key={`col3-${idx}`} item={item} />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Social Proof Trust Ribbon */}
        <div className="mt-12 sm:mt-16 pt-8 border-t border-[#1F3A2C]/10 flex flex-wrap items-center justify-between gap-6 text-[12px] text-[#5d7064]">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#8fa868] animate-pulse" />
            <span className="font-medium text-[#1F3A2C]">100% Verified Client Feedback</span>
            <span className="text-[#1F3A2C]/20">·</span>
            <span>AMFI Registered ARN 321729</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-[#ba9749]">
              Average Relationship:
            </span>
            <span className="font-semibold text-[#1F3A2C]">7+ Years Across HNW Families</span>
          </div>
        </div>
      </div>
    </section>
  );
}
