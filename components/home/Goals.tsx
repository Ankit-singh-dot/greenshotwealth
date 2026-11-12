"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Reveal, RevealLines } from "../motion/primitives";
import { IconSunset, IconCap, IconHome, IconUmbrella, IconStream, IconLayers, IconPlane, IconArrow } from "../LineIcons";

const GOALS = [
  { title: "Retirement", desc: "Build long-term financial security, so the later years are yours to choose.", Icon: IconSunset },
  { title: "Child Education", desc: "Prepare for future education expenses without derailing everything else.", Icon: IconCap },
  { title: "Buying a Home", desc: "Plan for the down payment today and the EMIs that follow.", Icon: IconHome },
  { title: "Emergency Fund", desc: "Financial stability for the unexpected — the base every plan stands on.", Icon: IconUmbrella },
  { title: "Passive Income", desc: "A structured approach to income that doesn't depend on your next pay cheque.", Icon: IconStream },
  { title: "Wealth Creation", desc: "Long-term wealth through disciplined, patient investing.", Icon: IconLayers },
  { title: "Investing from abroad", desc: "India investment solutions for NRIs — suitable opportunities while living overseas.", Icon: IconPlane },
];

export default function Goals() {
  const [active, setActive] = useState(0);
  const g = GOALS[active];

  return (
    <section className="w-full bg-[#EEF0D9] py-28 sm:py-36" aria-label="Goal-based planning">
      <div className="gs-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Sticky visual */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-[calc(var(--nav-h)+48px)]">
              <Reveal variant="fade"><span className="gs-eyebrow text-[#52704e]">Goal-based planning</span></Reveal>
              <RevealLines
                as="h2"
                className="gs-h1 text-[#1F3A2C] mt-6"
                lines={[<>Your money should</>, <>have a <em className="text-[#8fa868]">purpose.</em></>]}
              />
              <Reveal delay={200}>
                <p className="gs-lead text-[#4a5f51] mt-6 max-w-md">Every rupee gets a job. We map what you invest to the moments it&apos;s meant for — so you always know why it&apos;s there.</p>
              </Reveal>

              <Reveal delay={300} className="hidden lg:block mt-12">
                <div className="relative rounded-[28px] bg-[#1F3A2C] text-[#F5F1E8] p-9 overflow-hidden min-h-[260px]">
                  <div className="absolute -right-10 -bottom-10 w-56 h-56 rounded-full border border-white/10" />
                  <div className="absolute -right-2 -bottom-2 w-40 h-40 rounded-full border border-white/10" />
                  <div key={active} className="relative gs-swap">
                    <span className="w-16 h-16 rounded-2xl bg-white/10 grid place-items-center text-[#c5a963]">
                      <g.Icon className="w-8 h-8" strokeWidth={1.2} />
                    </span>
                    <p className="gs-index text-[#c5a963] mt-8">GOAL 0{active + 1}</p>
                    <p className="gs-h3 mt-2">{g.title}</p>
                    <p className="text-[13.5px] text-white/65 mt-3 max-w-xs leading-relaxed">{g.desc}</p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>

          {/* List */}
          <div className="lg:col-span-7">
            <ul className="border-t border-[#1F3A2C]/15">
              {GOALS.map((goal, i) => (
                <Reveal as="li" key={goal.title} delay={i * 50} className="border-b border-[#1F3A2C]/15">
                  <Link
                    href="/contact"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    data-active={active === i}
                    className="gs-goal-row grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 px-4 sm:px-6 py-7 sm:py-8 text-[#1F3A2C] rounded-none"
                  >
                    <span className="gs-index text-[#52704e]">0{i + 1}</span>
                    <span>
                      <span className="gs-goal-title block font-cormorant text-[2rem] sm:text-[2.6rem] leading-none">{goal.title}</span>
                      <span className="block lg:hidden text-[13px] opacity-75 mt-2">{goal.desc}</span>
                    </span>
                    <span className="flex items-center gap-3">
                      <goal.Icon className="w-7 h-7 opacity-80" />
                      <IconArrow className="w-4 h-4 hidden sm:block" />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </ul>
            <Reveal className="pt-10">
              <Link href="/contact" className="gs-btn gs-btn-dark !pr-2.5">
                <span>Plan your goals</span>
                <span className="gs-btn-arrow"><IconArrow className="w-3.5 h-3.5" /></span>
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
