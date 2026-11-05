"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { InstagramIcon, LinkedinIcon, YoutubeIcon, TwitterXIcon } from "./Icons";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="w-full bg-[#1F3A2C] text-white pt-16 sm:pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section - Exact Figma Properties */}
        <div className="pb-16 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-xl space-y-2">
            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#c5a963] block font-sans">
              NEWSLETTER
            </span>
            {/* Heading matching Figma: Cormorant Garamond 600 Italic 48px / 63px */}
            <h2 className="font-cormorant italic font-semibold text-[36px] sm:text-[44px] lg:text-[48px] leading-[1.18] sm:leading-[63px] text-white tracking-normal">
              <span>Stay informed. </span>
              <span className="text-[#8fa868]">Stay ahead.</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#cfded5] font-sans leading-relaxed pt-1">
              Get our latest insights on investing, planning and financial wellbeing.
            </p>
          </div>

          <div className="w-full lg:w-auto">
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2 max-w-md">
              <div className="relative flex items-center bg-white rounded-full p-1.5 pl-6 shadow-sm w-full sm:w-[440px]">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full bg-transparent text-[#1F3A2C] placeholder:text-gray-400 text-xs sm:text-sm focus:outline-none pr-3 font-sans"
                />
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-[#1F3A2C] hover:bg-[#12281c] text-white text-xs font-semibold tracking-wide transition-all shrink-0 cursor-pointer font-sans"
                >
                  {subscribed ? "Subscribed! ✓" : "Subscribe"}
                </button>
              </div>
            </form>
            <p className="text-xs text-[#a5b8aa] mt-2.5 font-sans">
              No spam. Just thoughtful updates, every now and then.
            </p>
          </div>
        </div>

        {/* Links & Brand Columns - Seamless flow with no intermediate border */}
        <div className="pt-2 pb-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand Info Column - Vertically stacked emblem, brand, gold rule, motto, location, socials */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex flex-col items-start">
              {/* White circular tree emblem from uploaded screenshot */}
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 mb-2">
                <Image
                  src="/images/tree_circle_white.png"
                  alt="Green Shoots Wealth Tree Emblem"
                  width={56}
                  height={56}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Brand Title */}
              <div className="brand-logo-text text-white text-base sm:text-[17px] leading-none">
                Green Shoot Wealth
              </div>

              {/* Gold rules + FINTECH LLP */}
              <div className="flex items-center gap-2 mt-1">
                <div className="w-6 h-[1px] bg-[#ba9749]" />
                <span className="text-[10px] tracking-[0.22em] text-[#ba9749] uppercase font-sans font-medium">
                  FINTECH LLP
                </span>
                <div className="w-6 h-[1px] bg-[#ba9749]" />
              </div>
            </div>

            {/* Tagline: Strong roots. Enduring wealth. (Cormorant Garamond SemiBold Italic) */}
            <p className="font-cormorant italic font-semibold text-2xl sm:text-3xl text-white pt-2 leading-tight">
              <span>Strong roots. </span>
              <span className="text-[#8fa868]">Enduring wealth.</span>
            </p>

            <p className="text-xs text-[#cfded5]/80 font-sans">
              Green Shoots Wealth Fintech LLP. Mumbai, India.
            </p>

            {/* Outlined Social Icons */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-[#3b5f4c] flex items-center justify-center text-[#cfded5] hover:text-[#c5a963] hover:border-[#c5a963] transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-[#3b5f4c] flex items-center justify-center text-[#cfded5] hover:text-[#c5a963] hover:border-[#c5a963] transition-colors"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-[#3b5f4c] flex items-center justify-center text-[#cfded5] hover:text-[#c5a963] hover:border-[#c5a963] transition-colors"
                aria-label="YouTube"
              >
                <YoutubeIcon className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-[#3b5f4c] flex items-center justify-center text-[#cfded5] hover:text-[#c5a963] hover:border-[#c5a963] transition-colors"
                aria-label="X (Twitter)"
              >
                <TwitterXIcon className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Column 2: Explore (Heading in Cormorant Garamond Italic Gold) */}
          <div>
            <h4 className="font-cormorant italic text-xl text-[#c5a963] mb-4 font-normal">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-[13px] text-[#cfded5]/90 font-sans">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/our-approach" className="hover:text-white transition-colors">
                  Our Approach
                </Link>
              </li>
              <li>
                <Link href="/indian-investing" className="hover:text-white transition-colors">
                  India Investing
                </Link>
              </li>
              <li>
                <Link href="/global-investing" className="hover:text-white transition-colors">
                  Global Investing
                </Link>
              </li>
              <li>
                <Link href="/gift-city" className="hover:text-white transition-colors">
                  GIFT City
                </Link>
              </li>
              <li>
                <Link href="/team" className="hover:text-white transition-colors">
                  Team
                </Link>
              </li>
              <li>
                <Link href="/insights" className="hover:text-white transition-colors">
                  Insights
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Services (Heading in Cormorant Garamond Italic Gold) */}
          <div>
            <h4 className="font-cormorant italic text-xl text-[#c5a963] mb-4 font-normal">
              Services
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-[13px] text-[#cfded5]/90 font-sans">
              <li>
                <Link href="/#what-we-do" className="hover:text-white transition-colors">
                  Investing
                </Link>
              </li>
              <li>
                <Link href="/#what-we-do" className="hover:text-white transition-colors">
                  Insurance
                </Link>
              </li>
              <li>
                <Link href="/#what-we-do" className="hover:text-white transition-colors">
                  Financial Planning
                </Link>
              </li>
              <li>
                <Link href="/#what-we-do" className="hover:text-white transition-colors">
                  Portfolio Review
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Compliance (Heading in Cormorant Garamond Italic Gold) */}
          <div>
            <h4 className="font-cormorant italic text-xl text-[#c5a963] mb-4 font-normal">
              Compliance
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-[13px] text-[#cfded5]/90 font-sans">
              <li className="text-[#cfded5]/90 font-medium">AMFI ARN — 321729</li>
              <li>
                <a href="#privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#disclaimer" className="hover:text-white transition-colors">
                  Disclaimer
                </a>
              </li>
              <li>
                <a href="#grievance" className="hover:text-white transition-colors">
                  Grievance Redressal
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer & Copyright Bottom Row with delicate gold divider */}
        <div className="pt-8 border-t border-[#c5a963]/35 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#cfded5]/70 font-sans">
          <p>© 2026 Green Shoots Wealth Fintech LLP. All rights reserved.</p>
          <p className="text-center md:text-right max-w-xl">
            Mutual fund investments are subject to market risks. Read all scheme related documents carefully.
          </p>
        </div>
      </div>
    </footer>
  );
}
