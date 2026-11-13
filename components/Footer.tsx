"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { InstagramIcon, LinkedinIcon, YoutubeIcon, TwitterXIcon } from "./Icons";
import { IconArrow } from "./LineIcons";
import { scrollToTarget } from "./motion/scroll";
import { useInView } from "./motion/primitives";

const COLS = [
  {
    title: "Explore",
    links: [
      { label: "Our Approach", href: "/our-approach" },
      { label: "Women & Wealth", href: "/women-and-wealth" },
      { label: "Team", href: "/team" },
      { label: "Insights", href: "/insights" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Invest",
    links: [
      { label: "India Investing", href: "/indian-investing" },
      { label: "Global Investing", href: "/global-investing" },
      { label: "GIFT City (IFSC)", href: "/gift-city" },
      { label: "Wealth score", href: "/#wealth-score" },
    ],
  },
  {
    title: "Offices",
    links: [
      { label: "Mumbai · HQ", href: "" },
      { label: "Ahmedabad", href: "" },
      { label: "Valsad", href: "" },
    ],
  },
  {
    title: "Compliance",
    links: [
      { label: "AMFI ARN 321729", href: "" },
      { label: "Privacy Policy", href: "#privacy" },
      { label: "Disclaimer", href: "#disclaimer" },
      { label: "Grievance Redressal", href: "#grievance" },
    ],
  },
];

const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/wealthwithsaloni/", Icon: InstagramIcon },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/greenshootswealth/", Icon: LinkedinIcon },
  { label: "YouTube", href: "https://www.youtube.com/@salonimehtaofficial", Icon: YoutubeIcon },
  { label: "X (Twitter)", href: "https://twitter.com", Icon: TwitterXIcon },
];

/**
 * The closing line, set huge. Letters rise from below the edge when the
 * footer arrives; each lifts and turns gold under the pointer.
 */
function Wordmark() {
  const [ref, inView] = useInView<HTMLDivElement>({ threshold: 0.35 });
  const words: { text: string; italic?: boolean }[] = [{ text: "Beyond" }, { text: "wealth" }, { text: "management.", italic: true }];
  let n = 0;
  return (
    <div ref={ref} className={`gs-wm ${inView ? "is-in" : ""}`} aria-label="Beyond wealth management.">
      {words.map((w, wi) => (
        <span key={w.text} className={`gs-wm-word ${w.italic ? "is-italic" : ""} ${wi === 1 ? "md:mr-[0.22em]" : ""}`} aria-hidden>
          {w.text.split("").map((ch) => {
            const i = n++;
            return (
              <span key={i} className="gs-wm-ch" style={{ ["--i" as string]: i }}>
                {ch}
              </span>
            );
          })}
        </span>
      ))}
    </div>
  );
}

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "footer" }),
      });
      if (res.ok) {
        setSubscribed(true);
        setEmail("");
      }
    } catch (err) {
      console.error("Newsletter subscription error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="gs-footer relative w-full bg-[#0f2219] text-[#F5F1E8] overflow-hidden">
      {/* the close */}
      <div className="gs-container pt-20 sm:pt-24 pb-14 grid grid-cols-1 lg:grid-cols-12 gap-10 items-end border-b border-white/10">
        <h2 className="lg:col-span-8 font-cormorant font-normal text-[clamp(2.4rem,5vw,4.6rem)] leading-[0.98] tracking-[-0.02em]">
          Every forest started
          <br />
          <em className="text-[#c9d7b3]">as a conversation.</em>
        </h2>
        <div className="lg:col-span-4 lg:justify-self-end flex flex-col items-start lg:items-end gap-5">
          <Link href="/contact" className="gs-btn gs-btn-light !pr-2.5">
            <span>Book a consultation</span>
            <span className="gs-btn-arrow"><IconArrow className="w-3.5 h-3.5" /></span>
          </Link>
          <p className="text-[14px] text-white/70 flex flex-wrap gap-x-5 gap-y-1">
            <a href="tel:+919819773888" className="gs-foot-link hover:text-white">+91 98197 73888</a>
            <a href="mailto:contact@greenshootswealth.com" className="gs-foot-link hover:text-white">contact@greenshootswealth.com</a>
          </p>
        </div>
      </div>

      {/* newsletter + links */}
      <div className="gs-container py-14 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4">
          <p className="font-cormorant text-[1.7rem] leading-tight">
            Letters, <em className="text-[#c9d7b3]">not noise.</em>
          </p>
          <p className="text-[13.5px] text-white/60 mt-3 max-w-xs leading-relaxed">Occasional notes on investing, planning and money in plain words. No spam.</p>
          <form onSubmit={handleSubscribe} className="relative max-w-sm mt-6">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              aria-label="Email address"
              className="w-full bg-transparent border-b border-white/25 focus:border-[#c5a963] py-3 pr-28 text-[14px] placeholder:text-white/35 outline-none transition-colors"
            />
            <button
              type="submit"
              disabled={loading}
              className="absolute right-0 bottom-2 px-4 py-1.5 rounded-full bg-[#c5a963] text-[#132a1f] text-[12px] font-semibold disabled:opacity-60 hover:bg-[#F5F1E8] transition-colors"
            >
              {loading ? "Saving…" : subscribed ? "Subscribed" : "Subscribe"}
            </button>
          </form>
        </div>

        <nav aria-label="Footer" className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
          {COLS.map((col) => (
            <div key={col.title}>
              <p className="text-[11px] tracking-[0.18em] uppercase text-[#c5a963]">{col.title}</p>
              <ul className="mt-4 space-y-2.5 text-[14px] text-white/70">
                {col.links.map((l) =>
                  l.href ? (
                    <li key={l.label}>
                      <Link href={l.href} className="gs-foot-link hover:text-white transition-colors">
                        {l.label}
                      </Link>
                    </li>
                  ) : (
                    <li key={l.label} className="text-white/85">{l.label}</li>
                  )
                )}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      {/* rail */}
      <div className="gs-container py-5 border-t border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="flex items-center gap-3">
          <Image src="/footer_logo.png" alt="" width={40} height={37} className="w-9 h-auto" />
          <span className="text-[12px] text-white/55">© {new Date().getFullYear()} Green Shoots Wealth Fintech LLP</span>
        </div>
        <div className="flex items-center gap-2">
          {SOCIALS.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-9 h-9 rounded-full border border-white/15 grid place-items-center text-white/70 hover:text-[#132a1f] hover:bg-[#c5a963] hover:border-[#c5a963] transition-colors"
            >
              <Icon className="w-3.5 h-3.5" />
            </a>
          ))}
          <button
            onClick={() => scrollToTarget(0, 0)}
            className="ml-2 h-9 pl-4 pr-3 rounded-full border border-white/15 inline-flex items-center gap-2 text-[12px] text-white/70 hover:text-white hover:border-white/50 transition-colors"
            aria-label="Back to top"
          >
            Top <IconArrow className="w-3.5 h-3.5 -rotate-90" />
          </button>
        </div>
      </div>

      {/* the wordmark, rising from the bottom edge */}
      <div className="gs-container pt-4">
        <Wordmark />
      </div>

      <p className="gs-container pb-6 pt-2 text-[11px] text-white/40 leading-relaxed">
        Mutual fund investments are subject to market risks. Read all scheme-related documents carefully.
      </p>
    </footer>
  );
}
