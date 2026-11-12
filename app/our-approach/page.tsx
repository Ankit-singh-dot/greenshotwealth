import Image from "next/image";
import Link from "next/link";
import { IconArrow } from "@/components/LineIcons";

/* ------------------------------------------------------------------ */
/* Content                                                             */
/* ------------------------------------------------------------------ */

const STEPS = [
  {
    season: "Seed",
    verb: "Understand",
    title: "We start with a conversation, not a product.",
    body: "Your goals, your worries, what you already own and what you owe. We listen before we suggest anything.",
    points: ["Your goals, in your words", "What you own, and what you owe", "How much risk still lets you sleep"],
    image: "/images/framework_understand.jpg",
    alt: "Hands fitting puzzle pieces together around a table",
  },
  {
    season: "Roots",
    verb: "Plan",
    title: "A written plan you can actually read.",
    body: "We turn what you've told us into an allocation, with tax, insurance and an emergency fund built in from the start.",
    points: ["Asset allocation for each goal", "Tax efficiency", "Emergency reserve and cover"],
    image: "/images/financial_planning_clarity.jpg",
    alt: "A handwritten financial plan in a notebook",
  },
  {
    season: "Growth",
    verb: "Invest",
    title: "Steady, disciplined, spread out.",
    body: "We put the plan to work across mutual funds, SIPs, debt and global funds, chosen for your timeline rather than last year's returns.",
    points: ["Goal-linked SIPs", "India and global funds", "Patience over timing"],
    image: "/images/framework_invest.jpg",
    alt: "Coins stacked in rising columns on a desk",
  },
  {
    season: "Forest",
    verb: "Review",
    title: "We keep tending it.",
    body: "Markets move and lives change: a marriage, a new job, children, retirement. We review regularly and adjust, with the same adviser each time.",
    points: ["Regular reviews and rebalancing", "Plans that follow your life", "Passing it on, when it's time"],
    image: "/images/plan_ahead_card.jpg",
    alt: "An older woman at ease with a cup of tea in her garden",
  },
];

const BELIEFS = [
  { line: "You come first. Always.", note: "Advice is shaped by your goals, never by what would pay us more." },
  { line: "We tell you the truth about markets.", note: "Including when the news is dull, or bad." },
  { line: "We take on fewer families.", note: "So each one gets real attention, from someone who knows them." },
  { line: "We promise only what we can deliver.", note: "No guaranteed returns. No shortcuts in due diligence." },
];

