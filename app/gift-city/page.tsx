import InvestPage, { type InvestContent } from "@/components/invest/InvestPage";

const content: InvestContent = {
  key: "gift",
  hero: {
    video: "/videos/web/city-dusk.mp4",
    poster: "/videos/web/city-dusk.jpg",
    title: ["India's global", "financial centre."],
    lead: "GIFT City IFSC opens regulated access to international and dollar-based investments, from within India.",
  },
  why: {
    title: ["Global access,", "from home ground."],
    body: "GIFT City IFSC is India's international financial centre, designed to facilitate global financial services and cross-border investments. Eligible residents and NRIs can use permitted structures to invest internationally.",
    points: ["Regulated by IFSCA", "USD-denominated structures", "For residents and NRIs, subject to eligibility"],
    image: "/images/generational_growth_luxury.jpg",
    imageAlt: "A calm, light-filled room opening onto a garden",
  },
  solutionsTitle: ["What GIFT City", "can open up."],
  solutions: [
    { title: "Global Access", desc: "Explore eligible international investment opportunities." },
    { title: "Dollar-Based Investing", desc: "Access eligible USD-denominated investment structures." },
    { title: "Cross-Border Wealth", desc: "Connect Indian and global wealth through a coordinated strategy." },
    { title: "IFSC Advantage", desc: "Explore opportunities available through India's international financial centre." },
  ],
  spread: [
    { src: "/new_images/pexels-karola-g-4386469.jpg", alt: "US dollar notes", caption: "Dollar-based, India-regulated." },
    { src: "/images/global_investing_luxury.jpg", alt: "A boardroom overlooking a city skyline at dusk", caption: "Built for the long view." },
  ],
  audiences: {
    heading: ["Who it's", "designed for."],
    items: [
      { title: "Resident Indians", desc: "Explore eligible global investment opportunities through GIFT City." },
      { title: "NRI Investors", desc: "Connect your India and global wealth through one strategy." },
      { title: "Inbound Funds", desc: "Support international capital entering India." },
      { title: "Outbound Funds", desc: "Explore opportunities for Indian capital going global." },
      { title: "Dollar Investing", desc: "Build and diversify wealth through USD-denominated opportunities." },
      { title: "Tax Planning", desc: "Navigate applicable IFSC structures and tax considerations." },
    ],
  },
  faqs: [
    { q: "What is GIFT City IFSC?", a: "GIFT City IFSC is India's international financial centre, designed to facilitate global financial services and cross-border investments." },
    { q: "Can Resident Indians invest through GIFT City?", a: "Eligible Resident Indians may access certain international investment opportunities through permitted GIFT City structures, subject to applicable regulations." },
    { q: "What investment opportunities are available through GIFT City?", a: "Depending on eligibility, investors may access opportunities such as global funds, USD-denominated investments, and other international financial products." },
    { q: "Can NRIs use GIFT City for their investments?", a: "Yes, GIFT City can provide NRIs with opportunities to connect their India-based and global financial portfolios." },
    { q: "What are the tax implications of investing through GIFT City?", a: "Tax treatment varies based on the investor, investment structure, residency, and applicable regulations. Professional advice should be taken for individual circumstances." },
    { q: "How can I know if GIFT City is right for me?", a: "It depends on your financial goals, residency, risk profile, existing portfolio, and need for international diversification. A conversation with our team can help you understand the relevant options." },
  ],
  tool: "gift-fit",
  close: {
    title: ["Is GIFT City right for you?", "Let's find out together."],
    body: "It depends on your residency, your goals and what you already hold. One conversation is usually enough to tell.",
    image: "/images/indian_wealth_luxury.jpg",
  },
  disclaimer: "Investments through GIFT City IFSC are subject to market and currency risks, and to eligibility under applicable IFSCA, RBI and FEMA regulations. Tax treatment depends on individual circumstances. Green Shoots Wealth Fintech LLP · AMFI ARN 321729.",
};

export default function GiftCityPage() {
  return <InvestPage c={content} />;
}
