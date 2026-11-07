"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { TreeLogo, ArrowRightIcon, ChevronDownIcon, MenuIcon, CloseIcon } from "./Icons";

export default function Navbar() {
  const pathname = usePathname();
  const [investOpen, setInvestOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [appModalOpen, setAppModalOpen] = useState(false);

  const navLinks = [
    { name: "Our Approach", href: "/our-approach" },
    {
      name: "Invest",
      href: "/indian-investing",
      hasDropdown: true,
      items: [
        { title: "India Investing", desc: "Mutual funds, goal-linked SIPs, tax-aware portfolios", href: "/indian-investing" },
        { title: "Global Investing", desc: "USD accounts & international funds", href: "/global-investing" },
        { title: "GIFT City (IFSC)", desc: "India's international financial gateway for cross-border wealth", href: "/gift-city" },
      ],
    },
    { name: "Women & Wealth", href: "/women-and-wealth" },
    { name: "Insight", href: "/insights" },
    { name: "Team", href: "/team" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-[#F5F1E8]/95 backdrop-blur-md border-b border-[#e7e1d5] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group">
            <TreeLogo className="w-9 h-9 sm:w-10 sm:h-10 group-hover:scale-105 transition-transform" />
            <span className="brand-logo-text text-[#1F3A2C] leading-none whitespace-nowrap">
              Green Shoot Wealth
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((item) => {
              if (item.hasDropdown) {
                return (
                  <div
                    key={item.name}
                    className="relative"
                    onMouseEnter={() => setInvestOpen(true)}
                    onMouseLeave={() => setInvestOpen(false)}
                  >
                    <button
                      className={`flex items-center gap-1 text-[13.5px] font-medium tracking-wide transition-colors py-2 ${
                        pathname.startsWith("/invest") ? "text-[#1F3A2C] font-semibold" : "text-[#41554a] hover:text-[#1F3A2C]"
                      }`}
                    >
                      {item.name}
                      <ChevronDownIcon className="w-3.5 h-3.5 opacity-70" />
                    </button>
                    {investOpen && (
                      <div className="absolute top-full left-0 w-72 bg-white rounded-2xl shadow-xl border border-neutral-100 p-2.5 flex flex-col gap-1 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                        {item.items?.map((sub) => (
                          <Link
                            key={sub.title}
                            href={sub.href}
                            onClick={() => setInvestOpen(false)}
                            className="p-3 rounded-xl hover:bg-[#F5F1E8] transition-colors group flex flex-col"
                          >
                            <span className="text-xs font-semibold text-[#1F3A2C] group-hover:text-emerald-700 flex items-center justify-between">
                              {sub.title}
                              <ArrowRightIcon className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </span>
                            <span className="text-[11px] text-[#6d7c73] mt-0.5 leading-relaxed">
                              {sub.desc}
                            </span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-[13.5px] font-medium tracking-wide transition-colors py-1 ${
                    isActive ? "text-[#1F3A2C] font-semibold border-b border-[#1F3A2C]" : "text-[#41554a] hover:text-[#1F3A2C]"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right CTAs */}
          <div className="hidden lg:flex items-center gap-5">
            <button
              onClick={() => setLoginModalOpen(true)}
              className="text-[13.5px] font-medium text-[#1F3A2C] hover:text-emerald-800 transition-colors px-2 py-1"
            >
              Login
            </button>
            <button
              onClick={() => setAppModalOpen(true)}
              className="inline-flex items-center gap-2 bg-[#1F3A2C] hover:bg-[#172e23] text-white text-[13px] font-medium px-5 py-2.5 rounded-full shadow-sm hover:shadow transition-all group"
            >
              <span>Get the App</span>
              <ArrowRightIcon className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-3">
            <button
              onClick={() => setAppModalOpen(true)}
              className="bg-[#1F3A2C] text-white text-xs font-medium px-3.5 py-1.5 rounded-full"
            >
              Get App
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[#1F3A2C] p-2 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#F5F1E8] border-b border-[#e7e1d5] px-6 py-6 flex flex-col gap-4 animate-in slide-in-from-top duration-200">
            {navLinks.map((item) => {
              if (item.hasDropdown) {
                return (
                  <div key={item.name} className="flex flex-col border-b border-neutral-200/60 py-1">
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-base font-medium text-[#1F3A2C]"
                    >
                      {item.name}
                    </Link>
                    <div className="pl-3 pt-1.5 pb-1 flex flex-col gap-1.5">
                      {item.items?.map((sub) => (
                        <Link
                          key={sub.title}
                          href={sub.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="text-xs text-[#52704e] font-semibold flex items-center gap-1.5"
                        >
                          <span>• {sub.title}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-medium text-[#1F3A2C] py-1 border-b border-neutral-200/60"
                >
                  {item.name}
                </Link>
              );
            })}
            <div className="pt-2 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setLoginModalOpen(true);
                }}
                className="w-full text-center py-2.5 border border-[#1F3A2C] text-[#1F3A2C] rounded-full text-sm font-medium"
              >
                Login to Client Portal
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setAppModalOpen(true);
                }}
                className="w-full text-center py-2.5 bg-[#1F3A2C] text-white rounded-full text-sm font-medium"
              >
                Download Mobile App
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Login Modal */}
      {loginModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 relative shadow-2xl animate-in zoom-in-95 duration-150">
            <button
              onClick={() => setLoginModalOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-700"
            >
              <CloseIcon className="w-5 h-5" />
            </button>
            <div className="text-center mb-6">
              <TreeLogo className="w-12 h-12 mx-auto mb-3" />
              <h3 className="font-serif text-2xl font-semibold text-[#1F3A2C]">Client Portal Login</h3>
              <p className="text-xs text-[#5f7065] mt-1 font-sans">
                Access your portfolios, goal trackers, and tax statements.
              </p>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const btn = e.currentTarget.querySelector("button[type='submit']") as HTMLButtonElement | null;
                if (btn) btn.innerText = "Connecting...";
                setTimeout(() => {
                  setLoginModalOpen(false);
                }, 800);
              }}
              className="space-y-4 text-left"
            >
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#495c51] mb-1">
                  Registered Mobile / Email
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. rohan@example.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1F3A2C] text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#495c51] mb-1">
                  Password / OTP
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#1F3A2C] text-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-[#1F3A2C] hover:bg-[#172e23] text-white rounded-xl text-sm font-medium transition-colors"
              >
                Sign In to Dashboard →
              </button>
            </form>
          </div>
        </div>
      )}

      {/* App Download Modal */}
      {appModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 relative shadow-2xl text-center">
            <button
              onClick={() => setAppModalOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-700"
            >
              <CloseIcon className="w-5 h-5" />
            </button>
            <TreeLogo className="w-12 h-12 mx-auto mb-3" />
            <h3 className="font-serif text-2xl font-semibold text-[#1F3A2C]">Get Green Shoots App</h3>
            <p className="text-xs text-[#5f7065] mt-1 mb-6">
              Track investments, check wealth score, and chat with your adviser securely.
            </p>
            <div className="space-y-3">
              <a
                href="https://apps.apple.com/in/app/green-shoots-wealth/id6778030809"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setAppModalOpen(false)}
                className="flex items-center justify-center gap-3 w-full py-3 bg-black text-white rounded-xl text-sm font-medium hover:bg-neutral-800 transition-colors"
              >
                <span> Download on App Store</span>
              </a>
              <a
                href="https://play.google.com/store/apps/details?id=com.greenshoots.greenshootswealth"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setAppModalOpen(false)}
                className="flex items-center justify-center gap-3 w-full py-3 bg-[#1F3A2C] text-white rounded-xl text-sm font-medium hover:bg-[#172e23] transition-colors"
              >
                <span>▶ Get it on Google Play</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

