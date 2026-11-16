"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IconArrow, IconArrowUpRight } from "@/components/LineIcons";
import { Reveal, RevealLines, ScrollWords, CountUp, Parallax, useInView } from "@/components/motion/primitives";

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

const HERO_FACTS = [
  { value: "≈5 yrs", label: "Longer women live than men, worldwide" },
  { value: "80%", label: "Of married women will one day manage alone" },
  { value: "₹73 lakh cr", label: "Moving into women's hands in India this decade" },
];

const LONGEVITY_STATS = [
  { to: 5, prefix: "≈", suffix: " yrs", label: "How much longer women live than men, on average, worldwide." },
  { to: 74.4, decimals: 1, suffix: " yrs", label: "Average life expectancy for women." },
  { to: 71.2, decimals: 1, suffix: " yrs", label: "Average life expectancy for men." },
  { to: 73, prefix: "₹", suffix: " lakh cr", label: "Wealth expected to pass to women in India over the next decade." },
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
    "Decides on her own timeline, with advice she understands.",
    "Shows her children what independence looks like.",
  ],
};

const WIDOW_STATS = [
  { to: 258, suffix: "M+", label: "Women worldwide living after the loss of a spouse" },
  { to: 42, suffix: "M", label: "Widows in India" },
  { to: 43, suffix: "M", label: "Widows in China" },
  { to: 11, suffix: "M+", label: "Widows in the United States" },
];

const WEALTH_ARRIVES = [
  { title: "Life insurance", desc: "A payout arrives at the hardest moment. Pause, protect it, then put it to work — without pressure." },
  { title: "Inheritance", desc: "A thoughtful plan for inherited wealth, so it honours the person who left it." },
  { title: "Existing wealth", desc: "Scattered accounts and paperwork, brought into one picture you fully understand." },
  { title: "Family wealth", desc: "The responsibility of managing family wealth — and passing it on well." },
];

const LEARNING_PATH = [
  { title: "Understand", desc: "Know what you own, why you own it and what it is meant to achieve." },
  { title: "Protect", desc: "Make sure your health, family and income are adequately covered." },
  { title: "Invest", desc: "Build wealth around your own goals and time horizon." },
  { title: "Plan ahead", desc: "Retirement, succession and the years ahead — on your terms." },
];

const SELF_CHECK = [
  "I know every bank account, investment and policy our family holds.",
  "I can log in to our accounts and find important documents without help.",
  "I know who the nominees are — and that the details are up to date.",
  "I know how much our household needs each month to live comfortably.",
  "If I had to make a big money decision alone tomorrow, I'd know where to begin.",
];

const SERVICES = [
  { title: "Investment planning", desc: "Investments built around your goals, risk and time horizon." },
  { title: "Retirement planning", desc: "Financial independence for a longer, more secure retirement." },
  { title: "Insurance planning", desc: "Protection for your health, income and family." },
  { title: "Estate & succession", desc: "How your wealth is managed — and passed on." },
  { title: "Portfolio review", desc: "Clarity on what you already hold, and what needs attention." },
];

const FAQS = [
  {
    q: "Why is financial planning particularly important for women?",
    a: "Women generally live longer and may spend more years managing their own finances — often alone. A clear plan prepares you for retirement, protection and long-term wealth management, so those years are lived with confidence rather than uncertainty.",
  },
  {
    q: "My husband handles our money. Why should I get involved?",
    a: "Being involved isn't about distrust — it's about partnership. When both of you understand the plan, either of you can carry it forward, whatever life brings. Many couples tell us these conversations bring them closer.",
  },
  {
    q: "What should I do if I receive an inheritance or insurance payout?",
    a: "First, give yourself time. Then understand the amount, your existing position, your goals and your liquidity needs before making any major investment decision. You don't have to decide everything at once.",
  },
  {
    q: "I don't know much about investing. Can you still help me?",
    a: "Yes — that's exactly where many of our clients begin. Planning starts with your situation and goals, not with how much you already know. We explain everything in plain language, at your pace.",
  },
  {
    q: "Can I review my existing investments with you?",
    a: "Yes. A portfolio review helps you understand what you already hold and whether it still fits your goals and risk profile.",
  },
];

