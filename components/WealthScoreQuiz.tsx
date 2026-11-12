"use client";

import React, { useState } from "react";
import { StarOutlineIcon, ArrowRightIcon } from "./Icons";
import Link from "next/link";
import { Reveal, RevealLines } from "./motion/primitives";

interface Question {
  id: number;
  question: string;
  options: { label: string; score: number }[];
}

const quizQuestions: Question[] = [
  {
    id: 1,
    question: "Do you have an emergency fund covering 6+ months of expenses?",
    options: [
      { label: "Yes, fully funded", score: 20 },
      { label: "Partially saved", score: 14 },
      { label: "Working on it", score: 8 },
      { label: "Not yet", score: 2 },
    ],
  },
  {
    id: 2,
    question: "What portion of monthly post-tax income do you invest consistently?",
    options: [
      { label: "30% or more (Aggressive compounding)", score: 20 },
      { label: "15% to 30% (Healthy discipline)", score: 15 },
      { label: "5% to 15% (Building momentum)", score: 10 },
      { label: "Less than 5% or irregularly", score: 4 },
    ],
  },
  {
    id: 3,
    question: "Do you hold adequate personal term and family health insurance?",
    options: [
      { label: "Comprehensive term + health coverage", score: 20 },
      { label: "Only corporate health insurance", score: 12 },
      { label: "Traditional endowment/money-back plans", score: 8 },
      { label: "No active personal insurance", score: 2 },
    ],
  },
  {
    id: 4,
    question: "Are your investments mapped to distinct life goals (retirement, children, home)?",
    options: [
      { label: "100% goal-mapped with asset allocation", score: 20 },
      { label: "Partially mapped to key milestones", score: 14 },
      { label: "General wealth building without deadlines", score: 9 },
      { label: "Ad-hoc investing based on tips", score: 3 },
    ],
  },
  {
    id: 5,
    question: "How do you react when equity markets fall 15% in a quarter?",
    options: [
      { label: "View as opportunity and top-up SIPs", score: 20 },
      { label: "Hold patiently and stick to plan", score: 16 },
      { label: "Feel nervous but take no action", score: 10 },
      { label: "Pause SIPs or redeem in panic", score: 3 },
    ],
  },
];

