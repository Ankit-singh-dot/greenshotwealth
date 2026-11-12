"use client";

import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { TreeLogo, CloseIcon } from "./Icons";
import {
  IconSprout,
  IconGrowth,
  IconVenus,
  IconBook,
  IconPeople,
  IconChat,
  IconSeed,
  IconRoots,
  IconSapling,
  IconForest,
  IconRupee,
  IconGlobe,
  IconTowers,
  IconArrow,
  IconArrowUpRight,
} from "./LineIcons";
import { onScrollFrame, lockScroll } from "./motion/scroll";

/* Routes whose first section is a dark, full-bleed hero → transparent nav on top. */
const OVERLAY_ROUTES = ["/", "/our-approach", "/indian-investing", "/invest", "/global-investing", "/gift-city", "/women-and-wealth"];

type MenuKey = "approach" | "invest" | "insights";

type NavItem = {
  name: string;
  href: string;
  Icon: (p: { className?: string }) => React.ReactElement;
  menu?: MenuKey;
  match?: string[];
};

const NAV: NavItem[] = [
  { name: "Our Approach", href: "/our-approach", Icon: IconSprout, menu: "approach" },
  { name: "Invest", href: "/indian-investing", Icon: IconGrowth, menu: "invest", match: ["/indian-investing", "/global-investing", "/gift-city", "/invest"] },
  { name: "Women & Wealth", href: "/women-and-wealth", Icon: IconVenus },
  { name: "Insights", href: "/insights", Icon: IconBook, menu: "insights" },
  { name: "Team", href: "/team", Icon: IconPeople },
  { name: "Contact", href: "/contact", Icon: IconChat },
];

const MENU_ORDER: MenuKey[] = ["approach", "invest", "insights"];

const APPROACH_STEPS = [
  { title: "Seed — Understand", desc: "Your goals, your worries, your starting point.", Icon: IconSeed },
  { title: "Roots — Plan", desc: "A simple roadmap with protection built in.", Icon: IconRoots },
  { title: "Growth — Invest", desc: "The right choices, made patiently and steadily.", Icon: IconSapling },
  { title: "Forest — Review", desc: "We keep tending it, for the next generation.", Icon: IconForest },
];

const INVEST_ITEMS = [
  { title: "India Investing", desc: "Mutual funds, goal-linked SIPs, tax-aware portfolios.", href: "/indian-investing", Icon: IconRupee, img: "/indian_investing_image.jpg", tag: "Bharat's markets" },
  { title: "Global Investing", desc: "USD accounts and international funds.", href: "/global-investing", Icon: IconGlobe, img: "/global_investing_image.jpg", tag: "Beyond borders" },
  { title: "GIFT City (IFSC)", desc: "India's international gateway for cross-border wealth.", href: "/gift-city", Icon: IconTowers, img: "/city.png", tag: "The gateway" },
];

type Post = { id: string; title: string; slug: string; category: string; readTime: string; coverImage?: string | null };

