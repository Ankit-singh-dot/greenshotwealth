"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useInView, Reveal, RevealLines } from "../motion/primitives";
import { IconArrow } from "../LineIcons";
import { DOT_ROWS, DOT_STEP, LAT_TOP, LON_LEFT } from "./worldDots";

/**
 * Where our families are. A dotted world map built from real coastlines:
 * the dots inside client countries are sage, India is gold, and a fine arc
 * runs from Mumbai to each — advised from home, wherever home is now.
 */

const W = 1200;
const D = W / (360 / DOT_STEP); // px per grid cell
const H = DOT_ROWS.length * D;
const R = 2.05;

const toXY = (lon: number, lat: number): [number, number] => [((lon - LON_LEFT) / 360) * W, ((LAT_TOP - lat) / DOT_STEP) * D];

/** All dots of one kind as a single path — thousands of dots, one element. */
function dotsPath(match: (ch: string) => boolean) {
  let d = "";
  DOT_ROWS.forEach((row, r) => {
    for (let c = 0; c < row.length; c++) {
      if (!match(row[c])) continue;
      const x = (c + 0.5) * D, y = (r + 0.5) * D;
      d += `M${(x - R).toFixed(1)},${y.toFixed(1)}a${R},${R} 0 1,0 ${(2 * R).toFixed(1)},0a${R},${R} 0 1,0 -${(2 * R).toFixed(1)},0`;
    }
  });
  return d;
}

type Place = {
  key: string;
  name: string;
  ch: string; // grid code
  lon: number;
  lat: number;
  label: [number, number]; // where the pill sits (px)
  align: "l" | "r";
};

const HQ = { lon: 72.88, lat: 19.08 };
const CITIES = [
  { name: "Ahmedabad", lon: 72.57, lat: 23.02 },
  { name: "Valsad", lon: 72.93, lat: 20.61 },
  { name: "Mumbai", lon: HQ.lon, lat: HQ.lat },
];

const PLACES: Place[] = [
  { key: "ca", name: "Canada", ch: "c", lon: -100, lat: 55, label: [318, 46], align: "l" },
  { key: "us", name: "United States", ch: "u", lon: -98.5, lat: 39.5, label: [198, 182], align: "r" },
  { key: "uk", name: "United Kingdom", ch: "k", lon: -1.5, lat: 52.5, label: [548, 52], align: "r" },
  { key: "ae", name: "UAE", ch: "e", lon: 55.3, lat: 25.2, label: [742, 128], align: "r" },
  { key: "tz", name: "Tanzania", ch: "t", lon: 34.9, lat: -6.4, label: [668, 334], align: "r" },
  { key: "au", name: "Australia", ch: "a", lon: 133.8, lat: -25.3, label: [1004, 420], align: "r" },
  { key: "nz", name: "New Zealand", ch: "n", lon: 174.8, lat: -41.3, label: [1150, 448], align: "r" },
];

const LAND = dotsPath((ch) => ch === "#");
const INDIA = dotsPath((ch) => ch === "i");
const COUNTRY = Object.fromEntries(PLACES.map((p) => [p.key, dotsPath((ch) => ch === p.ch)]));

function arc(from: [number, number], to: [number, number]) {
  const [x0, y0] = from;
  const [x1, y1] = to;
  const dist = Math.hypot(x1 - x0, y1 - y0);
  const mx = (x0 + x1) / 2;
  const my = Math.min(y0, y1) - dist * 0.22;
  return `M${x0.toFixed(1)},${y0.toFixed(1)} Q${mx.toFixed(1)},${my.toFixed(1)} ${x1.toFixed(1)},${y1.toFixed(1)}`;
}

function Pill({ x, y, align, children, strong = false, width }: { x: number; y: number; align: "l" | "r"; children: React.ReactNode; strong?: boolean; width: number }) {
  const h = 26;
  const left = align === "l" ? x : x - width;
  return (
    <g className="gr-pill">
      <rect x={left} y={y - h / 2} width={width} height={h} rx={h / 2} className={strong ? "gr-pill-hq" : "gr-pill-bg"} />
      <text x={left + width / 2} y={y + 4.2} textAnchor="middle" className={strong ? "gr-pill-hq-t" : "gr-pill-t"}>
        {children}
      </text>
    </g>
  );
}

