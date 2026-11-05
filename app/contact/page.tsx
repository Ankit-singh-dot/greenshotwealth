"use client";

import React, { useState } from "react";
import {
  ArrowRightIcon,
  ChevronDownIcon,
  InstagramIcon,
  LinkedinIcon,
  YoutubeIcon,
  TwitterXIcon,
  ThreadsIcon,
} from "@/components/Icons";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full bg-[#F5F1E8] py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Form Section */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#bda15f]">
                LETS CONNECT
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-[54px] text-[#1F3A2C] mt-2 font-normal leading-[1.18]">
                Let&apos;s talk about your <br />
                <span className="italic text-[#6e8f66]">financial goals.</span>
              </h1>
              <p className="text-sm sm:text-base text-[#5d7064] font-sans mt-3">
                Tell us where you are today and what you want to build next.
              </p>
            </div>

            {submitted ? (
              <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#e8e2d4] shadow-sm text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center mx-auto text-2xl font-bold">
                  ✓
                </div>
                <h3 className="font-serif text-2xl font-semibold text-[#1F3A2C]">
                  Consultation Request Received
                </h3>
                <p className="text-sm text-[#5d7064] font-sans max-w-md mx-auto">
                  Thank you, <span className="font-semibold text-[#1F3A2C]">{formData.fullName || "Rohan Gupta"}</span>. A senior wealth adviser from our Mumbai team will reach out within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ fullName: "", phone: "", email: "", service: "", message: "" });
                  }}
                  className="mt-4 text-xs font-semibold text-[#1F3A2C] hover:underline"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 pt-1">
                {/* Row 1: Full Name & Phone Number */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#495c51] mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="Rohan Gupta"
                      className="w-full px-4 py-3.5 rounded-2xl bg-white border border-[#ded8cb] text-sm text-[#1F3A2C] placeholder:text-[#a0b0a5] focus:outline-none focus:ring-2 focus:ring-[#1F3A2C] shadow-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#495c51] mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="6399 9976 24"
                      className="w-full px-4 py-3.5 rounded-2xl bg-white border border-[#ded8cb] text-sm text-[#1F3A2C] placeholder:text-[#a0b0a5] focus:outline-none focus:ring-2 focus:ring-[#1F3A2C] shadow-xs"
                    />
                  </div>
                </div>

                {/* Row 2: Email */}
                <div>
                  <label className="block text-xs font-medium text-[#495c51] mb-1.5">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="rohangupta@gmail.com"
                    className="w-full px-4 py-3.5 rounded-2xl bg-white border border-[#ded8cb] text-sm text-[#1F3A2C] placeholder:text-[#a0b0a5] focus:outline-none focus:ring-2 focus:ring-[#1F3A2C] shadow-xs"
                  />
                </div>

                {/* Row 3: Dropdown Service */}
                <div>
                  <label className="block text-xs font-medium text-[#495c51] mb-1.5">
                    What can we help you with?
                  </label>
                  <div className="relative">
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-2xl bg-white border border-[#ded8cb] text-sm text-[#1F3A2C] focus:outline-none focus:ring-2 focus:ring-[#1F3A2C] appearance-none cursor-pointer pr-10 shadow-xs"
                    >
                      <option value="">Select a Service</option>
                      <option value="mutual_funds">Mutual Funds &amp; Goal-Linked SIPs</option>
                      <option value="retirement">Retirement &amp; Pension Architecture</option>
                      <option value="portfolio_review">Portfolio Review &amp; Rebalancing</option>
                      <option value="insurance">Insurance Optimization (Life &amp; Health)</option>
                      <option value="women_wealth">Women &amp; Wealth Advisory</option>
                      <option value="gift_city">Global Investing / GIFT City IFSC</option>
                      <option value="estate">Estate &amp; Succession Planning</option>
                    </select>
                    <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-400">
                      <ChevronDownIcon className="w-4 h-4 text-[#8fa868]" />
                    </div>
                  </div>
                </div>

                {/* Row 4: Message */}
                <div>
                  <label className="block text-xs font-medium text-[#495c51] mb-1.5">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your goal"
                    className="w-full px-4 py-3.5 rounded-2xl bg-white border border-[#ded8cb] text-sm text-[#1F3A2C] placeholder:text-[#a0b0a5] focus:outline-none focus:ring-2 focus:ring-[#1F3A2C] resize-none shadow-xs"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-4 px-6 rounded-full bg-[#1F3A2C] hover:bg-[#172e23] text-white font-medium text-sm transition-all shadow-md flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    <span>Book a Consultation</span>
                    <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Contact Details, Social Pill & Office Map */}
          <div className="lg:col-span-5 space-y-5">
            {/* Top Row: Contact Details Card + Vertical Social Strip */}
            <div className="flex gap-4 items-stretch">
              {/* Contact Details Card */}
              <div className="flex-1 bg-white rounded-3xl p-6 sm:p-7 shadow-xs border border-[#ded8cb]/60 flex flex-col justify-between space-y-4">
                <h3 className="font-serif text-2xl sm:text-[26px] font-normal text-[#1F3A2C] italic leading-tight">
                  Green Shoots Wealth
                </h3>

                <div className="space-y-3.5 pt-1">
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-[#798e82] font-sans">
                      Address
                    </span>
                    <p className="text-xs text-[#283d31] font-sans mt-0.5 leading-relaxed font-medium">
                      601, Sai Fortune Business Centre <br />
                      Tilak Road, Ghatkopar East <br />
                      Mumbai 400077
                    </p>
                  </div>

                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-[#798e82] font-sans">
                      Phone / WhatsApp
                    </span>
                    <a
                      href="https://wa.me/919819773888"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[#283d31] font-sans mt-0.5 block font-medium hover:text-emerald-700 transition-colors"
                    >
                      +91 98197 73888
                    </a>
                  </div>

                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-[#798e82] font-sans">
                      Email
                    </span>
                    <a
                      href="mailto:rohangupta@gmail.com"
                      className="text-xs text-[#283d31] font-sans mt-0.5 block font-medium hover:text-emerald-700 transition-colors"
                    >
                      rohangupta@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Vertical Social Pill Card */}
              <div className="w-16 bg-white rounded-3xl py-6 px-2 shadow-xs border border-[#ded8cb]/60 flex flex-col items-center justify-between shrink-0">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#F5F1E8] border border-[#ded8cb] flex items-center justify-center text-[#283d31] hover:bg-[#1F3A2C] hover:text-white transition-all shadow-xs"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#F5F1E8] border border-[#ded8cb] flex items-center justify-center text-[#283d31] hover:bg-[#1F3A2C] hover:text-white transition-all shadow-xs"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#F5F1E8] border border-[#ded8cb] flex items-center justify-center text-[#283d31] hover:bg-[#1F3A2C] hover:text-white transition-all shadow-xs"
                  aria-label="YouTube"
                >
                  <YoutubeIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#F5F1E8] border border-[#ded8cb] flex items-center justify-center text-[#283d31] hover:bg-[#1F3A2C] hover:text-white transition-all shadow-xs"
                  aria-label="X (Twitter)"
                >
                  <TwitterXIcon className="w-3.5 h-3.5" />
                </a>
                <a
                  href="https://threads.net"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-[#F5F1E8] border border-[#ded8cb] flex items-center justify-center text-[#283d31] hover:bg-[#1F3A2C] hover:text-white transition-all shadow-xs"
                  aria-label="Threads"
                >
                  <ThreadsIcon className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Bottom Row: Office Map Card */}
            <div className="bg-white rounded-3xl p-3 shadow-xs border border-[#ded8cb]/60 overflow-hidden">
              <div className="relative w-full h-64 sm:h-72 rounded-2xl overflow-hidden bg-[#e5e3df]">
                {/* Embedded Interactive Google Map */}
                <iframe
                  title="Sai Fortune Business Centre Location"
                  src="https://maps.google.com/maps?q=Sai+Fortune+Business+Centre+Tilak+Road+Ghatkopar+East+Mumbai&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0 filter contrast-[1.02]"
                  loading="lazy"
                  allowFullScreen={false}
                  referrerPolicy="no-referrer-when-downgrade"
                />

                {/* Floating Figma-Style Google Place Card */}
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-[#e0dad0] max-w-[220px] pointer-events-auto">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-semibold text-xs text-[#1F3A2C] leading-tight line-clamp-1">
                        Sai Fortune Business Cen...
                      </h4>
                      <p className="text-[10px] text-gray-500 line-clamp-1 mt-0.5">
                        1105, Tilak Rd, Maheshwar Nag...
                      </p>
                      <div className="flex items-center gap-1 mt-1 text-[10px] text-amber-500 font-medium">
                        <span>4.0</span>
                        <span>★★★★☆</span>
                        <span className="text-gray-400 font-normal">(5)</span>
                      </div>
                    </div>
                    <a
                      href="https://maps.google.com/?q=Sai+Fortune+Business+Centre+Ghatkopar+East+Mumbai"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 rounded-md hover:bg-neutral-100 text-blue-600 shrink-0"
                      title="View larger map"
                    >
                      <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                        <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                      </svg>
                    </a>
                  </div>
                  <div className="mt-2.5 pt-2 border-t border-gray-100 flex items-center justify-between">
                    <a
                      href="https://maps.google.com/maps/dir//Sai+Fortune+Business+Centre+Tilak+Road+Ghatkopar+East+Mumbai"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    >
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
                      </svg>
                      <span>Directions</span>
                    </a>
                    <a
                      href="https://maps.google.com/?q=Sai+Fortune+Business+Centre+Ghatkopar+East+Mumbai"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[10px] text-gray-500 hover:text-gray-700"
                    >
                      View larger map
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
