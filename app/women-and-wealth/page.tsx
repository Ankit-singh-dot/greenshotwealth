"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FigmaTickBadge, ChevronDownIcon } from "@/components/Icons";
import { IconArrow, IconArrowUpRight } from "@/components/LineIcons";
import { Reveal, RevealLines, ScrollWords, CountUp, useInView } from "@/components/motion/primitives";

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

const LONGEVITY_STATS = [
  { to: 5, prefix: "≈", suffix: " years", label: "How much longer women live than men, on average, across the world." },
  { to: 74.4, decimals: 1, suffix: " years", label: "Average life expectancy for women." },
  { to: 71.2, decimals: 1, suffix: " years", label: "Average life expectancy for men." },
  { to: 73, prefix: "₹", suffix: " lakh cr", label: "Wealth expected to pass into women's hands in India over the next decade." },
];

const QUIET_QUESTIONS = [
  "Where is our money actually kept?",
  "Which policies do we hold — and how do I claim them?",
  "What are the passwords, the papers, the nominees?",
  "Who can I trust to tell me what to do next?",
];

const TWO_FUTURES = {
  dependent: [
    "Searches for papers, passwords and policies — while grieving.",
    "Relies on relatives or agents whose advice she can't question.",
    "Makes rushed decisions about a lump sum she never planned for.",
    "Feels like a guest in her own financial life.",
  ],
  prepared: [
    "Knows what the family owns, where it is, and why.",
    "Claims insurance and transfers assets calmly, step by step.",
    "Makes decisions on her own timeline, with advice she understands.",
    "Shows her children what independence looks like.",
  ],
};

const WIDOW_STATS = [
  {
    to: 258,
    suffix: "M+",
    label: "Women worldwide navigating life after the loss of a spouse.",
  },
  {
    to: 585,
    suffix: "M",
    label: "Children worldwide dependent on widowed mothers for their future and security.",
  },
  {
    to: 38,
    suffix: "M+",
    label: "Widowed women globally pushed into extreme poverty with zero financial safety net.",
  },
  {
    to: 42,
    suffix: "M",
    label: "Women in India living through widowhood — the largest community worldwide.",
  },
];

const WEALTH_ARRIVES = [
  { title: "Life Insurance", desc: "A payout arrives at the hardest moment. We help you pause, protect it and put it to work — without pressure." },
  { title: "Inheritance", desc: "Create a thoughtful plan for newly inherited wealth and assets, so it honours the person who left it." },
  { title: "Existing Wealth", desc: "Bring scattered investments, accounts and paperwork into one clear picture you fully understand." },
  { title: "Family Wealth", desc: "Prepare for the responsibilities of managing family wealth — and passing it on well." },
];

const LEARNING_PATH = [
  { img: "/images/understand_card.jpg", title: "Understand", desc: "Know what you own, why you own it and what it is meant to achieve." },
  { img: "/images/plan_card.jpg", title: "Plan", desc: "Make sure your health, family and financial future are adequately protected." },
  { img: "/images/invest_card.jpg", title: "Invest", desc: "Build and manage wealth around your own goals and time horizon." },
  { img: "/images/plan_ahead_card.jpg", title: "Plan Ahead", desc: "Prepare for retirement, succession and the years ahead — on your terms." },
];

const SELF_CHECK = [
  "I know every bank account, investment and policy our family holds.",
  "I can log in to our accounts and find important documents without help.",
  "I know who the nominees are — and that the details are up to date.",
  "I know how much our household needs each month to live comfortably.",
  "If I had to make a big money decision alone tomorrow, I'd know where to begin.",
];

const SERVICES = [
  { title: "Investment Planning", desc: "Build and manage investments around your goals, risk and time horizon." },
  { title: "Retirement Planning", desc: "Prepare for financial independence and a longer, more secure retirement." },
  { title: "Insurance Planning", desc: "Protect your health, income, family and financial future." },
  { title: "Estate & Succession Planning", desc: "Plan how your wealth should be managed and passed on." },
  { title: "Portfolio Review", desc: "Bring clarity to existing investments and see where your strategy needs attention." },
];