/* ------------------------------------------------------------------ */
/* Building blocks                                                     */
/* ------------------------------------------------------------------ */

/** A photograph that wipes in from below and drifts gently on scroll. */
function Photo({
  src,
  alt,
  className = "",
  sizes,
  position = "center",
  children,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes: string;
  position?: string;
  children?: React.ReactNode;
}) {
  return (
    <Reveal variant="clip" className={`relative overflow-hidden rounded-[28px] bg-[#d9d2c2] ${className}`}>
      <div className="absolute inset-[-7%_0]">
        <Parallax speed={0.07} className="absolute inset-0">
          <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" style={{ objectPosition: position }} />
        </Parallax>
      </div>
      {children}
    </Reveal>
  );
}

function Eyebrow({ children, tone = "gold" }: { children: React.ReactNode; tone?: "gold" | "sage" | "light" }) {
  const color = tone === "gold" ? "text-[#bda15f]" : tone === "sage" ? "text-[#73885c]" : "text-[#c7af75]";
  return (
    <Reveal variant="fade">
      <span className={`gs-eyebrow ${color}`}>{children}</span>
    </Reveal>
  );
}

function Tick({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" className={className} fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
      <path d="M2.5 6.2l2.3 2.3 4.7-4.9" />
    </svg>
  );
}

/* Longevity bars — a simple, honest 0–80 year scale. */
function LongevityBars() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.35 });
  const SCALE = 80;
  const women = 74.4;
  const men = 71.2;
  return (
    <div
      ref={ref}
      className="rounded-[28px] border border-white/10 bg-white/[0.03] p-7 sm:p-9"
      role="img"
      aria-label={`Average life expectancy: women ${women} years, men ${men} years — a gap of ${(women - men).toFixed(1)} years.`}
    >
      <span className="gs-index uppercase text-[#c7af75]">Life expectancy</span>
      <div className="mt-7 space-y-6">
        {[
          { label: "Women", value: women, color: "bg-[#c5a963]" },
          { label: "Men", value: men, color: "bg-[#F5F1E8]/30" },
        ].map((row, i) => (
          <div key={row.label}>
            <div className="flex items-baseline justify-between mb-2.5">
              <span className="text-[13px] text-[#cfded5]">{row.label}</span>
              <span className="font-cormorant text-[1.7rem] leading-none text-[#F5F1E8] tabular-nums">{row.value}</span>
            </div>
            <div className="relative h-2.5 rounded-full bg-white/8 overflow-hidden">
              <div
                className={`absolute inset-y-0 left-0 rounded-full ${row.color} transition-[width] duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)]`}
                style={{ width: inView ? `${(row.value / SCALE) * 100}%` : "0%", transitionDelay: `${i * 180}ms` }}
              />
              {i === 0 && (
                <div
                  aria-hidden
                  className="absolute inset-y-0 rounded-r-full bg-[#f3dfa6] transition-opacity duration-700 delay-[1600ms]"
                  style={{ left: `${(men / SCALE) * 100}%`, width: `${((women - men) / SCALE) * 100}%`, opacity: inView ? 1 : 0 }}
                />
              )}
            </div>
          </div>
        ))}
      </div>
      <p className={`mt-8 pt-6 border-t border-white/10 text-sm text-[#cfded5] leading-relaxed transition-opacity duration-700 delay-[1700ms] ${inView ? "opacity-100" : "opacity-0"}`}>
        <span className="font-cormorant text-[1.6rem] text-[#f3dfa6] mr-1.5">+{(women - men).toFixed(1)} years.</span>
        Often, those are the years she manages alone.
      </p>
    </div>
  );
}

