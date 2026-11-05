"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function InsightsPage() {
  const [activeTab, setActiveTab] = useState<"All" | "Blogs" | "Articles" | "Video">("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeVideoModal, setActiveVideoModal] = useState<string | null>(null);

  // 6 user-provided images: Img_insight_1 to 3 for Blogs, Img_insight_4 to 6 for Articles
  const blogs = [
    {
      id: 1,
      img: "/img_insights_1.jpg",
      title: "The Discipline Behind Long-Term Investing",
      desc: "It's not about timing the market. It's about time in the market.",
      date: "Mar 10, 2025",
    },
    {
      id: 2,
      img: "/img_insights_2.jpg",
      title: "The Discipline Behind Long-Term Investing",
      desc: "It's not about timing the market. It's about time in the market.",
      date: "Mar 10, 2025",
    },
    {
      id: 3,
      img: "/img_insights_3.jpg",
      title: "The Discipline Behind Long-Term Investing",
      desc: "It's not about timing the market. It's about time in the market.",
      date: "Mar 10, 2025",
    },
  ];

  const articles = [
    {
      id: 1,
      img: "/img_insights_4.jpg",
      title: "How to Build a More Resilient Investment Portfolio",
      desc: "Five principles to help you build a portfolio that stays aligned with your goals.",
      readTime: "6 min read",
      date: "Mar 5, 2025",
    },
    {
      id: 2,
      img: "/img_insights_5.jpg",
      title: "How to Build a More Resilient Investment Portfolio",
      desc: "Five principles to help you build a portfolio that stays aligned with your goals.",
      readTime: "6 min read",
      date: "Mar 5, 2025",
    },
    {
      id: 3,
      img: "/img_insights_6.jpg",
      title: "How to Build a More Resilient Investment Portfolio",
      desc: "Five principles to help you build a portfolio that stays aligned with your goals.",
      readTime: "6 min read",
      date: "Mar 5, 2025",
    },
  ];

  // Video shorts (vertical) & feature masterclasses (landscape) with rich imagery
  const shortVideos = [
    { id: 1, title: "Compounding Explained Simply", img: "/images/video_short_1.jpg" },
    { id: 2, title: "SIP vs Lumpsum in Volatile Times", img: "/images/video_short_2.jpg" },
    { id: 3, title: "The 3 Pillars of Protection", img: "/images/video_short_3.jpg" },
    { id: 4, title: "Understanding Asset Allocation", img: "/images/video_short_4.jpg" },
    { id: 5, title: "What Wealth Creation Really Means", img: "/images/video_short_5.jpg" },
  ];

  const featureVideos = [
    { id: 1, title: "Market Cycles & Investor Behavior Masterclass", duration: "18 mins", img: "/images/video_feat_1.jpg" },
    { id: 2, title: "Retirement Architecture: Replacing Paychecks with SWPs", duration: "24 mins", img: "/images/video_feat_2.jpg" },
    { id: 3, title: "GIFT City IFSC: Demystifying Dollar Investing", duration: "21 mins", img: "/images/video_feat_3.jpg" },
    { id: 4, title: "Women & Wealth: Navigating Career Breaks & Portfolios", duration: "16 mins", img: "/images/video_feat_4.jpg" },
  ];

  const showBlogs = (activeTab === "All" || activeTab === "Blogs") && searchQuery === "";
  const showArticles = (activeTab === "All" || activeTab === "Articles") && searchQuery === "";
  const showVideos = (activeTab === "All" || activeTab === "Video") && searchQuery === "";

  return (
    <div className="w-full flex flex-col bg-[#F5F1E8] min-h-screen">
      {/* 1. TOP BAR: FILTERS & SEARCH (MATCHING SCREENSHOT 1) */}
      <section className="w-full pt-10 sm:pt-14 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            {/* Filter Pills */}
            <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-1 sm:pb-0">
              {(["All", "Blogs", "Articles", "Video"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setSearchQuery("");
                  }}
                  className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all cursor-pointer shrink-0 ${
                    activeTab === tab
                      ? "bg-[#1F3A2C] text-white shadow-sm"
                      : "bg-white text-[#526658] hover:bg-neutral-50 border border-[#e8e2d4]/80 shadow-2xs"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Search Input with Magnifier Icon */}
            <div className="relative w-full sm:w-80">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Insights"
                className="w-full pl-5 pr-10 py-2.5 rounded-full bg-white border border-[#e8e2d4]/90 text-xs sm:text-sm text-[#1F3A2C] placeholder:text-[#9ca3af] focus:outline-none focus:ring-1 focus:ring-[#1F3A2C] shadow-2xs font-sans"
              />
              <div className="absolute inset-y-0 right-3.5 flex items-center pointer-events-none text-gray-400">
                <svg className="w-4 h-4 text-[#8a9d90]" viewBox="0 0 20 20" fill="none" stroke="currentColor">
                  <path
                    d="M17.5 17.5L13.875 13.875M15.8333 9.16667C15.8333 12.8486 12.8486 15.8333 9.16667 15.8333C5.48477 15.8333 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5C12.8486 2.5 15.8333 5.48477 15.8333 9.16667Z"
                    strokeWidth="1.67"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BLOGS SECTION (MATCHING SCREENSHOT 1) */}
      {showBlogs && (
        <section className="w-full py-10 sm:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            {/* Header */}
            <div className="flex items-end justify-between border-b border-transparent pb-1">
              <div>
                <span className="font-cormorant italic text-lg sm:text-xl text-[#c5a963] block font-normal leading-tight">
                  Blogs
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-[34px] font-normal leading-tight text-[#1F3A2C] mt-1">
                  <span>Our thoughts on markets, </span>
                  <span className="font-cormorant italic font-semibold text-[#8fa868]">
                    planning and life.
                  </span>
                </h2>
              </div>
              <Link
                href="/contact"
                className="font-cormorant italic text-sm sm:text-base text-[#1F3A2C] hover:text-[#8fa868] transition-colors shrink-0 group flex items-center gap-1 font-medium"
              >
                <span>See all</span>
                <span className="group-hover:translate-x-0.5 transition-transform">→</span>
              </Link>
            </div>

            {/* 3 Blog Cards using user-provided Img_insight_1, 2, 3 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              {blogs.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl overflow-hidden shadow-xs border border-[#e8e2d4]/70 hover:shadow-lg transition-all duration-300 flex flex-col group cursor-pointer"
                >
                  <div className="relative h-56 sm:h-60 w-full overflow-hidden bg-neutral-100">
                    <Image
                      src={item.img}
                      alt={item.title}
                      fill
                      priority
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 sm:p-7 flex flex-col justify-between flex-1 space-y-3">
                    <div className="space-y-2">
                      <h3 className="font-sans font-semibold text-lg sm:text-xl text-[#1F3A2C] leading-snug group-hover:text-emerald-900 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-[13px] text-[#5d7064] leading-relaxed font-sans">
                        {item.desc}
                      </p>
                    </div>
                    <div className="pt-2 text-[11px] text-[#8a9d90] font-sans font-medium">
                      {item.date}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3. ARTICLES SECTION (MATCHING SCREENSHOT 2) */}
      {showArticles && (
        <section className="w-full py-10 sm:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            {/* Header */}
            <div className="flex items-end justify-between border-b border-transparent pb-1">
              <div>
                <span className="font-cormorant italic text-lg sm:text-xl text-[#c5a963] block font-normal leading-tight">
                  Articles
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-[34px] font-normal leading-tight text-[#1F3A2C] mt-1">
                  <span>In-depth reads on </span>
                  <span className="font-cormorant italic font-semibold text-[#8fa868]">
                    topics that matter.
                  </span>
                </h2>
              </div>
              <Link
                href="/contact"
                className="font-cormorant italic text-sm sm:text-base text-[#1F3A2C] hover:text-[#8fa868] transition-colors shrink-0 group flex items-center gap-1 font-medium"
              >
                <span>See all</span>
                <span className="group-hover:translate-x-0.5 transition-transform">→</span>
              </Link>
            </div>

            {/* 3 Article Cards using user-provided Img_insight_4, 5, 6 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              {articles.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl overflow-hidden shadow-xs border border-[#e8e2d4]/70 hover:shadow-lg transition-all duration-300 flex flex-col group cursor-pointer"
                >
                  <div className="relative h-56 sm:h-60 w-full overflow-hidden bg-neutral-100">
                    <Image
                      src={item.img}
                      alt={item.title}
                      fill
                      priority
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 sm:p-7 flex flex-col justify-between flex-1 space-y-3">
                    <div className="space-y-2">
                      <h3 className="font-sans font-semibold text-lg sm:text-xl text-[#1F3A2C] leading-snug group-hover:text-emerald-900 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-[13px] text-[#5d7064] leading-relaxed font-sans">
                        {item.desc}
                      </p>
                    </div>
                    <div className="pt-2 text-[11px] text-[#8a9d90] font-sans font-medium flex items-center gap-2">
                      <span>{item.readTime}</span>
                      <span>|</span>
                      <span>{item.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. VIDEO SECTION (MATCHING SCREENSHOT 3) */}
      {showVideos && (
        <section className="w-full py-10 sm:py-14">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            {/* Header */}
            <div className="flex items-end justify-between border-b border-transparent pb-1">
              <div>
                <span className="font-cormorant italic text-lg sm:text-xl text-[#c5a963] block font-normal leading-tight">
                  Video
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-[34px] font-normal leading-tight text-[#1F3A2C] mt-1">
                  <span>Quick ideas. </span>
                  <span className="font-cormorant italic font-semibold text-[#8fa868]">
                    Lasting impact.
                  </span>
                </h2>
              </div>
              <Link
                href="/contact"
                className="font-cormorant italic text-sm sm:text-base text-[#1F3A2C] hover:text-[#8fa868] transition-colors shrink-0 group flex items-center gap-1 font-medium"
              >
                <span>See all</span>
                <span className="group-hover:translate-x-0.5 transition-transform">→</span>
              </Link>
            </div>

            {/* Row 1: 5 Vertical Short-form Video Cards (Reels Style) with AI generated visuals */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 pt-2">
              {shortVideos.map((vid) => (
                <div
                  key={vid.id}
                  onClick={() => setActiveVideoModal(vid.title)}
                  className="relative h-64 sm:h-72 rounded-2xl bg-[#163022] hover:bg-[#1a3a29] border border-[#244533] p-4 flex flex-col justify-end group cursor-pointer transition-all shadow-sm overflow-hidden"
                >
                  {/* AI Generated Video Still Background */}
                  <Image
                    src={vid.img}
                    alt={vid.title}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-60"
                  />

                  {/* Subtle inner gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent pointer-events-none" />

                  {/* Circular Play Button Icon at Bottom Left & Title */}
                  <div className="relative z-10 space-y-2">
                    <div className="w-8 h-8 rounded-full border border-white/80 flex items-center justify-center text-white text-[11px] group-hover:scale-110 group-hover:bg-white group-hover:text-[#163022] group-hover:border-white transition-all shadow-sm">
                      <span className="ml-0.5">▶</span>
                    </div>
                    <div className="font-sans text-xs text-white/95 font-medium leading-snug line-clamp-2">
                      {vid.title}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Row 2: 4 Larger Landscape Video Cards (2x2 Grid) with AI generated visuals */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              {featureVideos.map((vid) => (
                <div
                  key={vid.id}
                  onClick={() => setActiveVideoModal(vid.title)}
                  className="relative h-52 sm:h-60 rounded-2xl bg-[#163022] hover:bg-[#1a3a29] border border-[#244533] p-6 flex flex-col justify-end group cursor-pointer transition-all shadow-sm overflow-hidden"
                >
                  {/* AI Generated Masterclass Video Thumbnail */}
                  <Image
                    src={vid.img}
                    alt={vid.title}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-55"
                  />

                  {/* Subtle inner gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                  {/* Circular Play Button Icon at Bottom Left & Metadata */}
                  <div className="relative z-10 flex items-end justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full border border-white/80 flex items-center justify-center text-white text-xs group-hover:scale-110 group-hover:bg-white group-hover:text-[#163022] group-hover:border-white transition-all shadow-sm shrink-0">
                        <span className="ml-0.5">▶</span>
                      </div>
                      <div>
                        <div className="font-sans text-sm sm:text-base font-semibold text-white leading-tight">
                          {vid.title}
                        </div>
                        <div className="text-[11px] text-[#8fa868] font-sans mt-0.5 font-medium">
                          {vid.duration}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. SEARCH RESULTS (IF USER TYPES A SEARCH QUERY) */}
      {searchQuery !== "" && (
        <section className="w-full py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <h3 className="font-serif text-xl text-[#1F3A2C]">
              Search results for &ldquo;{searchQuery}&rdquo;:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...blogs, ...articles]
                .filter(
                  (item) =>
                    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    item.desc.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-3xl overflow-hidden shadow-xs border border-[#e8e2d4]/70 p-6 space-y-3"
                  >
                    <h4 className="font-sans font-semibold text-lg text-[#1F3A2C]">
                      {item.title}
                    </h4>
                    <p className="text-xs text-[#5d7064]">{item.desc}</p>
                    <div className="text-[11px] text-[#8a9d90]">{item.date}</div>
                  </div>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. THE GSW APP CARD (MATCHING SCREENSHOT 4) */}
      <section className="w-full py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="relative bg-white rounded-3xl p-10 sm:p-14 border border-[#e8e2d4] shadow-sm text-center space-y-5 overflow-hidden">
            {/* Exact Figma White Silk Draped Wave Background */}
            <div
              className="absolute inset-0 bg-cover bg-center pointer-events-none"
              style={{ backgroundImage: "url('/images/card_silk_exact.jpg')" }}
            />

            <div className="relative z-10 space-y-3 max-w-xl mx-auto">
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#bda15f] block font-sans">
                THE GSW APP
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-[42px] text-[#1F3A2C] font-normal leading-tight">
                <span>Your whole financial life, </span><br />
                <span className="italic">
                  in one quiet place.
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-[#5d7064] font-sans max-w-md mx-auto leading-relaxed pt-1">
                Track investments, set goals, get nudges from your advisor, and learn at your pace. Free to download. Always.
              </p>

              <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                <a
                  href="https://apps.apple.com/in/app/green-shoots-wealth/id6778030809"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-black text-white text-xs font-semibold hover:bg-neutral-800 transition-colors shadow-sm cursor-pointer"
                >
                  <span> Download on the App Store</span>
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=com.greenshoots.greenshootswealth"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#1b3628] text-white text-xs font-semibold hover:bg-[#12281c] transition-colors shadow-sm cursor-pointer"
                >
                  <span>▶ GET IT ON Google Play</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal Preview */}
      {activeVideoModal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={() => setActiveVideoModal(null)}
        >
          <div
            className="bg-[#163022] text-white rounded-3xl p-8 max-w-md w-full border border-white/10 space-y-4 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto text-2xl text-[#8fa868]">
              ▶
            </div>
            <h3 className="font-serif text-2xl font-normal">{activeVideoModal}</h3>
            <p className="text-xs text-[#cfded5] font-sans">
              Video stream connection established. Full episode launching with the GSW Academy.
            </p>
            <button
              onClick={() => setActiveVideoModal(null)}
              className="mt-4 px-6 py-2.5 rounded-full bg-white text-[#163022] text-xs font-semibold cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