const FAQS = [
  {
    q: "Why is financial planning particularly important for women?",
    a: "Women generally live longer and may spend more years managing their own financial needs — often alone. A clear plan prepares you for retirement, protection and long-term wealth management, so those years are lived with confidence rather than uncertainty.",
  },
  {
    q: "My husband handles our money. Why should I get involved?",
    a: "Being involved isn't about distrust — it's about partnership. When both of you understand the plan, either of you can carry it forward, whatever life brings. Many couples tell us these conversations bring them closer.",
  },
  {
    q: "What should I do if I receive an inheritance or insurance payout?",
    a: "First, give yourself time. Then start by understanding the amount, your existing financial position, your goals and your liquidity needs before making any major investment decisions. You don't have to decide everything at once.",
  },
  {
    q: "I don't know much about investing. Can you still help me?",
    a: "Yes — that's exactly where many of our clients begin. Financial planning starts with understanding your situation and goals, not with how much you already know. We explain everything in plain language, at your pace.",
  },
  {
    q: "Can I review my existing investments with you?",
    a: "Yes. A portfolio review helps you understand what you already hold and whether it still fits your goals and risk profile.",
  },
];

/* ------------------------------------------------------------------ */
/* Longevity bars — a simple, honest 0–80 year scale                    */
/* ------------------------------------------------------------------ */

