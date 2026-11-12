"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Parallax, Reveal, RevealLines } from "../motion/primitives";
import { IconArrow, IconArrowUpRight } from "../LineIcons";

const MODES = {
  india: {
    label: "India Investing",
    eyebrow: "India investing",
    title: (
      <>
        The power of <em className="text-[#8fa868]">Bharat&apos;s markets.</em>
      </>
    ),
    copy: "From a first ₹1,000 SIP to a portfolio worth crores — built on discipline, not last year's winners.",
    img: "/indian_investing_image.jpg",
    href: "/indian-investing",
    tags: ["Self-filtering MF baskets", "Tax-aware portfolios", "Goal-linked SIPs"],
    items: [
      { title: "Mutual Funds", desc: "Curated, goal-mapped selections." },
      { title: "SIP Solutions", desc: "Systematic, disciplined wealth building." },
      { title: "Retirement Planning", desc: "NPS, EPF, and beyond." },
      { title: "Estate Planning", desc: "Wills, trusts, and succession." },
      { title: "Insurance Planning", desc: "Life, health, term optimisation." },
      { title: "SIF", desc: "Specialised Investment Funds." },
    ],
  },
  global: {
    label: "Global Investing",
    eyebrow: "Global investing & IFSC",
    title: (
      <>
        The advantage of <em className="text-[#8fa868]">global diversification.</em>
      </>
    ),
    copy: "Access US dollar assets, global index funds and international equities through GIFT City IFSC.",
    img: "/global_investing_image.jpg",
    href: "/global-investing",
    tags: ["GIFT City IFSC access", "USD portfolios", "Global megatrend funds"],
    items: [
      { title: "GIFT City Accounts", desc: "Direct USD bank & trading custody." },
      { title: "Global Equities", desc: "US, European and Asian indices." },
      { title: "Offshore Funds", desc: "Structured under IFSCA regulation." },
      { title: "Currency Hedging", desc: "Preserve purchasing power against INR depreciation." },
      { title: "NRI Repatriation", desc: "Seamless cross-border wealth movement." },
      { title: "Global Real Estate Funds", desc: "International REITs and private debt." },
    ],
  },
} as const;

type Mode = keyof typeof MODES;

export default function Invest() {
  const [mode, setMode] = useState<Mode>("india");
  const btnRefs = useRef<Record<Mode, HTMLButtonElement | null>>({ india: null, global: null });
  const [thumb, setThumb] = useState({ left: 4, width: 0 });
  const m = MODES[mode];

  useLayoutEffect(() => {
    const b = btnRefs.current[mode];
    if (!b) return;
    const measure = () => setThumb({ left: b.offsetLeft, width: b.offsetWidth });
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [mode]);

  return (
    <section id="how-we-invest" className="w-full bg-[#F5F1E8] py-28 sm:py-36" aria-label="How we invest">
      <div className="gs-container">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-14">
          <div>
            <Reveal variant="fade"><span className="gs-eyebrow text-[#bda15f]">How we invest</span></Reveal>
            <RevealLines as="h2" className="gs-display text-[#1F3A2C] mt-6" lines={[<>Two soils.</>, <em key="b" className="text-[#8fa868]">One tree.</em>]} />
          </div>
          <Reveal delay={200}>
            <div className="gs-toggle bg-white border border-[#1F3A2C]/10" role="tablist" aria-label="Investing region">
              <span className="gs-toggle-thumb bg-[#1F3A2C]" style={{ left: thumb.left, width: thumb.width }} />
              {(Object.keys(MODES) as Mode[]).map((k) => (
                <button
                  key={k}
                  ref={(el) => {
                    btnRefs.current[k] = el;
                  }}
                  role="tab"
                  aria-selected={mode === k}
                  onClick={() => setMode(k)}
                  className={`relative z-10 px-6 py-3 rounded-full text-[12.5px] font-semibold tracking-wide transition-colors duration-500 ${
                    mode === k ? "text-[#F5F1E8]" : "text-[#5d7064] hover:text-[#1F3A2C]"
                  }`}
                >
                  {MODES[k].label}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Feature */}
          <Reveal variant="clip" className="lg:col-span-5 relative rounded-[32px] overflow-hidden min-h-[520px] bg-[#0d1f16] text-[#F5F1E8]">
            <div className="absolute inset-[-12%_0]">
              <Parallax speed={0.08} className="absolute inset-0">
                {(Object.keys(MODES) as Mode[]).map((k) => (
                  <Image
                    key={k}
                    src={MODES[k].img}
                    alt=""
                    fill
                    sizes="(min-width:1024px) 40vw, 100vw"
                    className={`object-cover transition-[opacity,transform] duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      k === mode ? "opacity-100 scale-100" : "opacity-0 scale-110"
                    }`}
                  />
                ))}
              </Parallax>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f16] via-[#0d1f16]/55 to-[#0d1f16]/10" />
            <div key={mode} className="relative h-full flex flex-col justify-end p-8 sm:p-10 gs-swap">
              <span className="gs-eyebrow text-[#c5a963]">{m.eyebrow}</span>
              <h3 className="gs-h2 mt-5">{m.title}</h3>
              <p className="text-[14px] text-white/75 mt-4 max-w-sm leading-relaxed">{m.copy}</p>
              <div className="flex flex-wrap gap-2 mt-6">
                {m.tags.map((t) => (
                  <span key={t} className="px-3 py-1.5 rounded-full text-[11.5px] bg-white/10 border border-white/15 backdrop-blur-sm">
                    {t}
                  </span>
                ))}
              </div>
              <Link href={m.href} className="gs-link text-[#c5a963] mt-8 w-fit">
                Explore {m.label.toLowerCase()} <IconArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </Reveal>

          {/* Offerings */}
          <div className="lg:col-span-7 rounded-[32px] bg-white border border-[#1F3A2C]/[0.07] p-3 sm:p-4">
            <ul key={mode} className="divide-y divide-[#1F3A2C]/[0.08]">
              {m.items.map((it, i) => (
                <li key={it.title} className="gs-swap" style={{ animationDelay: `${i * 60}ms` }}>
                  <Link
                    href={m.href}
                    className="group grid grid-cols-[3rem_1fr_auto] items-center gap-4 px-4 sm:px-6 py-6 rounded-2xl hover:bg-[#F5F1E8] transition-colors duration-500"
                  >
                    <span className="gs-index text-[#bda15f]">0{i + 1}</span>
                    <span>
                      <span className="block font-cormorant text-[1.7rem] sm:text-[2rem] leading-none text-[#1F3A2C] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2">
                        {it.title}
                      </span>
                      <span className="block text-[13px] text-[#5d7064] mt-2">{it.desc}</span>
                    </span>
                    <span className="w-10 h-10 rounded-full border border-[#1F3A2C]/15 grid place-items-center text-[#1F3A2C] transition-all duration-500 group-hover:bg-[#1F3A2C] group-hover:text-[#c5a963] group-hover:border-[#1F3A2C]">
                      <IconArrow className="w-4 h-4 transition-transform duration-500 group-hover:-rotate-45" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
