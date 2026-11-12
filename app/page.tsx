"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import WealthScoreQuiz from "@/components/WealthScoreQuiz";
import ApproachSection from "@/components/ApproachSection";
import NoiseToClarity from "@/components/home/NoiseToClarity";
import Principles from "@/components/home/Principles";
import Invest from "@/components/home/Invest";
import Goals from "@/components/home/Goals";
import Record from "@/components/home/Record";
import GlobalReach from "@/components/home/GlobalReach";
import Stories from "@/components/home/Stories";
import AppShowcase from "@/components/home/AppShowcase";
import GreenStreet from "@/components/home/GreenStreet";
import { LinkedinIcon } from "@/components/Icons";
import { IconArrow } from "@/components/LineIcons";
import { Reveal, RevealLines, Parallax, Magnetic, Marquee, ScrollWords } from "@/components/motion/primitives";
import { onScrollFrame, clamp, scrollToTarget, prefersReducedMotion } from "@/components/motion/scroll";
import { introState } from "@/components/motion/Intro";

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

function StreetHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  // Hold the entrance until the intro curtain lifts.
  useEffect(() => {
    const wait = introState.active ? Math.max(0, introState.endsAt - performance.now()) + 250 : 120;
    const t = window.setTimeout(() => setReady(true), wait);
    return () => window.clearTimeout(t);
  }, []);

  // The words lift away a little faster than the street.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return;
    return onScrollFrame(({ vh }) => {
      const r = section.getBoundingClientRect();
      if (r.bottom < 0 || !copyRef.current) return;
      const p = clamp(-r.top / vh);
      copyRef.current.style.transform = `translate3d(0, ${(-p * 70).toFixed(1)}px, 0)`;
      copyRef.current.style.opacity = String(clamp(1 - p * 1.6));
    });
  }, []);

  const on = ready ? "is-in" : "";

  return (
    <section ref={sectionRef} className="relative w-full bg-[#F5F1E8] text-[#1F3A2C] overflow-hidden pt-[var(--nav-h)]">
      <div ref={copyRef} className="relative z-10 px-[var(--gutter)] pt-10 sm:pt-14 text-center will-change-transform">
        <RevealLines
          as="h1"
          play={ready}
          delay={120}
          stagger={110}
          className="font-cormorant font-normal text-[clamp(3rem,6.6vw,7.4rem)] leading-[0.92] tracking-[-0.03em]"
          lines={[<>Beyond wealth <em key="m" className="text-[#52704e]">management.</em></>]}
        />
        <p className={`text-[16px] sm:text-[17px] leading-relaxed text-[#3d5446] max-w-[30rem] mx-auto mt-5 rv rv-up ${on}`} style={{ ["--rv-delay" as string]: "400ms" }}>
          Advice that starts with a conversation, and a plan you actually understand.
        </p>
        <div className={`mt-7 flex flex-wrap items-center justify-center gap-6 rv rv-up ${on}`} style={{ ["--rv-delay" as string]: "500ms" }}>
          <Magnetic>
            <Link href="/contact" className="gs-btn gs-btn-dark !pr-2.5">
              <span>Book a consultation</span>
              <span className="gs-btn-arrow"><IconArrow className="w-3.5 h-3.5" /></span>
            </Link>
          </Magnetic>
          <button onClick={() => scrollToTarget("#wealth-score")} className="gs-link text-[#1F3A2C]">
            Your wealth score
          </button>
        </div>
      </div>

      <div className="relative mt-6 sm:mt-8 overflow-hidden">
        <div className="w-[190%] -ml-[45%] sm:w-full sm:ml-0 max-w-[1680px] sm:mx-auto">
          <GreenStreet play={ready} className="w-full h-auto" />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Hero switch — "video" (testing) or "street" (the illustrated street) */
/* ------------------------------------------------------------------ */

const HERO: "video" | "street" = "video";

function Hero() {
  return HERO === "video" ? <VideoHero /> : <StreetHero />;
}

function VideoHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(true);

  // Hold the entrance until the intro curtain lifts.
  useEffect(() => {
    const wait = introState.active ? Math.max(0, introState.endsAt - performance.now()) + 250 : 120;
    const t = window.setTimeout(() => setReady(true), wait);
    return () => window.clearTimeout(t);
  }, []);

  // Respect reduced motion: show the still frame.
  useEffect(() => {
    if (!prefersReducedMotion()) return;
    videoRef.current?.pause();
    const id = requestAnimationFrame(() => setPlaying(false));
    return () => cancelAnimationFrame(id);
  }, []);

  // Words lift away a little faster than the page.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || prefersReducedMotion()) return;
    return onScrollFrame(({ vh }) => {
      const r = section.getBoundingClientRect();
      if (r.bottom < 0 || !copyRef.current) return;
      const p = clamp(-r.top / vh);
      copyRef.current.style.transform = `translate3d(0, ${(-p * 80).toFixed(1)}px, 0)`;
      copyRef.current.style.opacity = String(clamp(1 - p * 1.4));
    });
  }, []);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {});
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const on = ready ? "is-in" : "";

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[100svh] min-h-[600px] overflow-hidden bg-[#0d1f16] text-[#F5F1E8]"
      aria-label="Green Shoots Wealth"
    >
      {/* footage, pulled into the brand palette */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover [filter:saturate(0.55)_contrast(1.08)_brightness(0.9)]"
        src="/videos/web/wealth.mp4"
        poster="/videos/web/wealth.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden
      />
      <div className="absolute inset-0 bg-[#1F3A2C] mix-blend-multiply opacity-60" aria-hidden />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,31,22,0.55)_0%,rgba(13,31,22,0.2)_30%,rgba(13,31,22,0.35)_55%,rgba(13,31,22,0.92)_100%)]" aria-hidden />
      <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_15%_90%,rgba(13,31,22,0.75),transparent_70%)]" aria-hidden />

      <div ref={copyRef} className="relative h-full gs-container flex flex-col justify-end pt-[calc(var(--nav-h)+2rem)] pb-24 sm:pb-20 will-change-transform">
        <p className={`text-[11px] sm:text-[12px] tracking-[0.22em] uppercase text-[#e6cf8f] rv rv-fade ${on}`}>
          Wealth advisory · Mumbai
        </p>

        <RevealLines
          as="h1"
          play={ready}
          delay={150}
          stagger={120}
          className="font-cormorant font-normal text-[clamp(2.7rem,8.2vw,9rem)] leading-[0.9] tracking-[-0.035em] mt-6"
          lines={[<>Beyond wealth</>, <em key="m" className="text-[#c9d7b3]">management.</em>]}
        />

        <div className="mt-8 sm:mt-10 grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-8 items-end">
          <p className={`lg:col-span-5 text-[16px] sm:text-[17px] leading-relaxed text-white/80 max-w-md rv rv-up ${on}`} style={{ ["--rv-delay" as string]: "450ms" }}>
            Advice that starts with a conversation, and a plan you actually understand.
          </p>
          <div className={`lg:col-span-7 flex flex-wrap items-center gap-5 sm:gap-6 lg:justify-end rv rv-up ${on}`} style={{ ["--rv-delay" as string]: "560ms" }}>
            <Magnetic>
              <Link href="/contact" className="gs-btn gs-btn-light !pr-2.5">
                <span>Book a consultation</span>
                <span className="gs-btn-arrow"><IconArrow className="w-3.5 h-3.5" /></span>
              </Link>
            </Magnetic>
            <button onClick={() => scrollToTarget("#wealth-score")} className="gs-link text-white/85">
              Check your wealth score
            </button>
          </div>
        </div>
      </div>

      {/* bottom rail */}
      <div className={`absolute inset-x-0 bottom-0 gs-container flex items-center justify-between gap-4 pb-6 text-[10.5px] tracking-[0.2em] uppercase text-white/50 rv rv-fade ${on}`} style={{ ["--rv-delay" as string]: "800ms" }}>
        <span className="hidden sm:inline">AMFI ARN 321729</span>
        <span className="sm:hidden">ARN 321729</span>
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Pause background video" : "Play background video"}
          className="w-10 h-10 rounded-full border border-white/35 grid place-items-center text-white hover:bg-white hover:text-[#1F3A2C] transition-colors"
        >
          {playing ? (
            <svg viewBox="0 0 12 12" className="w-3 h-3" fill="currentColor" aria-hidden><rect x="2" y="1.5" width="2.6" height="9" rx="0.6" /><rect x="7.4" y="1.5" width="2.6" height="9" rx="0.6" /></svg>
          ) : (
            <svg viewBox="0 0 12 12" className="w-3 h-3" fill="currentColor" aria-hidden><path d="M3 1.5v9l7.5-4.5z" /></svg>
          )}
        </button>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Founder                                                             */
