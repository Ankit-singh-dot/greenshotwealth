"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FigmaTickBadge, ArrowRightIcon, ArrowUpRightIcon } from "@/components/Icons";

export default function IndianInvestingPage() {
  const solutions = [
    {
      title: "Mutual Funds",
      desc: "Diversified, professionally managed investment solutions.",
    },
    {
      title: "SIP Solutions",
      desc: "Build investing discipline through regular contributions.",
    },
    {
      title: "Equity",
      desc: "Participate in India's long-term growth through equity investments.",
    },
    {
      title: "Debt & Fixed Income",
      desc: "Add stability and income to your portfolio.",
    },
    {
      title: "Hybrid & Multi-Asset",
      desc: "Balance growth and diversification across asset classes.",
    },
    {
      title: "SIF",
      desc: "Explore specialized investment strategies for eligible investors.",
    },
    {
      title: "Retirement Planning",
      desc: "Plan today for financial independence tomorrow.",
    },
    {
      title: "Estate Planning",
      desc: "Plan, protect, and pass on your wealth.",
    },
    {
      title: "Insurance Planning",
      desc: "Protect your family, income, and financial goals.",
    },
  ];

  const faqs = [
    {
      q: "What is the minimum amount required to start investing?",
      a: "The minimum depends on the investment product and platform. We'll help you identify suitable options based on your goals and circumstances.",
    },
    {
      q: "Is SIP an investment product?",
      a: "SIP is an investment method that allows you to invest a fixed amount periodically, commonly into mutual funds.",
    },
    {
      q: "Are mutual funds safe?",
      a: "Mutual funds are market-linked investments and are not risk-free. The level of risk depends on the underlying assets and strategy. Investors should consider the scheme's risk profile before investing. SEBI's Riskometer is designed to help investors understand the risk level of mutual-fund schemes.",
    },
    {
      q: "How do I know which mutual fund is right for me?",
      a: "The appropriate investment depends on factors such as your goals, time horizon, risk profile and financial situation.",
    },
    {
      q: "What is an SIF?",
      a: "A Specialized Investment Fund is a SEBI-regulated investment structure offering specialized strategies, subject to applicable eligibility and investment requirements.",
    },
    {
      q: "Can I invest for retirement through mutual funds?",
      a: "Mutual funds can form part of a retirement strategy, but the appropriate approach depends on your goals, time horizon, risk profile and overall financial plan.",
    },
  ];

  return (
    <div className="w-full flex flex-col bg-[#F5F1E8]">
      {/* 1. HERO SECTION (MATCHING FIGMA SCREENSHOT 1) */}
      <section className="relative w-full min-h-[620px] lg:min-h-[720px] flex items-center justify-center overflow-hidden bg-[#0a1811]">
        {/* Background GIF: /indian_investing.gif with atmospheric overlays */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/indian_investing.gif"
            alt="Indian Skyline & Sea Link"
            fill
            priority
            unoptimized
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80" />
          <div className="absolute inset-0 bg-[#0f241a]/30 mix-blend-multiply" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center text-white space-y-6">
          <span className="text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-[#c5a963] font-sans inline-block">
            INDIAN INVESTING
          </span>

          <h1 className="font-editorial-heading text-4xl sm:text-6xl lg:text-[72px] text-white leading-[1.08] tracking-tight drop-shadow-md">
            <span>Build your wealth in</span> <br />
            <span className="text-[#8fa868]">India&apos;s </span>
            <span>growing economy.</span>
          </h1>

          <p className="text-sm sm:text-base text-white/90 font-sans leading-relaxed max-w-2xl mx-auto font-normal">
            From your first SIP to a multi-crore portfolio, we help you invest across Indian markets with a strategy built around your goals, risk and time horizon.
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
              Explore Solutions
            </a>
          </div>
        </div>
      </section>

      {/* 2. FINANCIAL WELLNESS (DARK GREEN - MATCHING FIGMA SCREENSHOT 1) */}
      <section className="w-full bg-[#1F3A2C] text-white py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            {/* Left: Indian Investing Architecture Image */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-md h-72 sm:h-80 lg:h-96 rounded-3xl overflow-hidden shadow-2xl border border-white/15 bg-[#172e23]">
                <Image
                  src="/indian_investing_image.jpg"
                  alt="Modern architectural atrium with sunlit stairs"
                  fill
                  className="object-cover object-center"
                />
              </div>
            </div>

            {/* Right: Copy with Gold Portfolio highlight & Gold bar */}
            <div className="lg:col-span-7 space-y-5 lg:pl-4">
              <span className="text-[11px] sm:text-xs font-semibold tracking-[0.22em] uppercase text-[#c5a963] font-sans block">
                FINANCIAL WELLNESS
              </span>

              <h2 className="font-cormorant italic text-3xl sm:text-4xl lg:text-[50px] font-semibold leading-[1.12] text-white">
                <span>India has opportunities.</span> <br />
                <span>Your </span>
                <span className="text-[#c5a963]">portfolio</span>
                <span> needs a</span> <br />
                <span>strategy.</span>
              </h2>

              <div className="w-14 h-1 bg-[#c5a963] rounded-full my-4" />

              <p className="text-sm sm:text-base text-[#cfded5] font-sans leading-relaxed max-w-xl font-normal">
                Market offer and less opportunities, but real wealth is built with the right strategy, the right discipline, and the right guidance.
              </p>
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
              <span>Solutions to grow </span> <br className="sm:hidden" />
              <span className="text-[#8fa868]">your wealth</span>
            </h2>
          </div>

          {/* 10 Solution Cards with Circular Badges, Italic Headings, and Arrows */}
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

            {/* 10th Full-width Card: India Investment Solutions for NRIs */}
            <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 shadow-xs border border-[#eae4d7]/70 hover:shadow-md transition-all flex flex-col justify-between group min-h-[170px]">
              <div>
                <FigmaTickBadge className="w-9 h-9 mb-3.5" iconSize="w-4 h-4" />
                <h3 className="font-cormorant italic text-2xl sm:text-[26px] font-normal text-[#1F3A2C] leading-snug">
                  India Investment Solutions for NRIs
                </h3>
                <p className="text-xs sm:text-[13px] text-[#55695c] font-sans font-normal leading-relaxed mt-1.5">
                  Explore suitable Indian investment opportunities while living abroad.
                </p>
              </div>
              <div className="pt-4">
                <ArrowUpRightIcon className="w-3.5 h-3.5 text-[#52704e] opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
            </div>
          </div>

          {/* Bottom link: Find the Right Solution */}
          <div className="text-center pt-6">
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1F3A2C] hover:text-[#52704e] transition-colors underline underline-offset-8 decoration-[#1F3A2C]/60"
            >
              <span>Find the Right Solution</span>
              <ArrowRightIcon className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. FREQUENTLY ASKED QUESTIONS (MATCHING FIGMA SCREENSHOT 3) */}
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

          {/* 6 FAQ Cards with Figma Circular Badges & Questions/Answers Visible (Exact Figma Screenshot 3) */}
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

      {/* 5. CTA BANNER CARD: YOUR GOALS DESERVE A STRATEGY (MATCHING FIGMA SCREENSHOT 4) */}
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
                <span>Your </span>
                <span className="italic text-[#8fa868]">goals</span>
                <span> deserve a strategy.</span>
              </h2>

              <p className="text-xs sm:text-sm text-[#5d7064] font-sans leading-relaxed max-w-xl mx-auto pt-1 font-normal">
                Whether you&apos;re starting your first SIP, building a multi-crore portfolio, preparing for retirement or planning your family&apos;s future, let&apos;s create a strategy built around where you want to go.
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
