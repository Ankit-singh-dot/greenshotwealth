"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FigmaTickBadge,
  ArrowRightIcon,
  ArrowUpRightIcon,
  GlobeSearchIcon,
  DollarCircleIcon,
  CrossBorderIcon,
  ShieldCheckIcon,
} from "@/components/Icons";

export default function GiftCityPage() {
  const whyConsider = [
    {
      title: "Global Access",
      desc: "Explore eligible international investment opportunities.",
      icon: <GlobeSearchIcon className="w-8 h-8 text-[#8fa868]" />,
    },
    {
      title: "Dollar-Based Investing",
      desc: "Access eligible USD-denominated investment structures.",
      icon: <DollarCircleIcon className="w-8 h-8 text-[#8fa868]" />,
    },
    {
      title: "Cross-Border Wealth",
      desc: "Connect Indian and global wealth through a coordinated strategy.",
      icon: <CrossBorderIcon className="w-8 h-8 text-[#8fa868]" />,
    },
    {
      title: "IFSC Advantage",
      desc: "Explore opportunities available through India's international financial centre.",
      icon: <ShieldCheckIcon className="w-8 h-8 text-[#8fa868]" />,
    },
  ];

  const solutions = [
    {
      title: "Resident Indians",
      desc: "Explore eligible global investment opportunities through GIFT City.",
    },
    {
      title: "NRI Investors",
      desc: "Connect your India and global wealth through one strategy.",
    },
    {
      title: "Inbound Funds",
      desc: "Support international capital entering India.",
    },
    {
      title: "Outbound Funds",
      desc: "Explore opportunities for Indian capital going global.",
    },
    {
      title: "Dollar Investing",
      desc: "Build and diversify wealth through USD-denominated opportunities.",
    },
    {
      title: "Tax Planning",
      desc: "Navigate applicable IFSC structures and tax considerations.",
    },
  ];

  const faqs = [
    {
      q: "What is GIFT City IFSC?",
      a: "GIFT City IFSC is India's international financial centre, designed to facilitate global financial services and cross-border investments.",
    },
    {
      q: "Can Resident Indians invest through GIFT City?",
      a: "Eligible Resident Indians may access certain international investment opportunities through permitted GIFT City structures, subject to applicable regulations.",
    },
    {
      q: "What investment opportunities are available through GIFT City?",
      a: "Depending on eligibility, investors may access opportunities such as global funds, USD-denominated investments, and other international financial products.",
    },
    {
      q: "Can NRIs use GIFT City for their investments?",
      a: "Yes, GIFT City can provide NRIs with opportunities to connect their India-based and global financial portfolios.",
    },
    {
      q: "What are the tax implications of investing through GIFT City?",
      a: "Tax treatment varies based on the investor, investment structure, residency, and applicable regulations. Professional advice should be taken for individual circumstances.",
    },
    {
      q: "How can I know if GIFT City is right for me?",
      a: "It depends on your financial goals, residency, risk profile, existing portfolio, and need for international diversification. A conversation with our team can help you understand the relevant options.",
    },
  ];

  return (
    <div className="w-full flex flex-col bg-[#F5F1E8]">
      {/* 1. HERO SECTION (MATCHING FIGMA SCREENSHOT 1) */}
      <section className="relative w-full min-h-[620px] lg:min-h-[720px] flex items-center justify-center overflow-hidden bg-[#0d1c14]">
        {/* Background GIF: /gift_investing.gif with dark muted moss atmospheric overlays */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/gift_investing.gif"
            alt="GIFT City International Skyline"
            fill
            priority
            unoptimized
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80" />
          <div className="absolute inset-0 bg-[#0e2419]/35 mix-blend-multiply" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center text-white space-y-6">
          <span className="text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-[#c5a963] font-sans inline-block">
            GIFT CITY · GUJARAT INTERNATIONAL FINANCE TEC-CITY
          </span>

          <h1 className="font-editorial-heading text-4xl sm:text-6xl lg:text-[72px] text-white leading-[1.08] tracking-tight drop-shadow-md">
            <span>India&apos;s global </span> <br />
            <span className="text-[#8fa868]">financial gateway.</span>
          </h1>

          <p className="text-xs sm:text-sm text-white/90 font-sans leading-relaxed max-w-2xl mx-auto font-normal">
            GIFT City connects Indian and global financial opportunities through an international financial Centre, opening pathways to global investment structures and cross-border wealth.
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
              Explore GIFT City
            </a>
          </div>
        </div>
      </section>

      {/* 2. WHY CONSIDER GIFT CITY? (MATCHING FIGMA SCREENSHOT 1) */}
      <section className="w-full bg-[#1F3A2C] text-white py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          {/* Section Heading */}
          <h2 className="font-cormorant italic text-3xl sm:text-4xl lg:text-[48px] font-semibold text-white leading-tight">
            <span>Why consider </span>
            <span className="text-[#8fa868]">GIFT City?</span>
          </h2>

          {/* 4 Feature Columns with Dividers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {whyConsider.map((item, idx) => (
              <div
                key={idx}
                className="space-y-4 lg:border-r lg:border-white/15 lg:last:border-r-0 lg:pr-8"
              >
                <div className="h-10 flex items-center">
                  {item.icon}
                </div>
                <h3 className="font-cormorant italic text-xl sm:text-2xl font-medium text-white">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-[13px] text-[#cfded5] font-sans leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. GIFT CITY SOLUTIONS (MATCHING FIGMA SCREENSHOT 2) */}
      <section id="solutions" className="w-full bg-[#F5F1E8] py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Section Header */}
          <div className="max-w-3xl space-y-2">
            <span className="text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-[#c5a963] font-sans block">
              GIFT CITY SOLUTIONS
            </span>
            <h2 className="font-editorial-heading text-[#1F3A2C]">
              <span>Explore a world </span> <br className="sm:hidden" />
              <span className="text-[#8fa868]">beyond borders.</span>
            </h2>
          </div>

          {/* 6 Solution Cards in 3-column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {solutions.map((item, idx) => (
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

          {/* Bottom link: Explore Your Options */}
          <div className="text-center pt-6">
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1F3A2C] hover:text-[#52704e] transition-colors underline underline-offset-8 decoration-[#1F3A2C]/60"
            >
              <span>Explore Your Options</span>
              <ArrowRightIcon className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. FREQUENTLY ASKED QUESTIONS (MATCHING FIGMA SCREENSHOT 2) */}
      <section className="w-full bg-[#1F3A2C] text-white py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
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

          {/* 6 FAQ Cards with Figma Circular Badges */}
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

      {/* 5. CTA BANNER CARD: TAKE YOUR WEALTH BEYOND BORDERS (MATCHING FIGMA SCREENSHOT 3) */}
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
                <span>Take your wealth </span>
                <span className="italic text-[#8fa868]">beyond borders.</span>
              </h2>

              <p className="text-xs sm:text-sm text-[#5d7064] font-sans leading-relaxed max-w-xl mx-auto pt-1 font-normal">
                Explore what GIFT City could mean for your financial journey.
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
