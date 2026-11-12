"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { IconArrow } from "../LineIcons";

/* ------------------------------------------------------------------ */
/* Shared bits                                                         */
/* ------------------------------------------------------------------ */

/** ₹ in Indian units: 12,500 · 4.2 L · 1.35 Cr */
export function inr(v: number) {
  if (v >= 1e7) return `₹${(v / 1e7).toFixed(v >= 1e9 ? 0 : 2)} Cr`;
  if (v >= 1e5) return `₹${(v / 1e5).toFixed(2)} L`;
  return `₹${Math.round(v).toLocaleString("en-IN")}`;
}
const usd = (v: number) => `$${Math.round(v).toLocaleString("en-US")}`;

function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  format,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  format: (v: number) => string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <label className="block">
      <span className="flex items-baseline justify-between gap-4">
        <span className="text-[13px] text-[#4a5f51]">{label}</span>
        <span className="font-cormorant text-[1.6rem] leading-none text-[#1F3A2C] tabular-nums lining-nums">{format(value)}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="gs-range mt-3 w-full"
        style={{ ["--pct" as string]: `${pct}%` }}
        aria-label={label}
      />
    </label>
  );
}

function Shell({ eyebrow, title, children, note }: { eyebrow: string; title: [string, string]; children: React.ReactNode; note: string }) {
  return (
    <section className="py-24 sm:py-32 border-t border-[#1F3A2C]/10" aria-label={eyebrow}>
      <div className="gs-container">
        <p className="text-[12px] tracking-[0.16em] uppercase font-semibold text-[#bda15f]">{eyebrow}</p>
        <h2 className="gs-h1 mt-4">
          {title[0]}
          <br />
          <em className="text-[#52704e]">{title[1]}</em>
        </h2>
        <div className="mt-12 rounded-[28px] bg-white border border-[#1F3A2C]/10 p-6 sm:p-10">{children}</div>
        <p className="mt-5 text-[12.5px] text-[#5d7064] max-w-3xl leading-relaxed">{note}</p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* India — SIP calculator                                              */
/* ------------------------------------------------------------------ */

export function SipTool() {
  const [monthly, setMonthly] = useState(10000);
  const [years, setYears] = useState(15);
  const [rate, setRate] = useState(10);

  const { series, invested, value } = useMemo(() => {
    const r = rate / 100 / 12;
    const pts: { y: number; invested: number; value: number }[] = [{ y: 0, invested: 0, value: 0 }];
    let v = 0;
    for (let m = 1; m <= years * 12; m++) {
      v = (v + monthly) * (1 + r);
      if (m % 12 === 0) pts.push({ y: m / 12, invested: monthly * m, value: v });
    }
    return { series: pts, invested: monthly * years * 12, value: v };
  }, [monthly, years, rate]);

  const gain = value - invested;
  const W = 640, H = 240, max = value || 1;
  const x = (y: number) => (y / years) * W;
  const yv = (v: number) => H - (v / max) * (H - 10);
  const valuePath = `M0,${H} ` + series.map((p) => `L${x(p.y).toFixed(1)},${yv(p.value).toFixed(1)}`).join(" ") + ` L${W},${H} Z`;
  const investedPath = `M0,${H} ` + series.map((p) => `L${x(p.y).toFixed(1)},${yv(p.invested).toFixed(1)}`).join(" ") + ` L${W},${H} Z`;

  return (
    <Shell
      eyebrow="Try it"
      title={["What a steady SIP", "could grow into."]}
      note="Illustration only. The return rate is your assumption, not a promise: mutual funds are market-linked, returns vary and can be negative. Read all scheme-related documents carefully."
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        <div className="lg:col-span-5 space-y-9">
          <Slider label="Monthly SIP" value={monthly} min={500} max={200000} step={500} onChange={setMonthly} format={inr} />
          <Slider label="For how many years" value={years} min={1} max={40} step={1} onChange={setYears} format={(v) => `${v} yrs`} />
          <Slider label="Assumed yearly return" value={rate} min={4} max={15} step={0.5} onChange={setRate} format={(v) => `${v}%`} />
        </div>
        <div className="lg:col-span-7">
          <div className="grid grid-cols-3 gap-4 border-b border-[#1F3A2C]/10 pb-6">
            <div>
              <p className="text-[12px] text-[#5d7064]">You invest</p>
              <p className="font-cormorant text-[clamp(1.6rem,2.6vw,2.4rem)] leading-tight lining-nums">{inr(invested)}</p>
            </div>
            <div>
              <p className="text-[12px] text-[#5d7064]">Estimated growth</p>
              <p className="font-cormorant text-[clamp(1.6rem,2.6vw,2.4rem)] leading-tight text-[#52704e] lining-nums">{inr(gain)}</p>
            </div>
            <div>
              <p className="text-[12px] text-[#5d7064]">Estimated value</p>
              <p className="font-cormorant text-[clamp(1.6rem,2.6vw,2.4rem)] leading-tight lining-nums">{inr(value)}</p>
            </div>
          </div>
          <svg viewBox={`0 0 ${W} ${H + 24}`} className="w-full h-auto mt-6" role="img" aria-label={`After ${years} years: ${inr(invested)} invested, an estimated ${inr(value)} in total.`}>
            <path d={valuePath} fill="#D5E2BE" />
            <path d={investedPath} fill="#1F3A2C" fillOpacity="0.9" />
            {[0, Math.round(years / 2), years].map((yy) => (
              <text key={yy} x={Math.min(W - 4, Math.max(4, x(yy)))} y={H + 18} textAnchor={yy === 0 ? "start" : yy === years ? "end" : "middle"} fontSize="12" fill="#5d7064">
                {yy === 0 ? "Today" : `Year ${yy}`}
              </text>
            ))}
          </svg>
          <div className="mt-3 flex gap-6 text-[12.5px] text-[#4a5f51]">
            <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm bg-[#1F3A2C]" /> What you put in</span>
            <span className="flex items-center gap-2"><span className="w-3 h-3 rounded-sm bg-[#D5E2BE]" /> Estimated growth</span>
          </div>
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* Global — a dollar goal, in rupees                                    */
/* ------------------------------------------------------------------ */

export function DollarGoalTool() {
  const [cost, setCost] = useState(60000);
  const [years, setYears] = useState(10);
  const [usInfl, setUsInfl] = useState(3);
  const [rupee, setRupee] = useState(3);
  const [rate, setRate] = useState(85);

  const usdThen = cost * Math.pow(1 + usInfl / 100, years);
  const rateThen = rate * Math.pow(1 + rupee / 100, years);
  const inrToday = cost * rate;
  const inrThen = usdThen * rateThen;
  const fromInflation = usdThen * rate - inrToday;
  const fromCurrency = inrThen - usdThen * rate;
  const total = inrThen || 1;

  return (
    <Shell
      eyebrow="Try it"
      title={["A dollar goal,", "in rupees."]}
      note="Illustration only, using your assumptions. Exchange rates and inflation are unpredictable and have moved by different amounts in different decades. Enter today's rate yourself for an up-to-date picture."
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        <div className="lg:col-span-5 space-y-9">
          <Slider label="Cost today, in dollars (e.g. a year of study abroad)" value={cost} min={5000} max={300000} step={5000} onChange={setCost} format={usd} />
          <Slider label="Needed in" value={years} min={1} max={25} step={1} onChange={setYears} format={(v) => `${v} yrs`} />
          <Slider label="Assumed US inflation, per year" value={usInfl} min={0} max={6} step={0.5} onChange={setUsInfl} format={(v) => `${v}%`} />
          <Slider label="Assumed rupee weakening vs dollar, per year" value={rupee} min={0} max={6} step={0.5} onChange={setRupee} format={(v) => `${v}%`} />
          <label className="flex items-center justify-between gap-4">
            <span className="text-[13px] text-[#4a5f51]">Today&apos;s rate (₹ per $)</span>
            <input
              type="number"
              min={1}
              step={0.5}
              value={rate}
              onChange={(e) => setRate(Math.max(1, Number(e.target.value) || 1))}
              className="w-28 rounded-full border border-[#1F3A2C]/20 px-4 py-2 text-right font-cormorant text-[1.4rem] lining-nums focus:outline-none focus:border-[#1F3A2C]"
            />
          </label>
        </div>
        <div className="lg:col-span-7">
          <div className="grid grid-cols-2 gap-6 border-b border-[#1F3A2C]/10 pb-6">
            <div>
              <p className="text-[12px] text-[#5d7064]">In rupees today</p>
              <p className="font-cormorant text-[clamp(1.8rem,3vw,2.8rem)] leading-tight lining-nums">{inr(inrToday)}</p>
            </div>
            <div>
              <p className="text-[12px] text-[#5d7064]">In rupees, in {years} years</p>
              <p className="font-cormorant text-[clamp(1.8rem,3vw,2.8rem)] leading-tight text-[#52704e] lining-nums">{inr(inrThen)}</p>
            </div>
          </div>
          <p className="mt-6 text-[13px] text-[#4a5f51]">Where the extra cost comes from</p>
          <div className="mt-3 flex h-12 rounded-xl overflow-hidden" role="img" aria-label="Share of the future cost from today's price, inflation, and the currency">
            <div className="bg-[#1F3A2C]" style={{ width: `${(inrToday / total) * 100}%` }} />
            <div className="bg-[#8fa868]" style={{ width: `${(fromInflation / total) * 100}%` }} />
            <div className="bg-[#c5a963]" style={{ width: `${(fromCurrency / total) * 100}%` }} />
          </div>
          <dl className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4 text-[13px]">
            <div><dt className="flex items-center gap-2 text-[#4a5f51]"><span className="w-3 h-3 rounded-sm bg-[#1F3A2C]" /> Today&apos;s price</dt><dd className="font-cormorant text-[1.5rem] lining-nums">{inr(inrToday)}</dd></div>
            <div><dt className="flex items-center gap-2 text-[#4a5f51]"><span className="w-3 h-3 rounded-sm bg-[#8fa868]" /> US inflation adds</dt><dd className="font-cormorant text-[1.5rem] lining-nums">{inr(fromInflation)}</dd></div>
            <div><dt className="flex items-center gap-2 text-[#4a5f51]"><span className="w-3 h-3 rounded-sm bg-[#c5a963]" /> The currency adds</dt><dd className="font-cormorant text-[1.5rem] lining-nums">{inr(fromCurrency)}</dd></div>
          </dl>
          <p className="mt-8 text-[14.5px] leading-relaxed text-[#3d5446] max-w-lg">
            The gold part is the risk of saving only in rupees for a cost that&apos;s in dollars. Holding some dollar assets for dollar goals is one way families plan for it.
          </p>
        </div>
      </div>
    </Shell>
  );
}

/* ------------------------------------------------------------------ */
/* GIFT City — is it for you?                                           */
/* ------------------------------------------------------------------ */

const WHO = [
  { k: "resident", label: "I live in India" },
  { k: "nri", label: "I live abroad (NRI)" },
] as const;
const WANT = [
  { k: "dollar", label: "Hold dollar assets" },
  { k: "global", label: "Invest globally" },
  { k: "inbound", label: "Bring money into India" },
  { k: "tax", label: "Understand the tax side" },
] as const;

type Who = (typeof WHO)[number]["k"];
type Want = (typeof WANT)[number]["k"];

const FIT: Record<Want, { title: string; desc: string }> = {
  dollar: { title: "Dollar Investing", desc: "Build and diversify wealth through USD-denominated opportunities." },
  global: { title: "Global Access", desc: "Explore eligible international investment opportunities." },
  inbound: { title: "Inbound Funds", desc: "Support international capital entering India." },
  tax: { title: "Tax Planning", desc: "Navigate applicable IFSC structures and tax considerations." },
};
const WHO_NOTE: Record<Who, { title: string; desc: string }> = {
  resident: {
    title: "As a resident Indian",
    desc: "Eligible Resident Indians may access certain international investment opportunities through permitted GIFT City structures, subject to applicable regulations.",
  },
  nri: {
    title: "As an NRI",
    desc: "GIFT City can provide NRIs with opportunities to connect their India-based and global financial portfolios.",
  },
};

function Choice<T extends string>({ options, value, onPick, legend }: { options: readonly { k: T; label: string }[]; value: T; onPick: (k: T) => void; legend: string }) {
  return (
  <fieldset>
    <legend className="text-[13px] text-[#4a5f51]">{legend}</legend>
    <div className="mt-3 flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o.k}
          type="button"
          onClick={() => onPick(o.k)}
          aria-pressed={value === o.k}
          className={`px-5 py-3 rounded-full text-[14px] border transition-colors ${value === o.k ? "bg-[#1F3A2C] text-[#F5F1E8] border-[#1F3A2C]" : "border-[#1F3A2C]/20 hover:border-[#1F3A2C]/60"}`}
        >
          {o.label}
        </button>
      ))}
    </div>
  </fieldset>
);
}

export function GiftFitTool() {
  const [who, setWho] = useState<Who>("resident");
  const [want, setWant] = useState<Want>("dollar");
  const fit = FIT[want];
  const note = WHO_NOTE[who];

  return (
    <Shell
      eyebrow="Two questions"
      title={["Is GIFT City", "right for you?"]}
      note="A starting point, not advice. Eligibility depends on your residency, the structure and applicable IFSCA, RBI and FEMA regulations; tax treatment depends on your circumstances."
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
        <div className="lg:col-span-6 space-y-9">
          <Choice legend="1. Where do you live?" options={WHO} value={who} onPick={setWho} />
          <Choice legend="2. What would you like to do?" options={WANT} value={want} onPick={setWant} />
        </div>
        <div className="lg:col-span-6 rounded-[22px] bg-[#1F3A2C] text-[#F5F1E8] p-7 sm:p-9" aria-live="polite">
          <p className="text-[12px] tracking-[0.16em] uppercase text-[#c5a963]">Worth exploring</p>
          <p className="font-cormorant text-[2.2rem] leading-tight mt-3">{fit.title}</p>
          <p className="text-[15px] text-white/75 mt-2 leading-relaxed">{fit.desc}</p>
          <div className="mt-7 pt-6 border-t border-white/15">
            <p className="font-cormorant italic text-[1.35rem] text-[#c9d7b3]">{note.title}</p>
            <p className="text-[14px] text-white/70 mt-2 leading-relaxed">{note.desc}</p>
          </div>
          <Link href={`/contact?topic=${encodeURIComponent(`GIFT City — ${fit.title}`)}`} className="gs-btn gs-btn-light !pr-2.5 mt-8">
            <span>Talk it through</span>
            <span className="gs-btn-arrow"><IconArrow className="w-3.5 h-3.5" /></span>
          </Link>
        </div>
      </div>
    </Shell>
  );
}
