"use client";

import React, { useState } from "react";

/* ------------------------------------------------------------------ */
/* Crisp Vector Flags & Badges for all 19 entries                     */
/* ------------------------------------------------------------------ */

function FlagIndia() {
  return (
    <svg viewBox="0 0 30 20" className="w-6 h-4 rounded-sm shadow-sm shrink-0 border border-black/10 overflow-hidden" aria-hidden="true">
      <rect width="30" height="6.67" fill="#FF9933" />
      <rect y="6.67" width="30" height="6.67" fill="#FFFFFF" />
      <rect y="13.34" width="30" height="6.67" fill="#128807" />
      <circle cx="15" cy="10" r="2.4" fill="none" stroke="#000080" strokeWidth="0.6" />
      <circle cx="15" cy="10" r="0.6" fill="#000080" />
      {Array.from({ length: 24 }).map((_, i) => (
        <line
          key={i}
          x1="15"
          y1="10"
          x2={15 + 2.4 * Math.cos((i * 15 * Math.PI) / 180)}
          y2={10 + 2.4 * Math.sin((i * 15 * Math.PI) / 180)}
          stroke="#000080"
          strokeWidth="0.25"
        />
      ))}
    </svg>
  );
}

function FlagMalaysia() {
  return (
    <svg viewBox="0 0 30 20" className="w-6 h-4 rounded-sm shadow-sm shrink-0 border border-black/10 overflow-hidden" aria-hidden="true">
      {Array.from({ length: 14 }).map((_, i) => (
        <rect key={i} y={(i * 20) / 14} width="30" height={20 / 14} fill={i % 2 === 0 ? "#CC0000" : "#FFFFFF"} />
      ))}
      <rect width="15" height={(8 * 20) / 14} fill="#000066" />
      <circle cx="7" cy="5.7" r="3.2" fill="#FFCC00" />
      <circle cx="8" cy="5.7" r="2.8" fill="#000066" />
      <polygon
        points="10,5.7 11.2,6.5 10.7,5.1 11.9,4.4 10.5,4.4 10,3.2 9.5,4.4 8.1,4.4 9.3,5.1 8.8,6.5"
        fill="#FFCC00"
      />
    </svg>
  );
}

function FlagIndonesia() {
  return (
    <svg viewBox="0 0 30 20" className="w-6 h-4 rounded-sm shadow-sm shrink-0 border border-black/10 overflow-hidden" aria-hidden="true">
      <rect width="30" height="10" fill="#FF0000" />
      <rect y="10" width="30" height="10" fill="#FFFFFF" />
    </svg>
  );
}

function FlagChina() {
  return (
    <svg viewBox="0 0 30 20" className="w-6 h-4 rounded-sm shadow-sm shrink-0 border border-black/10 overflow-hidden" aria-hidden="true">
      <rect width="30" height="20" fill="#DE2910" />
      <polygon points="5,2 6.2,5.6 3.1,3.4 6.9,3.4 3.8,5.6" fill="#FFDE00" />
      <polygon points="10,2 10.4,3.2 9.4,2.5 10.6,2.5 9.6,3.2" fill="#FFDE00" />
      <polygon points="12,4 12.4,5.2 11.4,4.5 12.6,4.5 11.6,5.2" fill="#FFDE00" />
      <polygon points="12,7 12.4,8.2 11.4,7.5 12.6,7.5 11.6,8.2" fill="#FFDE00" />
      <polygon points="10,9 10.4,10.2 9.4,9.5 10.6,9.5 9.6,10.2" fill="#FFDE00" />
    </svg>
  );
}

function FlagThailand() {
  return (
    <svg viewBox="0 0 30 20" className="w-6 h-4 rounded-sm shadow-sm shrink-0 border border-black/10 overflow-hidden" aria-hidden="true">
      <rect width="30" height="20" fill="#A51931" />
      <rect y="3.33" width="30" height="13.34" fill="#F4F5F8" />
      <rect y="6.67" width="30" height="6.67" fill="#2D2A4A" />
    </svg>
  );
}