export default function GlobalReach() {
  const [ref, inView] = useInView<SVGSVGElement>({ threshold: 0.3 });
  const [hover, setHover] = useState<string | null>(null);
  const home = toXY(HQ.lon, HQ.lat);
  const hqLabel: [number, number] = [904, 150];

  return (
    <section id="gift-city" className="relative w-full bg-[#132a1f] text-[#F5F1E8] py-24 sm:py-32 overflow-hidden" aria-label="Where our clients are">
      <div className="gs-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7">
            <RevealLines as="h2" className="gs-h1" lines={[<>Go beyond borders.</>, <em key="b" className="text-[#8fa868]">Invest globally.</em>]} />
          </div>
          <Reveal className="lg:col-span-4 lg:col-start-9" delay={150}>
            <p className="text-[15.5px] leading-relaxed text-white/65">
              Families in seven countries beyond India, all advised from Mumbai. And through GIFT City, a regulated way to hold dollar assets from home.
            </p>
            <Link href="/gift-city" className="gs-link text-[#e6cf8f] mt-6 inline-flex">
              GIFT City solutions <IconArrow className="w-3.5 h-3.5" />
            </Link>
          </Reveal>
        </div>

        {/* the map */}
        <div className="mt-14 sm:mt-20 -mx-[var(--gutter)] sm:mx-0 overflow-hidden">
          <div className="w-[170%] -ml-[58%] sm:w-full sm:ml-0">
            <svg
              ref={ref}
              viewBox={`0 0 ${W} ${H.toFixed(0)}`}
              className={`gr-map w-full h-auto ${inView ? "is-in" : ""} ${hover ? "has-hover" : ""}`}
              role="img"
              aria-label="World map. Clients in the United States, Canada, the United Kingdom, the UAE, Tanzania, Australia and New Zealand. Offices in Mumbai (headquarters), Ahmedabad and Valsad."
            >
              <path d={LAND} className="gr-land" />
              {PLACES.map((p) => (
                <path key={p.key} d={COUNTRY[p.key]} className={`gr-country ${hover === p.key ? "is-hot" : ""}`} />
              ))}
              <path d={INDIA} className="gr-india" />

              {/* arcs from home */}
              {PLACES.map((p, i) => (
                <path
                  key={`arc-${p.key}`}
                  d={arc(home, toXY(p.lon, p.lat))}
                  pathLength={1}
                  className={`gr-arc ${hover === p.key ? "is-hot" : ""}`}
                  style={{ ["--d" as string]: `${0.3 + i * 0.16}s` }}
                />
              ))}

              {/* client countries */}
              {PLACES.map((p) => {
                const [x, y] = toXY(p.lon, p.lat);
                const [lx, ly] = p.label;
                const w = p.name.length * 7.2 + 30;
                const elbow = p.align === "l" ? lx - 10 : lx + 10;
                return (
                  <g
                    key={p.key}
                    className={`gr-place ${hover === p.key ? "is-hot" : ""}`}
                    onMouseEnter={() => setHover(p.key)}
                    onMouseLeave={() => setHover(null)}
                    tabIndex={0}
                    onFocus={() => setHover(p.key)}
                    onBlur={() => setHover(null)}
                    aria-label={p.name}
                  >
                    <path d={`M${x.toFixed(1)},${y.toFixed(1)} L${elbow.toFixed(1)},${ly} L${lx},${ly}`} className="gr-leader" />
                    <circle cx={x} cy={y} r={7} className="gr-ring" />
                    <circle cx={x} cy={y} r={3.4} className="gr-pin" />
                    <Pill x={lx} y={ly} align={p.align} width={w}>{p.name}</Pill>
                  </g>
                );
              })}

              {/* home: Mumbai, with Ahmedabad and Valsad up the coast */}
              <g className="gr-home">
                {CITIES.map((c) => {
                  const [x, y] = toXY(c.lon, c.lat);
                  return <circle key={c.name} cx={x} cy={y} r={c.name === "Mumbai" ? 4.2 : 2.6} className="gr-city" />;
                })}
                <path d={`M${home[0].toFixed(1)},${home[1].toFixed(1)} L${hqLabel[0] - 12},${hqLabel[1] + 8} L${hqLabel[0]},${hqLabel[1] + 8}`} className="gr-leader" />
                <g className="gr-pill">
                  <rect x={hqLabel[0]} y={hqLabel[1] - 12} width={176} height={42} rx={12} className="gr-pill-hq" />
                  <text x={hqLabel[0] + 14} y={hqLabel[1] + 4} className="gr-pill-hq-t">Mumbai · HQ</text>
                  <text x={hqLabel[0] + 14} y={hqLabel[1] + 20} className="gr-pill-hq-s">Ahmedabad · Valsad</text>
                </g>
              </g>
            </svg>
          </div>
        </div>

        {/* the same facts, as plain text */}
        <div className="mt-10 sm:mt-14 pt-8 border-t border-white/12 grid grid-cols-1 md:grid-cols-12 gap-8 text-[14px]">
          <div className="md:col-span-4">
            <p className="flex items-center gap-2.5 text-[11px] tracking-[0.18em] uppercase text-white/45">
              <span className="w-2 h-2 rounded-full bg-[#c5a963]" /> India
            </p>
            <p className="mt-3 text-white/80">Mumbai <span className="text-white/40">(HQ)</span> · Ahmedabad · Valsad</p>
          </div>
          <div className="md:col-span-8">
            <p className="flex items-center gap-2.5 text-[11px] tracking-[0.18em] uppercase text-white/45">
              <span className="w-2 h-2 rounded-full bg-[#8fa868]" /> Clients overseas
            </p>
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-white/80">
              {PLACES.map((p) => (
                <li key={p.key}>
                  <button
                    onMouseEnter={() => setHover(p.key)}
                    onMouseLeave={() => setHover(null)}
                    onFocus={() => setHover(p.key)}
                    onBlur={() => setHover(null)}
                    className={`transition-colors ${hover === p.key ? "text-[#e6cf8f]" : "hover:text-white"}`}
                  >
                    {p.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