const STAGES = [
  { who: "Early investors", what: "Start small and start right, with disciplined, goal-linked SIPs." },
  { who: "Working professionals", what: "Make a rising income work harder, with tax-aware allocation." },
  { who: "Families", what: "Order, protection and a plan for the children's future." },
  { who: "NRIs", what: "Invest in India from abroad, and manage money across currencies." },
  { who: "Pre-retirees", what: "Shift from building wealth to a steady, dependable income." },
  { who: "Senior citizens", what: "Protect what you've built, and pass it on smoothly." },
];

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function OurApproachPage() {
  return (
    <div className="w-full flex flex-col bg-[#F5F1E8] text-[#1F3A2C]" data-motion-managed>
      {/* ---------------- Hero ---------------- */}
      <section className="relative w-full h-[100svh] min-h-[640px] overflow-hidden bg-[#0d1f16] text-[#F5F1E8]" aria-label="Our approach">
        <Image src="/images/generational_growth_luxury.jpg" alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,31,22,0.4)_0%,rgba(13,31,22,0.1)_35%,rgba(13,31,22,0.88)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(13,31,22,0.7)_0%,rgba(13,31,22,0.25)_55%,transparent_80%)]" />
        <div className="relative h-full gs-container flex flex-col justify-end pb-16 sm:pb-20">
          <p className="text-[12px] tracking-[0.22em] uppercase text-[#e6cf8f]">Our approach</p>
          <h1 className="font-cormorant font-normal text-[clamp(2.6rem,6.6vw,7.2rem)] leading-[0.95] tracking-[-0.03em] mt-6">
            Money is not the goal.
            <br />
            <em className="text-[#c9d7b3]">The life it helps you build&nbsp;is.</em>
          </h1>
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-7 items-end">
            <p className="lg:col-span-5 text-[16px] sm:text-[17px] leading-relaxed text-white/80 max-w-md">
              We help you make clear decisions today, so the future feels calm rather than uncertain. Four steps, in the order a tree grows.
            </p>
            <div className="lg:col-span-7 flex flex-wrap items-center gap-6 lg:justify-end">
              <Link href="/contact" className="gs-btn gs-btn-light !pr-2.5">
                <span>Book a consultation</span>
                <span className="gs-btn-arrow"><IconArrow className="w-3.5 h-3.5" /></span>
              </Link>
              <a href="#steps" className="gs-link text-white/85">See the four steps</a>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- Four steps ---------------- */}
      <section id="steps" className="py-24 sm:py-32 scroll-mt-20" aria-label="How we work">
        <div className="gs-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <h2 className="lg:col-span-7 gs-h1">
              Seed, roots,
              <br />
              <em className="text-[#52704e]">growth, forest.</em>
            </h2>
            <p className="lg:col-span-4 lg:col-start-9 text-[15.5px] leading-relaxed text-[#4a5f51]">
              The same four steps for every family. What changes is what we learn about you in the first one.
            </p>
          </div>

          {/* step index */}
          <ol className="mt-14 grid grid-cols-2 md:grid-cols-4 border-y border-[#1F3A2C]/15">
            {STEPS.map((s, i) => (
              <li key={s.season} className={`py-5 border-[#1F3A2C]/15 ${i % 2 === 1 ? "border-l pl-6" : ""} ${i === 2 ? "md:border-l md:pl-6" : ""}`}>
                <a href={`#step-${i + 1}`} className="group block">
                  <span className="gs-index text-[#bda15f]">0{i + 1}</span>
                  <span className="block font-cormorant text-[1.6rem] leading-tight mt-1 group-hover:text-[#52704e] transition-colors">
                    {s.season} <em className="text-[#52704e]">— {s.verb}</em>
                  </span>
                </a>
              </li>
            ))}
          </ol>

          <div className="mt-20 sm:mt-28 space-y-24 sm:space-y-32">
            {STEPS.map((s, i) => {
              const flip = i % 2 === 1;
              return (
                <article id={`step-${i + 1}`} key={s.season} className="scroll-mt-28 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
                  <div className={`lg:col-span-6 ${flip ? "lg:order-2 lg:col-start-7" : ""}`}>
                    <div className="relative aspect-[4/3] rounded-[28px] overflow-hidden bg-[#e7e1d5]">
                      <Image src={s.image} alt={s.alt} fill sizes="(min-width:1024px) 46vw, 100vw" className="object-cover" />
                      <span className="absolute top-5 left-5 px-3.5 py-1.5 rounded-full bg-[#F5F1E8] text-[11px] font-semibold tracking-[0.14em] uppercase">
                        0{i + 1} · {s.season}
                      </span>
                    </div>
                  </div>
                  <div className={`lg:col-span-5 ${flip ? "lg:order-1 lg:col-start-1 lg:row-start-1" : "lg:col-start-8"}`}>
                    <p className="font-cormorant italic text-[1.4rem] text-[#52704e]">{s.verb}</p>
                    <h3 className="font-cormorant text-[clamp(2.1rem,3.4vw,3.3rem)] leading-[1.02] tracking-[-0.02em] mt-3">{s.title}</h3>
                    <p className="text-[16px] leading-relaxed text-[#4a5f51] mt-5 max-w-md">{s.body}</p>
                    <ul className="mt-7 border-t border-[#1F3A2C]/12 max-w-md">
                      {s.points.map((p) => (
                        <li key={p} className="py-3 border-b border-[#1F3A2C]/12 text-[14.5px] flex items-center gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#bda15f]" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- One line, over the city ---------------- */}
      <section className="relative w-full h-[70svh] min-h-[460px] overflow-hidden bg-[#0d1f16] text-[#F5F1E8]" aria-label="Our view">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/videos/web/india.mp4"
          poster="/videos/web/india.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
        />
        <div className="absolute inset-0 bg-[#0d1f16]/60" />
        <div className="relative h-full gs-container flex items-center">
          <p className="font-cormorant text-[clamp(2.2rem,5vw,4.8rem)] leading-[1.02] tracking-[-0.02em] max-w-[20ch]">
            Markets will move.
            <br />
            <em className="text-[#c9d7b3]">A plan you understand is what keeps you still.</em>
          </p>
        </div>
      </section>

      {/* ---------------- Beliefs ---------------- */}
      <section className="py-24 sm:py-32" aria-label="What we believe">
        <div className="gs-container">
          <h2 className="gs-h1">
            What we
            <br />
            <em className="text-[#52704e]">believe.</em>
          </h2>
          <ol className="mt-14 border-t border-[#1F3A2C]/15">
            {BELIEFS.map((b, i) => (
              <li key={b.line} className="grid grid-cols-[2.5rem_1fr] lg:grid-cols-[5rem_1.3fr_1fr] gap-x-4 gap-y-2 items-baseline py-8 sm:py-10 border-b border-[#1F3A2C]/15">
                <span className="gs-index text-[#bda15f]">0{i + 1}</span>
                <p className="font-cormorant text-[clamp(1.9rem,3.6vw,3.2rem)] leading-[1.05] tracking-[-0.015em]">{b.line}</p>
                <p className="col-start-2 lg:col-start-3 text-[15px] leading-relaxed text-[#4a5f51] max-w-sm">{b.note}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------------- Who we work with ---------------- */}
      <section className="bg-[#EEF0D9] py-24 sm:py-32" aria-label="Who we work with">
        <div className="gs-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <h2 className="lg:col-span-7 gs-h1">
              Wherever you are
              <br />
              <em className="text-[#52704e]">in life.</em>
            </h2>
            <p className="lg:col-span-4 lg:col-start-9 text-[15.5px] leading-relaxed text-[#4a5f51]">
              From a first salary to passing it on. The plan changes shape; the way we work doesn&apos;t.
            </p>
          </div>
          <ol className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#1F3A2C]/12 border border-[#1F3A2C]/12 rounded-[24px] overflow-hidden">
            {STAGES.map((s, i) => (
              <li key={s.who} className="bg-[#EEF0D9] p-7 sm:p-9">
                <span className="gs-index text-[#52704e]">0{i + 1}</span>
                <p className="font-cormorant text-[1.85rem] leading-tight mt-3">{s.who}</p>
                <p className="text-[14.5px] leading-relaxed text-[#4a5f51] mt-2">{s.what}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------------- Close ---------------- */}
      <section className="py-24 sm:py-32" aria-label="Start with a conversation">
        <div className="gs-container grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] rounded-[28px] overflow-hidden bg-[#e7e1d5]">
              <Image src="/a_longer_life.jpg" alt="A woman looking out at a garden from a calm, light-filled room" fill sizes="(min-width:1024px) 38vw, 100vw" className="object-cover" />
            </div>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <h2 className="gs-h1">
              Start with
              <br />
              <em className="text-[#52704e]">a conversation.</em>
            </h2>
            <p className="text-[16.5px] leading-relaxed text-[#4a5f51] mt-6 max-w-md">
              No forms first, and no products on the table. Just you, your goals, and honest questions.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <Link href="/contact" className="gs-btn gs-btn-dark !pr-2.5">
                <span>Book a consultation</span>
                <span className="gs-btn-arrow"><IconArrow className="w-3.5 h-3.5" /></span>
              </Link>
              <Link href="/team" className="gs-link text-[#1F3A2C]">Meet the team</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