function FlagUSA() {
  return (
    <svg viewBox="0 0 30 20" className="w-6 h-4 rounded-sm shadow-sm shrink-0 border border-black/10 overflow-hidden" aria-hidden="true">
      {Array.from({ length: 13 }).map((_, i) => (
        <rect key={i} y={(i * 20) / 13} width="30" height={20 / 13} fill={i % 2 === 0 ? "#B22234" : "#FFFFFF"} />
      ))}
      <rect width="13" height={(7 * 20) / 13} fill="#3C3B6E" />
      <circle cx="3" cy="2.5" r="0.6" fill="#FFFFFF" />
      <circle cx="6.5" cy="2.5" r="0.6" fill="#FFFFFF" />
      <circle cx="10" cy="2.5" r="0.6" fill="#FFFFFF" />
      <circle cx="4.7" cy="5.2" r="0.6" fill="#FFFFFF" />
      <circle cx="8.2" cy="5.2" r="0.6" fill="#FFFFFF" />
      <circle cx="3" cy="8" r="0.6" fill="#FFFFFF" />
      <circle cx="6.5" cy="8" r="0.6" fill="#FFFFFF" />
      <circle cx="10" cy="8" r="0.6" fill="#FFFFFF" />
    </svg>
  );
}

function FlagBrazil() {
  return (
    <svg viewBox="0 0 30 20" className="w-6 h-4 rounded-sm shadow-sm shrink-0 border border-black/10 overflow-hidden" aria-hidden="true">
      <rect width="30" height="20" fill="#009739" />
      <polygon points="15,2.5 27,10 15,17.5 3,10" fill="#FEDD00" />
      <circle cx="15" cy="10" r="4.2" fill="#012169" />
      <path d="M11.5,10.2 Q15,8.8 18.5,11.2" stroke="#FFFFFF" strokeWidth="0.8" fill="none" />
    </svg>
  );
}

function FlagSouthKorea() {
  return (
    <svg viewBox="0 0 30 20" className="w-6 h-4 rounded-sm shadow-sm shrink-0 border border-black/10 overflow-hidden" aria-hidden="true">
      <rect width="30" height="20" fill="#FFFFFF" />
      <circle cx="15" cy="10" r="4" fill="#C60C30" />
      <path d="M15,6 A4,4 0 0,0 15,14 A2,2 0 0,0 15,10 A2,2 0 0,1 15,6" fill="#003478" />
      <rect x="5" y="4" width="4" height="0.8" fill="#000000" />
      <rect x="5" y="5.4" width="4" height="0.8" fill="#000000" />
      <rect x="21" y="14" width="4" height="0.8" fill="#000000" />
      <rect x="21" y="15.4" width="4" height="0.8" fill="#000000" />
    </svg>
  );
}

function FlagOECD() {
  return (
    <div className="w-6 h-4 rounded-sm bg-[#004B87] text-white flex items-center justify-center shrink-0 border border-black/10 overflow-hidden text-[8px] font-bold tracking-tight">
      <svg viewBox="0 0 20 20" className="w-3.5 h-3.5 text-white/90" fill="none" stroke="currentColor" strokeWidth="1.4">
        <circle cx="10" cy="10" r="8" />
        <ellipse cx="10" cy="10" rx="4" ry="8" />
        <line x1="2" y1="10" x2="18" y2="10" />
      </svg>
    </div>
  );
}

function FlagG7() {
  return (
    <div className="w-6 h-4 rounded-sm bg-[#0F2942] text-white flex items-center justify-center shrink-0 border border-black/10 overflow-hidden text-[9px] font-black tracking-tighter">
      G7
    </div>
  );
}

function FlagEU() {
  return (
    <svg viewBox="0 0 30 20" className="w-6 h-4 rounded-sm shadow-sm shrink-0 border border-black/10 overflow-hidden bg-[#003399]" aria-hidden="true">
      {Array.from({ length: 12 }).map((_, i) => (
        <circle
          key={i}
          cx={15 + 6.2 * Math.cos((i * 30 * Math.PI) / 180)}
          cy={10 + 6.2 * Math.sin((i * 30 * Math.PI) / 180)}
          r="0.8"
          fill="#FFCC00"
        />
      ))}
    </svg>
  );
}