function LongevityBars() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.35 });
  const SCALE = 80;
  const women = 74.4;
  const men = 71.2;
  return (
    <div ref={ref} className="w-full" role="img" aria-label={`Average life expectancy: women ${women} years, men ${men} years — a gap of ${(women - men).toFixed(1)} years.`}>
      {[
        { label: "Women", value: women, color: "bg-[#c5a963]" },
        { label: "Men", value: men, color: "bg-[#F5F1E8]/35" },
      ].map((row, i) => (
        <div key={row.label} className="mb-5 last:mb-0">
          <div className="flex items-baseline justify-between mb-2">
            <span className="gs-index uppercase text-[#cfded5]">{row.label}</span>
            <span className="font-cormorant text-2xl text-[#F5F1E8] tabular-nums">{row.value} yrs</span>
          </div>
          <div className="relative h-3 rounded-full bg-white/8 overflow-hidden">
            <div
              className={`absolute inset-y-0 left-0 rounded-full ${row.color} transition-[width] duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)]`}
              style={{ width: inView ? `${(row.value / SCALE) * 100}%` : "0%", transitionDelay: `${i * 180}ms` }}
            />
            {i === 0 && (
              /* the extra years, picked out once both bars have landed */
              <div
                aria-hidden
                className="absolute inset-y-0 rounded-r-full bg-[#f3dfa6] transition-opacity duration-700 delay-[1600ms]"
                style={{ left: `${(men / SCALE) * 100}%`, width: `${((women - men) / SCALE) * 100}%`, opacity: inView ? 1 : 0 }}
              />
            )}
          </div>
        </div>
      ))}
      <p className={`mt-6 text-sm text-[#cfded5] transition-opacity duration-700 delay-[1700ms] ${inView ? "opacity-100" : "opacity-0"}`}>
        <span className="text-[#c5a963] font-semibold">+{(women - men).toFixed(1)} years</span> on average — and for many women, far more. Often, those are years spent managing alone.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Self-check — five questions every woman should be able to answer    */
/* ------------------------------------------------------------------ */

function SelfCheck() {
  const [checked, setChecked] = useState<boolean[]>(() => SELF_CHECK.map(() => false));
  const count = checked.filter(Boolean).length;
  const toggle = (i: number) => setChecked((c) => c.map((v, j) => (j === i ? !v : v)));

  const verdict =
    count === SELF_CHECK.length
      ? { title: "You're in control.", body: "Wonderful. A periodic review will keep it that way as life changes." }
      : count >= 3
        ? { title: "You're well on your way.", body: `${SELF_CHECK.length - count} gap${SELF_CHECK.length - count > 1 ? "s" : ""} left to close — that's a single conversation, not a mountain.` }
        : { title: "Every “not yet” is where we begin.", body: "You're not behind. Most women we meet start exactly here — and leave the first conversation feeling lighter." };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
      <ul className="lg:col-span-7 space-y-3">
        {SELF_CHECK.map((q, i) => (
          <li key={q}>
            <button
              type="button"
              onClick={() => toggle(i)}
              aria-pressed={checked[i]}
              className={`w-full text-left flex items-start gap-4 rounded-2xl border p-5 transition-all duration-300 ${checked[i] ? "bg-[#1F3A2C] border-[#1F3A2C] text-[#F5F1E8]" : "bg-white border-[#eae4d7] text-[#1F3A2C] hover:border-[#c5a963]"
                }`}
            >
              <span
                aria-hidden
                className={`mt-0.5 grid place-items-center w-6 h-6 shrink-0 rounded-full border transition-colors ${checked[i] ? "bg-[#c5a963] border-[#c5a963] text-[#1F3A2C]" : "border-[#1F3A2C]/30"
                  }`}
              >
                {checked[i] && (
                  <svg viewBox="0 0 12 12" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M2.5 6.2l2.3 2.3 4.7-4.9" />
                  </svg>
                )}
              </span>
              <span className="text-sm sm:text-[15px] leading-relaxed">{q}</span>
            </button>
          </li>
        ))}
      </ul>

      <div className="lg:col-span-5 lg:sticky lg:top-[calc(var(--nav-h)+40px)] rounded-3xl bg-white border border-[#eae4d7] p-7 sm:p-8" aria-live="polite">
        <span className="gs-index uppercase text-[#bda15f]">Your answers</span>
        <div className="flex items-baseline gap-2 mt-3">
          <span className="font-cormorant text-6xl text-[#1F3A2C] tabular-nums leading-none">{count}</span>
          <span className="font-cormorant text-2xl text-[#5d7064]">/ {SELF_CHECK.length}</span>
        </div>
        <div className="flex gap-1.5 mt-5" aria-hidden>
          {SELF_CHECK.map((_, i) => (
            <span key={i} className={`h-1.5 flex-1 rounded-full transition-colors duration-500 ${i < count ? "bg-[#c5a963]" : "bg-[#1F3A2C]/10"}`} />
          ))}
        </div>
        <p key={verdict.title} className="font-cormorant italic text-[1.7rem] leading-tight text-[#1F3A2C] mt-6 stage-in">{verdict.title}</p>
        <p className="text-sm text-[#5d7064] leading-relaxed mt-2">{verdict.body}</p>
        <Link href="/contact" className="gs-btn gs-btn-dark !pr-2.5 mt-7">
          <span>Close the gaps with us</span>
          <span className="gs-btn-arrow"><IconArrow className="w-3.5 h-3.5" /></span>
        </Link>
        <p className="text-[11px] text-[#5d7064]/80 mt-4">Your answers stay on this page — nothing is saved or sent.</p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function WomenAndWealthPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="w-full flex flex-col bg-[#F5F1E8] text-[#1F3A2C]" data-motion-managed>
      {/* 1. HERO ------------------------------------------------------ */}
      <section className="relative w-full min-h-[100svh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/images/women_hero_authentic.jpg" alt="A poised, sovereign Indian woman overlooking the city at morning light" fill priority sizes="100vw" className="object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-black/85" />
          <div className="absolute inset-0 bg-[#0f241a]/40 mix-blend-multiply" />
        </div>

        <div className="relative z-10 gs-container py-32 text-white text-center flex flex-col items-center">
          <Reveal variant="fade"><span className="gs-eyebrow text-[#c7af75]">Women &amp; Wealth</span></Reveal>

          <RevealLines
            as="h1"
            className="gs-h1 text-white mt-7 max-w-4xl"
            delay={150}
            lines={[<>She plans for everyone.</>, <em key="b" className="text-[#a9c08a]">Who plans for her?</em>]}
          />

          <Reveal delay={500} className="max-w-2xl mx-auto mt-8">
            <p className="gs-lead text-[#dce7e0]">
              Women live longer than men — often by years. That means many of us will, one day, manage a family&apos;s finances alone.
              Knowing how should never depend on someone else.
            </p>
          </Reveal>

          <Reveal delay={700} className="pt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <Link href="/contact" className="gs-btn gs-btn-light !pr-2.5">
              <span>Talk to an expert</span>
              <span className="gs-btn-arrow"><IconArrow className="w-3.5 h-3.5" /></span>
            </Link>
            <a href="#self-check" className="gs-btn gs-btn-ghost on-dark text-white">
              <span>Take the 2-minute self-check</span>
            </a>
          </Reveal>
        </div>

        <div className="absolute bottom-8 inset-x-0 z-10 flex justify-center" aria-hidden>
          <span className="block w-px h-12 bg-gradient-to-b from-transparent via-white/50 to-transparent" />
        </div>
      </section>

      {/* 2. THE LONGER VIEW ------------------------------------------ */}
      <section className="w-full py-24 sm:py-32 bg-[#1F3A2C] text-white">
        <div className="gs-container space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <Reveal variant="fade"><span className="gs-eyebrow text-[#c7af75]">The longer view</span></Reveal>
              <RevealLines
                as="h2"
                className="gs-h2 text-white"
                lines={[<>A longer life is a gift.</>, <em key="b" className="text-[#a9c08a]">It also needs a longer plan.</em>]}
              />
              <Reveal delay={200}>
                <p className="gs-lead text-[#cfded5] max-w-xl">
                  More years means more decisions, more responsibility — and, for many women, a chapter of life where every financial choice is hers alone to make.
                </p>
              </Reveal>
              <Reveal delay={300} className="pt-4 max-w-xl">
                <LongevityBars />
              </Reveal>
            </div>

            <Reveal variant="clip" className="lg:col-span-5 relative h-80 sm:h-[30rem] rounded-[28px] overflow-hidden border border-white/10">
              <Image src="/a_longer_life.jpg" alt="A woman reflecting on her financial future" fill sizes="(min-width:1024px) 40vw, 100vw" className="object-cover object-center" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f16]/80 via-transparent to-transparent" />
              <p className="absolute inset-x-0 bottom-0 p-6 sm:p-8 font-cormorant italic text-[1.5rem] sm:text-[1.8rem] leading-snug text-[#F5F1E8]">
                &ldquo;Planning for those years isn&apos;t pessimism. It&apos;s love — and it&apos;s freedom.&rdquo;
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {LONGEVITY_STATS.map((s, i) => (
              <Reveal key={s.label} delay={i * 90} className="rounded-3xl border border-white/12 bg-white/[0.04] p-6 sm:p-7">
                <span className="gs-index text-[#c5a963]">0{i + 1}</span>
                <div className="font-cormorant font-normal text-[2.6rem] sm:text-[3rem] leading-none text-[#F5F1E8] mt-3 lining-nums tabular-nums tracking-[-0.02em]">
                  <CountUp to={s.to} decimals={s.decimals ?? 0} prefix={s.prefix ?? ""} suffix={s.suffix} duration={2000} />
                </div>
                <p className="text-[13px] text-[#cfded5] leading-relaxed mt-4 font-sans">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3. THE MOMENT ------------------------------------------------ */}
      <section className="w-full bg-[#F5F1E8] pt-24 sm:pt-32 pb-16" aria-label="The moment everything changes">
        <div className="gs-container grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-2">
            <Reveal variant="fade"><span className="gs-eyebrow text-[#bda15f]">The moment</span></Reveal>
          </div>
          <div className="lg:col-span-10">
            <ScrollWords
              className="font-cormorant text-[clamp(2rem,4.6vw,4.4rem)] leading-[1.08] tracking-[-0.02em] text-[#1F3A2C]"
              text="The hardest day of her life should never also be the first day she *sees* the family's finances."
            />
          </div>
        </div>

        <div className="gs-container mt-20 sm:mt-28 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <Reveal variant="clip" className="lg:col-span-5 relative aspect-[4/5] rounded-[28px] overflow-hidden border border-[#1F3A2C]/10 shadow-xl bg-white">
            <Image
              src="/office_image2/office_6.webp"
              alt="Green Shoots Wealth printed Women & Wealth reflection questionnaire and family goal leaf card"
              fill
              sizes="(min-width:1024px) 42vw, 100vw"
              className="object-cover object-center"
            />
          </Reveal>
          <div className="lg:col-span-7">
            <Reveal>
              <p className="gs-lead text-[#5d7064] max-w-2xl">
                When a husband passes away, or a marriage ends, the questions arrive all at once — usually when she is least able to face them:
              </p>
            </Reveal>
            <ul className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-x-10">
              {QUIET_QUESTIONS.map((q, i) => (
                <Reveal as="li" key={q} delay={i * 110} className="flex items-baseline gap-5 py-5 border-t border-[#1F3A2C]/12">
                  <span className="gs-index text-[#bda15f]">0{i + 1}</span>
                  <span className="font-cormorant italic text-[1.5rem] sm:text-[1.75rem] leading-snug text-[#1F3A2C]">{q}</span>
                </Reveal>
              ))}
            </ul>
            <Reveal delay={300} className="mt-12">
              <p className="font-cormorant text-[1.6rem] sm:text-[2rem] leading-snug text-[#1F3A2C] max-w-3xl">
                Too often, the only answer is: <em className="text-[#8fa868]">&ldquo;I&apos;ll have to ask someone.&rdquo;</em>
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 4. TWO FUTURES ---------------------------------------------- */}
      <section className="w-full bg-[#F5F1E8] pt-10 pb-24 sm:pb-32">
        <div className="gs-container">
          <div className="max-w-3xl">
            <Reveal variant="fade"><span className="gs-eyebrow text-[#bda15f]">Two futures</span></Reveal>
            <RevealLines
              as="h2"
              className="gs-h2 text-[#1F3A2C] mt-6"
              lines={[<>The same loss.</>, <em key="b" className="text-[#8fa868]">Two very different years ahead.</em>]}
            />
          </div>

          <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-7 flex flex-col gap-5">
              <Reveal variant="left" className="rounded-[28px] border border-[#1F3A2C]/12 bg-[#ebe5d8]/60 p-7 sm:p-9 flex-1">
                <span className="gs-index uppercase text-[#5d7064]">When she depends on others</span>
                <ul className="mt-6 space-y-4">
                  {TWO_FUTURES.dependent.map((t) => (
                    <li key={t} className="flex items-start gap-4 text-[#5d7064]">
                      <span aria-hidden className="mt-[0.55rem] w-3 h-px bg-[#5d7064]/60 shrink-0" />
                      <span className="text-[14px] sm:text-[15px] leading-relaxed">{t}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal variant="left" delay={150} className="rounded-[28px] bg-[#1F3A2C] text-[#F5F1E8] p-7 sm:p-9 shadow-[0_30px_60px_-30px_rgba(13,31,22,0.55)] flex-1">
                <span className="gs-index uppercase text-[#c5a963]">When she understands</span>
                <ul className="mt-6 space-y-4">
                  {TWO_FUTURES.prepared.map((t) => (
                    <li key={t} className="flex items-start gap-4">
                      <span aria-hidden className="mt-1 grid place-items-center w-5 h-5 rounded-full bg-[#c5a963] text-[#1F3A2C] shrink-0">
                        <svg viewBox="0 0 12 12" className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth="2.2">
                          <path d="M2.5 6.2l2.3 2.3 4.7-4.9" />
                        </svg>
                      </span>
                      <span className="text-[14px] sm:text-[15px] leading-relaxed">{t}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            <Reveal variant="right" delay={200} className="lg:col-span-5 relative min-h-[360px] sm:min-h-[460px] rounded-[28px] overflow-hidden border border-[#1F3A2C]/12 shadow-xl">
              <Image
                src="/images/women_moment_clarity.jpg"
                alt="An Indian woman holding family documents with quiet confidence and peace of mind"
                fill
                sizes="(min-width:1024px) 40vw, 100vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#132A1F]/90 via-[#132A1F]/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1.5">
                <span className="text-[10px] font-mono tracking-widest text-[#c5a963] uppercase block">THE QUIET RESOLUTION</span>
                <p className="font-cormorant italic text-xl sm:text-2xl text-[#F5F1E8] leading-snug">
                  &ldquo;A woman who understands her money is never stranded by circumstance.&rdquo;
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={200} className="mt-12 text-center">
            <p className="font-cormorant italic text-[1.6rem] sm:text-[2.1rem] leading-snug text-[#1F3A2C] max-w-3xl mx-auto">
              The difference isn&apos;t money. <span className="text-[#8fa868]">It&apos;s knowing.</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* 5. THE FINANCIAL REALITY ------------------------------------ */}
      <section className="w-full py-24 sm:py-32 bg-[#EEF0D9] border-y border-[#dbe4ca]">
        <div className="gs-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-7">
              <Reveal variant="fade"><span className="gs-eyebrow text-[#73885c]">The financial reality</span></Reveal>
              <RevealLines
                as="h2"
                className="gs-h2 text-[#1F3A2C] mt-6"
                lines={[<>Behind every number,</>, <em key="b" className="text-[#4a6344]">a woman who had to learn — overnight.</em>]}
              />
            </div>
            <Reveal delay={200} className="lg:col-span-5">
              <div className="font-cormorant font-normal text-[clamp(4.5rem,10vw,8rem)] leading-none text-[#1F3A2C] lining-nums tabular-nums tracking-[-0.03em]">
                <CountUp to={80} suffix="%" duration={1800} />
              </div>
              <p className="text-sm sm:text-base text-[#526658] leading-relaxed mt-3 max-w-md">
                of married women will eventually become solely responsible for their household finances — most often because they outlive their husbands.
              </p>
            </Reveal>
          </div>

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {WIDOW_STATS.map((c, i) => (
              <Reveal key={c.label} delay={i * 90} className="bg-white rounded-3xl p-7 sm:p-8 border border-[#d6e0c6] flex flex-col justify-between hover:border-[#1F3A2C]/25 transition-colors">
                <div>
                  <span className="gs-index text-[#73885c]">0{i + 1}</span>
                  <div className="font-cormorant font-normal text-[clamp(2.8rem,3.8vw,3.6rem)] leading-none text-[#1F3A2C] mt-4 lining-nums tabular-nums tracking-[-0.03em]">
                    <CountUp to={c.to} suffix={c.suffix} duration={2200} />
                  </div>
                  <p className="text-[13.5px] text-[#526658] leading-relaxed mt-4 font-sans">{c.label}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200} className="mt-12 max-w-3xl">
            <p className="gs-lead text-[#1F3A2C]">
              Widowhood is not a rare event. It is, statistically, a likely chapter in a woman&apos;s life.
              That&apos;s why financial education isn&apos;t a luxury for women — <em className="font-cormorant text-[1.2em] text-[#4a6344]">it&apos;s protection.</em>
            </p>
          </Reveal>

          {/* Data Sources & Research References */}
          <Reveal delay={250} className="mt-10 pt-6 border-t border-[#1F3A2C]/15">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 text-[12px] text-[#526658]">
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                <span className="font-semibold text-[#1F3A2C]">Data &amp; Research:</span>
                <a
                  href="https://www.theloombafoundation.org/our-work/research/world-widows-report"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-[#1F3A2C] transition-colors"
                >
                  World Widows Report (UN-presented)
                </a>
                <span className="text-[#1F3A2C]/30">·</span>
                <a
                  href="https://www.un.org/en/observances/widows-day"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-[#1F3A2C] transition-colors"
                >
                  UN Res 65/189
                </a>
                <span className="text-[#1F3A2C]/30">·</span>
                <a
                  href="https://mospi.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-[#1F3A2C] transition-colors"
                >
                  Census of India &amp; MoSPI
                </a>
                <span className="text-[#1F3A2C]/30">·</span>
                <a
                  href="https://www.ubs.com/global/en/wealth-management/women-wealth.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-[#1F3A2C] transition-colors"
                >
                  UBS Longevity &amp; Wealth Transfer Studies
                </a>
              </div>
              <p className="text-[11.5px] text-[#73885c] shrink-0">
                Independent demographic &amp; longevity records
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 6. WHEN WEALTH BECOMES YOURS -------------------------------- */}
      <section className="w-full py-24 sm:py-32 bg-[#F5F1E8]">
        <div className="gs-container">
          <div className="max-w-2xl">
            <Reveal variant="fade"><span className="gs-eyebrow text-[#bda15f]">When wealth becomes yours</span></Reveal>
            <RevealLines
              as="h2"
              className="gs-h2 text-[#1F3A2C] mt-6"
              lines={[<>What happens when the</>, <em key="b" className="text-[#6e8f66]">wealth comes to you?</em>]}
            />
            <Reveal delay={200}>
              <p className="gs-lead text-[#5d7064] mt-6">
                An inheritance, an insurance payout or a family transfer can change your financial life overnight — often at a time of loss. Knowing how to care for it matters as much as receiving it.
              </p>
            </Reveal>
          </div>

          <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <Reveal variant="left" className="lg:col-span-5 relative min-h-[380px] sm:min-h-[460px] rounded-[28px] overflow-hidden border border-[#eae4d7] shadow-xl">
              <Image
                src="/images/women_wealth_transfer.jpg"
                alt="Intergenerational family wealth transfer and inheritance in an Indian heritage courtyard"
                fill
                sizes="(min-width:1024px) 40vw, 100vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#132A1F]/90 via-[#132A1F]/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1.5">
                <span className="text-[10px] font-mono tracking-widest text-[#c5a963] uppercase block">FAMILY LEGACY</span>
                <p className="font-cormorant italic text-xl sm:text-2xl text-[#F5F1E8] leading-snug">
                  &ldquo;Passing on wealth is not just transferring assets. It is honouring family wisdom.&rdquo;
                </p>
              </div>
            </Reveal>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {WEALTH_ARRIVES.map((card, i) => (
                <Reveal key={card.title} delay={i * 80}>
                  <Link
                    href="/contact"
                    className="group h-full bg-white rounded-3xl p-6 sm:p-7 border border-[#eae4d7] hover:border-[#c5a963] hover:shadow-[0_20px_40px_-28px_rgba(13,31,22,0.4)] transition-all duration-500 flex flex-col justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <FigmaTickBadge className="w-9 h-9" />
                        <IconArrowUpRight className="w-4 h-4 text-[#52704e] opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                      </div>
                      <span className="block font-cormorant italic text-[1.5rem] sm:text-[1.65rem] text-[#1F3A2C] leading-snug">{card.title}</span>
                      <p className="text-[13px] text-[#55695c] leading-relaxed mt-2">{card.desc}</p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. EDUCATION IS INDEPENDENCE -------------------------------- */}
      <section className="w-full py-24 sm:py-32 bg-[#EEF0D9] border-y border-[#dbe4ca]">
        <div className="gs-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-14">
            <div className="lg:col-span-7">
              <Reveal variant="fade"><span className="gs-eyebrow text-[#73885c]">Education is independence</span></Reveal>
              <RevealLines
                as="h2"
                className="gs-h2 text-[#1F3A2C] mt-6"
                lines={[<>It&apos;s not only about having wealth.</>, <em key="b" className="text-[#4a6344]">It&apos;s about never having to ask permission.</em>]}
              />
              <Reveal delay={200}>
                <p className="gs-lead text-[#526658] mt-6">
                  We teach as we plan. Step by step, in plain language, until every decision feels like yours — because it is. When a woman truly understands her family&apos;s financial blueprint, she shows her children what lasting self-reliance looks like.
                </p>
              </Reveal>
            </div>

            <Reveal variant="clip" className="lg:col-span-5 relative h-72 sm:h-80 rounded-[28px] overflow-hidden border border-[#d6e0c6] shadow-md">
              <Image
                src="/images/women_intergenerational.jpg"
                alt="Indian mother and daughter discussing family finances and future roadmap over tea"
                fill
                sizes="(min-width:1024px) 40vw, 100vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1F3A2C]/80 via-transparent to-transparent" />
              <p className="absolute bottom-5 left-5 right-5 font-cormorant italic text-lg sm:text-xl text-[#F5F1E8] leading-snug">
                &ldquo;Shows her children what independence looks like.&rdquo;
              </p>
            </Reveal>
          </div>

          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {LEARNING_PATH.map((card, i) => (
              <Reveal as="li" key={card.title} delay={i * 100} className="bg-white rounded-3xl overflow-hidden border border-[#d6e0c6] flex flex-col group">
                <div className="relative h-52 w-full overflow-hidden bg-neutral-100">
                  <Image src={card.img} alt="" fill sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  <span className="absolute top-4 left-4 gs-index bg-[#F5F1E8]/90 text-[#1F3A2C] rounded-full px-3 py-1.5">Step 0{i + 1}</span>
                </div>
                <div className="p-6 flex-1">
                  <h3 className="font-cormorant text-[1.8rem] leading-tight text-[#1F3A2C]">{card.title}</h3>
                  <p className="text-[13px] text-[#526658] mt-2 leading-relaxed">{card.desc}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* 8. SELF-CHECK ------------------------------------------------ */}
      <section id="self-check" className="w-full py-24 sm:py-32 bg-[#F5F1E8] scroll-mt-24">
        <div className="gs-container">
          <div className="max-w-3xl mb-14">
            <Reveal variant="fade"><span className="gs-eyebrow text-[#bda15f]">A quiet self-check</span></Reveal>
            <RevealLines
              as="h2"
              className="gs-h2 text-[#1F3A2C] mt-6"
              lines={[<>If you had to manage alone tomorrow,</>, <em key="b" className="text-[#8fa868]">could you answer these?</em>]}
            />
            <Reveal delay={200}>
              <p className="gs-lead text-[#5d7064] mt-6">Tap each statement that is true for you today. There are no wrong answers — only a starting point.</p>
            </Reveal>
          </div>
          <SelfCheck />
        </div>
      </section>

      {/* 9. HOW WE HELP ----------------------------------------------- */}
      <section className="w-full py-24 sm:py-32 bg-[#EEF0D9] border-y border-[#dbe4ca]">
        <div className="gs-container">
          <div className="max-w-2xl">
            <Reveal variant="fade"><span className="gs-eyebrow text-[#73885c]">How we help</span></Reveal>
            <RevealLines
              as="h2"
              className="gs-h2 text-[#1F3A2C] mt-6"
              lines={[<>A financial plan built</>, <em key="b" className="text-[#4a6344]">around your life.</em>]}
            />
          </div>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((srv, i) => (
              <Reveal key={srv.title} delay={i * 70} className="bg-white rounded-3xl p-7 border border-[#d6e0c6] flex items-start gap-4">
                <FigmaTickBadge className="w-10 h-10 mt-0.5 shrink-0" />
                <div>
                  <h3 className="font-cormorant italic text-[1.6rem] text-[#1F3A2C] leading-snug">{srv.title}</h3>
                  <p className="text-[13px] text-[#55695c] leading-relaxed mt-1.5">{srv.desc}</p>
                </div>
              </Reveal>
            ))}
            <Reveal delay={SERVICES.length * 70}>
              <Link href="/contact" className="group h-full min-h-[160px] rounded-3xl bg-[#1F3A2C] text-[#F5F1E8] p-7 flex flex-col justify-between">
                <span className="font-cormorant italic text-[1.6rem] leading-snug">Not sure where to start?</span>
                <span className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#c5a963]">
                  Begin with one conversation
                  <IconArrow className="w-3.5 h-3.5 transition-transform duration-500 group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 10. FAQ ------------------------------------------------------ */}
      <section className="w-full py-24 sm:py-32 bg-[#1F3A2C] text-white">
        <div className="gs-container">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <Reveal variant="fade"><span className="gs-eyebrow text-[#c7af75]">Questions we hear often</span></Reveal>
              <RevealLines as="h2" className="gs-h2 text-white mt-6" lines={[<>Asked, gently</>, <em key="b" className="text-[#a9c08a]">and answered plainly.</em>]} />
            </div>
            <p className="text-sm text-[#cfded5] max-w-md">
              The questions women ask us most — about investing, planning, and taking charge of their financial lives.
            </p>
          </div>

          <div className="mt-14 space-y-3 max-w-5xl">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={faq.q} className="bg-white text-[#1F3A2C] rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-cormorant text-[1.35rem] sm:text-[1.5rem] leading-snug text-[#1F3A2C]"
                  >
                    <span className="flex items-center gap-3">
                      <FigmaTickBadge className="w-8 h-8 shrink-0" iconSize="w-4 h-4" />
                      <span>{faq.q}</span>
                    </span>
                    <ChevronDownIcon className={`w-4 h-4 text-gray-500 transition-transform duration-300 shrink-0 ${isOpen ? "rotate-180 text-[#1F3A2C]" : ""}`} />
                  </button>
                  <div className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                    <div className="overflow-hidden">
                      <p className="px-5 sm:px-6 pb-6 sm:pl-[4.25rem] text-sm text-[#526658] leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 11. START YOUR JOURNEY --------------------------------------- */}
      <section className="w-full py-24 sm:py-32 bg-[#F5F1E8]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <Reveal variant="scale" className="relative bg-white rounded-[32px] p-10 sm:p-14 lg:p-16 border border-[#e8e2d4] text-center overflow-hidden">
            <div className="absolute inset-0 bg-cover bg-center pointer-events-none" style={{ backgroundImage: "url('/images/card_silk_exact.jpg')" }} />
            <div className="relative z-10 max-w-2xl mx-auto">
              <span className="gs-eyebrow text-[#bda15f]">Start your journey</span>
              <h2 className="gs-h2 text-[#1F3A2C] mt-6">
                Independence is the most
                <em className="block text-[#8fa868]">loving plan of all.</em>
              </h2>
              <p className="gs-lead text-[#5d7064] mt-6">
                For you, and for everyone who depends on you. Let&apos;s build a plan around your goals, your responsibilities and your future — at your pace.
              </p>
              <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                <Link href="/contact" className="gs-btn gs-btn-dark !pr-2.5">
                  <span>Talk to an expert</span>
                  <span className="gs-btn-arrow"><IconArrow className="w-3.5 h-3.5" /></span>
                </Link>
                <Link href="/#wealth-score" className="gs-link text-[#1F3A2C]">
                  Take the Portfolio Health Check <IconArrow className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
