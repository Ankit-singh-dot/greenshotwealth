"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import WealthScoreQuiz from "@/components/WealthScoreQuiz";
import ApproachSection from "@/components/ApproachSection";
import { CheckIcon, CheckCircleSolid, ArrowRightIcon, ArrowUpRightIcon, LinkedinIcon } from "@/components/Icons";

export default function Home() {
  const [investMode, setInvestMode] = useState<"india" | "global">("india");
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

  const stories = [
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
    <div className="w-full flex flex-col">
      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-[680px] lg:min-h-[760px] flex items-center justify-center overflow-hidden">
        {/* Background Video GIF */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/home_video.gif"
            alt="Scenic Landscape"
            fill
            priority
            unoptimized
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/55" />
          <div className="absolute inset-0 bg-[#0f241a]/30 mix-blend-multiply" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-white">
              {/* Badge with Gold Dot matching Figma */}
              <div className="inline-flex items-center gap-2.5 bg-white text-[#1F3A2C] px-4 py-1.5 rounded-full shadow-md text-xs font-semibold tracking-[0.16em] uppercase">
                <span className="w-2 h-2 rounded-full bg-[#c5a963]" />
                <span>India&apos;s First Wealth Experience Platform</span>
              </div>

              {/* Headline matching Figma: Cormorant Garamond, White Management in Italic */}
              <h1 className="font-cormorant text-5xl sm:text-6xl lg:text-[76px] font-normal leading-[1.05] tracking-tight text-white drop-shadow-sm">
                <span>Beyond Wealth</span> <br />
                <span className="italic text-white">Management.</span>
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-white/90 font-sans leading-relaxed max-w-xl font-normal">
                Advice that starts with a conversation. Money, minus the noise. Too many options, too many opinions. We help you cut through both and build a plan you actually understand.
              </p>

              {/* Gold Decorative Line matching Figma */}
              <div className="w-14 h-1 bg-[#c5a963] rounded-full" />

              {/* Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#1F3A2C] font-semibold text-sm hover:bg-[#f4f7f2] transition-all shadow-lg hover:shadow-xl group"
                >
                  <span>Book a Consultation</span>
                  <ArrowRightIcon className="w-4 h-4 text-[#1F3A2C] group-hover:translate-x-1 transition-transform" />
                </Link>

                <a
                  href="#wealth-score"
                  className="text-sm font-medium text-white hover:text-white/80 transition-colors underline underline-offset-8 decoration-white/70 hover:decoration-white"
                >
                  Start Your Financial Journey
                </a>
              </div>
            </div>

            {/* Right Content: 4 Glassmorphic Cards matching Figma Image 2 */}
            <div className="lg:col-span-5 space-y-3.5">
              {[
                {
                  title: "Questions before products",
                  desc: "We listen first. Then we suggest.",
                },
                {
                  title: "One adviser for years",
                  desc: "No handovers. No strangers. A relationship built to last.",
                },
                {
                  title: "Plain words only",
                  desc: "If your family can't follow the plan, we explain it again.",
                },
                {
                  title: "Sometimes we say no",
                  desc: "If a product doesn't fit you, we'll tell you.",
                },
              ].map((card, idx) => (
                <div
                  key={idx}
                  className="bg-[#4d5c50]/55 hover:bg-[#4d5c50]/70 backdrop-blur-md border border-white/30 rounded-2xl p-4 sm:p-5 transition-all duration-200 shadow-lg flex items-start gap-4 text-white"
                >
                  {/* Delicate circular white outline check icon matching Figma */}
                  <div className="w-5 h-5 rounded-full border border-white/80 flex items-center justify-center text-white shrink-0 mt-1">
                    <svg className="w-3 h-3" viewBox="0 0 16 16" fill="none" stroke="currentColor">
                      <path d="M4 8.5L6.5 11L12 5.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    {/* Title in Cormorant Garamond Italic */}
                    <h3 className="font-cormorant italic text-lg sm:text-xl font-normal text-white leading-snug">
                      {card.title}
                    </h3>
                    <p className="text-xs text-white/80 mt-1 leading-relaxed font-sans font-normal">
                      {card.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. WEALTH SCORE QUIZ SECTION */}
      <div id="wealth-score">
        <WealthScoreQuiz />
      </div>

      {/* 3. CATEGORY TICKER / RIBBON */}
      <section className="w-full bg-[#f2eee3] border-y border-[#e2dccf] py-4 overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between min-w-max gap-8 text-[11px] font-semibold tracking-[0.2em] text-[#55695c] uppercase">
          <span>FINANCIAL LITERACY</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#c2a763]" />
          <span>GOAL-BASED INVESTING</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#c2a763]" />
          <span>WOMEN&apos;S INDEPENDENCE</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#c2a763]" />
          <span>EARLY INVESTING</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#c2a763]" />
          <span>PERSONAL PLANNING</span>
        </div>
      </section>

      {/* 4. HOW WE INVEST */}
      <section id="how-we-invest" className="w-full bg-[#F5F1E8] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header & Toggle */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12">
            <div>
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#bda15f]">
                HOW WE INVEST
              </span>
              <h2 className="font-editorial-heading text-[#1F3A2C]">
                <span>Two soils. </span>
                <span className="text-[#8fa868]">One tree.</span>
              </h2>
            </div>

            {/* Toggle Pills */}
            <div className="inline-flex p-1 rounded-full bg-white border border-[#ded8cb] shadow-sm">
              <button
                onClick={() => setInvestMode("india")}
                className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${investMode === "india"
                  ? "bg-[#1F3A2C] text-white shadow"
                  : "text-[#586c60] hover:text-[#1F3A2C]"
                  }`}
              >
                India Investing
              </button>
              <button
                onClick={() => setInvestMode("global")}
                className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all ${investMode === "global"
                  ? "bg-[#1F3A2C] text-white shadow"
                  : "text-[#586c60] hover:text-[#1F3A2C]"
                  }`}
              >
                Global Investing
              </button>
            </div>
          </div>

          {/* Cards Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Featured Card */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[#1b3d2f] to-[#12281f] text-white rounded-3xl p-8 sm:p-10 shadow-xl flex flex-col justify-between relative overflow-hidden">
              <div className="space-y-4">
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#c7af75]">
                  {investMode === "india" ? "INDIA INVESTING" : "GLOBAL INVESTING & IFSC"}
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl text-white font-normal leading-snug">
                  {investMode === "india" ? (
                    <>
                      The power of <br />
                      <span className="italic text-[#8fa868]">Bharat&apos;s markets.</span>
                    </>
                  ) : (
                    <>
                      The advantage of <br />
                      <span className="italic text-[#8fa868]">Global diversification.</span>
                    </>
                  )}
                </h3>
                <p className="text-sm text-[#c8d9ce] font-sans leading-relaxed">
                  {investMode === "india"
                    ? "From a first ₹1000 SIP to a portfolio worth crores, built on discipline, not last year's winners."
                    : "Access US dollar assets, global index funds, and international equities with zero capital gains tax through GIFT City IFSC."}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-3">
                  {(investMode === "india"
                    ? ["Self-filtering MF baskets", "Tax-aware portfolios", "Goal-linked SIPs"]
                    : ["GIFT City IFSC Access", "USD Portfolios", "Global Megatrend Funds"]
                  ).map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-full text-xs bg-white/10 border border-white/20 text-[#ebf3ee]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-8">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#c7af75] hover:text-white transition-colors group"
                >
                  <span>{investMode === "india" ? "Explore India investment" : "Explore Global investment"}</span>
                  <ArrowUpRightIcon className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Right 6 Cards (2x3 grid) matching Figma Image 1 */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {(investMode === "india"
                ? [
                  { title: "Mutual Funds", desc: "Curated, goal-mapped selections." },
                  { title: "SIP Solutions", desc: "Systematic, disciplined wealth building." },
                  { title: "Retirement Planning", desc: "NPS, EPF, and beyond." },
                  { title: "Estate Planning", desc: "Wills, trusts, and succession." },
                  { title: "Insurance Planning", desc: "Life, health, term optimization." },
                  { title: "SIF", desc: "Specialized Investment Funds." },
                ]
                : [
                  { title: "GIFT City Accounts", desc: "Direct USD bank & trading custody." },
                  { title: "Global Equities", desc: "US, European, and Asian indices." },
                  { title: "Offshore Funds", desc: "Zero capital gains tax under IFSCA." },
                  { title: "Currency Hedging", desc: "Preserve purchasing power against INR depreciation." },
                  { title: "NRI Repatriation", desc: "Seamless cross-border wealth movement." },
                  { title: "Global Real Estate Funds", desc: "International REITs and private debt." },
                ]
              ).map((card, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 shadow-xs border border-[#eae4d7]/70 hover:shadow-md transition-all flex flex-col items-start justify-between min-h-[170px]"
                >
                  {/* Circular Sage Badge with Checkmark Outline matching Figma Image 1 */}
                  <div className="w-10 h-10 rounded-full bg-[#edf2e8] flex items-center justify-center text-[#52704e] mb-3">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
                      <path d="M8.5 12.3L10.8 14.6L15.5 9.5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div>
                    {/* Title in Cormorant Garamond Italic */}
                    <h4 className="font-cormorant italic text-2xl sm:text-[26px] font-normal text-[#1F3A2C] leading-tight">
                      {card.title}
                    </h4>
                    {/* Subtitle / Description in Sans */}
                    <p className="text-xs sm:text-[13px] text-[#55695c] mt-1.5 leading-relaxed font-sans font-normal">
                      {card.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. GOAL-BASED PLANNING (EXACT MATCH FIGMA IMAGE 1 & 3) */}
      <section className="w-full bg-[#F5F1E8] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10 sm:mb-12">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#c5a963] block font-sans mb-3">
              GOAL-BASED PLANNING
            </span>
            {/* Exact Figma Typography: Cormorant Garamond 700 Italic 60px / 63px */}
            <h2 className="font-editorial-heading text-[#1F3A2C]">
              <span>Your money should</span> <br />
              <span>have a </span>
              <span className="text-[#8fa868]">purpose.</span>
            </h2>
            <p className="text-sm sm:text-base text-[#5d7064] font-sans mt-3.5 leading-relaxed max-w-2xl font-normal">
              Our financial wellness score looks at your savings, investments, insurance, retirement readiness and how you feel about your money.
            </p>
          </div>

          {/* Goal Cards Grid: Exact Figma Badge Icon + Cormorant Garamond Italic Titles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {[
              { title: "Retirement", desc: "Build long-term financial security." },
              { title: "Child Education", desc: "Prepare for future education expenses." },
              { title: "Buying a Home", desc: "Plan for your down payment and future EMIs." },
              { title: "Emergency Fund", desc: "Build financial stability for unexpected situations." },
              { title: "Passive Income", desc: "Create a structured approach to future income." },
              { title: "Wealth Creation", desc: "Build long-term wealth through disciplined investing." },
            ].map((goal, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 shadow-xs border border-[#eae4d7]/70 hover:shadow-sm transition-all flex items-start gap-4"
              >
                {/* Circular Pale Sage Badge with Circular Checkmark Icon matching Figma */}
                <div className="w-10 h-10 rounded-full bg-[#edf2e8] flex items-center justify-center text-[#52704e] shrink-0 mt-0.5">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
                    <path d="M8.5 12.3L10.8 14.6L15.5 9.5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-cormorant italic text-2xl font-normal text-[#1F3A2C] leading-snug">
                    {goal.title}
                  </h4>
                  <p className="text-xs sm:text-[13px] text-[#55695c] mt-1 leading-relaxed font-sans font-normal">
                    {goal.desc}
                  </p>
                </div>
              </div>
            ))}

            {/* 7th Wide Card: India Investment Solutions for NRIs */}
            <div className="sm:col-span-2 lg:col-span-3 bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 shadow-xs border border-[#eae4d7]/70 hover:shadow-sm transition-all flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#edf2e8] flex items-center justify-center text-[#52704e] shrink-0 mt-0.5">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
                  <path d="M8.5 12.3L10.8 14.6L15.5 9.5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <h4 className="font-cormorant italic text-2xl font-normal text-[#1F3A2C] leading-snug">
                  India Investment Solutions for NRIs
                </h4>
                <p className="text-xs sm:text-[13px] text-[#55695c] mt-1 leading-relaxed font-sans font-normal">
                  Explore suitable Indian investment opportunities while living abroad.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center pt-8">
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1F3A2C] hover:text-[#52704e] transition-colors underline underline-offset-8 decoration-[#1F3A2C]/60"
            >
              <span>Plan Your Goals</span>
              <ArrowRightIcon className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. WHAT MAKES US DIFFERENT */}
      <section className="w-full bg-[#1b3628] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Top Row: Building Image & Text */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 relative h-72 sm:h-80 lg:h-96 rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              <Image
                src="/building_image.jpg"
                alt="Modern Architecture"
                fill
                className="object-cover object-center"
              />
            </div>

            <div className="lg:col-span-7 space-y-5 lg:pl-6">
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#c7af75]">
                WHAT MAKES US DIFFERENT
              </span>
              <h2 className="font-editorial-heading text-white">
                <span>We don&apos;t just manage money.</span> <br />
                <span className="text-[#8fa868]">We help you think about it.</span>
              </h2>
              <p className="text-sm sm:text-base text-[#cfded5] font-sans leading-relaxed max-w-xl">
                Most people aren&apos;t stuck for lack of choices. They&apos;re stuck because nobody explained them simply. So we do, and decisions don&apos;t wait.
              </p>
            </div>
          </div>

          {/* Bottom 3 Pale Sage Cards (Exact Match Figma Image 1) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                title: "Financial Planning",
                desc: "Create a clear roadmap based on your life goals and financial priorities.",
              },
              {
                title: "Goal-Based Planning",
                desc: "Plan for retirement, education, wealth creation and other important milestones.",
              },
              {
                title: "Investment Advisory",
                desc: "Build structured investment strategies designed around your goals.",
              },
            ].map((card, idx) => (
              <div
                key={idx}
                className="bg-[#EEF0D9] text-[#1F3A2C] rounded-2xl sm:rounded-3xl p-6 sm:p-7 shadow-xs border border-[#dbe6ca]/80 hover:shadow-md transition-all flex items-start gap-4"
              >
                {/* Circular Sage Badge with Checkmark Outline matching Figma Image 1 */}
                <div className="w-11 h-11 rounded-full bg-[#dde5cb] flex items-center justify-center text-[#52704e] shrink-0 mt-0.5">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
                    <path d="M8.5 12.3L10.8 14.6L15.5 9.5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-cormorant italic text-2xl sm:text-[26px] font-normal text-[#1F3A2C] leading-snug">
                    {card.title}
                  </h4>
                  <p className="text-xs sm:text-[13px] text-[#4a5f51] mt-1.5 leading-relaxed font-sans font-normal">
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. STATS BANNER */}
      <section className="w-full bg-[#EEF0D9] py-8 border-y border-[#dbe4ca]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border border-dashed border-[#8b9e7c] rounded-2xl p-6 lg:p-8">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
              {[
                { number: "20+", label: "YEARS IN FINANCE" },
                { number: "₹545 Cr", label: "GOALS PLANNED" },
                { number: "₹110 Cr", label: "GOAL ACHIEVED" },
                { number: "566+", label: "FAMILIES SERVED" },
                { number: "95%", label: "CLIENT RETENTION" },
              ].map((stat, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="font-sans text-3xl sm:text-4xl font-bold text-[#1F3A2C] tracking-tight">
                    {stat.number}
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-semibold tracking-[0.16em] uppercase text-[#546b5a] font-sans">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. WHAT WE DO */}
      <section id="what-we-do" className="w-full bg-[#F5F1E8] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-12">
            <div>
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#bda15f]">
                WHAT WE DO
              </span>
              <h2 className="font-editorial-heading text-[#1F3A2C]">
                <span>Everything your wealth needs.</span> <br />
                <span className="text-[#8fa868]">All in one place.</span>
              </h2>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1F3A2C] hover:text-emerald-800 transition-colors"
            >
              <span>Talk to an Expert</span>
              <ArrowRightIcon className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                img: "/investment.jpg",
                title: "Investments",
                desc: "Grow your wealth through Mutual Funds, SIPs, SWPs, Retirement Planning, and tax-saving investment strategies tailored to your financial goals.",
              },
              {
                img: "/insurance.jpg",
                title: "Insurance",
                desc: "Protect what matters with Health, Motor, Travel, Home, and Business Insurance designed to safeguard you, your family, and your assets.",
              },
              {
                img: "/advisory.jpg",
                title: "Advisory",
                desc: "Make confident financial decisions with Financial Planning, Portfolio Reviews, and Risk Assessment aligned with your goals and financial journey.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl overflow-hidden shadow-sm border border-[#e8e2d4] hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                <div className="relative h-52 w-full overflow-hidden bg-neutral-100">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-7 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="font-cormorant italic text-2xl sm:text-[26px] font-normal text-[#1F3A2C]">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-[#5d7064] font-sans mt-2.5 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  <div className="pt-6">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1F3A2C] group-hover:text-emerald-700 transition-colors"
                    >
                      <span>Learn more</span>
                      <ArrowRightIcon className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. GO BEYOND BORDERS / GIFT CITY */}
      <section id="gift-city" className="w-full bg-[#1F3A2C] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#c7af75]">
                GLOBAL DIVERSIFICATION
              </span>
              <h2 className="font-editorial-heading text-white">
                <span>Go beyond borders.</span> <br />
                <span className="text-[#8fa868]">Invest globally.</span>
              </h2>
              <p className="text-sm sm:text-base text-[#c8d9ce] font-sans leading-relaxed max-w-xl">
                Access international markets, dollar assets, and tax-efficient global investments right through GIFT City IFSC. Build a hedge against currency fluctuation and participate in worldwide growth.
              </p>

              <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
                {[
                  "Zero Capital Gains Tax in IFSC",
                  "Direct Global Equities & ETFs",
                  "USD Denominated Investing",
                ].map((pill, i) => (
                  <div
                    key={i}
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/10 border border-white/15 text-xs text-[#ebf3ee]"
                  >
                    <CheckIcon className="w-3.5 h-3.5 text-[#8fa868]" />
                    <span>{pill}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-[#1F3A2C] text-xs font-semibold hover:bg-[#f4f7f2] transition-colors shadow-md"
                >
                  <span>Explore GIFT City Solutions</span>
                  <ArrowRightIcon className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 relative h-72 sm:h-80 lg:h-96 rounded-3xl overflow-hidden shadow-2xl border border-white/15">
              <Image
                src="/city.png"
                alt="GIFT City IFSC Architecture"
                fill
                priority
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 10. OUR APPROACH: WEALTH GROWS LIKE A TREE */}
      <ApproachSection />

      {/* 11. ABOUT SALONI (MATCHING SCREENSHOT 1) */}
      <section className="w-full bg-[#EEF0D9] py-20 border-b border-[#dbe4ca]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Full-Height Portrait */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-72 h-[420px] sm:w-80 sm:h-[460px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src="/saloni_mehta.jpeg"
                  alt="Saloni Mehta - Financial Therapist & Wealth Architect"
                  fill
                  priority
                  className="object-cover object-top"
                />
              </div>
            </div>

            {/* Right Details */}
            <div className="lg:col-span-7 space-y-5">
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#73885c]">
                ABOUT SALONI
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1F3A2C] font-normal leading-tight">
                Saloni Mehta. – <span className="italic text-[#4a6344]">Financial Therapist &amp; Wealth Architect.</span>
              </h2>

              <p className="text-xs sm:text-sm text-[#485c4f] font-sans leading-relaxed">
                Saloni Mehta built Green Shoots Wealth on a conviction: that financial advice in India needed to evolve beyond product distribution into something far more human — a practice that combines the rigor of wealth planning with the empathy of therapy.
              </p>

              <p className="text-xs sm:text-sm text-[#485c4f] font-sans leading-relaxed">
                With expertise spanning mutual funds, global investing, GIFT City structures, and NRI financial management, Saloni brings a rare 360° perspective to client portfolios — from the first SIP to multi-generational legacy planning.
              </p>

              <p className="text-xs sm:text-sm text-[#485c4f] font-sans leading-relaxed">
                Her Women &amp; Wealth practice has become a trusted resource for hundreds of Indian women navigating financial independence, life transitions, and long-term wealth creation.
              </p>

              {/* 3 Metrics */}
              <div className="grid grid-cols-3 gap-4 pt-3 max-w-md">
                <div>
                  <div className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-[#1F3A2C]">
                    20+
                  </div>
                  <div className="text-[10px] text-[#6b8273] uppercase font-semibold font-sans mt-0.5">
                    Year of experience
                  </div>
                </div>
                <div>
                  <div className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-[#1F3A2C]">
                    ₹200Cr
                  </div>
                  <div className="text-[10px] text-[#6b8273] uppercase font-semibold font-sans mt-0.5">
                    Assets Guided
                  </div>
                </div>
                <div>
                  <div className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-[#1F3A2C]">
                    5k
                  </div>
                  <div className="text-[10px] text-[#6b8273] uppercase font-semibold font-sans mt-0.5">
                    Families Served
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-4 sm:gap-6">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#1F3A2C] hover:bg-[#12281c] text-white text-xs font-semibold transition-all shadow-md group"
                >
                  <span>Schedule a Conversation</span>
                  <ArrowRightIcon className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href="https://www.linkedin.com/in/the-saloni-mehta/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-[#1F3A2C]/60 text-[#1F3A2C] hover:bg-[#1F3A2C] hover:text-white text-xs font-semibold transition-all"
                >
                  <LinkedinIcon className="w-3.5 h-3.5" />
                  <span>LinkedIn Profile</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 12. SUCCESS STORIES (MATCHING FIGMA SCREENSHOT 5) */}
      <section className="w-full bg-[#1F3A2C] text-white py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="space-y-2">
            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#c7af75] block">
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
              if (newIdx !== activeStoryIdx && newIdx >= 0 && newIdx < stories.length) {
                setActiveStoryIdx(newIdx);
              }
            }}
            className="flex lg:grid lg:grid-cols-4 gap-5 pt-2 overflow-x-auto lg:overflow-visible scrollbar-none snap-x snap-mandatory pb-4"
          >
            {stories.map((t, idx) => (
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
            {stories.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollStory(idx)}
                aria-label={`View story ${idx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${activeStoryIdx === idx
                    ? "w-7 h-1.5 bg-[#EEF0D9]"
                    : "w-1.5 h-1.5 bg-[#3d5e4a] hover:bg-[#527d63]"
                  }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 13. THE GSW APP (MATCHING SCREENSHOT 2) */}
      <section id="download" className="w-full bg-[#F5F1E8] py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="relative bg-white rounded-3xl p-10 sm:p-14 border border-[#e8e2d4] shadow-sm text-center space-y-5 overflow-hidden">
            {/* Exact Figma White Silk Draped Wave Background */}
            <div
              className="absolute inset-0 bg-cover bg-center pointer-events-none"
              style={{ backgroundImage: "url('/images/card_silk_exact.jpg')" }}
            />

            <div className="relative z-10 space-y-4">
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#bda15f] block font-sans">
                THE GSW APP
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1F3A2C] font-normal leading-tight">
                <span>Your whole financial life, </span><br />
                <span className="italic">in one quiet place.</span>
              </h2>
              <p className="text-xs sm:text-sm text-[#5d7064] font-sans max-w-md mx-auto">
                Track investments, watch your goals move, and get a nudge when something needs attention. Free to download, always.
              </p>

              <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                <a
                  href="https://apps.apple.com/in/app/green-shoots-wealth/id6778030809"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-black text-white text-xs font-semibold hover:bg-neutral-800 transition-colors shadow-sm"
                >
                  <span> Download on App Store</span>
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=com.greenshoots.greenshootswealth"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#1b3628] text-white text-xs font-semibold hover:bg-[#12281c] transition-colors shadow-sm"
                >
                  <span>▶ Get it on Google Play</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
