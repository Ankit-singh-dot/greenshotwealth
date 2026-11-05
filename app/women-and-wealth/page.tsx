"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckIcon, FigmaTickBadge, ArrowRightIcon, ArrowUpRightIcon, ChevronDownIcon } from "@/components/Icons";

export default function WomenAndWealthPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "Why is financial planning particularly important for women?",
      a: "Women generally live longer and may spend more years managing their own financial needs. A clear financial plan can help prepare for retirement, protection and long-term wealth management.",
    },
    {
      q: "What should I do if I receive an inheritance or insurance payout?",
      a: "Start with understanding the amount, your existing financial position, your goals and your liquidity needs before making major investment decisions.",
    },
    {
      q: "I don't know much about investing. Can you still help me?",
      a: "Yes. Financial planning should begin with understanding your situation and goals, not with how much you already know about investing.",
    },
    {
      q: "Can I review my existing investments with you?",
      a: "Yes. A portfolio review can help you understand your existing investments and whether they remain aligned with your goals and risk profile.",
    },
  ];

  return (
    <div className="w-full flex flex-col bg-[#F5F1E8]">
      {/* 1. HERO (EXACTLY MATCHING FIGMA SCREENSHOT 1) */}
      <section className="relative w-full min-h-[640px] lg:min-h-[720px] flex items-center justify-center overflow-hidden">
        {/* Cinematic AI Generated Dark Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/women_hero_cinematic.jpg"
            alt="Women in Executive Financial Consultation"
            fill
            priority
            className="object-cover object-center"
          />
          {/* Subtle gradient overlay to match Figma contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/60 to-black/85" />
          <div className="absolute inset-0 bg-[#0f241a]/40 mix-blend-multiply" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-28 text-white w-full text-center flex flex-col items-center">
          <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#c7af75] mb-4">
            WOMEN &amp; WEALTH
          </span>

          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-normal leading-[1.08] text-white">
            Your wealth. Your <br />
            decisions. <span className="font-cormorant italic font-semibold text-[#8fa868]">Your future.</span>
          </h1>

          <p className="text-sm sm:text-base text-[#dce7e0] font-sans leading-relaxed font-normal max-w-xl mx-auto mt-6">
            Women are living longer and increasingly becoming responsible for managing wealth. We help make that responsibility easier to understand, plan and act on.
          </p>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-7">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-white text-[#1F3A2C] font-semibold text-xs sm:text-sm hover:bg-[#f4f7f2] transition-all shadow-lg group"
            >
              <span>Talk to an Expert</span>
              <ArrowRightIcon className="w-3.5 h-3.5 text-[#1F3A2C] group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/contact"
              className="text-xs sm:text-sm font-medium text-white hover:text-[#8fa868] transition-colors underline underline-offset-8 decoration-white/70 hover:decoration-white"
            >
              Start Your Financial Conversation
            </Link>
          </div>
        </div>
      </section>

      {/* 2. THE LONGER VIEW (DARK GREEN) */}
      <section className="w-full py-20 bg-[#1F3A2C] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4">
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#c7af75]">
                THE LONGER VIEW
              </span>
              <h2 className="font-editorial-heading text-white">
                <span>A longer life needs a </span><br />
                <span>longer </span>
                <span className="text-[#8fa868]">financial plan.</span>
              </h2>
              <p className="text-sm sm:text-base text-[#cfded5] font-sans leading-relaxed max-w-xl">
                Women generally live longer than men. That can mean more years of financial responsibility, retirement planning and wealth management.
              </p>
            </div>

            {/* Right Photo */}
            <div className="lg:col-span-5 relative h-72 sm:h-80 rounded-3xl overflow-hidden shadow-2xl border border-white/15">
              <Image
                src="/a_longer_life.jpg"
                alt="Women planning their financial future"
                fill
                priority
                className="object-cover object-center"
              />
            </div>
          </div>

          {/* 4 Stat Cards matching Figma Image 1 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 pt-2">
            {[
              {
                number: "5 YEARS",
                label: "Approximate global longevity advantage for women.",
              },
              {
                number: "74.4 YEARS",
                label: "Female life expectancy cited in the supplied client material.",
              },
              {
                number: "71.2 YEARS",
                label: "Male life expectancy cited in the supplied client material.",
              },
              {
                number: "₹73 LAKH CRORE",
                label: "Expected to transfer to women in India over the next decade.",
              },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="bg-white text-[#1F3A2C] rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-xs border border-[#eae4d7]/70 flex items-start gap-4 hover:shadow-md transition-all"
              >
                <FigmaTickBadge className="w-10 h-10 mt-0.5" />
                <div>
                  <div className="font-sans font-bold text-base sm:text-lg text-[#1F3A2C] uppercase leading-snug tracking-normal">
                    {stat.number}
                  </div>
                  <p className="text-xs sm:text-[13px] text-[#55695c] font-sans font-normal leading-relaxed mt-1">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. WHEN WEALTH BECOMES YOURS (EXACTLY MATCHING FIGMA SCREENSHOT 2) */}
      <section className="w-full py-20 bg-[#F5F1E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-2xl space-y-3">
            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#bda15f]">
              WHEN WEALTH BECOMES YOURS
            </span>

            {/* Headline matching screenshot 2 with both lines italic */}
            <h2 className="font-serif italic font-normal text-4xl sm:text-5xl lg:text-6xl leading-[1.12]">
              <span className="text-[#1F3A2C] block">What happens when the</span>
              <span className="text-[#6e8f66] block">wealth comes to you?</span>
            </h2>

            <p className="text-sm text-[#5d7064] font-sans leading-relaxed pt-2">
              An inheritance, insurance payout or family wealth transfer can change your financial life overnight. Knowing how to manage it is just as important as receiving it.
            </p>
          </div>

          {/* 4 Cards (2x2 grid) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                title: "Life Insurance",
                desc: "Understand how to manage and invest a significant insurance payout.",
              },
              {
                title: "Inheritance",
                desc: "Create a thoughtful plan for newly inherited wealth and assets.",
              },
              {
                title: "Existing Wealth",
                desc: "Bring scattered investments and financial accounts into one clear plan.",
              },
              {
                title: "Family Wealth",
                desc: "Prepare for the responsibilities that come with managing family wealth.",
              },
            ].map((card, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 shadow-xs border border-[#eae4d7]/70 hover:shadow-md transition-all flex items-start justify-between gap-4 group"
              >
                <div className="flex items-start gap-4">
                  <FigmaTickBadge className="w-10 h-10 mt-0.5" />
                  <div>
                    <h3 className="font-cormorant italic text-2xl sm:text-[26px] font-normal text-[#1F3A2C] leading-snug">
                      {card.title}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-[#55695c] font-sans leading-relaxed mt-1">
                      {card.desc}
                    </p>
                  </div>
                </div>
                <ArrowUpRightIcon className="w-4 h-4 text-[#52704e] opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-1" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FINANCIAL CONFIDENCE (4 PHOTO CARDS) */}
      <section className="w-full py-20 bg-[#EEF0D9] border-y border-[#dbe4ca]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-2xl space-y-3">
            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#73885c]">
              FINANCIAL CONFIDENCE
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl text-[#1F3A2C] font-normal leading-tight">
              It&apos;s not only about having wealth. <br />
              <span className="italic text-[#4a6344]">It&apos;s about knowing what to do with it.</span>
            </h2>
            <p className="text-sm text-[#526658] font-sans leading-relaxed">
              Whether you&apos;re building your first portfolio, managing family finances or receiving wealth later in life, the right plan can bring clarity and confidence to every decision.
            </p>
          </div>

          {/* 4 Photo Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                img: "/images/understand_card.jpg",
                title: "Understand",
                desc: "Know what you own, why you own it and what it is meant to achieve.",
              },
              {
                img: "/images/plan_card.jpg",
                title: "Plan",
                desc: "Make sure your health, family and financial future are adequately protected.",
              },
              {
                img: "/images/invest_card.jpg",
                title: "Invest",
                desc: "Build and manage wealth around your goals and time horizon.",
              },
              {
                img: "/images/plan_ahead_card.jpg",
                title: "Plan Ahead",
                desc: "Prepare for retirement, succession and the years ahead.",
              },
            ].map((card, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl overflow-hidden shadow-sm border border-[#d6e0c6] hover:shadow-lg transition-all flex flex-col group"
              >
                <div className="relative h-48 w-full overflow-hidden bg-neutral-100">
                  <Image
                    src={card.img}
                    alt={card.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="font-serif text-2xl font-semibold text-[#1F3A2C]">
                      {card.title}
                    </h3>
                    <p className="text-xs text-[#526658] font-sans mt-2 leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. HOW WE HELP (5 WHITE CARDS) */}
      <section className="w-full py-20 bg-[#F5F1E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-2xl space-y-2">
            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#bda15f]">
              HOW WE HELP
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl text-[#1F3A2C] font-normal leading-tight">
              A financial plan built <br />
              <span className="italic text-[#8fa868]">around your life.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                title: "Investment Planning",
                desc: "Build and manage investments around your goals, risk and time horizon.",
              },
              {
                title: "Retirement Planning",
                desc: "Prepare for financial independence and a longer, more secure retirement.",
              },
              {
                title: "Insurance Planning",
                desc: "Protect your health, income, family and financial future.",
              },
              {
                title: "Estate & Succession Planning",
                desc: "Plan how your wealth should be managed and passed on.",
              },
              {
                title: "Portfolio Review",
                desc: "Bring clarity to existing investments and identify where your strategy may need attention.",
              },
            ].map((srv, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 shadow-xs border border-[#eae4d7]/70 hover:shadow-md transition-all flex items-start justify-between gap-4 group"
              >
                <div className="flex items-start gap-4">
                  <FigmaTickBadge className="w-10 h-10 mt-0.5" />
                  <div>
                    <h3 className="font-cormorant italic text-2xl sm:text-[26px] font-normal text-[#1F3A2C] leading-snug">
                      {srv.title}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-[#55695c] font-sans leading-relaxed mt-1">
                      {srv.desc}
                    </p>
                  </div>
                </div>
                <ArrowUpRightIcon className="w-4 h-4 text-[#52704e] opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-1" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. THE FINANCIAL REALITY */}
      <section className="w-full py-20 bg-[#EEF0D9] border-y border-[#dbe4ca]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-3xl space-y-3">
            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#73885c]">
              THE FINANCIAL REALITY
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl text-[#1F3A2C] font-normal leading-tight">
              When life changes, financial <br />
              <span className="italic text-[#4a6344]">responsibility can change too.</span>
            </h2>
            <p className="text-sm sm:text-base text-[#526658] font-sans leading-relaxed">
              Nearly 80% of married women will eventually become solely responsible for managing their household finances, often because they outlive their husbands.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                number: "258M+",
                label: "Women navigating life after the loss of a spouse.",
              },
              {
                number: "42M",
                label: "Women in India living through widowhood.",
              },
              {
                number: "43M",
                label: "Women in China living through widowhood.",
              },
              {
                number: "11M+",
                label: "Women in the United States living through widowhood.",
              },
            ].map((card, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl sm:rounded-3xl p-7 shadow-sm border border-[#d6e0c6] flex flex-col justify-between"
              >
                <div className="font-sans text-4xl font-bold tracking-tight text-[#1F3A2C] mb-3">
                  {card.number}
                </div>
                <p className="text-xs text-[#526658] font-sans leading-relaxed">
                  {card.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FAQ (DARK GREEN) */}
      <section className="w-full py-20 bg-[#1F3A2C] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2">
            <div>
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#c7af75]">
                FREQUENTLY ASKED QUESTIONS
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl text-white font-normal mt-1">
                FAQ
              </h2>
            </div>
            <p className="text-sm text-[#cfded5] font-sans max-w-md">
              Find answers to the questions we hear most about investing, wealth planning, and your financial journey.
            </p>
          </div>

          <div className="space-y-3 max-w-5xl">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white text-[#1F3A2C] rounded-2xl overflow-hidden shadow-sm transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 font-serif text-xl font-semibold text-[#1F3A2C] hover:text-emerald-800"
                  >
                    <div className="flex items-center gap-3">
                      <FigmaTickBadge className="w-8 h-8" iconSize="w-4 h-4" />
                      <span>{faq.q}</span>
                    </div>
                    <ChevronDownIcon
                      className={`w-4 h-4 text-gray-500 transition-transform duration-200 shrink-0 ${
                        isOpen ? "rotate-180 text-[#1F3A2C]" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-[#526658] font-sans leading-relaxed pl-13">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. START YOUR JOURNEY (EXACTLY MATCHING FIGMA SCREENSHOT 3) */}
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
                START YOUR JOURNEY
              </span>

              {/* Exact two-line typography matching screenshot 3: Cormorant Garamond 600 Italic */}
              <h2 className="font-serif font-normal text-3xl sm:text-4xl lg:text-5xl leading-tight">
                <span className="text-[#1F3A2C] block">Your future deserves</span>
                <span className="font-cormorant italic font-semibold text-[#8fa868] block">a plan of its own.</span>
              </h2>

              <p className="text-xs sm:text-sm text-[#5d7064] font-sans max-w-lg mx-auto">
                Let&apos;s build a financial strategy around your goals, your responsibilities and your future.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-7">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#1F3A2C] hover:bg-[#172e23] text-white text-xs font-semibold transition-colors shadow-md group"
                >
                  <span>Talk to an Expert</span>
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