/* ------------------------------------------------------------------ */

function Founder() {
  return (
    <section className="w-full bg-[#EEF0D9] py-28 sm:py-36 overflow-hidden" aria-label="About Saloni Mehta">
      <div className="gs-container grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <div className="lg:col-span-5 relative">
          <Reveal variant="clip" className="relative rounded-[32px] overflow-hidden aspect-[4/5] max-w-[480px]">
            <div className="absolute inset-[-12%_0]">
              <Parallax speed={0.1} className="absolute inset-0">
                <Image src="/saloni_mehta.jpeg" alt="Saloni Mehta, Financial Therapist & Wealth Architect" fill sizes="(min-width:1024px) 36vw, 100vw" className="object-cover object-top" />
              </Parallax>
            </div>
          </Reveal>
          <Reveal delay={400} className="absolute -bottom-8 right-0 lg:-right-8 bg-[#1F3A2C] text-[#F5F1E8] rounded-2xl p-5 sm:p-6 max-w-[240px] shadow-2xl">
            <p className="font-cormorant italic text-[1.3rem] leading-snug">&ldquo;Wealth planning with the empathy of therapy.&rdquo;</p>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal variant="fade"><span className="gs-eyebrow text-[#52704e]">Founder</span></Reveal>
          <RevealLines as="h2" className="gs-h1 text-[#1F3A2C] mt-6" lines={[<>Saloni Mehta.</>, <em key="b" className="text-[#52704e]">Financial therapist</em>, <em key="c" className="text-[#52704e]">&amp; wealth architect.</em>]} />
          <Reveal delay={200} className="mt-8 max-w-xl">
            <p className="gs-lead text-[#485c4f]">
              Saloni built Green Shoots Wealth on one conviction: financial advice in India should be more than product distribution.
            </p>
          </Reveal>

          <Reveal delay={400} className="mt-10 flex flex-wrap items-center gap-4">
            <Link href="/contact" className="gs-btn gs-btn-dark !pr-2.5">
              <span>Schedule a conversation</span>
              <span className="gs-btn-arrow"><IconArrow className="w-3.5 h-3.5" /></span>
            </Link>
            <a href="https://www.linkedin.com/in/the-saloni-mehta/" target="_blank" rel="noopener noreferrer" className="gs-btn gs-btn-ghost on-light text-[#1F3A2C]">
              <LinkedinIcon className="w-3.5 h-3.5" />
              <span>LinkedIn profile</span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

const RIBBON = ["Financial literacy", "Goal-based investing", "Women's independence", "Early investing", "Personal planning", "Global diversification"];

export default function Home() {
  return (
    <div className="w-full flex flex-col" data-motion-managed>
      <Hero />

      {/* Manifesto — read it and it lights up */}
      <section id="manifesto" className="w-full bg-[#F5F1E8] pt-14 sm:pt-20 pb-2" aria-label="Manifesto">
        <div className="gs-container grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-2">
            <Reveal variant="fade"><span className="gs-eyebrow text-[#bda15f]">Why we exist</span></Reveal>
          </div>
          <div className="lg:col-span-10">
            <ScrollWords
              className="font-cormorant text-[clamp(2rem,4.6vw,4.6rem)] leading-[1.08] tracking-[-0.02em] text-[#1F3A2C]"
              text="Most people aren't stuck for lack of choices. They're stuck because nobody explained them *simply.*"
            />
          </div>
        </div>
      </section>

      <NoiseToClarity />
      <Principles />

      {/* Ribbon */}
      <section className="w-full bg-[#F5F1E8] py-8 border-y border-[#1F3A2C]/10" aria-label="What we care about">
        <Marquee speed={45}>
          {RIBBON.map((r) => (
            <span key={r} className="flex items-center">
              <span className="font-cormorant italic text-[clamp(2rem,4vw,3.6rem)] text-[#1F3A2C] px-8 whitespace-nowrap">{r}</span>
              <span className="w-2 h-2 rounded-full bg-[#c5a963]" />
            </span>
          ))}
        </Marquee>
      </section>

      <div id="what-we-do">
        <Invest />
      </div>
      <Goals />
      <ApproachSection />
      <Record />
      <GlobalReach />
      <div id="wealth-score">
        <WealthScoreQuiz />
      </div>
      <Founder />
      <Stories />
      <AppShowcase />
    </div>
  );
}
