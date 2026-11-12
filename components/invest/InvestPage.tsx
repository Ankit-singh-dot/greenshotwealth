"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IconArrow, IconArrowUpRight } from "../LineIcons";
import { SipTool, DollarGoalTool, GiftFitTool } from "./Tools";

/**
 * Shared layout for the three invest pages. Static on purpose: the only
 * motion is the hero video, which stays still for reduced-motion visitors.
 */

export type InvestContent = {
  key: "india" | "global" | "gift";
  hero: {
    video: string;
    poster: string;
    title: [string, string];
    lead: string;
  };
  why: {
    title: [string, string];
    body: string;
    points: string[];
    image: string;
    imageAlt: string;
  };
  solutions: { title: string; desc: string }[];
  solutionsTitle: [string, string];
  spread: { src: string; alt: string; caption: string }[];
  audiences?: { heading: [string, string]; items: { title: string; desc: string }[] };
  faqs: { q: string; a: string }[];
  tool?: "sip" | "dollar-goal" | "gift-fit";
  close: { title: [string, string]; body: string; image: string };
  disclaimer: string;
};

const PAGES = [
  { key: "india", label: "India", href: "/indian-investing" },
  { key: "global", label: "Global", href: "/global-investing" },
  { key: "gift", label: "GIFT City", href: "/gift-city" },
] as const;

function HeroVideo({ src, poster }: { src: string; poster: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      v.pause();
      const id = requestAnimationFrame(() => setPlaying(false));
      return () => cancelAnimationFrame(id);
    }
  }, []);
  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {});
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };
  return (
    <>
      <video ref={ref} className="absolute inset-0 w-full h-full object-cover" src={src} poster={poster} autoPlay muted loop playsInline preload="metadata" aria-hidden />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause background video" : "Play background video"}
        className="absolute z-10 right-[var(--gutter)] bottom-6 sm:bottom-8 w-11 h-11 rounded-full border border-white/35 bg-[#0d1f16]/30 text-white grid place-items-center hover:bg-white hover:text-[#1F3A2C] transition-colors"
      >
        {playing ? (
          <svg viewBox="0 0 12 12" className="w-3 h-3" fill="currentColor" aria-hidden><rect x="2" y="1.5" width="2.6" height="9" rx="0.6" /><rect x="7.4" y="1.5" width="2.6" height="9" rx="0.6" /></svg>
        ) : (
          <svg viewBox="0 0 12 12" className="w-3 h-3" fill="currentColor" aria-hidden><path d="M3 1.5v9l7.5-4.5z" /></svg>
        )}
      </button>
    </>
  );
}

