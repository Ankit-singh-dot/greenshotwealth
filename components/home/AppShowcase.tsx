"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { IconArrowUpRight } from "../LineIcons";
import { AppleIcon, GooglePlayIcon } from "../Icons";
import { Parallax, Reveal, RevealLines, useInView } from "../motion/primitives";
import { prefersReducedMotion } from "../motion/scroll";

const SCREENS = [
  {
    label: "Logo",
    line: "The Green Shoots gateway: rooted in trust, built for enduring wealth.",
    src: "/images/app_screen_splash.webp",
  },
  {
    label: "Dashboard",
    line: "Live portfolio valuation, equity-debt asset breakdown, and daily performance.",
    src: "/images/app_screen_dashboard.webp",
  },
  {
    label: "My Goals",
    line: "Milestone roadmap tracking retirement, family homes, and future targets.",
    src: "/images/app_screen_goals.webp",
  },
];

const DURATION = 5000;

export default function AppShowcase() {
  const [active, setActive] = useState(0);
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.3, once: false });

  useEffect(() => {
    if (!inView || prefersReducedMotion()) return;
    const t = window.setTimeout(() => setActive((v) => (v + 1) % SCREENS.length), DURATION);
    return () => window.clearTimeout(t);
  }, [active, inView]);

  return (
    <section id="download" className="w-full bg-[#F5F1E8] py-20 sm:py-28" aria-label="The Green Shoots Wealth app">
      <div className="gs-container">
        <div ref={ref} className="relative rounded-[36px] bg-[#1F3A2C] text-[#F5F1E8] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="lg:col-span-6 p-8 sm:p-12 lg:p-16 relative z-10">
              <Reveal variant="fade"><span className="gs-eyebrow text-[#c5a963]">The GSW App</span></Reveal>
              <RevealLines as="h2" className="gs-h1 mt-6" lines={[<>Your plan,</>, <em key="p" className="text-[#8fa868]">in your pocket.</em>]} />

              <div className="mt-10 flex flex-wrap gap-2" role="tablist" aria-label="App screens">
                {SCREENS.map((s, i) => (
                  <button
                    key={s.label}
                    role="tab"
                    aria-selected={i === active}
                    onClick={() => setActive(i)}
                    className={`relative overflow-hidden px-4 py-2 rounded-full text-[12.5px] font-semibold border transition-all duration-300 ${
                      i === active ? "border-[#c5a963] text-[#F5F1E8] bg-[#c5a963]/15 shadow-sm scale-105" : "border-white/15 text-white/55 hover:text-white hover:border-white/30"
                    }`}
                  >
                    {i === active && inView && (
                      <span key={active} className="gs-timer is-running absolute inset-0 bg-[#c5a963]/25" style={{ ["--dur" as string]: `${DURATION}ms` }} />
                    )}
                    <span className="relative">{s.label}</span>
                  </button>
                ))}
              </div>
              <p key={active} className="gs-swap mt-6 text-[15px] text-white/80 min-h-[1.5em] leading-relaxed">{SCREENS[active].line}</p>

              <div className="mt-10 flex flex-wrap items-center gap-3">
                <a
                  href="https://apps.apple.com/in/app/green-shoots-wealth/id6778030809"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gs-btn gs-btn-light"
                >
                  <AppleIcon className="w-4 h-4 fill-current" />
                  <span>App Store</span>
                  <IconArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=com.greenshoots.greenshootswealth"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gs-btn gs-btn-ghost text-[#F5F1E8]"
                >
                  <GooglePlayIcon className="w-4 h-4 fill-current" />
                  <span>Google Play</span>
                  <IconArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Phone, rising out of the bottom edge of the card */}
            <div className="lg:col-span-6 relative h-[460px] sm:h-[540px] lg:h-[660px]">
              <svg viewBox="0 0 600 600" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] max-w-none opacity-[0.12]" fill="none" stroke="#F5F1E8" aria-hidden>
                {[120, 180, 240, 300].map((r) => (
                  <circle key={r} cx="300" cy="300" r={r} strokeWidth="1" />
                ))}
              </svg>
              <Parallax speed={-0.08} className="absolute left-1/2 top-8 sm:top-12 -translate-x-1/2 w-[250px] sm:w-[290px]">
                <div
                  onClick={() => setActive((v) => (v + 1) % SCREENS.length)}
                  title="Click to switch screen"
                  className="rounded-[44px] p-2.5 bg-[#0d1f16] border border-white/15 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] cursor-pointer group hover:border-[#c5a963]/40 transition-colors"
                >
                  <div className="relative rounded-[36px] overflow-hidden bg-black aspect-[945/2048]">
                    <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-20 h-5 rounded-full bg-black z-30" />
                    {SCREENS.map((s, i) => (
                      <div
                        key={s.src}
                        className={`absolute inset-0 transition-[opacity,transform] duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                          i === active ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-3 scale-[0.98] pointer-events-none"
                        }`}
                      >
                        <Image
                          src={s.src}
                          alt={`Green Shoots Wealth app — ${s.label}`}
                          fill
                          sizes="290px"
                          priority={i === 0}
                          className="object-cover object-top select-none"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </Parallax>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
