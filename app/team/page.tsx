"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckIcon, FigmaTickBadge, ArrowRightIcon } from "@/components/Icons";

export default function TeamPage() {
  const [activeStoryIdx, setActiveStoryIdx] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollStory = (idx: number) => {
    setActiveStoryIdx(idx);
    if (carouselRef.current) {
      const card = carouselRef.current.children[idx] as HTMLElement;
      if (card) {
        card.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
      }
    }
  };
  const advisors = [
    {
      name: "Rohan Mehta",
      role: "Head of Equity Research",
      desc: "Quantitative screening & core Indian mutual fund strategies.",
      img: "/images/advisor_1.jpg",
    },
    {
      name: "Priya Varma",
      role: "Senior Wealth Architect",
      desc: "Goal compounding & multi-generational family roadmaps.",
      img: "/images/advisor_2.jpg",
    },
    {
      name: "Amit Sen",
      role: "Debt & Treasury Lead",
      desc: "Capital preservation, sovereign bonds & liquid management.",
      img: "/images/advisor_3.jpg",
    },
    {
      name: "Neha Deshmukh",
      role: "Risk & Protection Lead",
      desc: "Independent term & comprehensive health architecture.",
      img: "/images/advisor_4.jpg",
    },
    {
      name: "Siddharth Iyer",
      role: "Global & GIFT City Lead",
      desc: "US dollar portfolios & offshore index funds via IFSC.",
      img: "/images/advisor_5.jpg",
    },
  ];

  const testimonials = [
    {
      name: "Parina Shah",
      role: "Deputy Manager, Deloitte",
      img: "/real_people.jpg",
      quote:
        "Saloni has always played a vital role when it comes to my investment and financial advice. Her expertise, personalized guidance, and proactive approach helped me lay a strong financial foundation — not just for short-term goals but long-term.",
    },
    {
      name: "Sejal Shah",
      role: "Deputy Manager, Deloitte",
      img: "/real_people.jpg",
      quote:
        "Every time I consider investments, you're the first person I think of — because of how knowledgeable, experienced and trustworthy you are. Working with you has always been transparent and honest. I look forward to always being managed by you and your bull's-eye advice.",
    },
    {
      name: "Ronil Doshi",
      role: "Corporate Tax Manager, KPMG",
      img: "/real_people.jpg",
      quote:
        "A top-notch investment advisor. Her expertise in global economics, stock markets, and thriving industries is unparalleled. Saloni ensures your funds are strategically placed, aligned with your risk appetite, and diligently reviews them for enhanced returns. Every interaction is an enlightening experience.",
    },
    {
      name: "Jatin Y Vora",
      role: "Captain, Air India Express",
      img: "/real_people.jpg",
      quote:
        "It's been a little over two years dealing with you. It's been a seamless, stress-free, uncomplicated experience — giving me good returns.",
    },
  ];

  return (
    <div className="w-full flex flex-col bg-[#F5F1E8]">
      {/* 1. HERO SECTION (MATCHING FIGMA SCREENSHOT 1) */}
      <section className="relative w-full py-16 sm:py-20 lg:py-24 bg-[#EEF0D9] overflow-hidden">
        {/* Natural botanical leaf overlays on left and right matching Figma screenshot */}
        <div
          className="absolute -left-12 -top-10 w-72 sm:w-96 lg:w-[440px] h-[520px] pointer-events-none opacity-20 mix-blend-multiply bg-contain bg-no-repeat bg-left-top z-0"
          style={{ backgroundImage: "url('/images/leaf_transparent.png')" }}
        />
        <div
          className="absolute -right-12 -top-10 w-72 sm:w-96 lg:w-[440px] h-[520px] pointer-events-none opacity-20 mix-blend-multiply bg-contain bg-no-repeat bg-right-top scale-x-[-1] z-0"
          style={{ backgroundImage: "url('/images/leaf_transparent.png')" }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#bda15f] block">
              OUR TEAM
            </span>
            <h1 className="font-editorial-heading text-[#1F3A2C] text-center">
              <span>Guided by experience. </span><br />
              <span className="text-[#8fa868]">Driven by your goals.</span>
            </h1>
            <p className="text-xs sm:text-sm text-[#526658] font-sans leading-relaxed max-w-xl mx-auto mt-3">
              Behind Green Shoots Wealth is a team that believes financial planning should be thoughtful, personal, and built around every client&apos;s journey.
            </p>
          </div>

          {/* Group Team Photo (High-Res /our_team.jpg) */}
          <div className="relative w-full max-w-5xl mx-auto h-72 sm:h-96 lg:h-[480px] rounded-3xl overflow-hidden shadow-2xl border border-[#ded8cb]/80">
            <Image
              src="/our_team.jpg"
              alt="Green Shoots Wealth Advisory Team"
              fill
              priority
              className="object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* 2. FOUNDER & CO-FOUNDER PROFILES (MATCHING FIGMA SCREENSHOT 2) */}
      <section className="w-full py-20 lg:py-24 bg-[#1F3A2C] text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          {/* Card 1: Text on Left, Full Editorial Photo on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#c7af75] block">
                CO-FOUNDER
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-normal leading-[1.18]">
                <span>Saloni Sinha - </span>
                <span className="italic text-[#8fa868]">
                  Financial Therapist &amp; Wealth Architect.
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-[#cfded5] font-sans leading-relaxed pt-2">
                Saloni Mehta founded Green Shoots Wealth with a belief that financial planning should begin with understanding the person behind the portfolio. She brings together financial planning, investment strategy and financial wellbeing to help individuals and families make clearer decisions around wealth creation, retirement, protection and long-term financial independence. Her approach is personal, structured and focused on building financial strategies that evolve with each client&apos;s goals and life stage.
              </p>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-xs sm:max-w-sm h-96 sm:h-[440px] rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-[#244534]">
                <Image
                  src="/saloni_sinha.jpg"
                  alt="Saloni Sinha - Full Length Editorial"
                  fill
                  className="object-cover object-top"
                />
              </div>
            </div>
          </div>

          {/* Card 2: Executive Portrait on Left, Text on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-5 flex justify-center order-2 lg:order-1">
              <div className="relative w-full max-w-xs sm:max-w-sm h-96 sm:h-[440px] rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-[#244534]">
                <Image
                  src="/images/saloni_portrait.jpg"
                  alt="Saloni Sinha - Executive Portrait"
                  fill
                  className="object-cover object-top"
                />
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4 order-1 lg:order-2">
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#c7af75] block">
                CO-FOUNDER
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] font-normal leading-[1.18]">
                <span>Saloni Sinha - </span>
                <span className="italic text-[#8fa868]">
                  Financial Therapist &amp; Wealth Architect.
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-[#cfded5] font-sans leading-relaxed pt-2">
                Saloni Mehta founded Green Shoots Wealth with a belief that financial planning should begin with understanding the person behind the portfolio. She brings together financial planning, investment strategy and financial wellbeing to help individuals and families make clearer decisions around wealth creation, retirement, protection and long-term financial independence. Her approach is personal, structured and focused on building financial strategies that evolve with each client&apos;s goals and life stage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OUR PEOPLE (MATCHING FIGMA SCREENSHOT 3) */}
      <section className="w-full py-20 bg-[#1F3A2C] text-white border-t border-[#2a4d3b]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center">
            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#c7af75]">
              OUR PEOPLE
            </span>
          </div>

          {/* 5 Advisor Cards with Natural Dummy Names & Profiles */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
            {advisors.map((adv, idx) => (
              <div key={idx} className="flex flex-col items-center text-center group">
                <div className="relative w-full h-56 sm:h-64 rounded-2xl overflow-hidden bg-[#244534] shadow-md border border-[#2d5540] group-hover:border-[#8fa868]/60 transition-colors">
                  <Image
                    src={adv.img}
                    alt={adv.name}
                    fill
                    className="object-cover object-top filter contrast-[1.03]"
                  />
                </div>

                <div className="pt-3 space-y-0.5 w-full">
                  <h4 className="font-sans text-sm font-semibold text-white">
                    {adv.name}
                  </h4>
                  <p className="font-sans text-[11px] text-[#8fa868] font-medium">
                    {adv.role}
                  </p>
                  <p className="font-sans text-[10px] sm:text-[11px] text-[#cfded5] leading-snug line-clamp-2 pt-0.5">
                    {adv.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHAT GUIDES US (MATCHING FIGMA SCREENSHOT 4) */}
      <section className="w-full py-20 sm:py-24 bg-[#EEF0D9] border-y border-[#dbe4ca]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-2xl space-y-3">
            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#73885c] block">
              WHAT GUIDES US
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl text-[#1F3A2C] font-normal leading-[1.15]">
              Different perspectives.{" "}
              <span className="italic text-[#7a9a75]">One shared</span> <br />
              <span className="italic text-[#7a9a75]">commitment.</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#526658] font-sans leading-relaxed pt-1">
              We believe good financial guidance is built on trust, thoughtful conversations, and a clear understanding of each client&apos;s needs. Our team works toward making financial planning more understandable, structured, and connected to long-term goals.
            </p>
          </div>

          {/* 4 White Value Cards (2x2 Grid) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl">
            {[
              {
                title: "Integrity",
                desc: "We approach every client relationship with honesty and responsibility.",
              },
              {
                title: "Empathy",
                desc: "We take time to understand the people behind the financial decisions.",
              },
              {
                title: "Discipline",
                desc: "We focus on thoughtful processes and long-term priorities.",
              },
              {
                title: "Continuous Learning",
                desc: "We keep developing our knowledge and refining how we serve clients.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-7 sm:p-8 border border-[#ded8cb]/60 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <FigmaTickBadge className="w-10 h-10 mb-4" />
                  <h3 className="font-cormorant italic text-2xl font-normal text-[#1F3A2C] mb-2 leading-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-[#55695c] font-sans leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SUCCESS STORIES (EXACT MATCH FIGMA IMAGE 1) */}
      <section className="w-full py-20 lg:py-24 bg-[#1F3A2C] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="space-y-2">
            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#c7af75] block font-sans">
              SUCCESS STORIES
            </span>
            <h2 className="font-editorial-heading text-white">
              <span>Real people. Real goals. </span>
              <span className="text-[#8fa868]">Real journeys.</span>
            </h2>
          </div>

          {/* Testimonial Cards Carousel / Grid with 100% Locked Alignment & Movement */}
          <div
            ref={carouselRef}
            onScroll={(e) => {
              const target = e.currentTarget;
              const scrollLeft = target.scrollLeft;
              const cardWidth = target.firstElementChild ? (target.firstElementChild as HTMLElement).offsetWidth + 20 : 300;
              const newIdx = Math.round(scrollLeft / cardWidth);
              if (newIdx !== activeStoryIdx && newIdx >= 0 && newIdx < testimonials.length) {
                setActiveStoryIdx(newIdx);
              }
            }}
            className="flex lg:grid lg:grid-cols-4 gap-5 pt-2 overflow-x-auto lg:overflow-visible scrollbar-none snap-x snap-mandatory pb-4"
          >
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="min-w-[280px] sm:min-w-[320px] lg:min-w-0 snap-start bg-[#1f3a2c]/85 hover:bg-[#234333] rounded-3xl p-6 sm:p-7 border border-[#2d523e] hover:border-[#3d6e53] shadow-md flex flex-col justify-start transition-all duration-300"
              >
                {/* Top: Name & Role with Fixed Height for 100% Locked Horizontal Alignment */}
                <div className="h-12 flex flex-col justify-center">
                  <h4 className="font-cormorant text-xl sm:text-2xl font-normal text-white leading-tight">
                    {t.name}
                  </h4>
                  <p className="font-sans text-[11px] sm:text-xs text-[#9eb5a5] font-normal mt-0.5 truncate">
                    {t.role}
                  </p>
                </div>

                {/* Middle: Real People Image - Locked Height & Position Across ALL Cards */}
                <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden my-4 bg-[#14261d] shadow-inner shrink-0">
                  <Image
                    src={t.img}
                    alt={t.name}
                    fill
                    className="object-cover object-[center_28%]"
                  />
                </div>

                {/* Bottom: Testimonial Quote in Cormorant Garamond Italic */}
                <p className="font-cormorant italic font-normal text-xs sm:text-[13px] text-[#cfded5] leading-relaxed">
                  {t.quote}
                </p>
              </div>
            ))}
          </div>

          {/* Carousel Interactive Indicator Dots matching Figma Image 1 */}
          <div className="flex items-center justify-center gap-2 pt-4">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollStory(idx)}
                aria-label={`View story ${idx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  activeStoryIdx === idx
                    ? "w-7 h-1.5 bg-[#EEF0D9]"
                    : "w-1.5 h-1.5 bg-[#3d5e4a] hover:bg-[#527d63]"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 6. CTA BANNER CARD: YOUR GOALS. OUR COMMITMENT (MATCHING FIGMA SCREENSHOT) */}
      <section className="w-full py-20 bg-[#F5F1E8]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="relative bg-white rounded-3xl p-10 sm:p-14 lg:p-16 border border-[#e8e2d4] shadow-sm text-center overflow-hidden">
            {/* Exact Figma White Silk Draped Wave Background */}
            <div
              className="absolute inset-0 bg-cover bg-center pointer-events-none"
              style={{ backgroundImage: "url('/images/card_silk_exact.jpg')" }}
            />

            <div className="relative z-10 space-y-4 max-w-2xl mx-auto">
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#c5a963] font-cormorant italic">
                LET&apos;S BUILD TOGETHER
              </span>

              {/* Exact typography matching Figma screenshot: Cormorant Garamond 600 Italic */}
              <h2 className="font-cormorant italic font-semibold text-3xl sm:text-4xl lg:text-[46px] leading-[1.18] text-[#1F3A2C]">
                Your goals. Our commitment.
              </h2>

              <p className="text-xs sm:text-sm text-[#5d7064] font-sans max-w-lg mx-auto leading-relaxed pt-1">
                Have questions about your financial journey? Start a conversation with the Green Shoots Wealth team.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-7">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#1F3A2C] hover:bg-[#172e23] text-white text-xs font-semibold transition-colors shadow-md group cursor-pointer"
                >
                  <span>Start a Conversation</span>
                  <ArrowRightIcon className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/#wealth-score"
                  className="text-xs font-semibold text-[#1F3A2C] hover:text-emerald-800 transition-colors underline underline-offset-8 decoration-[#8da394]"
                >
                  Take the Portfolio Health Check
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