function FlagEuroArea() {
  return (
    <div className="w-6 h-4 rounded-sm bg-[#0B2F64] text-[#FFCC00] flex items-center justify-center shrink-0 border border-black/10 overflow-hidden text-[11px] font-bold">
      €
    </div>
  );
}

function FlagSouthAfrica() {
  return (
    <svg viewBox="0 0 30 20" className="w-6 h-4 rounded-sm shadow-sm shrink-0 border border-black/10 overflow-hidden" aria-hidden="true">
      <rect width="30" height="10" fill="#E03C31" />
      <rect y="10" width="30" height="10" fill="#001489" />
      <polygon points="0,0 12,10 0,20" fill="#000000" />
      <polygon points="0,0 2,0 14,10 2,20 0,20 11,10" fill="#FFB81C" />
      <polygon points="0,0 15,10 30,10 30,7 16,7 4,0" fill="#007749" />
      <polygon points="0,20 15,10 30,10 30,13 16,13 4,20" fill="#007749" />
    </svg>
  );
}

function FlagUK() {
  return (
    <svg viewBox="0 0 30 20" className="w-6 h-4 rounded-sm shadow-sm shrink-0 border border-black/10 overflow-hidden bg-[#012169]" aria-hidden="true">
      <path d="M0,0 L30,20 M30,0 L0,20" stroke="#FFFFFF" strokeWidth="3.5" />
      <path d="M0,0 L30,20 M30,0 L0,20" stroke="#C8102E" strokeWidth="1.8" />
      <path d="M15,0 V20 M0,10 H30" stroke="#FFFFFF" strokeWidth="6" />
      <path d="M15,0 V20 M0,10 H30" stroke="#C8102E" strokeWidth="3.6" />
    </svg>
  );
}

function FlagCanada() {
  return (
    <svg viewBox="0 0 30 20" className="w-6 h-4 rounded-sm shadow-sm shrink-0 border border-black/10 overflow-hidden" aria-hidden="true">
      <rect width="30" height="20" fill="#FF0000" />
      <rect x="7.5" width="15" height="20" fill="#FFFFFF" />
      <polygon points="15,4 16,8 18.5,7 17.5,9.5 20,11 17,12 17.5,14 15.5,13 15,16 14.5,13 12.5,14 13,12 10,11 12.5,9.5 11.5,7 14,8" fill="#FF0000" />
    </svg>
  );
}

function FlagFrance() {
  return (
    <svg viewBox="0 0 30 20" className="w-6 h-4 rounded-sm shadow-sm shrink-0 border border-black/10 overflow-hidden" aria-hidden="true">
      <rect width="10" height="20" fill="#002395" />
      <rect x="10" width="10" height="20" fill="#FFFFFF" />
      <rect x="20" width="10" height="20" fill="#ED2939" />
    </svg>
  );
}

function FlagMexico() {
  return (
    <svg viewBox="0 0 30 20" className="w-6 h-4 rounded-sm shadow-sm shrink-0 border border-black/10 overflow-hidden" aria-hidden="true">
      <rect width="10" height="20" fill="#006847" />
      <rect x="10" width="10" height="20" fill="#FFFFFF" />
      <rect x="20" width="10" height="20" fill="#CE1126" />
      <circle cx="15" cy="10" r="2" fill="#8B5A2B" opacity="0.6" />
    </svg>
  );
}

function FlagJapan() {
  return (
    <svg viewBox="0 0 30 20" className="w-6 h-4 rounded-sm shadow-sm shrink-0 border border-black/10 overflow-hidden" aria-hidden="true">
      <rect width="30" height="20" fill="#FFFFFF" />
      <circle cx="15" cy="10" r="5" fill="#BC002D" />
    </svg>
  );
}

