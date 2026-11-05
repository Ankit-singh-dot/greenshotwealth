"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckIcon, FigmaTickBadge, ArrowRightIcon, ArrowUpRightIcon } from "@/components/Icons";

export default function OurApproachPage() {
  return (
    <div className="w-full flex flex-col bg-[#F5F1E8]">
      {/* 1. HERO (MATCHING FIGMA SCREENSHOT 1) */}
      <section className="w-full bg-[#1F3A2C] text-white pt-20 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header text */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#c7af75]">
              OUR APPROACH
            </span>
            <h1 className="font-editorial-heading text-white text-center">
              <span>Money is not the goal.</span> <br />
              <span>The life it </span>
              <span className="text-[#8fa868]">helps you build is.</span>
            </h1>
            <p className="text-sm sm:text-base text-[#cfded5] font-sans leading-relaxed max-w-xl mx-auto">
              We help you make clear decisions today, so your future feels calm, not uncertain.
            </p>
          </div>

          {/* Serene Architectural Reflecting Pool Hero Image */}
          <div className="relative w-full h-80 sm:h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-white/10">
            <Image
              src="/images/approach_hero_serene.jpg"
              alt="Serene reflecting pool and architecture"
              fill
              priority
              className="object-cover object-center"
            />
          </div>
        </div>
      </section>

      {/* 2. THE ETHOS JOURNEY (MATCHING FIGMA SCREENSHOT 1) */}
      <section className="w-full py-20 bg-[#EEF0D9] border-b border-[#dbe4ca]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="space-y-2">
            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#73885c]">
              OUR BELIEF
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl text-[#1F3A2C] font-normal leading-tight">
              The Ethos <span className="italic text-[#4a6344]">Journey</span>
            </h2>
          </div>

          {/* 4 Cards (2x2 Grid) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {/* Card 1: The Client at the Centre */}
            <div className="bg-white rounded-3xl p-8 border border-[#d6e0c6] shadow-sm flex flex-col justify-between">
              <div>
                <div className="border-b border-[#e5edd8] pb-4 mb-5">
                  <h3 className="font-serif italic text-2xl sm:text-3xl font-normal text-[#1F3A2C]">
                    The Client at the Centre
                  </h3>
                  <p className="text-xs text-[#6e8275] font-sans mt-1">
                    Your goals, your focus.
                  </p>
                </div>

                <div className="space-y-4">
                  {[
                    { num: "01", text: "Client First. Only." },
                    { num: "02", text: "We Tell You the Market Truth" },
                    { num: "03", text: "We Choose Our Clients, With Care" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3.5">
                      <span className="w-7 h-7 rounded-full bg-[#f3ebd7] text-[#91763e] text-xs font-semibold flex items-center justify-center shrink-0">
                        {item.num}
                      </span>
                      <span className="font-serif italic text-lg sm:text-xl text-[#1F3A2C]">
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Card 2: Patience and Perspective */}
            <div className="bg-white rounded-3xl p-8 border border-[#d6e0c6] shadow-sm flex flex-col justify-between">
              <div>
                <div className="border-b border-[#e5edd8] pb-4 mb-5">
                  <h3 className="font-serif italic text-2xl sm:text-3xl font-normal text-[#1F3A2C]">
                    Patience and Perspective
                  </h3>
                  <p className="text-xs text-[#6e8275] font-sans mt-1">
                    Longer horizons. Greater possibilities.
                  </p>
                </div>

                <div className="space-y-4">
                  {[
                    { num: "01", text: "Long-Term, Goal-Based Planning" },
                    { num: "02", text: "Markets Fluctuate. Our Discipline Does Not." },
                    { num: "03", text: "Quality Over Quantity" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3.5">
                      <span className="w-7 h-7 rounded-full bg-[#f3ebd7] text-[#91763e] text-xs font-semibold flex items-center justify-center shrink-0">
                        {item.num}
                      </span>
                      <span className="font-serif italic text-lg sm:text-xl text-[#1F3A2C]">
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Card 3: Integrity in Every Decision */}
            <div className="bg-white rounded-3xl p-8 border border-[#d6e0c6] shadow-sm flex flex-col justify-between">
              <div>
                <div className="border-b border-[#e5edd8] pb-4 mb-5">
                  <h3 className="font-serif italic text-2xl sm:text-3xl font-normal text-[#1F3A2C]">
                    Integrity in Every Decision
                  </h3>
                  <p className="text-xs text-[#6e8275] font-sans mt-1">
                    Doing what&apos;s right. Always.
                  </p>
                </div>

                <div className="space-y-4">
                  {[
                    { num: "01", text: "No Shortcuts" },
                    { num: "02", text: "We Promise Only What We Can Deliver" },
                    { num: "03", text: "Integrity First, in Holistic Planning" },
                    { num: "04", text: "We Believe in Ethical Investing" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3.5">
                      <span className="w-7 h-7 rounded-full bg-[#f3ebd7] text-[#91763e] text-xs font-semibold flex items-center justify-center shrink-0">
                        {item.num}
                      </span>
                      <span className="font-serif italic text-lg sm:text-xl text-[#1F3A2C]">
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Card 4: Purpose Beyond Returns */}
            <div className="bg-white rounded-3xl p-8 border border-[#d6e0c6] shadow-sm flex flex-col justify-between">
              <div>
                <div className="border-b border-[#e5edd8] pb-4 mb-5">
                  <h3 className="font-serif italic text-2xl sm:text-3xl font-normal text-[#1F3A2C]">
                    Purpose Beyond Returns
                  </h3>
                  <p className="text-xs text-[#6e8275] font-sans mt-1">
                    More than wealth. A better tomorrow.
                  </p>
                </div>

                <div className="space-y-4">
                  {[
                    { num: "01", text: "We Exist to Transform Lives" },
                    { num: "02", text: "Your Trusted Financial Partner" },
                    { num: "03", text: "We Grow Together: Founder & Team" },
                    { num: "04", text: "Be Good. Do Good." },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3.5">
                      <span className="w-7 h-7 rounded-full bg-[#f3ebd7] text-[#91763e] text-xs font-semibold flex items-center justify-center shrink-0">
                        {item.num}
                      </span>
                      <span className="font-serif italic text-lg sm:text-xl text-[#1F3A2C]">
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WHY WE EXIST (DARK GREEN SECTION) - CENTERED ALIGNMENT MATCHING FIGMA IMAGE 4 */}
      <section className="w-full py-20 bg-[#1F3A2C] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#c7af75] block">
              WHY WE EXIST
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-[56px] text-white font-normal leading-[1.14]">
              Your money needs more <br />
              than a <span className="italic text-[#8fa868]">one-time plan.</span>
            </h2>
            <p className="text-sm sm:text-base text-[#cfded5] font-sans leading-relaxed max-w-2xl mx-auto mt-3">
              Life keeps changing, and your plan should change with it. At GSW we connect your goals, investment and protections, and stay beside you at every stage.
            </p>
          </div>

          {/* 3 White Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                title: "Clarity",
                desc: "Understand your financial position and the decisions ahead.",
              },
              {
                title: "Purpose",
                desc: "Connect financial choices to the goals that matter to you.",
              },
              {
                title: "Continuity",
                desc: "Review and refine your strategy as your circumstances change.",
              },
            ].map((card, idx) => (
              <div
                key={idx}
                className="bg-white text-[#1F3A2C] rounded-3xl p-7 sm:p-8 shadow-sm flex flex-col justify-between text-left border border-[#ded8cb]/40"
              >
                <div>
                  <div className="w-9 h-9 rounded-full bg-[#edf4e8] border border-[#d2e2cc] flex items-center justify-center text-[#4a6b46] mb-6">
                    <svg className="w-4 h-4 text-[#4a6b46]" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="font-serif italic text-2xl font-normal text-[#1F3A2C] mb-2.5">
                    {card.title}
                  </h3>
                  <p className="text-xs text-[#526658] font-sans leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. THE GREEN SHOOTS PHILOSOPHY: LIKE A TREE... (IMPROVISED MATCHING FIGMA IMAGE 3) */}
      <section className="w-full py-20 sm:py-24 bg-[#F5F1E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Heading & Description & Stages */}
            <div className="lg:col-span-8 space-y-6">
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#bda15f] block">
                THE GREEN SHOOTS PHILOSOPHY
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-[54px] text-[#1F3A2C] font-normal leading-[1.15]">
                Like a tree, wealth needs <br />
                strong roots <span className="italic text-[#7a9a75]">before it can grow.</span>
              </h2>
              <p className="text-xs sm:text-sm text-[#5d7064] font-sans leading-relaxed max-w-xl">
                Lasting growth begins beneath the surface. We believe a thoughtful financial strategy is built through understanding, a clear direction, informed decisions, and regular care.
              </p>

              {/* 4 Stages Stepper List (Editorial Typography matching Image 3) */}
              <div className="pt-6 space-y-7 border-l border-dashed border-[#bda15f]/40 pl-6 sm:pl-8">
                <div>
                  <h4 className="font-serif italic text-lg sm:text-xl text-[#3b5243] font-normal">
                    — Understand (Seed Stage)
                  </h4>
                  <p className="text-xs text-[#6e8275] font-sans mt-1 leading-relaxed">
                    Know where you stand — We begin by understanding your goals, priorities, existing financial position, and time horizon.
                  </p>
                </div>

                <div>
                  <h4 className="font-serif italic text-lg sm:text-xl text-[#3b5243] font-normal">
                    — Plan (Roots Stage)
                  </h4>
                  <p className="text-xs text-[#6e8275] font-sans mt-1 leading-relaxed">
                    Give your goals a direction — We organise your priorities and develop a structured strategy aligned with your needs, preferences, and time horizon.
                  </p>
                </div>

                <div>
                  <h4 className="font-serif italic text-lg sm:text-xl text-[#3b5243] font-normal">
                    — Invest (Growth Stage)
                  </h4>
                  <p className="text-xs text-[#6e8275] font-sans mt-1 leading-relaxed">
                    Put your strategy into action — We help you explore investment decisions suited to your objectives, risk profile, and long-term plan.
                  </p>
                </div>

                <div className="pt-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-[2px] bg-[#c79a4b]" />
                    <h4 className="font-serif italic text-xl sm:text-2xl text-[#1F3A2C] font-medium">
                      Review (Forest Stage)
                    </h4>
                  </div>
                  <p className="text-xs text-[#526658] font-sans mt-1.5 leading-relaxed pl-11">
                    <span className="text-[#b58832] font-medium">Stay aligned as life changes —</span> We revisit your goals and financial strategy to help keep your decisions relevant as your circumstances evolve.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Architectural Divider Line matching Image 3 */}
            <div className="lg:col-span-4 hidden lg:flex flex-col justify-end h-full pt-64">
              <div className="w-full border-b border-[#ded8cb]" />
            </div>
          </div>
        </div>
      </section>

      {/* 5. THE GREEN SHOOTS FRAMEWORK (MATCHING FIGMA IMAGE 2 WITH CURVED INNER IMAGES) */}
      <section className="w-full py-20 bg-[#EEF0D9] border-y border-[#dbe4ca]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="space-y-2">
            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#73885c]">
              OUR METHOD
            </span>
            <h2 className="font-serif italic text-3xl sm:text-4xl lg:text-5xl font-normal tracking-[0.06em]">
              <span className="text-[#1F3A2C]">THE GREEN SHOOTS</span>{" "}
              <span className="text-[#7a9a75]">FRAMEWORK</span>
            </h2>
          </div>

          {/* 4 Inset Cards with Curved Rounded Image Containers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                num: "01",
                img: "/images/framework_understand.jpg",
                title: "Understand",
                desc: "Start with your goals, current position, priorities, and financial concerns.",
              },
              {
                num: "02",
                img: "/images/framework_plan.jpg",
                title: "Plan",
                desc: "Create a practical direction that connects your financial decisions to your goals.",
              },
              {
                num: "03",
                img: "/images/framework_invest.jpg",
                title: "Invest",
                desc: "Explore investment choices that align with your strategy, risk profile, and objectives.",
              },
              {
                num: "04",
                img: "/images/framework_review.jpg",
                title: "Review",
                desc: "Revisit your progress and consider adjustments as your goals or circumstances change.",
              },
            ].map((card, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-5 sm:p-6 shadow-xs border border-[#ded8cb]/80 hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  {/* Step Number in Serif Italic */}
                  <div className="font-serif italic text-lg sm:text-xl text-[#1F3A2C] font-normal mb-3.5">
                    {card.num}
                  </div>

                  {/* Inner Curved / Rounded Image Container */}
                  <div className="relative h-44 sm:h-48 w-full rounded-2xl overflow-hidden mb-5 bg-[#f0ede6] shadow-xs">
                    <Image
                      src={card.img}
                      alt={card.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Title & Desc */}
                  <h3 className="font-serif italic text-2xl sm:text-[26px] font-normal text-[#1F3A2C] mb-2 leading-tight">
                    {card.title}
                  </h3>
                  <p className="text-xs text-[#5d7064] font-sans leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. WHEREVER YOU ARE IN YOUR JOURNEY (MATCHING FIGMA SCREENSHOT 2) */}
      <section className="w-full py-20 bg-[#F5F1E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="max-w-2xl space-y-2">
            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#bda15f]">
              WHO WE HELP
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl text-[#1F3A2C] font-normal leading-tight">
              Wherever you are <br />
              in your <span className="italic text-[#8fa868]">journey.</span>
            </h2>
          </div>

          {/* 6 Cards (3x2 Grid) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                title: "Early Investors",
                desc: "Start well. Build a strong base with simple, goal-based choices.",
              },
              {
                title: "Working Professionals",
                desc: "Make your income work harder as your career grows.",
              },
              {
                title: "Families & Homemakers",
                desc: "Bring order to household goals, protection and future plans.",
              },
              {
                title: "NRIs",
                desc: "Stay connected to India's growth, wherever you live.",
              },
              {
                title: "Pre-Retirees",
                desc: "Get ready for the next chapter with confidence.",
              },
              {
                title: "Senior Citizens",
                desc: "Protect what you've built and plan for steady, worry-free years.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 shadow-xs border border-[#eae4d7]/70 hover:shadow-md transition-all flex items-start justify-between gap-4 group"
              >
                <div className="flex items-start gap-4">
                  <FigmaTickBadge className="w-10 h-10 mt-0.5" />
                  <div>
                    <h3 className="font-cormorant italic text-2xl sm:text-[26px] font-normal text-[#1F3A2C] leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-[#55695c] font-sans leading-relaxed mt-1">
                      {item.desc}
                    </p>
                  </div>
                </div>
                <ArrowUpRightIcon className="w-4 h-4 text-[#52704e] opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-1" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. A STRATEGY THAT GROWS WITH YOU (MATCHING FIGMA SCREENSHOT 3) */}
      <section className="w-full py-20 bg-[#1F3A2C] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Top header flex */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-4">
            <div className="space-y-3 max-w-xl">
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#c7af75]">
                OUR PROMISE
              </span>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white font-normal leading-[1.12]">
                A strategy that <br />
                grows with <span className="italic text-[#8fa868]">you.</span>
              </h2>
              <div className="w-16 h-1 bg-[#c5a963] rounded-full mt-2" />
            </div>

            <p className="text-sm sm:text-base text-[#cfded5] font-sans leading-relaxed max-w-md">
              Your financial life can change over time. We aim to keep your strategy connected to your goals, your priorities, and the decisions that matter along the way.
            </p>
          </div>

          {/* 3 White Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Clarity",
                desc: "Understand where you are, where you're going and why each decision matters.",
              },
              {
                title: "Discipline",
                desc: "Stay focused on your long-term plan rather than short-term market noise.",
              },
              {
                title: "Continuity",
                desc: "Plan for your down payment and future EMIs.",
              },
            ].map((card, idx) => (
              <div
                key={idx}
                className="bg-white text-[#1F3A2C] rounded-2xl sm:rounded-3xl p-6 sm:p-7 shadow-xs border border-[#eae4d7]/70 flex items-start gap-4 hover:shadow-md transition-all"
              >
                <FigmaTickBadge className="w-10 h-10 mt-0.5" />
                <div>
                  <h3 className="font-cormorant italic text-2xl font-normal text-[#1F3A2C] leading-snug">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-[#55695c] font-sans leading-relaxed mt-1">
                    {card.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CTA CARD: BETTER DECISIONS BEGIN WITH A CLEAR PLAN (MATCHING FIGMA IMAGE 1) */}
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
                INVEST NOW
              </span>

              {/* Exact typography matching Image 1: Cormorant Garamond 600 Italic */}
              <h2 className="font-serif font-normal text-3xl sm:text-4xl lg:text-5xl leading-[1.18]">
                <span className="text-[#1F3A2C]">Better decisions begin with a</span> <br />
                <span className="font-cormorant italic font-semibold text-[#8fa868]">clear plan.</span>
              </h2>

              <p className="text-xs sm:text-sm text-[#5d7064] font-sans max-w-lg mx-auto leading-relaxed pt-1">
                Whether you&apos;re starting your first SIP, building a multi-crore portfolio, preparing for retirement or planning your family&apos;s future, let&apos;s create a strategy built around where you want to go.
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-7">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#1F3A2C] hover:bg-[#172e23] text-white text-xs font-semibold transition-colors shadow-md group"
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
