"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FigmaTickBadge, ArrowRightIcon, ArrowUpRightIcon } from "@/components/Icons";

export default function GlobalInvestingPage() {
  const globalSolutions = [
    {
      title: "US Investing",
      desc: "Access US markets, including leading indices and individual stocks.",
    },
    {
      title: "Global ETFs",
      desc: "Diversify across countries, sectors, and investment themes.",
    },
    {
      title: "International Funds",
      desc: "Explore professionally managed global investment opportunities.",
    },
    {
      title: "Global Wealth Score",
      desc: "Understand how diversified your portfolio is across markets and currencies.",
    },
    {
      title: "Global Diversification",
      desc: "Build a more balanced portfolio across countries, sectors, and currencies.",
    },
  ];

  const nriSolutions = [
    {
      title: "Global Investment Planning",
      desc: "Build a diversified investment strategy across India and international markets.",
    },
    {
      title: "NRI Portfolio Management",
      desc: "Review and structure investments based on your goals, risk profile and country of residence.",
    },
    {
      title: "Cross-Border Wealth Planning",
      desc: "Coordinate your investments and financial goals across countries and currencies.",
    },
  ];

  const faqs = [
    {
      q: "Why should I consider global investing?",
      a: "Global investing can help diversify your portfolio across markets, sectors, and currencies while providing access to opportunities beyond India.",
    },
    {
      q: "What global investment options are available?",
      a: "Depending on your goals and eligibility, options may include US investments, global ETFs, and international funds.",
    },
    {
      q: "Is global investing suitable for everyone?",
      a: "The right approach depends on your financial goals, risk profile, investment horizon, and existing portfolio.",
    },
    {
      q: "How do I get started?",
      a: "Speak with our wealth team to understand your goals and explore suitable global investment opportunities.",
    },
  ];

  return (
    <div className="w-full flex flex-col bg-[#F5F1E8]">
      {/* 1. HERO SECTION (MATCHING FIGMA SCREENSHOT 1) */}
      <section className="relative w-full min-h-[620px] lg:min-h-[720px] flex items-center justify-center overflow-hidden bg-[#030906]">
        {/* Background GIF: /global_investing.gif with space / Earth atmosphere */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/global_investing.gif"
            alt="Earth illuminated from space"
            fill
            priority
            unoptimized
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/80" />
          <div className="absolute inset-0 bg-[#071610]/30 mix-blend-multiply" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center text-white space-y-6">
          <span className="text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-[#c5a963] font-sans inline-block">
            GLOBAL INVESTING
          </span>

          <h1 className="font-editorial-heading text-4xl sm:text-6xl lg:text-[72px] text-white leading-[1.08] tracking-tight drop-shadow-md">
            <span>Your portfolio, without</span> <br />
            <span className="text-[#8fa868]">borders.</span>
          </h1>

          <p className="text-sm sm:text-base text-white/90 font-sans leading-relaxed max-w-2xl mx-auto font-normal">
            Diversify beyond India with access to global markets, ETFs, and international investment opportunities—guided by your goals and risk profile.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-7">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-[#1F3A2C] font-semibold text-sm hover:bg-[#EEF0D9] transition-all shadow-lg hover:shadow-xl group"
            >
              <span>Talk to an Expert</span>
              <ArrowRightIcon className="w-4 h-4 text-[#1F3A2C] group-hover:translate-x-1 transition-transform" />
            </Link>

            <a
              href="#solutions"
              className="text-sm font-medium text-white hover:text-white/80 transition-colors underline underline-offset-8 decoration-white/70 hover:decoration-white"
            >
              Explore Global Solution
            </a>
          </div>
        </div>
      </section>

      {/* 2. GLOBAL PRESENCE (DARK GREEN - MATCHING FIGMA SCREENSHOT 1) */}
      <section className="w-full bg-[#1F3A2C] text-white py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            {/* Left: Copy with World & Portfolio Highlights */}
            <div className="lg:col-span-7 space-y-5">
              <span className="text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-[#c5a963] font-sans block">
                GLOBAL PRESENCE
              </span>

              <h2 className="font-cormorant italic text-3xl sm:text-4xl lg:text-[50px] font-semibold leading-[1.12] text-white">
                <span>The </span>
                <span className="text-[#8fa868]">world</span>
                <span> is part of</span> <br />
                <span>your </span>
                <span className="text-[#8fa868]">portfolio.</span>
              </h2>

              <p className="text-sm sm:text-base text-[#cfded5] font-sans leading-relaxed max-w-xl font-normal pt-1">
                Global investing can help diversify your wealth across markets, sectors, and currencies while giving you access to opportunities beyond India.
              </p>
            </div>

            {/* Right: Skyscraper Upward Angle Image */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md h-72 sm:h-80 lg:h-96 rounded-3xl overflow-hidden shadow-2xl border border-white/15 bg-[#172e23]">
                <Image
                  src="/global_investing_image.jpg"
                  alt="Modern skyscrapers looking up towards the open sky"
                  fill
                  className="object-cover object-center"
                />
              </div>
            </div>
          </div>

          {/* 3 Horizontal Pill Cards with Tick Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="bg-white rounded-2xl sm:rounded-3xl py-4 px-6 sm:px-7 flex items-center gap-3.5 shadow-sm text-[#1F3A2C]">
              <FigmaTickBadge className="w-7 h-7 shrink-0" iconSize="w-3.5 h-3.5" />
              <span className="font-cormorant italic text-lg sm:text-xl font-medium text-[#1F3A2C]">
                Global Markets
              </span>
            </div>
            <div className="bg-white rounded-2xl sm:rounded-3xl py-4 px-6 sm:px-7 flex items-center gap-3.5 shadow-sm text-[#1F3A2C]">
              <FigmaTickBadge className="w-7 h-7 shrink-0" iconSize="w-3.5 h-3.5" />
              <span className="font-cormorant italic text-lg sm:text-xl font-medium text-[#1F3A2C]">
                Diversification
              </span>
            </div>
            <div className="bg-white rounded-2xl sm:rounded-3xl py-4 px-6 sm:px-7 flex items-center gap-3.5 shadow-sm text-[#1F3A2C]">
              <FigmaTickBadge className="w-7 h-7 shrink-0" iconSize="w-3.5 h-3.5" />
              <span className="font-cormorant italic text-lg sm:text-xl font-medium text-[#1F3A2C]">
                International Opportunities
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. INVESTMENT SOLUTIONS (MATCHING FIGMA SCREENSHOT 2) */}
      <section id="solutions" className="w-full bg-[#F5F1E8] py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Section Header */}
          <div className="max-w-3xl space-y-2">
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-[#c5a963] font-sans block">
              INVESTMENT SOLUTIONS
            </span>
            <h2 className="font-editorial-heading text-[#1F3A2C]">
              <span>Invest beyond </span> <br className="sm:hidden" />
              <span className="text-[#8fa868]">borders.</span>
            </h2>
          </div>

          {/* 5 Solution Cards in 3-column Grid (Row 1: 3, Row 2: 2) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {globalSolutions.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 shadow-xs border border-[#eae4d7]/70 hover:shadow-md transition-all flex flex-col justify-between group min-h-[190px]"
              >
                <div>
                  <FigmaTickBadge className="w-9 h-9 mb-3.5" iconSize="w-4 h-4" />
                  <h3 className="font-cormorant italic text-2xl sm:text-[26px] font-normal text-[#1F3A2C] leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-[#55695c] font-sans font-normal leading-relaxed mt-1.5">
                    {item.desc}
                  </p>
                </div>
                <div className="pt-4">
                  <ArrowUpRightIcon className="w-3.5 h-3.5 text-[#52704e] opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
              </div>
            ))}
          </div>

          {/* Bottom link: Explore Global Solutions */}
          <div className="text-center pt-6">
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1F3A2C] hover:text-[#52704e] transition-colors underline underline-offset-8 decoration-[#1F3A2C]/60"
            >
              <span>Explore Global Solutions</span>
              <ArrowRightIcon className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. FOR NRI'S (PALE SAGE BACKGROUND #EEF0D9 - MATCHING FIGMA SCREENSHOT 2) */}
      <section className="w-full bg-[#EEF0D9] py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Section Header */}
          <div className="max-w-3xl space-y-2">
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-[#c5a963] font-sans block">
              FOR NRI&apos;S
            </span>
            <h2 className="font-editorial-heading text-[#1F3A2C]">
              <span>Your wealth can span </span> <br className="sm:hidden" />
              <span className="text-[#8fa868]">more than one country.</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#495c51] font-sans font-normal leading-relaxed pt-2 max-w-2xl">
              For NRIs, financial decisions often involve both India and global markets. We help bring these considerations together into a more connected wealth strategy.
            </p>
          </div>

          {/* 3 NRI Solution Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {nriSolutions.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 shadow-xs border border-[#d8dec4] hover:shadow-md transition-all flex flex-col justify-between group min-h-[190px]"
              >
                <div>
                  <FigmaTickBadge className="w-9 h-9 mb-3.5" iconSize="w-4 h-4" />
                  <h3 className="font-cormorant italic text-2xl sm:text-[26px] font-normal text-[#1F3A2C] leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-[#55695c] font-sans font-normal leading-relaxed mt-1.5">
                    {item.desc}
                  </p>
                </div>
                <div className="pt-4">
                  <ArrowUpRightIcon className="w-3.5 h-3.5 text-[#52704e] opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
              </div>
            ))}
          </div>

          {/* Bottom link: Explore Global Solutions */}
          <div className="text-center pt-6">
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1F3A2C] hover:text-[#52704e] transition-colors underline underline-offset-8 decoration-[#1F3A2C]/60"
            >
              <span>Explore Global Solutions</span>
              <ArrowRightIcon className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. FREQUENTLY ASKED QUESTIONS (DARK GREEN WITH LEAF OVERLAY - MATCHING FIGMA SCREENSHOT 3) */}
      <section className="relative w-full bg-[#1F3A2C] text-white py-20 lg:py-24 overflow-hidden">
        {/* Subtle Leaf watermark overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-[0.07] mix-blend-screen"
          style={{ backgroundImage: "url('/leaf_background.jpg')" }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
            <div>
              <span className="text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-[#c5a963] font-sans block mb-2">
                FREQUENTLY ASKED QUESTIONS
              </span>
              <h2 className="font-editorial-heading text-4xl sm:text-5xl text-white">
                FAQ
              </h2>
            </div>
            <p className="text-sm text-[#cfded5] font-sans max-w-md leading-relaxed">
              Find answers to the questions we hear most about investing, wealth planning, and your financial journey.
            </p>
          </div>

          {/* 4 FAQ Cards with Figma Circular Badges & Questions/Answers Visible */}
          <div className="space-y-4 max-w-5xl mx-auto">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white text-[#1F3A2C] rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-sm flex items-start gap-4 transition-all"
              >
                <FigmaTickBadge className="w-8 h-8 mt-0.5 shrink-0" iconSize="w-4 h-4" />
                <div className="space-y-1">
                  <h3 className="font-cormorant italic text-lg sm:text-xl font-medium text-[#1F3A2C] leading-snug">
                    {faq.q}
                  </h3>
                  <p className="text-xs sm:text-[13.5px] text-[#55695c] font-sans leading-relaxed font-normal">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CTA BANNER CARD: THINK BEYOND BORDERS. BUILD WITH PURPOSE (MATCHING FIGMA SCREENSHOT 3) */}
      <section className="w-full py-20 bg-[#F5F1E8]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="relative bg-white rounded-3xl p-10 sm:p-14 lg:p-16 border border-[#e8e2d4] shadow-sm text-center overflow-hidden">
            {/* Exact Figma White Silk Draped Wave Background */}
            <div
              className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-85"
              style={{ backgroundImage: "url('/images/card_silk_exact.jpg')" }}
            />

            <div className="relative z-10 max-w-2xl mx-auto space-y-4">
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#bda15f] block font-sans">
                INVEST NOW
              </span>

              <h2 className="font-cormorant font-normal text-3xl sm:text-4xl lg:text-[46px] text-[#1F3A2C] leading-tight">
                <span>Think beyond borders. </span> <br />
                <span className="italic text-[#8fa868]">Build with purpose.</span>
              </h2>

              <p className="text-xs sm:text-sm text-[#5d7064] font-sans leading-relaxed max-w-xl mx-auto pt-1 font-normal">
                Explore global opportunities with a strategy designed around your wealth journey.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#1F3A2C] hover:bg-[#15281e] text-white text-xs sm:text-sm font-semibold transition-all shadow-md group"
                >
                  <span>Talk to an Expert</span>
                  <ArrowRightIcon className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <a
                  href="/#wealth-score"
                  className="text-xs sm:text-sm font-semibold text-[#1F3A2C] hover:text-[#52704e] transition-colors underline underline-offset-8 decoration-[#1F3A2C]/60"
                >
                  Take the Portfolio Health Check
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