export default function Navbar() {
  const pathname = usePathname() || "/";
  const overlayRoute = OVERLAY_ROUTES.includes(pathname);

  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menu, setMenu] = useState<MenuKey | null>(null);
  const [dir, setDir] = useState(1);
  const [panelH, setPanelH] = useState(0);
  const [investHover, setInvestHover] = useState(0);
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [appOpen, setAppOpen] = useState(false);

  const linksRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [pill, setPill] = useState<{ key: string; left: number; width: number } | null>(null);
  const [currentPill, setCurrentPill] = useState<{ left: number; width: number } | null>(null);
  const paneRefs = useRef<Record<MenuKey, HTMLDivElement | null>>({ approach: null, invest: null, insights: null });
  const closeTimer = useRef<number>(0);
  const fetchedPosts = useRef(false);

  /* Scroll-driven state: solid background, hide-on-scroll-down, progress hairline */
  useEffect(() => {
    let lastY = window.scrollY;
    return onScrollFrame(({ y, vh }) => {
      setScrolled(y > 24);
      const delta = y - lastY;
      if (Math.abs(delta) > 4) {
        setHidden(delta > 0 && y > vh * 0.6);
        lastY = y;
      }
    });
  }, []);

  /* Close everything on navigation (state adjusted during render, not in an effect) */
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setMenu(null);
    setMobileOpen(false);
  }

  /* Lock page scroll for overlays */
  useEffect(() => {
    const locked = mobileOpen || loginOpen || appOpen;
    lockScroll(locked);
    return () => lockScroll(false);
  }, [mobileOpen, loginOpen, appOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenu(null);
        setMobileOpen(false);
        setLoginOpen(false);
        setAppOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* Measure the active pane so the panel height morphs between menus */
  useLayoutEffect(() => {
    if (!menu) return;
    const el = paneRefs.current[menu];
    if (!el) return;
    const measure = () => setPanelH(el.offsetHeight);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [menu, posts]);

  const loadPosts = useCallback(() => {
    if (fetchedPosts.current) return;
    fetchedPosts.current = true;
    fetch("/api/blogs?limit=3")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => setPosts(Array.isArray(d?.posts) ? d.posts.slice(0, 3) : []))
      .catch(() => setPosts([]));
  }, []);

  const openMenu = (key: MenuKey | null) => {
    window.clearTimeout(closeTimer.current);
    if (key === "insights") loadPosts();
    setMenu((prev) => {
      if (prev && key) setDir(MENU_ORDER.indexOf(key) >= MENU_ORDER.indexOf(prev) ? 1 : -1);
      return key;
    });
  };
  const scheduleClose = () => {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setMenu(null), 160);
  };

  const isCurrent = (item: NavItem) =>
    item.match ? item.match.some((m) => pathname.startsWith(m)) : pathname === item.href || pathname.startsWith(item.href + "/");

  const pillTo = (key: string, el: HTMLElement) => setPill({ key, left: el.offsetLeft, width: el.offsetWidth });

  /* When nothing is hovered, the pill rests on the current page (if it's in the bar). */
  useLayoutEffect(() => {
    const measure = () => {
      const item = NAV.find((n) => (n.match ? n.match.some((m) => pathname.startsWith(m)) : pathname === n.href || pathname.startsWith(n.href + "/")));
      const el = item ? linkRefs.current[item.name] : null;
      setCurrentPill(el ? { left: el.offsetLeft, width: el.offsetWidth } : null);
    };
    measure();
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure).catch(() => {});
    return () => window.removeEventListener("resize", measure);
  }, [pathname]);

  const solid = scrolled || !overlayRoute;
  const navClass = [
    "gs-nav",
    overlayRoute ? "is-overlay" : "",
    solid ? "is-solid" : "",
    menu ? "is-open" : "",
    scrolled ? "is-condensed" : "",
    hidden && !menu && !mobileOpen ? "is-hidden" : "",
    mobileOpen ? "is-mobile" : "",
  ].join(" ");

  return (
    <>
      {/* Spacer for routes without a full-bleed hero */}
      {!overlayRoute && <div aria-hidden className="relative z-[1] bg-[#F5F1E8]" style={{ height: "var(--nav-h)" }} />}

      <div className={`gs-backdrop ${menu ? "is-on" : ""}`} aria-hidden onMouseEnter={() => setMenu(null)} />

      <header className={navClass} onMouseLeave={scheduleClose} onMouseEnter={() => window.clearTimeout(closeTimer.current)}>
        <div className="gs-nav-row">
          {/* 1 — the mark, alone */}
          <Link href="/" className="gs-island gs-island-logo flex group" aria-label="Green Shoots Wealth — home" onMouseEnter={() => setMenu(null)}>
            <Image src="/footer_logo.png" alt="" width={80} height={73} priority className="w-[34px] h-auto transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-[-10deg] group-hover:scale-110" />
          </Link>

          {/* 2 — the pages */}
          <nav ref={linksRef} className="gs-island gs-island-links hidden xl:flex" aria-label="Primary" onMouseLeave={() => setPill(null)}>
            <span
              aria-hidden
              className="gs-pill"
              style={{
                transform: `translateX(${(pill ?? currentPill)?.left ?? 0}px)`,
                width: (pill ?? currentPill)?.width ?? 0,
                opacity: pill || currentPill ? 1 : 0,
              }}
            />
            {NAV.map((item) => {
              const active = menu === item.menu && !!item.menu;
              const current = isCurrent(item);
              const hot = pill ? pill.key === item.name : !!currentPill && current;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  ref={(el) => { linkRefs.current[item.name] = el; }}
                  className="gs-nav-link"
                  data-hot={hot}
                  data-current={current}
                  aria-current={current ? "page" : undefined}
                  aria-haspopup={item.menu ? "true" : undefined}
                  aria-expanded={item.menu ? active : undefined}
                  onMouseEnter={(e) => {
                    pillTo(item.name, e.currentTarget);
                    openMenu(item.menu ?? null);
                  }}
                  onFocus={(e) => {
                    pillTo(item.name, e.currentTarget);
                    openMenu(item.menu ?? null);
                  }}
                >
                  {current && <span className="gs-nav-dot" aria-hidden />}
                  <span>{item.name}</span>
                  {item.menu && (
                    <svg className="gs-chev" data-open={active} viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
                      <path d="M2 3.5l3 3 3-3" />
                    </svg>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* 3 — the actions */}
          <div className="gs-island gs-island-cta flex" onMouseEnter={() => setMenu(null)}>
            <button onClick={() => setLoginOpen(true)} className="hidden xl:inline-flex gs-cta-link">
              Login
            </button>
            <button onClick={() => setAppOpen(true)} className="hidden xl:inline-flex gs-cta-app group">
              <span>Get the App</span>
              <span className="gs-cta-app-arrow">
                <IconArrow className="w-3 h-3 transition-transform duration-500 group-hover:-rotate-45" />
              </span>
            </button>
            <button onClick={() => setAppOpen(true)} className="xl:hidden gs-cta-link !px-3 text-[12px]">
              Get app
            </button>
            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              className="xl:hidden grid place-items-center gs-cta-burger"
            >
              <span className={`gs-burger ${mobileOpen ? "is-open" : ""}`}>
                <i />
                <i />
              </span>
            </button>
          </div>
        </div>

        {/* ===== Mega panel ===== */}
        <div
          className="gs-mega hidden xl:block"
          data-open={!!menu}
          style={{ height: menu ? panelH : 0, ["--dir" as string]: dir }}
          onMouseEnter={() => window.clearTimeout(closeTimer.current)}
        >
          {/* Approach */}
          <div ref={(el) => { paneRefs.current.approach = el; }} className={`gs-mega-pane ${menu === "approach" ? "is-active" : ""}`}>
            <div className="gs-container py-9 grid grid-cols-12 gap-8">
              <div className="col-span-3 flex flex-col justify-between pr-6 border-r border-[#1F3A2C]/10">
                <div>
                  <span className="gs-eyebrow text-[#bda15f]">Our approach</span>
                  <p className="gs-h3 mt-4 text-[#1F3A2C]">
                    Wealth grows <em className="text-[#8fa868]">like a tree.</em>
                  </p>
                  <p className="text-[13px] text-[#5d7064] mt-3 leading-relaxed">We start with where you are, learn where you&apos;re going, and grow from there.</p>
                </div>
                <Link href="/our-approach" className="gs-link text-[#1F3A2C] mt-6 w-fit">
                  See the full approach <IconArrow className="w-3.5 h-3.5" />
                </Link>
              </div>
              <div className="col-span-6 grid grid-cols-2 gap-2">
                {APPROACH_STEPS.map((s, i) => (
                  <Link key={s.title} href="/our-approach" className="gs-mega-item gs-mega-item-in" style={{ transitionDelay: `${80 + i * 50}ms` }}>
                    <span className="gs-mega-ico"><s.Icon className="w-6 h-6" /></span>
                    <span>
                      <span className="gs-index text-[#bda15f]">0{i + 1}</span>
                      <span className="block font-cormorant text-[1.35rem] leading-tight text-[#1F3A2C] mt-0.5">{s.title}</span>
                      <span className="block text-[12.5px] text-[#5d7064] mt-1 leading-relaxed">{s.desc}</span>
                    </span>
                    <IconArrowUpRight className="gs-mega-arrow w-4 h-4" />
                  </Link>
                ))}
              </div>
              <Link href="/contact" className="col-span-3 gs-mega-feature bg-[#1F3A2C] text-[#F5F1E8] p-7 flex flex-col justify-between min-h-[260px] group">
                <Image src="/footer_logo.png" alt="" width={120} height={110} className="w-24 h-auto opacity-90" />
                <div>
                  <p className="font-cormorant italic text-2xl leading-tight">Advice that starts with a conversation.</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-[12px] font-semibold text-[#c5a963]">
                    Book a consultation <IconArrow className="w-3.5 h-3.5 transition-transform duration-500 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </div>
          </div>

          {/* Invest */}
          <div ref={(el) => { paneRefs.current.invest = el; }} className={`gs-mega-pane ${menu === "invest" ? "is-active" : ""}`}>
            <div className="gs-container py-9 grid grid-cols-12 gap-8">
              <div className="col-span-3 flex flex-col justify-between pr-6 border-r border-[#1F3A2C]/10">
                <div>
                  <span className="gs-eyebrow text-[#bda15f]">How we invest</span>
                  <p className="gs-h3 mt-4 text-[#1F3A2C]">
                    Two soils. <em className="text-[#8fa868]">One tree.</em>
                  </p>
                  <p className="text-[13px] text-[#5d7064] mt-3 leading-relaxed">Rooted in India, reaching for the world — with one plan holding it together.</p>
                </div>
                <span className="gs-index text-[#5d7064] mt-6">AMFI ARN — 321729</span>
              </div>
              <div className="col-span-5 flex flex-col gap-1.5">
                {INVEST_ITEMS.map((s, i) => (
                  <Link
                    key={s.title}
                    href={s.href}
                    onMouseEnter={() => setInvestHover(i)}
                    onFocus={() => setInvestHover(i)}
                    className="gs-mega-item gs-mega-item-in"
                    style={{ transitionDelay: `${80 + i * 60}ms` }}
                  >
                    <span className="gs-mega-ico"><s.Icon className="w-6 h-6" /></span>
                    <span>
                      <span className="block font-cormorant text-[1.45rem] leading-tight text-[#1F3A2C]">{s.title}</span>
                      <span className="block text-[12.5px] text-[#5d7064] mt-1 leading-relaxed">{s.desc}</span>
                    </span>
                    <IconArrowUpRight className="gs-mega-arrow w-4 h-4" />
                  </Link>
                ))}
              </div>
              <Link href={INVEST_ITEMS[investHover].href} className="col-span-4 gs-mega-feature min-h-[290px] bg-[#0d1f16] text-[#F5F1E8]">
                {INVEST_ITEMS.map((s, i) => (
                  <Image
                    key={s.img}
                    src={s.img}
                    alt=""
                    fill
                    sizes="400px"
                    className={`object-cover ${i === investHover ? "opacity-100" : "opacity-0"}`}
                  />
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d1f16]/90 via-[#0d1f16]/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <span key={investHover} className="block gs-swap">
                    <span className="gs-index text-[#c5a963]">0{investHover + 1} / 03</span>
                    <span className="block font-cormorant italic text-3xl mt-1">{INVEST_ITEMS[investHover].tag}</span>
                  </span>
                </div>
              </Link>
            </div>
          </div>

          {/* Insights */}
          <div ref={(el) => { paneRefs.current.insights = el; }} className={`gs-mega-pane ${menu === "insights" ? "is-active" : ""}`}>
            <div className="gs-container py-9 grid grid-cols-12 gap-8">
              <div className="col-span-3 flex flex-col justify-between pr-6 border-r border-[#1F3A2C]/10">
                <div>
                  <span className="gs-eyebrow text-[#bda15f]">Insights</span>
                  <p className="gs-h3 mt-4 text-[#1F3A2C]">
                    Money, <em className="text-[#8fa868]">minus the noise.</em>
                  </p>
                  <p className="text-[13px] text-[#5d7064] mt-3 leading-relaxed">Plain-language thinking on investing, planning and financial wellbeing.</p>
                </div>
                <Link href="/insights" className="gs-link text-[#1F3A2C] mt-6 w-fit">
                  All insights <IconArrow className="w-3.5 h-3.5" />
                </Link>
              </div>
              <div className="col-span-9 grid grid-cols-3 gap-5">
                {(posts ?? [null, null, null]).length === 0 ? (
                  <div className="col-span-3 flex items-center text-[#5d7064] text-sm">New writing is on its way. Visit the Insights page for everything published so far.</div>
                ) : (
                  (posts ?? [null, null, null]).map((p, i) =>
                    p ? (
                      <Link key={p.id} href={`/insights/${p.slug}`} className="group gs-mega-item-in" style={{ transitionDelay: `${80 + i * 60}ms` }}>
                        <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#e7e1d5] gs-mega-feature">
                          {p.coverImage && <Image src={p.coverImage} alt="" fill sizes="320px" className="object-cover" />}
                        </div>
                        <span className="gs-index text-[#bda15f] block mt-4 uppercase">{p.category} · {p.readTime}</span>
                        <span className="block font-cormorant text-[1.35rem] leading-snug text-[#1F3A2C] mt-1 group-hover:text-[#52704e] transition-colors line-clamp-2">{p.title}</span>
                      </Link>
                    ) : (
                      <div key={i} className="animate-pulse">
                        <div className="aspect-[16/10] rounded-2xl bg-[#e7e1d5]" />
                        <div className="h-3 w-24 bg-[#e7e1d5] rounded mt-4" />
                        <div className="h-5 w-4/5 bg-[#e7e1d5] rounded mt-2" />
                      </div>
                    )
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ===== Mobile menu ===== */}
      <div className={`gs-mobile xl:hidden ${mobileOpen ? "is-open" : ""}`} aria-hidden={!mobileOpen} data-lenis-prevent>
        <div className="h-[var(--nav-h)] shrink-0" />
        <div className="flex-1 overflow-y-auto px-6 pt-6 pb-10 flex flex-col">
          <ul className="flex flex-col">
            {NAV.map((item, i) => (
              <li key={item.name} className="border-b border-white/10">
                <Link href={item.href} onClick={() => setMobileOpen(false)} className="gs-mobile-link py-4">
                  <span className="flex items-baseline gap-4" style={{ transitionDelay: `${mobileOpen ? 200 + i * 60 : 0}ms` }}>
                    <span className="gs-index text-[#c5a963]">0{i + 1}</span>
                    <span className="font-cormorant text-[2.4rem] leading-none">{item.name}</span>
                  </span>
                </Link>
                {item.menu === "invest" && (
                  <div className="flex flex-wrap gap-2 pb-4 pl-9">
                    {INVEST_ITEMS.map((s) => (
                      <Link key={s.title} href={s.href} onClick={() => setMobileOpen(false)} className="text-[12px] px-3 py-1.5 rounded-full border border-white/15 text-white/80">
                        {s.title}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-10 flex flex-col gap-3">
            <button onClick={() => { setMobileOpen(false); setLoginOpen(true); }} className="gs-btn gs-btn-ghost on-dark justify-center">
              Login to Client Portal
            </button>
            <button onClick={() => { setMobileOpen(false); setAppOpen(true); }} className="gs-btn gs-btn-light justify-center">
              Download the App
            </button>
            <p className="font-cormorant italic text-xl text-white/60 text-center pt-4">Strong roots. Enduring wealth.</p>
          </div>
        </div>
      </div>

      {/* ===== Login modal ===== */}
      {loginOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-[#0d1f16]/70 backdrop-blur-sm p-4 gs-fade-in" onClick={() => setLoginOpen(false)}>
          <div className="bg-[#F5F1E8] rounded-[28px] max-w-md w-full p-9 relative shadow-2xl gs-modal-in" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Client portal login">
            <button onClick={() => setLoginOpen(false)} className="absolute top-5 right-5 w-9 h-9 rounded-full grid place-items-center text-[#1F3A2C]/60 hover:text-[#1F3A2C] hover:bg-[#1F3A2C]/5 transition-colors" aria-label="Close">
              <CloseIcon className="w-4 h-4" />
            </button>
            <TreeLogo className="w-11 h-11 mb-5" />
            <span className="gs-eyebrow text-[#bda15f]">Client portal</span>
            <h3 className="gs-h3 text-[#1F3A2C] mt-3">Welcome back.</h3>
            <p className="text-[13px] text-[#5d7064] mt-2">Access your portfolios, goal trackers and tax statements.</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const btn = e.currentTarget.querySelector("button[type='submit']") as HTMLButtonElement | null;
                if (btn) btn.innerText = "Connecting…";
                setTimeout(() => setLoginOpen(false), 800);
              }}
              className="space-y-5 mt-7"
            >
              <label className="block">
                <span className="gs-index uppercase text-[#495c51]">Registered mobile / email</span>
                <input type="text" required placeholder="you@example.com" className="mt-2 w-full bg-transparent border-b border-[#1F3A2C]/20 focus:border-[#1F3A2C] py-2.5 text-sm outline-none transition-colors" />
              </label>
              <label className="block">
                <span className="gs-index uppercase text-[#495c51]">Password / OTP</span>
                <input type="password" required placeholder="••••••••" className="mt-2 w-full bg-transparent border-b border-[#1F3A2C]/20 focus:border-[#1F3A2C] py-2.5 text-sm outline-none transition-colors" />
              </label>
              <button type="submit" className="gs-btn gs-btn-dark w-full justify-between !pr-2.5 mt-2">
                <span>Sign in to dashboard</span>
                <span className="gs-btn-arrow"><IconArrow className="w-3.5 h-3.5" /></span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ===== App modal ===== */}
      {appOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-[#0d1f16]/70 backdrop-blur-sm p-4 gs-fade-in" onClick={() => setAppOpen(false)}>
          <div className="bg-[#1F3A2C] text-[#F5F1E8] rounded-[28px] max-w-md w-full p-9 relative shadow-2xl gs-modal-in overflow-hidden" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Get the app">
            <button onClick={() => setAppOpen(false)} className="absolute top-5 right-5 w-9 h-9 rounded-full grid place-items-center text-white/60 hover:text-white hover:bg-white/10 transition-colors" aria-label="Close">
              <CloseIcon className="w-4 h-4" />
            </button>
            <Image src="/footer_logo.png" alt="" width={56} height={52} className="w-12 h-auto mb-5" />
            <span className="gs-eyebrow text-[#c5a963]">The GSW app</span>
            <h3 className="gs-h3 mt-3">Your whole financial life, <em className="text-[#8fa868]">in one quiet place.</em></h3>
            <p className="text-[13px] text-white/65 mt-2">Track investments, check your wealth score, and talk to your adviser securely.</p>
            <div className="mt-7 grid gap-3">
              <a href="https://apps.apple.com/in/app/green-shoots-wealth/id6778030809" target="_blank" rel="noopener noreferrer" onClick={() => setAppOpen(false)} className="gs-btn gs-btn-light justify-between !pr-2.5">
                <span>Download on the App Store</span>
                <span className="gs-btn-arrow"><IconArrowUpRight className="w-3.5 h-3.5" /></span>
              </a>
              <a href="https://play.google.com/store/apps/details?id=com.greenshoots.greenshootswealth" target="_blank" rel="noopener noreferrer" onClick={() => setAppOpen(false)} className="gs-btn gs-btn-ghost on-dark justify-between !pr-2.5">
                <span>Get it on Google Play</span>
                <span className="gs-btn-arrow border border-white/30"><IconArrowUpRight className="w-3.5 h-3.5" /></span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