function FlagItaly() {
  return (
    <svg viewBox="0 0 30 20" className="w-6 h-4 rounded-sm shadow-sm shrink-0 border border-black/10 overflow-hidden" aria-hidden="true">
      <rect width="10" height="20" fill="#009246" />
      <rect x="10" width="10" height="20" fill="#FFFFFF" />
      <rect x="20" width="10" height="20" fill="#CE2B37" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Dataset directly from the official infographic                     */
/* ------------------------------------------------------------------ */

export type GdpEntry = {
  id: string;
  name: string;
  rate: number;
  rateFormatted: string;
  renderFlag: () => React.JSX.Element;
  highlight?: boolean;
  isG7?: boolean;
  isAsia?: boolean;
};

const COUNTRIES: GdpEntry[] = [
  { id: "india", name: "India", rate: 7.7, rateFormatted: "7.70%", renderFlag: FlagIndia, highlight: true },
  { id: "malaysia", name: "Malaysia", rate: 5.4, rateFormatted: "5.40%", renderFlag: FlagMalaysia, isAsia: true },
  { id: "indonesia", name: "Indonesia", rate: 5.3, rateFormatted: "5.30%", renderFlag: FlagIndonesia, isAsia: true },
  { id: "china", name: "China", rate: 4.9, rateFormatted: "4.90%", renderFlag: FlagChina, isAsia: true },
  { id: "thailand", name: "Thailand", rate: 2.3, rateFormatted: "2.30%", renderFlag: FlagThailand, isAsia: true },
  { id: "usa", name: "United States", rate: 2.3, rateFormatted: "2.30%", renderFlag: FlagUSA, isG7: true },
  { id: "brazil", name: "Brazil", rate: 2.0, rateFormatted: "2.00%", renderFlag: FlagBrazil },
  { id: "korea", name: "South Korea", rate: 1.9, rateFormatted: "1.90%", renderFlag: FlagSouthKorea, isAsia: true },
  { id: "oecd", name: "OECD Area", rate: 1.8, rateFormatted: "1.80%", renderFlag: FlagOECD },
  { id: "g7", name: "G7", rate: 1.6, rateFormatted: "1.60%", renderFlag: FlagG7, isG7: true },
  { id: "eu", name: "EU", rate: 1.5, rateFormatted: "1.50%", renderFlag: FlagEU },
  { id: "euro", name: "Euro Area", rate: 1.3, rateFormatted: "1.30%", renderFlag: FlagEuroArea },
  { id: "sa", name: "South Africa", rate: 1.3, rateFormatted: "1.30%", renderFlag: FlagSouthAfrica },
  { id: "uk", name: "UK", rate: 1.2, rateFormatted: "1.20%", renderFlag: FlagUK, isG7: true },
  { id: "canada", name: "Canada", rate: 1.2, rateFormatted: "1.20%", renderFlag: FlagCanada, isG7: true },
  { id: "france", name: "France", rate: 1.1, rateFormatted: "1.10%", renderFlag: FlagFrance, isG7: true },
  { id: "mexico", name: "Mexico", rate: 0.8, rateFormatted: "0.80%", renderFlag: FlagMexico },
  { id: "japan", name: "Japan", rate: 0.8, rateFormatted: "0.80%", renderFlag: FlagJapan, isG7: true, isAsia: true },
  { id: "italy", name: "Italy", rate: 0.7, rateFormatted: "0.70%", renderFlag: FlagItaly, isG7: true },
];

const MAX_RATE = 7.7; // India's benchmark 100%

/* ------------------------------------------------------------------ */
/* Main Component: GdpGrowthSection                                   */
/* ------------------------------------------------------------------ */

export default function GdpGrowthSection() {
  const [filter, setFilter] = useState<"all" | "g7" | "asia">("all");
  const [activeCountry, setActiveCountry] = useState<GdpEntry | null>(null);

  const filtered = COUNTRIES.filter((c) => {
    if (filter === "g7") return c.highlight || c.isG7;
    if (filter === "asia") return c.highlight || c.isAsia;
    return true;
  });

  return (
    <section
      id="global-gdp-comparison"
      className="relative w-full py-24 sm:py-32 bg-[#FAF7F2] text-[#1F3A2C] overflow-hidden border-t border-[#1F3A2C]/10"
      aria-label="Global GDP Growth Comparison: Unstoppable India"
    >
      {/* Ambient background decoration */}
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(#1F3A2C_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute -top-32 right-[-10%] w-[500px] h-[500px] rounded-full bg-[#f97316]/[0.04] blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 left-[-10%] w-[500px] h-[500px] rounded-full bg-[#1F3A2C]/[0.04] blur-3xl pointer-events-none" />

      <div className="relative gs-container max-w-4xl mx-auto">
        {/* 1. Header Typography matching the official Infographic */}
        <div className="text-center space-y-3 sm:space-y-4 mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0E2A47]/10 text-[#0E2A47] text-[11px] font-bold tracking-[0.18em] uppercase">
            <span>Macroeconomic Outlook</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#f97316]" />
            <span>FY26 Projection</span>
          </div>

          <h2 className="font-sans font-black tracking-[-0.03em] leading-none uppercase">
            <span className="block text-[clamp(2.6rem,7vw,5.2rem)] text-[#0E2A47] tracking-tight">
              UNSTOPPABLE
            </span>
            <span className="block text-[clamp(4.2rem,12vw,8.8rem)] text-[#FF671F] font-black -mt-1 sm:-mt-3 tracking-normal drop-shadow-[0_4px_16px_rgba(255,103,31,0.25)]">
              INDIA
            </span>
          </h2>

          <div className="pt-1">
            <p className="font-cormorant font-bold text-[clamp(1.4rem,3vw,2.2rem)] text-[#1F3A2C] leading-snug">
              India Powers Ahead with{" "}
              <span className="text-[#FF671F] font-black underline decoration-[#FF671F]/40 underline-offset-4">
                7.7% Growth
              </span>
            </p>
            <p className="text-[14px] sm:text-[17px] text-[#4a5f51] mt-1 font-medium">
              Remains the Brightest Spot in Global Economy
            </p>
          </div>
        </div>

        {/* 2. Interactive Filter Chips */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 px-1">
          <div className="inline-flex p-1 rounded-xl bg-white border border-[#1F3A2C]/10 shadow-sm text-[12px] font-semibold">
            <button
              type="button"
              onClick={() => setFilter("all")}
              className={`px-3 sm:px-4 py-1.5 rounded-lg transition-colors ${
                filter === "all" ? "bg-[#0E2A47] text-white" : "text-[#4a5f51] hover:text-[#1F3A2C]"
              }`}
            >
              All Economies (19)
            </button>
            <button
              type="button"
              onClick={() => setFilter("g7")}
              className={`px-3 sm:px-4 py-1.5 rounded-lg transition-colors ${
                filter === "g7" ? "bg-[#0E2A47] text-white" : "text-[#4a5f51] hover:text-[#1F3A2C]"
              }`}
            >
              India vs G7 &amp; Blocs
            </button>
            <button
              type="button"
              onClick={() => setFilter("asia")}
              className={`px-3 sm:px-4 py-1.5 rounded-lg transition-colors ${
                filter === "asia" ? "bg-[#0E2A47] text-white" : "text-[#4a5f51] hover:text-[#1F3A2C]"
              }`}
            >
              Emerging Asia
            </button>
          </div>

          <div className="text-[12px] text-[#4a5f51] hidden sm:block">
            Hover any bar to compare against India
          </div>
        </div>

        {/* 3. The Central Infographic Card Table */}
        <div className="rounded-[22px] sm:rounded-[26px] bg-white border border-[#1F3A2C]/15 shadow-[0_20px_60px_-15px_rgba(14,42,71,0.12)] overflow-hidden">
          {/* Card Top Title Bar */}
          <div className="bg-[#0E2A47] text-white px-5 sm:px-7 py-3.5 sm:py-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#FF671F] animate-pulse" />
              <span className="text-[13px] sm:text-[14px] font-bold tracking-wide uppercase">
                FY26 GDP Growth Rate (%)
              </span>
            </div>

            {/* Growth Graph Icon */}
            <div className="flex items-center gap-1.5 text-white/80">
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                <polyline points="17 6 23 6 23 12" />
              </svg>
            </div>
          </div>

          {/* Rows List */}
          <div className="p-3 sm:p-6 divide-y divide-[#1F3A2C]/[0.06]">
            {filtered.map((item, idx) => {
              const widthPct = Math.max(6, (item.rate / MAX_RATE) * 100);
              const isIndia = item.highlight;
              const FlagComp = item.renderFlag;

              return (
                <div
                  key={item.id}
                  onMouseEnter={() => !isIndia && setActiveCountry(item)}
                  onMouseLeave={() => setActiveCountry(null)}
                  className={`group relative flex items-center gap-2.5 sm:gap-4 py-2 sm:py-2.5 px-2.5 sm:px-3.5 rounded-xl transition-all duration-200 cursor-default ${
                    isIndia
                      ? "bg-[#FFF4EC] border border-[#FF671F]/30 shadow-sm my-1"
                      : "hover:bg-[#F5F8FA]"
                  }`}
                >
                  {/* Left Column: Flag + Country Name */}
                  <div className="flex items-center gap-2.5 w-32 sm:w-44 shrink-0">
                    <FlagComp />
                    <span
                      className={`text-[13px] sm:text-[14.5px] truncate ${
                        isIndia
                          ? "font-extrabold text-[#0E2A47]"
                          : "font-medium text-[#2C3E50]"
                      }`}
                    >
                      {item.name}
                    </span>
                  </div>

                  {/* Middle Column: The Proportional Bar */}
                  <div className="flex-1 h-5 sm:h-6 flex items-center pr-2">
                    <div className="w-full bg-[#E5E9EE] h-4 sm:h-5 rounded-full overflow-hidden p-0.5">
                      <div
                        style={{ width: `${widthPct}%` }}
                        className={`h-full rounded-full transition-all duration-700 ease-out ${
                          isIndia
                            ? "bg-gradient-to-r from-[#FF671F] via-[#FF7D3B] to-[#FF9933] shadow-[0_2px_10px_rgba(255,103,31,0.45)]"
                            : "bg-[#2563EB] group-hover:bg-[#1D4ED8]"
                        }`}
                      />
                    </div>
                  </div>

                  {/* Right Column: Rate Value */}
                  <div className="w-14 sm:w-16 shrink-0 text-right">
                    <span
                      className={`font-mono text-[13px] sm:text-[14.5px] font-bold tabular-nums ${
                        isIndia ? "text-[#FF671F] text-[14px] sm:text-[15.5px]" : "text-[#1F3A2C]"
                      }`}
                    >
                      {item.rateFormatted}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Dynamic Insight Banner when hovering an economy */}
          {activeCountry && (
            <div className="bg-[#0E2A47] text-white px-5 py-3 text-[12.5px] sm:text-[13.5px] flex items-center justify-between border-t border-white/10 animate-fadeIn">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FF671F]" />
                <span>
                  <strong>India ({MAX_RATE}%)</strong> is expanding{" "}
                  <strong>{(MAX_RATE / activeCountry.rate).toFixed(1)}× faster</strong> than{" "}
                  <strong>{activeCountry.name} ({activeCountry.rateFormatted})</strong>.
                </span>
              </span>
              <span className="text-[#FF9933] text-[11px] font-semibold uppercase tracking-wider hidden sm:inline">
                Growth Alpha
              </span>
            </div>
          )}

          {/* Card Footer: Official Source */}
          <div className="bg-[#F8FAFC] px-5 sm:px-7 py-3 border-t border-[#1F3A2C]/10 flex flex-wrap items-center justify-between gap-3 text-[11.5px] text-[#64748B]">
            <span className="font-medium italic">
              Source: MoSPI, Media Reports &amp; Global IMF/OECD Projections
            </span>
            <span className="font-semibold text-[#0E2A47]">
              Green Shoots Wealth Research
            </span>
          </div>
        </div>

        {/* 4. Editorial Context for Global Investors & NRIs */}
        <div className="mt-8 rounded-2xl bg-white/70 border border-[#1F3A2C]/10 p-5 sm:p-7 text-[#3d5446] text-[13.5px] sm:text-[14.5px] leading-relaxed">
          <p>
            <strong className="text-[#1F3A2C]">Strategic Portfolio Takeaway:</strong> For global investors, NRIs, and Indian families building cross-border wealth, India represents the primary growth engine (7.70% GDP expansion), while allocations to mature economies like the United States (2.30%) and Global ETFs deliver indispensable currency diversification, mature market stability, and exposure to global technology leaders.
          </p>
        </div>
      </div>
    </section>
  );
}