export default function WealthScoreQuiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [, setActiveTab] = useState("wellness");
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [leadData, setLeadData] = useState({ fullName: "", email: "", phone: "" });
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [submittingLead, setSubmittingLead] = useState(false);

  const handleSelectOption = (score: number) => {
    const updated = [...selectedAnswers];
    updated[currentStep] = score;
    setSelectedAnswers(updated);

    if (currentStep < quizQuestions.length - 1) {
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, 180);
    } else {
      setTimeout(() => {
        setQuizCompleted(true);
      }, 220);
    }
  };

  const totalScore = selectedAnswers.reduce((acc, curr) => acc + (curr || 0), 0);

  const resetQuiz = () => {
    setCurrentStep(0);
    setSelectedAnswers([]);
    setQuizCompleted(false);
    setLeadSubmitted(false);
    setLeadData({ fullName: "", email: "", phone: "" });
  };

  const handleSaveAssessment = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingLead(true);
    try {
      await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          totalScore,
          level: getScoreSummary().level,
          answers: selectedAnswers.map((score, idx) => ({
            questionId: quizQuestions[idx].id,
            question: quizQuestions[idx].question,
            score,
          })),
          fullName: leadData.fullName,
          email: leadData.email,
          phone: leadData.phone,
        }),
      });
      setLeadSubmitted(true);
    } catch (err) {
      console.error("Quiz save error:", err);
    } finally {
      setSubmittingLead(false);
    }
  };

  const getScoreSummary = () => {
    if (totalScore >= 80) {
      return {
        level: "Exemplary Financial Resilience",
        description: "Your financial discipline is rock solid! You are well-positioned for long-term compounding with strong defenses against unforeseen surprises.",
        recommendation: "Focus on tax-efficient harvesting, global diversification via GIFT City, and estate planning.",
      };
    }
    if (totalScore >= 55) {
      return {
        level: "Good Foundation with Key Gaps",
        description: "You have sound financial awareness, but some vulnerabilities in insurance depth or goal-mapping could slow your progress.",
        recommendation: "Separate investment from insurance, lock in pure term protection, and align SIPs with strict time horizons.",
      };
    }
    return {
      level: "Opportunity for Structured Planning",
      description: "You are currently exposed to liquidity shocks and inflation risk. With the right roadmap, you can quickly build an enduring safety net.",
      recommendation: "Start with an emergency reserve fund and a simple automated ₹1,000+ monthly SIP into low-cost index funds.",
    };
  };

  return (
    <section className="w-full bg-[#1F3A2C] text-white py-28 sm:py-36 relative overflow-hidden">
      <div aria-hidden className="absolute -left-40 top-1/2 -translate-y-1/2 w-[640px] h-[640px] rounded-full border border-white/[0.06]" />
      <div aria-hidden className="absolute -left-20 top-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full border border-white/[0.06]" />
      <div className="gs-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Heading & Tools */}
          <div className="lg:col-span-6 space-y-6">
            <Reveal variant="fade"><span className="gs-eyebrow text-[#c5a963]">Wealth score</span></Reveal>
            <RevealLines
              as="h2"
              className="gs-h1 text-white mt-2"
              lines={[<>What&apos;s your</>, <em key="b" className="text-[#8fa868]">wealth score?</em>]}
            />
            <Reveal delay={150}>
              <p className="gs-lead text-white/75 max-w-lg">
                Two minutes. No email needed. An honest picture of your savings, investments, protection &amp; readiness for surprises.
              </p>
            </Reveal>

            {/* 4 Tool Badges / Pills: Solid White Pills matching Figma Image 2 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-4 max-w-lg">
              {[
                { id: "wellness", label: "Financial Wellness Score" },
                { id: "stress", label: "Financial Stress Index" },
                { id: "age", label: "Wealth Age Calculator" },
                { id: "personality", label: "Money Personality Profile" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    resetQuiz();
                  }}
                  className="bg-white hover:bg-[#EEF0D9] text-[#1F3A2C] px-5 py-3 rounded-full text-xs sm:text-[13px] font-medium transition-colors shadow-sm flex items-center gap-2.5 w-full text-left"
                >
                  <StarOutlineIcon className="w-3.5 h-3.5 text-[#1F3A2C] shrink-0" />
                  <span className="truncate">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Quiz Card matching Figma Image 2 */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-[28px] sm:rounded-[32px] p-7 sm:p-10 shadow-2xl border border-white/20 text-[#1F3A2C] min-h-[400px] flex flex-col justify-between">
              {!quizCompleted ? (
                <div>
                  {/* Step Tracker with Dash indicators matching Figma */}
                  <div className="flex items-center justify-between pb-4">
                    <span className="text-[11px] font-semibold tracking-[0.2em] text-[#8fa868] uppercase font-sans">
                      QUESTION {currentStep + 1} OF {quizQuestions.length}
                    </span>
                    {/* 5 Segmented bars */}
                    <div className="flex items-center gap-1.5">
                      {quizQuestions.map((_, idx) => (
                        <div
                          key={idx}
                          className={`h-1 sm:h-1.5 rounded-full transition-all duration-300 ${
                            idx === currentStep
                              ? "w-6 sm:w-7 bg-[#1F3A2C]"
                              : "w-6 sm:w-7 bg-[#e2e8df]"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Question Title in Cormorant Garamond matching Figma */}
                  <div className="py-4">
                    <h3 className="font-cormorant text-2xl sm:text-[28px] lg:text-[30px] text-[#1F3A2C] font-normal leading-tight">
                      {quizQuestions[currentStep].question}
                    </h3>
                  </div>

                  {/* Options: Rectangular boxes matching Figma Image 2 */}
                  <div className="space-y-3 pt-2">
                    {quizQuestions[currentStep].options.map((opt, oIdx) => {
                      const isChosen = selectedAnswers[currentStep] === opt.score;
                      return (
                        <button
                          key={oIdx}
                          onClick={() => handleSelectOption(opt.score)}
                          className={`w-full text-left px-5 py-3.5 rounded-md border text-sm sm:text-[15px] font-normal transition-all block ${
                            isChosen
                              ? "border-[#1F3A2C] bg-[#f4f7f3] text-[#1F3A2C] font-medium shadow-xs"
                              : "border-[#e5e7eb] hover:border-[#1F3A2C] hover:bg-[#fafaf8] text-[#374151]"
                          }`}
                        >
                          {opt.label}
                        </button>
                      );
                    })}
                  </div>

                  {/* Subtle back button if past question 1 */}
                  {currentStep > 0 && (
                    <div className="pt-4 flex justify-start">
                      <button
                        onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                        className="text-xs text-gray-400 hover:text-[#1F3A2C] transition-colors"
                      >
                        ← Back to previous question
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                /* Results View */
                <div className="text-center py-4 flex flex-col justify-between h-full">
                  <div>
                    <span className="text-xs font-semibold tracking-wider uppercase text-[#1F3A2C] bg-[#EEF0D9] px-4 py-1.5 rounded-full inline-block mb-3">
                      Your Assessment Result
                    </span>
                    <div className="font-cormorant text-6xl font-normal text-[#1F3A2C] my-2">
                      {totalScore}<span className="text-2xl text-gray-400 font-normal">/100</span>
                    </div>
                    <h4 className="font-cormorant text-2xl sm:text-3xl font-normal text-[#1F3A2C] mt-2">
                      {getScoreSummary().level}
                    </h4>
                    <p className="text-sm text-[#495c51] mt-2 max-w-md mx-auto leading-relaxed font-sans">
                      {getScoreSummary().description}
                    </p>
                    <div className="bg-[#F5F1E8] p-4 rounded-xl mt-4 text-xs text-left text-[#2f4237] border border-[#e8e2d4]">
                      <span className="font-semibold block text-[#1F3A2C] mb-1">
                        Recommended Next Step:
                      </span>
                      {getScoreSummary().recommendation}
                    </div>

                    {/* Lead Capture Form */}
                    <div className="mt-5 p-4 rounded-xl border border-gray-200 bg-white text-left shadow-2xs">
                      {leadSubmitted ? (
                        <div className="py-2 text-center text-emerald-800 text-xs font-medium">
                          ✓ Your assessment has been saved. Our team will review your responses!
                        </div>
                      ) : (
                        <form onSubmit={handleSaveAssessment} className="space-y-2.5">
                          <p className="text-xs font-semibold text-[#1F3A2C]">
                            Request a Personalized Portfolio Review
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <input
                              type="text"
                              required
                              placeholder="Your Name"
                              value={leadData.fullName}
                              onChange={(e) => setLeadData({ ...leadData, fullName: e.target.value })}
                              className="px-3 py-2 text-xs rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#1F3A2C] text-neutral-800"
                            />
                            <input
                              type="tel"
                              required
                              placeholder="Phone Number"
                              value={leadData.phone}
                              onChange={(e) => setLeadData({ ...leadData, phone: e.target.value })}
                              className="px-3 py-2 text-xs rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#1F3A2C] text-neutral-800"
                            />
                          </div>
                          <input
                            type="email"
                            placeholder="Email Address (optional)"
                            value={leadData.email}
                            onChange={(e) => setLeadData({ ...leadData, email: e.target.value })}
                            className="w-full px-3 py-2 text-xs rounded-lg border border-gray-200 focus:outline-none focus:ring-1 focus:ring-[#1F3A2C] text-neutral-800"
                          />
                          <button
                            type="submit"
                            disabled={submittingLead}
                            className="w-full py-2.5 bg-[#8fa868] hover:bg-[#7d9657] disabled:opacity-60 text-white font-medium text-xs rounded-lg transition-colors"
                          >
                            {submittingLead ? "Saving..." : "Submit to Adviser"}
                          </button>
                        </form>
                      )}
                    </div>
                  </div>

                  <div className="pt-5 space-y-2">
                    <Link
                      href="/contact"
                      className="w-full inline-flex items-center justify-center gap-2 py-3.5 bg-[#1F3A2C] hover:bg-[#172e23] text-white rounded-full text-sm font-medium transition-colors shadow-sm"
                    >
                      <span>Discuss Your Plan with an Adviser</span>
                      <ArrowRightIcon className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={resetQuiz}
                      className="text-xs text-gray-500 hover:text-black py-2"
                    >
                      Retake Assessment
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