export default function InvestPage({ c }: { c: InvestContent }) {
  return (
    <div className="w-full flex flex-col bg-[#F5F1E8] text-[#1F3A2C]" data-motion-managed>
      {/* ---------------- Hero ---------------- */}
      <section className="relative w-full h-[100svh] min-h-[640px] overflow-hidden bg-[#0d1f16] text-[#F5F1E8]">
        <HeroVideo src={c.hero.video} poster={c.hero.poster} />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,31,22,0.35)_0%,rgba(13,31,22,0)_30%,rgba(13,31,22,0.05)_55%,rgba(13,31,22,0.82)_100%)]" />

        <div className="relative h-full gs-container flex flex-col justify-end pb-24 sm:pb-20">
          <nav aria-label="Ways to invest" className="mb-10 inline-flex w-fit rounded-full border border-white/25 bg-[#0d1f16]/40 p-1">
            {PAGES.map((p) => (
              <Link
                key={p.key}
                href={p.href}
                aria-current={p.key === c.key ? "page" : undefined}
                className={`px-4 sm:px-5 py-2 rounded-full text-[12.5px] font-semibold ${p.key === c.key ? "bg-[#F5F1E8] text-[#1F3A2C]" : "text-white/80 hover:text-white"}`}
              >
                {p.label}
              </Link>
            ))}
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <h1 className="lg:col-span-8 font-cormorant font-normal text-[clamp(3rem,7vw,7.6rem)] leading-[0.92] tracking-[-0.03em]">
              {c.hero.title[0]}
              <br />
              <em className="text-[#c9d7b3]">{c.hero.title[1]}</em>
            </h1>
            <div className="lg:col-span-4">
              <p className="text-[16px] leading-relaxed text-white/80 max-w-sm">{c.hero.lead}</p>
              <div className="mt-7 flex flex-wrap items-center gap-6">
                <Link href="/contact" className="gs-btn gs-btn-light !pr-2.5">
                  <span>Talk to an adviser</span>
                  <span className="gs-btn-arrow"><IconArrow className="w-3.5 h-3.5" /></span>
                </Link>
                <a href="#solutions" className="gs-link text-white/85">
                  See solutions
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Why ---------------- */}
      <section className="py-24 sm:py-32" aria-label="Why it matters">
        <div className="gs-container grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6">
            <h2 className="gs-h1">
              {c.why.title[0]}
              <br />
              <em className="text-[#52704e]">{c.why.title[1]}</em>
            </h2>
            <p className="text-[17px] leading-relaxed text-[#3d5446] mt-8 max-w-lg">{c.why.body}</p>
            <ul className="mt-10 border-t border-[#1F3A2C]/15 max-w-lg">
              {c.why.points.map((pt, i) => (
                <li key={pt} className="flex items-baseline gap-5 py-4 border-b border-[#1F3A2C]/15">
                  <span className="gs-index text-[#bda15f]">0{i + 1}</span>
                  <span className="text-[15px]">{pt}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-6">
            <div className="relative aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5] rounded-[28px] overflow-hidden bg-[#e7e1d5]">
              <Image src={c.why.image} alt={c.why.imageAlt} fill sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {c.tool === "sip" && <SipTool />}
      {c.tool === "dollar-goal" && <DollarGoalTool />}
      {c.tool === "gift-fit" && <GiftFitTool />}

      {/* ---------------- Solutions ---------------- */}
      <section id="solutions" className="bg-[#1F3A2C] text-[#F5F1E8] py-24 sm:py-32 scroll-mt-24" aria-label="Solutions">
        <div className="gs-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <h2 className="lg:col-span-7 gs-h1">
              {c.solutionsTitle[0]}
              <br />
              <em className="text-[#c9d7b3]">{c.solutionsTitle[1]}</em>
            </h2>
            <div className="lg:col-span-4 lg:col-start-9">
              <Link href="/contact" className="gs-link text-[#e6cf8f]">
                Find the right fit for you <IconArrow className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
          <ol className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-x-16 border-t border-white/15">
            {c.solutions.map((s, i) => (
              <li key={s.title} className="border-b border-white/15">
                <Link
                  href={`/contact?topic=${encodeURIComponent(s.title)}`}
                  className="group grid grid-cols-[3rem_1fr_auto] gap-x-4 items-start py-7 px-3 -mx-3 rounded-2xl hover:bg-white/[0.06] focus-visible:bg-white/[0.06] transition-colors"
                >
                  <span className="gs-index text-[#c5a963] pt-2">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="block font-cormorant text-[1.9rem] leading-tight">{s.title}</span>
                    <span className="block text-[14.5px] leading-relaxed text-white/65 mt-1.5 max-w-sm">{s.desc}</span>
                    <span className="block text-[12.5px] text-[#e6cf8f] mt-3 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity">Ask us about this</span>
                  </span>
                  <span className="mt-2 w-10 h-10 rounded-full border border-white/20 grid place-items-center group-hover:bg-[#F5F1E8] group-hover:text-[#1F3A2C] transition-colors">
                    <IconArrowUpRight className="w-4 h-4" />
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------------- Photo spread ---------------- */}
      <section className="py-24 sm:py-32" aria-label="In practice">
        <div className="gs-container grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-end">
          {c.spread.map((p, i) => (
            <figure key={p.src} className={i === 0 ? "md:col-span-7" : "md:col-span-5"}>
              <div className={`relative ${i === 0 ? "aspect-[4/3]" : "aspect-[4/5]"} rounded-[24px] overflow-hidden bg-[#e7e1d5]`}>
                <Image src={p.src} alt={p.alt} fill sizes="(min-width:768px) 55vw, 100vw" className="object-cover" />
              </div>
              <figcaption className="mt-4 font-cormorant italic text-[1.5rem] text-[#3d5446]">{p.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ---------------- Audiences ---------------- */}
      {c.audiences && (
        <section className="bg-[#EEF0D9] py-24 sm:py-32" aria-label="Who it's for">
          <div className="gs-container">
            <h2 className="gs-h1">
              {c.audiences.heading[0]}
              <br />
              <em className="text-[#52704e]">{c.audiences.heading[1]}</em>
            </h2>
            <ul className={`mt-14 grid grid-cols-1 sm:grid-cols-2 ${c.audiences.items.length > 3 ? "lg:grid-cols-3" : "lg:grid-cols-3"} gap-px bg-[#1F3A2C]/12 border border-[#1F3A2C]/12 rounded-[24px] overflow-hidden`}>
              {c.audiences.items.map((a) => (
                <li key={a.title} className="bg-[#EEF0D9] p-7 sm:p-9">
                  <h3 className="font-cormorant text-[1.75rem] leading-tight">{a.title}</h3>
                  <p className="text-[14.5px] leading-relaxed text-[#4a5f51] mt-2">{a.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ---------------- FAQ ---------------- */}
      <section className="py-24 sm:py-32" aria-label="Questions">
        <div className="gs-container grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <h2 className="gs-h2">
              Questions,
              <br />
              <em className="text-[#52704e]">answered plainly.</em>
            </h2>
            <p className="text-[15px] text-[#4a5f51] mt-5 max-w-xs">Don&apos;t see yours? Ask us directly, there&apos;s no such thing as a basic question.</p>
            <Link href="/contact" className="gs-link text-[#1F3A2C] mt-6 inline-flex">
              Ask a question <IconArrow className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="lg:col-span-8 border-t border-[#1F3A2C]/15">
            {c.faqs.map((f) => (
              <details key={f.q} className="gs-faq group border-b border-[#1F3A2C]/15">
                <summary className="flex items-center justify-between gap-6 py-6 cursor-pointer list-none">
                  <span className="font-cormorant text-[1.55rem] leading-snug">{f.q}</span>
                  <span className="gs-faq-mark shrink-0 w-9 h-9 rounded-full border border-[#1F3A2C]/20 grid place-items-center text-[18px] leading-none" aria-hidden />
                </summary>
                <p className="pb-7 pr-12 text-[15px] leading-relaxed text-[#4a5f51] max-w-2xl">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Close ---------------- */}
      <section className="relative overflow-hidden bg-[#0d1f16] text-[#F5F1E8]" aria-label="Talk to us">
        <Image src={c.close.image} alt="" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-[#0d1f16]/80" />
        <div className="relative gs-container py-28 sm:py-36 text-center">
          <h2 className="gs-h1">
            {c.close.title[0]}
            <br />
            <em className="text-[#c9d7b3]">{c.close.title[1]}</em>
          </h2>
          <p className="text-[16px] text-white/75 mt-6 max-w-md mx-auto leading-relaxed">{c.close.body}</p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
            <Link href="/contact" className="gs-btn gs-btn-light !pr-2.5">
              <span>Book a consultation</span>
              <span className="gs-btn-arrow"><IconArrow className="w-3.5 h-3.5" /></span>
            </Link>
            <Link href="/#wealth-score" className="gs-link text-white/85">
              Check your wealth score
            </Link>
          </div>
          <p className="mt-16 text-[11.5px] text-white/65 max-w-2xl mx-auto leading-relaxed">{c.disclaimer}</p>
        </div>
      </section>
    </div>
  );
}
