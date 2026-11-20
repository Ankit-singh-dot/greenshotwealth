import InvestPage, { type InvestContent } from "@/components/invest/InvestPage";

const content: InvestContent = {
  key: "global",
  hero: {
    video: "/videos/web/dubai-night.mp4",
    poster: "/videos/web/dubai-night.jpg",
    title: ["Your portfolio,", "without borders."],
    lead: "Invest beyond India across US markets, global ETFs and international funds, with one plan that ties it all back to your goals.",
  },
  why: {
    title: ["One country is one bet.", "Spread the rest."],
    body: "Markets, sectors and currencies move differently. Holding part of your wealth abroad can soften the swings of any single economy, and gives you access to companies that aren't listed in India.",
    points: ["Across markets, sectors and currencies", "Matched to your residency and goals", "Part of one plan, not a separate pot"],
    image: "/images/india_gdp_growth_4x5.webp",
    imageAlt: "UNSTOPPABLE INDIA - FY26 GDP Growth Rate ranking India as the brightest spot at 7.7% vs global economies",
  },
  solutionsTitle: ["Ways to invest", "beyond India."],
  solutions: [
    { title: "US Investing", desc: "Access US markets, including leading indices and individual stocks." },
    { title: "Global ETFs", desc: "Diversify across countries, sectors, and investment themes." },
    { title: "International Funds", desc: "Explore professionally managed global investment opportunities." },
    { title: "Global Wealth Score", desc: "Understand how diversified your portfolio is across markets and currencies." },
    { title: "Global Diversification", desc: "Build a more balanced portfolio across countries, sectors, and currencies." },
  ],
  audiences: {
    heading: ["For NRIs and", "families across borders."],
    items: [
      { title: "Global Investment Planning", desc: "Build a diversified investment strategy across India and international markets." },
      { title: "NRI Portfolio Management", desc: "Review and structure investments based on your goals, risk profile and country of residence." },
      { title: "Cross-Border Wealth Planning", desc: "Coordinate your investments and financial goals across countries and currencies." },
    ],
  },
  faqs: [
    { q: "Why should I consider global investing?", a: "Global investing can help diversify your portfolio across markets, sectors, and currencies while providing access to opportunities beyond India." },
    { q: "What global investment options are available?", a: "Depending on your goals and eligibility, options may include US investments, global ETFs, and international funds." },
    { q: "Is global investing suitable for everyone?", a: "The right approach depends on your financial goals, risk profile, investment horizon, and existing portfolio." },
    { q: "How do I get started?", a: "Speak with our wealth team to understand your goals and explore suitable global investment opportunities." },
  ],
  tool: "dollar-goal",
  close: {
    title: ["Think beyond borders.", "Build with purpose."],
    body: "We'll look at what you already hold, where you live and what you're planning for, and suggest how much belongs abroad.",
    image: "/images/generational_growth_luxury.jpg",
  },
  disclaimer: "Investments in international markets are subject to market and currency risks, and to eligibility under applicable regulations. Read all scheme-related documents carefully. Green Shoots Wealth Fintech LLP · AMFI ARN 321729.",
};

export default function GlobalInvestingPage() {
  return <InvestPage c={content} />;
}
