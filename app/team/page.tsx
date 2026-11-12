"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LinkedinIcon } from "@/components/Icons";
import { IconArrow } from "@/components/LineIcons";

/* ------------------------------------------------------------------ */
/* People                                                              */
/* ------------------------------------------------------------------ */

const FOUNDERS = [
  {
    name: "Saloni Mehta",
    role: "Founder",
    title: "Financial therapist & wealth architect",
    line: "Started Green Shoots so advice would begin with the person, not the product.",
    photo: "/saloni_mehta.jpeg",
    initials: "SM",
    linkedin: "https://www.linkedin.com/in/the-saloni-mehta/",
  },
  {
    name: "Kaushal Kapasi",
    role: "Co-founder",
    title: "Chartered Accountant",
    line: "Brings a CA's eye to every plan: the numbers, the tax and the fine print.",
    photo: "/images/team/kaushal_kapasi.jpg" as string | null,
    initials: "KK",
    linkedin: "https://www.linkedin.com/in/ca-kaushal-kapasi-bbb1b150/",
  },
];

/**
 * PLACEHOLDER TEAM — these names and photos came from the previous design
 * ("dummy names & profiles") and are not real people. Replace each entry with
 * a real team member before publishing.
 */
const TEAM = [
  { topic: "Equity & mutual funds", name: "Rohan Mehta", role: "Head of Equity Research", photo: "/images/advisor_1.jpg" },
  { topic: "Family & goal plans", name: "Priya Varma", role: "Senior Wealth Architect", photo: "/images/advisor_2.jpg" },
  { topic: "Debt & fixed income", name: "Amit Sen", role: "Debt & Treasury Lead", photo: "/images/advisor_3.jpg" },
  { topic: "Insurance & protection", name: "Neha Deshmukh", role: "Risk & Protection Lead", photo: "/images/advisor_4.jpg" },
  { topic: "Global & GIFT City", name: "Siddharth Iyer", role: "Global & GIFT City Lead", photo: "/images/advisor_5.jpg" },
];

const VALUES = [
  { word: "Integrity", line: "Honest, even when it's inconvenient." },
  { word: "Empathy", line: "The person before the portfolio." },
  { word: "Discipline", line: "Long-term plans, kept long-term." },
  { word: "Learning", line: "Better at this every year." },
];

/* ------------------------------------------------------------------ */
/* Pieces                                                              */
/* ------------------------------------------------------------------ */