/* Self-check — five questions every woman should be able to answer. */
function SelfCheck() {
  const [checked, setChecked] = useState<boolean[]>(() => SELF_CHECK.map(() => false));
  const count = checked.filter(Boolean).length;
  const left = SELF_CHECK.length - count;
  const toggle = (i: number) => setChecked((c) => c.map((v, j) => (j === i ? !v : v)));

  const verdict =
    count === SELF_CHECK.length
      ? { title: "You're in control.", body: "Wonderful. A periodic review will keep it that way as life changes." }
      : count >= 3
      ? { title: "You're well on your way.", body: `${left} gap${left > 1 ? "s" : ""} left to close — that's one conversation, not a mountain.` }
      : { title: "Every “not yet” is where we begin.", body: "You're not behind. Most women we meet start exactly here — and leave the first conversation feeling lighter." };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
      <ul className="lg:col-span-7 border-t border-[#1F3A2C]/12">
        {SELF_CHECK.map((q, i) => (
          <li key={q} className="border-b border-[#1F3A2C]/12">
            <button
              type="button"
              onClick={() => toggle(i)}
              aria-pressed={checked[i]}
              className="group w-full text-left flex items-start gap-5 py-5 sm:py-6"
            >
              <span
                aria-hidden
                className={`mt-0.5 grid place-items-center w-7 h-7 shrink-0 rounded-full border transition-all duration-300 ${
                  checked[i] ? "bg-[#1F3A2C] border-[#1F3A2C] text-[#c5a963] scale-105" : "border-[#1F3A2C]/30 text-transparent group-hover:border-[#bda15f]"
                }`}
              >
                <Tick className="w-3 h-3" />
              </span>
              <span className={`text-[15px] sm:text-base leading-relaxed transition-colors duration-300 ${checked[i] ? "text-[#1F3A2C]" : "text-[#5d7064]"}`}>{q}</span>
            </button>
          </li>
        ))}
      </ul>

      <div className="lg:col-span-5 lg:sticky lg:top-[calc(var(--nav-h)+40px)] rounded-[28px] bg-[#1F3A2C] text-[#F5F1E8] p-8 sm:p-10" aria-live="polite">
        <span className="gs-index uppercase text-[#c7af75]">Your answers</span>
        <div className="flex items-baseline gap-2 mt-4">
          <span className="font-cormorant text-7xl tabular-nums leading-none">{count}</span>
          <span className="font-cormorant text-2xl text-[#cfded5]/70">/ {SELF_CHECK.length}</span>
        </div>
        <div className="flex gap-1.5 mt-6" aria-hidden>
          {SELF_CHECK.map((_, i) => (
            <span key={i} className={`h-1 flex-1 rounded-full transition-colors duration-500 ${i < count ? "bg-[#c5a963]" : "bg-white/12"}`} />
          ))}
        </div>
        <p key={verdict.title} className="font-cormorant italic text-[1.8rem] leading-tight mt-7 stage-in">{verdict.title}</p>
        <p className="text-sm text-[#cfded5] leading-relaxed mt-2">{verdict.body}</p>
        <Link href="/contact" className="gs-btn gs-btn-light !pr-2.5 mt-8">
          <span>Close the gaps with us</span>
          <span className="gs-btn-arrow"><IconArrow className="w-3.5 h-3.5" /></span>
        </Link>
        <p className="text-[11px] text-[#cfded5]/60 mt-5">Your answers stay on this page — nothing is saved or sent.</p>
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
      {/* 1. HERO — let the photograph breathe; copy sits in the shade on the left */}
      <section className="relative w-full min-h-[100svh] flex flex-col justify-end overflow-hidden bg-[#0d1f16]">
        <div className="absolute inset-0">
          <Parallax speed={-0.12} className="absolute inset-[-6%_0]">
            <Image
              src="/images/women_hero_authentic.jpg"
              alt="A confident woman in a light suit, smiling as she looks out over the city"
              fill
              priority
              sizes="100vw"
              className="object-cover object-[55%_center] lg:object-[62%_center]"
            />
          </Parallax>
          {/* mobile: shade from the bottom; desktop: shade from the left */}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,31,22,0.35)_0%,rgba(13,31,22,0)_30%,rgba(13,31,22,0.75)_62%,rgba(13,31,22,0.95)_100%)] lg:bg-[linear-gradient(90deg,rgba(13,31,22,0.92)_0%,rgba(13,31,22,0.72)_30%,rgba(13,31,22,0.15)_55%,rgba(13,31,22,0)_70%)]" />
          <div className="hidden lg:block absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0d1f16]/80 to-transparent" />
        </div>

        <div className="relative z-10 gs-container pt-[calc(var(--nav-h)+4rem)] pb-10 sm:pb-12">
          <div className="max-w-[36rem]">
            <Eyebrow tone="light">Women &amp; Wealth</Eyebrow>
            <RevealLines
              as="h1"
              className="gs-h1 text-[#F5F1E8] mt-6"
              delay={150}
              lines={[<>She plans for everyone.</>, <em key="b" className="text-[#c9d7b3]">Who plans for her?</em>]}
            />
            <Reveal delay={450} className="mt-7">
              <p className="gs-lead text-[#dce7e0]">
                Women live longer than men — often by years. Many of us will, one day, manage a family&apos;s finances alone.
                Knowing how should never depend on someone else.
              </p>
            </Reveal>
            <Reveal delay={650} className="mt-9 flex flex-wrap items-center gap-4">
              <Link href="/contact" className="gs-btn gs-btn-light !pr-2.5">
                <span>Talk to an expert</span>
                <span className="gs-btn-arrow"><IconArrow className="w-3.5 h-3.5" /></span>
              </Link>
              <a href="#self-check" className="gs-link text-[#F5F1E8]">
                Take the 2-minute self-check <IconArrow className="w-3.5 h-3.5" />
              </a>
            </Reveal>
          </div>

          <Reveal delay={850} className="mt-14 sm:mt-20 pt-6 border-t border-white/15 grid grid-cols-3 gap-4 sm:gap-10 max-w-4xl">
            {HERO_FACTS.map((f) => (
              <div key={f.label}>
                <div className="font-cormorant text-[1.3rem] sm:text-[2.4rem] leading-none text-[#F5F1E8] sm:whitespace-nowrap">{f.value}</div>
                <p className="text-[11px] sm:text-[13px] text-[#cfded5]/85 leading-snug mt-2">{f.label}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* 2. THE LONGER VIEW ------------------------------------------ */}
      <section className="w-full py-24 sm:py-32 bg-[#1F3A2C] text-[#F5F1E8]">
        <div className="gs-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6">
              <Eyebrow tone="light">The longer view</Eyebrow>
              <RevealLines
                as="h2"
                className="gs-h2 mt-6"
                lines={[<>A longer life is a gift.</>, <em key="b" className="text-[#c9d7b3]">It also needs a longer plan.</em>]}
              />
              <Reveal delay={200}>
                <p className="gs-lead text-[#cfded5] mt-7 max-w-lg">
                  More years means more decisions and more responsibility — and, for many women, a chapter where every financial choice is hers alone.
                </p>
              </Reveal>
            </div>
            <Reveal delay={200} className="lg:col-span-6">
              <LongevityBars />
            </Reveal>
          </div>

          <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 border-t border-white/12">
            {LONGEVITY_STATS.map((s, i) => (
              <Reveal
                key={s.label}
                delay={i * 90}
                className={`pt-8 pb-2 pr-4 sm:pr-6 ${i > 0 ? "lg:pl-8 lg:border-l lg:border-white/12" : ""} ${i % 2 === 1 ? "pl-4 sm:pl-6 border-l border-white/12 lg:pl-8" : ""} ${i >= 2 ? "max-lg:mt-2 max-lg:border-t max-lg:border-white/12" : ""}`}
              >
                <div className="font-cormorant text-[1.9rem] sm:text-[3.2rem] leading-none sm:whitespace-nowrap">
                  <CountUp to={s.to} decimals={s.decimals ?? 0} prefix={s.prefix ?? ""} suffix={s.suffix} duration={2000} />
                </div>
                <p className="text-[13px] text-[#cfded5]/85 leading-relaxed mt-4 max-w-[15rem]">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3. THE MOMENT ------------------------------------------------ */}
      <section className="w-full bg-[#F5F1E8] pt-24 sm:pt-36" aria-label="The moment everything changes">
        <div className="gs-container grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-2">
            <Eyebrow>The moment</Eyebrow>
          </div>
          <div className="lg:col-span-10">
            <ScrollWords
              className="font-cormorant text-[clamp(2rem,4.6vw,4.4rem)] leading-[1.08] tracking-[-0.02em] text-[#1F3A2C]"
              text="The hardest day of her life should never also be the first day she *sees* the family's finances."
            />
          </div>
        </div>

        <div className="gs-container mt-20 sm:mt-28 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <Photo
            src="/images/women_moment_clarity.jpg"
            alt="A woman sits by a window with a family file on her lap, lost in thought"
            sizes="(min-width:1024px) 42vw, 100vw"
            position="40% center"
            className="lg:col-span-5 aspect-[4/5]"
          />
          <div className="lg:col-span-7">
            <Reveal>
              <p className="gs-lead text-[#5d7064] max-w-xl">
                When a husband passes away, or a marriage ends, the questions arrive all at once — usually when she is least able to face them.
              </p>
            </Reveal>
            <ol className="mt-10 border-t border-[#1F3A2C]/12">
              {QUIET_QUESTIONS.map((q, i) => (
                <Reveal as="li" key={q} delay={i * 110} className="flex items-baseline gap-6 py-5 border-b border-[#1F3A2C]/12">
                  <span className="gs-index text-[#bda15f]">0{i + 1}</span>
                  <span className="font-cormorant italic text-[1.45rem] sm:text-[1.8rem] leading-snug">{q}</span>
                </Reveal>
              ))}
            </ol>
            <Reveal delay={300} className="mt-10">
              <p className="font-cormorant text-[1.6rem] sm:text-[2.1rem] leading-snug">
                Too often, the only answer is <em className="text-[#8fa868]">&ldquo;I&apos;ll have to ask someone.&rdquo;</em>
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 4. TWO FUTURES ---------------------------------------------- */}
      <section className="w-full bg-[#F5F1E8] pt-28 sm:pt-36 pb-24 sm:pb-32">
        <div className="gs-container">
          <div className="text-center max-w-3xl mx-auto">
            <Eyebrow>Two futures</Eyebrow>
            <RevealLines
              as="h2"
              className="gs-h2 mt-6"
              lines={[<>The same loss.</>, <em key="b" className="text-[#8fa868]">Two very different years ahead.</em>]}
            />
          </div>

          <Reveal variant="scale" className="mt-14 sm:mt-16 grid grid-cols-1 md:grid-cols-2 rounded-[32px] overflow-hidden border border-[#1F3A2C]/10 shadow-[0_40px_80px_-50px_rgba(13,31,22,0.45)]">
            <div className="bg-[#ebe5d8] p-8 sm:p-12">
              <span className="gs-index uppercase text-[#5d7064]">When she depends on others</span>
              <ul className="mt-8 space-y-5">
                {TWO_FUTURES.dependent.map((t) => (
                  <li key={t} className="flex items-start gap-4 text-[#5d7064]">
                    <span aria-hidden className="mt-[0.7rem] w-3 h-px bg-[#5d7064]/50 shrink-0" />
                    <span className="text-[15px] leading-relaxed">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[#1F3A2C] text-[#F5F1E8] p-8 sm:p-12">
              <span className="gs-index uppercase text-[#c7af75]">When she understands</span>
              <ul className="mt-8 space-y-5">
                {TWO_FUTURES.prepared.map((t) => (
                  <li key={t} className="flex items-start gap-4">
                    <span className="mt-1 grid place-items-center w-5 h-5 rounded-full bg-[#c5a963] text-[#1F3A2C] shrink-0">
                      <Tick className="w-2.5 h-2.5" />
                    </span>
                    <span className="text-[15px] leading-relaxed">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={200} className="mt-14 text-center">
            <p className="font-cormorant italic text-[1.8rem] sm:text-[2.6rem] leading-tight">
              The difference isn&apos;t money. <span className="text-[#8fa868]">It&apos;s knowing.</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* 5. THE FINANCIAL REALITY ------------------------------------ */}
      <section className="w-full py-24 sm:py-32 bg-[#EEF0D9]">
        <div className="gs-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end">
            <div className="lg:col-span-7">
              <Eyebrow tone="sage">The financial reality</Eyebrow>
              <RevealLines
                as="h2"
                className="gs-h2 mt-6"
                lines={[<>Behind every number,</>, <em key="b" className="text-[#4a6344]">a woman who had to learn overnight.</em>]}
              />
            </div>
            <Reveal delay={200} className="lg:col-span-5">
              <div className="font-cormorant text-[clamp(5rem,11vw,9rem)] leading-[0.85] text-[#1F3A2C]">
                <CountUp to={80} suffix="%" duration={1800} />
              </div>
              <p className="text-[15px] text-[#526658] leading-relaxed mt-4 max-w-sm">
                of married women will eventually be solely responsible for their household finances — most often because they outlive their husbands.
              </p>
            </Reveal>
          </div>

          <Reveal className="mt-16 rounded-[28px] bg-white/70 border border-[#d6e0c6] grid grid-cols-2 lg:grid-cols-4">
            {WIDOW_STATS.map((c, i) => (
              <div
                key={c.label}
                className={`p-6 sm:p-8 ${i % 2 === 1 ? "border-l border-[#d6e0c6]" : ""} ${i >= 2 ? "border-t lg:border-t-0 border-[#d6e0c6]" : ""} ${i === 2 ? "lg:border-l" : ""}`}
              >
                <div className="font-cormorant text-[2.6rem] sm:text-[3.2rem] leading-none">
                  <CountUp to={c.to} suffix={c.suffix} duration={2200} />
                </div>
                <p className="text-[13px] text-[#526658] leading-relaxed mt-3">{c.label}</p>
              </div>
            ))}
          </Reveal>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
            <Reveal className="lg:col-span-8">
              <p className="font-cormorant text-[1.6rem] sm:text-[2.1rem] leading-snug">
                Widowhood isn&apos;t rare — it&apos;s a likely chapter. That&apos;s why financial education for women
                isn&apos;t a luxury. <em className="text-[#4a6344]">It&apos;s protection.</em>
              </p>
            </Reveal>
            <p className="lg:col-span-4 lg:text-right text-[11px] text-[#526658]/80">
              Figures are approximate, drawn from published research on longevity, widowhood and wealth transfer.
            </p>
          </div>
        </div>
      </section>

      {/* 6. WHEN WEALTH BECOMES YOURS -------------------------------- */}
      <section className="w-full py-24 sm:py-32 bg-[#F5F1E8]">
        <div className="gs-container grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <Photo
            src="/images/women_wealth_transfer.jpg"
            alt="A grandmother places her hand over her daughter's on an heirloom box in a sunlit courtyard"
            sizes="(min-width:1024px) 46vw, 100vw"
            className="lg:col-span-6 aspect-[4/3] lg:aspect-[4/5]"
          />

          <div className="lg:col-span-6">
            <Eyebrow>When wealth becomes yours</Eyebrow>
            <RevealLines
              as="h2"
              className="gs-h2 mt-6"
              lines={[<>What happens when</>, <em key="b" className="text-[#6e8f66]">the wealth comes to you?</em>]}
            />
            <Reveal delay={200}>
              <p className="gs-lead text-[#5d7064] mt-6 max-w-lg">
                It often arrives at a time of loss. Knowing how to care for it matters as much as receiving it.
              </p>
            </Reveal>

            <ul className="mt-10 border-t border-[#1F3A2C]/12">
              {WEALTH_ARRIVES.map((card, i) => (
                <Reveal as="li" key={card.title} delay={i * 80} className="border-b border-[#1F3A2C]/12">
                  <Link href="/contact" className="group flex items-start gap-5 py-5 sm:py-6">
                    <span className="gs-index text-[#bda15f] mt-2">0{i + 1}</span>
                    <span className="flex-1">
                      <span className="block font-cormorant text-[1.5rem] sm:text-[1.7rem] leading-tight transition-colors group-hover:text-[#52704e]">{card.title}</span>
                      <span className="block text-[14px] text-[#5d7064] leading-relaxed mt-1">{card.desc}</span>
                    </span>
                    <IconArrowUpRight className="w-4 h-4 mt-2.5 text-[#52704e] opacity-40 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 7. EDUCATION IS INDEPENDENCE -------------------------------- */}
      <section className="w-full pb-24 sm:pb-32 bg-[#F5F1E8]">
        <div className="gs-container">
          <Photo
            src="/images/women_intergenerational.jpg"
            alt="A mother talks through the family's finances with her daughter over tea"
            sizes="(min-width:1440px) 1340px, 100vw"
            position="center 40%"
            className="h-[78svh] min-h-[520px] max-h-[820px] rounded-[32px]"
          >
            <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(13,31,22,0.92)_0%,rgba(13,31,22,0.55)_35%,rgba(13,31,22,0)_65%)]" />
            <div className="absolute inset-x-0 bottom-0 p-7 sm:p-12 lg:p-16 text-[#F5F1E8]">
              <span className="gs-eyebrow text-[#c7af75]">Education is independence</span>
              <h2 className="gs-h2 mt-5 max-w-3xl">
                It&apos;s not only about having wealth.
                <em className="block text-[#c9d7b3]">It&apos;s about never having to ask permission.</em>
              </h2>
            </div>
          </Photo>

          <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-10">
            <Reveal className="lg:col-span-4">
              <p className="gs-lead text-[#5d7064]">
                We teach as we plan — step by step, in plain language — until every decision feels like yours. Because it is.
              </p>
            </Reveal>
            <ol className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-10">
              {LEARNING_PATH.map((s, i) => (
                <Reveal as="li" key={s.title} delay={i * 90} className="py-6 border-t border-[#1F3A2C]/12">
                  <span className="gs-index text-[#bda15f]">Step 0{i + 1}</span>
                  <h3 className="font-cormorant text-[1.7rem] leading-tight mt-2">{s.title}</h3>
                  <p className="text-[14px] text-[#5d7064] leading-relaxed mt-1.5">{s.desc}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* 8. SELF-CHECK ------------------------------------------------ */}
      <section id="self-check" className="w-full py-24 sm:py-32 bg-[#EEF0D9] scroll-mt-24">
        <div className="gs-container">
          <div className="max-w-3xl mb-12 sm:mb-14">
            <Eyebrow tone="sage">A quiet self-check</Eyebrow>
            <RevealLines
              as="h2"
              className="gs-h2 mt-6"
              lines={[<>If you had to manage alone tomorrow,</>, <em key="b" className="text-[#4a6344]">could you answer these?</em>]}
            />
            <Reveal delay={200}>
              <p className="gs-lead text-[#526658] mt-6">Tap each statement that is true for you today. There are no wrong answers — only a starting point.</p>
            </Reveal>
          </div>
          <SelfCheck />
        </div>
      </section>

      {/* 9. HOW WE HELP ----------------------------------------------- */}
      <section className="w-full py-24 sm:py-32 bg-[#F5F1E8]">
        <div className="gs-container grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-[calc(var(--nav-h)+40px)]">
              <Eyebrow>How we help</Eyebrow>
              <RevealLines as="h2" className="gs-h2 mt-6" lines={[<>A financial plan</>, <em key="b" className="text-[#8fa868]">built around your life.</em>]} />
              <Reveal delay={250} className="mt-9">
                <Link href="/contact" className="gs-btn gs-btn-dark !pr-2.5">
                  <span>Begin with one conversation</span>
                  <span className="gs-btn-arrow"><IconArrow className="w-3.5 h-3.5" /></span>
                </Link>
              </Reveal>
            </div>
          </div>
          <ul className="lg:col-span-7 border-t border-[#1F3A2C]/12">
            {SERVICES.map((srv, i) => (
              <Reveal as="li" key={srv.title} delay={i * 70} className="grid grid-cols-[auto_1fr] sm:grid-cols-[auto_14rem_1fr] gap-x-6 gap-y-1 py-6 border-b border-[#1F3A2C]/12">
                <span className="gs-index text-[#bda15f] mt-2">0{i + 1}</span>
                <h3 className="font-cormorant text-[1.5rem] sm:text-[1.6rem] leading-tight">{srv.title}</h3>
                <p className="col-start-2 sm:col-start-3 text-[14px] text-[#5d7064] leading-relaxed sm:mt-1.5">{srv.desc}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* 10. FAQ ------------------------------------------------------ */}
      <section className="w-full py-24 sm:py-32 bg-[#1F3A2C] text-[#F5F1E8]">
        <div className="gs-container grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-4">
            <Eyebrow tone="light">Questions we hear often</Eyebrow>
            <RevealLines as="h2" className="gs-h2 mt-6" lines={[<>Asked gently,</>, <em key="b" className="text-[#c9d7b3]">answered plainly.</em>]} />
          </div>

          <div className="lg:col-span-8 border-t border-white/12">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={faq.q} className="border-b border-white/12">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    className="group w-full py-6 text-left flex items-start justify-between gap-6"
                  >
                    <span className={`font-cormorant text-[1.35rem] sm:text-[1.6rem] leading-snug transition-colors ${isOpen ? "text-[#F5F1E8]" : "text-[#F5F1E8]/80 group-hover:text-[#F5F1E8]"}`}>
                      {faq.q}
                    </span>
                    <span
                      aria-hidden
                      className={`relative mt-1.5 w-7 h-7 shrink-0 rounded-full border transition-colors duration-300 ${isOpen ? "bg-[#c5a963] border-[#c5a963] text-[#1F3A2C]" : "border-white/25 text-[#F5F1E8]"}`}
                    >
                      <span className="absolute left-1/2 top-1/2 w-2.5 h-px -translate-x-1/2 -translate-y-1/2 bg-current" />
                      <span className={`absolute left-1/2 top-1/2 w-px h-2.5 -translate-x-1/2 -translate-y-1/2 bg-current transition-transform duration-300 ${isOpen ? "scale-y-0" : ""}`} />
                    </span>
                  </button>
                  <div className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                    <div className="overflow-hidden">
                      <p className="pb-7 pr-12 text-[15px] text-[#cfded5] leading-relaxed max-w-2xl">{faq.a}</p>
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
          <Reveal variant="scale" className="relative bg-white rounded-[32px] p-10 sm:p-14 lg:p-20 border border-[#e8e2d4] text-center overflow-hidden">
            <div className="absolute inset-0 bg-cover bg-center pointer-events-none" style={{ backgroundImage: "url('/images/card_silk_exact.jpg')" }} />
            <div className="relative z-10 max-w-2xl mx-auto">
              <span className="gs-eyebrow text-[#bda15f]">Start your journey</span>
              <h2 className="gs-h2 mt-6">
                Independence is the most
                <em className="block text-[#8fa868]">loving plan of all.</em>
              </h2>
              <p className="gs-lead text-[#5d7064] mt-6">
                For you, and for everyone who depends on you. Let&apos;s build a plan around your goals and your future — at your pace.
              </p>
              <div className="pt-9 flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-7">
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
