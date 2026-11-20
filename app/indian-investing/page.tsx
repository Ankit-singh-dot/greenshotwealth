import InvestPage, { type InvestContent } from "@/components/invest/InvestPage";

const content: InvestContent = {
  key: "india",
  hero: {
    video: "/videos/web/india.mp4",
    poster: "/videos/web/india.jpg",
    title: ["Build wealth in", "India's growing economy."],
    lead: "From your first SIP to a multi-crore portfolio, we help you invest across Indian markets with a strategy built around your goals, risk and time horizon.",
  },
  why: {
    title: ["India has opportunities.", "Choosing well is the hard part."],
    body: "There are thousands of schemes, and new ones every month. We narrow it down to the few that fit your goals, your timeline and the amount of risk you can live with.",
    points: ["Linked to your goals, not to trends", "Tax-aware from the start", "Reviewed, never forgotten"],
    image: "/images/indian_investing_advisory_4x5.webp",
    imageAlt: "Growing Wealth Across Indian Markets — Investment solutions across Mutual Funds, SIP, Equity, Fixed Income, Multi-Asset, SIF, Insurance, and Retirement Planning",
  },
  solutionsTitle: ["What we can", "help you build."],
  solutions: [
    { title: "Mutual Funds", desc: "Diversified, professionally managed investment solutions." },
    { title: "SIP Solutions", desc: "Build investing discipline through regular contributions." },
    { title: "Equity", desc: "Participate in India's long-term growth through equity investments." },
    { title: "Debt & Fixed Income", desc: "Add stability and income to your portfolio." },
    { title: "Hybrid & Multi-Asset", desc: "Balance growth and diversification across asset classes." },
    { title: "SIF", desc: "Explore specialized investment strategies for eligible investors." },
    { title: "PMS / AIFs", desc: "Access curated portfolio management services and high-conviction alternative investment funds." },
    { title: "Insurance Planning", desc: "Protect your family, income, and financial goals." },
    { title: "Retirement Planning", desc: "Plan today for financial independence tomorrow." },
    { title: "Estate Planning", desc: "Plan, protect, and pass on your wealth." },
  ],
  faqs: [
    { q: "What is the minimum amount required to start investing?", a: "The minimum depends on the investment product and platform. We'll help you identify suitable options based on your goals and circumstances." },
    { q: "Is SIP an investment product?", a: "SIP is an investment method that allows you to invest a fixed amount periodically, commonly into mutual funds." },
    { q: "Are mutual funds safe?", a: "Mutual funds are market-linked investments and are not risk-free. The level of risk depends on the underlying assets and strategy. Investors should consider the scheme's risk profile before investing. SEBI's Riskometer is designed to help investors understand the risk level of mutual-fund schemes." },
    { q: "How do I know which mutual fund is right for me?", a: "The appropriate investment depends on factors such as your goals, time horizon, risk profile and financial situation." },
    { q: "What is an SIF?", a: "A Specialized Investment Fund is a SEBI-regulated investment structure offering specialized strategies, subject to applicable eligibility and investment requirements." },
    { q: "What are PMS and AIFs?", a: "Portfolio Management Services (PMS) provide concentrated, customized equity portfolios managed on a discretionary basis (minimum investment of ₹50 Lakh). Alternative Investment Funds (AIFs) offer high-conviction exposure to private equity, venture capital, structured debt, and long-short strategies (minimum investment of ₹1 Crore)." },
    { q: "Can I invest for retirement through mutual funds?", a: "Mutual funds can form part of a retirement strategy, but the appropriate approach depends on your goals, time horizon, risk profile and overall financial plan." },
  ],
  tool: "sip",
  close: {
    title: ["Start with your goals.", "We'll find the right fit."],
    body: "Tell us what you're building towards. We'll show you the options that suit it, in plain words.",
    image: "/images/generational_growth_luxury.jpg",
  },
  disclaimer: "Mutual fund investments are subject to market risks. Read all scheme-related documents carefully. Green Shoots Wealth Fintech LLP · AMFI ARN 321729.",
};

export default function IndianInvestingPage() {
  return <InvestPage c={content} />;
}