function FounderCard({ f, tone }: { f: (typeof FOUNDERS)[number]; tone: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <article className="group">
      <div className={`relative aspect-[4/5] rounded-[28px] overflow-hidden ${dark ? "bg-[#1F3A2C]" : "bg-[#e7e1d5]"}`}>
        {f.photo ? (
          <Image src={f.photo} alt={`${f.name}, ${f.role}`} fill sizes="(min-width:1024px) 40vw, 100vw" className="object-cover object-top" />
        ) : (
          // A designed monogram until a portrait is supplied.
          <div className="absolute inset-0 grid place-items-center">
            <span className="font-cormorant italic text-[clamp(8rem,18vw,15rem)] leading-none text-[#c9d7b3] select-none" aria-hidden>
              {f.initials}
            </span>
            <span className="absolute bottom-6 left-0 right-0 text-center text-[11px] tracking-[0.2em] uppercase text-white/45">{f.title}</span>
          </div>
        )}
        <span className={`absolute top-5 left-5 px-3.5 py-1.5 rounded-full text-[11px] font-semibold tracking-[0.12em] uppercase ${dark ? "bg-[#c5a963] text-[#132a1f]" : "bg-[#F5F1E8] text-[#1F3A2C]"}`}>
          {f.role}
        </span>
      </div>
      <div className="mt-6 flex items-start justify-between gap-6">
        <div>
          <h3 className="font-cormorant text-[clamp(2.2rem,3.6vw,3.4rem)] leading-none">{f.name}</h3>
          <p className="font-cormorant italic text-[1.35rem] text-[#52704e] mt-2">{f.title}</p>
        </div>
        <a
          href={f.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${f.name} on LinkedIn`}
          className="shrink-0 w-12 h-12 rounded-full border border-[#1F3A2C]/20 grid place-items-center hover:bg-[#1F3A2C] hover:text-[#F5F1E8] transition-colors"
        >
          <LinkedinIcon className="w-4 h-4" />
        </a>
      </div>
      <p className="text-[15.5px] leading-relaxed text-[#4a5f51] mt-4 max-w-md">{f.line}</p>
    </article>
  );
}

function WhoToCall() {
  const [active, setActive] = useState(0);
  return (
    <section className="bg-[#1F3A2C] text-[#F5F1E8] py-24 sm:py-32" aria-label="Who to call for what">
      <div className="gs-container">
        <h2 className="gs-h1">
          Who to call
          <br />
          <em className="text-[#c9d7b3]">for what.</em>
        </h2>
        <p className="text-[15.5px] text-white/65 mt-6 max-w-md">Pick what&apos;s on your mind. The person who handles it steps forward.</p>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* topics */}
          <ul className="lg:col-span-4 border-t border-white/15" role="listbox" aria-label="Topics">
            {TEAM.map((t, i) => (
              <li key={t.topic} className="border-b border-white/15">
                <button
                  type="button"
                  role="option"
                  aria-selected={i === active}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className={`w-full flex items-center justify-between gap-4 py-5 text-left transition-colors ${i === active ? "text-[#F5F1E8]" : "text-white/45 hover:text-white/80"}`}
                >
                  <span className="font-cormorant text-[1.75rem] leading-tight">{t.topic}</span>
                  <IconArrow className={`w-4 h-4 shrink-0 transition-opacity ${i === active ? "opacity-100 text-[#c5a963]" : "opacity-0"}`} />
                </button>
              </li>
            ))}
          </ul>

          {/* people */}
          <div className="lg:col-span-8 grid grid-cols-5 gap-2 sm:gap-4 items-end order-first lg:order-none">
            {TEAM.map((t, i) => {
              const on = i === active;
              return (
                <button
                  key={t.name}
                  type="button"
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  aria-label={`${t.name}, ${t.role}`}
                  className={`text-left transition-opacity duration-300 ${on ? "opacity-100" : "opacity-40 hover:opacity-70"}`}
                >
                  <div className={`relative rounded-[18px] overflow-hidden bg-[#2a4d3b] ${on ? "aspect-[3/4] ring-2 ring-[#c5a963] ring-offset-2 sm:ring-offset-4 ring-offset-[#1F3A2C]" : "aspect-[3/4] grayscale"}`}>
                    <Image src={t.photo} alt="" fill sizes="(min-width:640px) 18vw, 45vw" className="object-cover object-top" />
                  </div>
                  <p className={`mt-3 text-[11px] sm:text-[14px] font-semibold leading-tight ${on ? "text-[#F5F1E8]" : "text-white/70"}`}>{t.name}</p>
                  <p className="hidden sm:block text-[12.5px] text-white/50 leading-snug">{t.role}</p>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-6" aria-live="polite">
          <p className="font-cormorant italic text-[clamp(1.5rem,2.4vw,2.1rem)] leading-snug">
            For {TEAM[active].topic.toLowerCase()}, you&apos;ll speak with {TEAM[active].name.split(" ")[0]}.
          </p>
          <Link href={`/contact?topic=${encodeURIComponent(`${TEAM[active].topic} (${TEAM[active].name})`)}`} className="gs-btn gs-btn-light !pr-2.5 shrink-0">
            <span>Book time with {TEAM[active].name.split(" ")[0]}</span>
            <span className="gs-btn-arrow"><IconArrow className="w-3.5 h-3.5" /></span>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function TeamPage() {
  return (
    <div className="w-full flex flex-col bg-[#F5F1E8] text-[#1F3A2C]" data-motion-managed>
      {/* Hero */}
      <section className="pt-16 sm:pt-24 pb-16 sm:pb-20" aria-label="Our team">
        <div className="gs-container">
          <h1 className="font-cormorant font-normal text-[clamp(3rem,8vw,9rem)] leading-[0.9] tracking-[-0.035em] max-w-[13ch]">
            The people who&apos;ll
            <br />
            <em className="text-[#52704e]">know your name.</em>
          </h1>
          <p className="text-[17px] leading-relaxed text-[#3d5446] mt-10 max-w-md">
            A small team, on purpose. You&apos;ll always know who you&apos;re talking to, and they&apos;ll know your plan.
          </p>
        </div>
      </section>

      {/* Founders */}
      <section className="pb-24 sm:pb-32" aria-label="Founders">
        <div className="gs-container grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-10 lg:gap-16">
          <FounderCard f={FOUNDERS[0]} tone="light" />
          <div className="md:pt-24">
            <FounderCard f={FOUNDERS[1]} tone="dark" />
          </div>
        </div>
      </section>

      <WhoToCall />

      {/* Values */}
      <section className="py-24 sm:py-32" aria-label="What we hold to">
        <div className="gs-container">
          <h2 className="gs-h2">
            What we
            <em className="text-[#52704e]"> hold to.</em>
          </h2>
          <ul className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-[#1F3A2C]/15">
            {VALUES.map((v, i) => (
              <li key={v.word} className={`py-8 sm:pr-8 border-b border-[#1F3A2C]/15 ${i > 0 ? "lg:border-l lg:pl-8" : ""}`}>
                <span className="gs-index text-[#bda15f]">0{i + 1}</span>
                <p className="font-cormorant text-[clamp(2.4rem,4vw,3.4rem)] leading-none mt-4">{v.word}</p>
                <p className="text-[14.5px] text-[#4a5f51] mt-3">{v.line}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Close */}
      <section className="bg-[#EEF0D9] py-24 sm:py-28" aria-label="Meet us">
        <div className="gs-container flex flex-col lg:flex-row lg:items-end justify-between gap-10">
          <h2 className="gs-h1">
            Come and meet us.
            <br />
            <em className="text-[#52704e]">The chai&apos;s on us.</em>
          </h2>
          <Link href="/contact" className="gs-btn gs-btn-dark !pr-2.5 w-fit">
            <span>Book a consultation</span>
            <span className="gs-btn-arrow"><IconArrow className="w-3.5 h-3.5" /></span>
          </Link>
        </div>
      </section>
    </div>
  );
}
