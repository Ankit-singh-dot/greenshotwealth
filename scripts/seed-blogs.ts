import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const samplePosts = [
  {
    title: "The Discipline Behind Long-Term Investing",
    slug: "discipline-behind-long-term-investing",
    excerpt: "It's not about timing the market. It's about time in the market. How compounding turns patience into generational independence.",
    category: "Investing",
    type: "BLOG",
    coverImage: "/img_insights_1.jpg",
    author: "Saloni Mehta",
    authorRole: "Founder & Wealth Architect",
    readTime: "4 min read",
    featured: true,
    published: true,
    content: `
      <h2>The Fallacy of Market Timing</h2>
      <p>Every market cycle brings an unavoidable barrage of noise—speculative forecasts, geopolitical anxieties, and short-term volatility alerts. Yet, when we examine decades of global and Indian capital market history, one mathematical truth stands unshaken: <strong>the compounding of capital rewards continuous participation, not predictive timing.</strong></p>

      <div class="notion-callout">
        💡 <strong>Core Wealth Law:</strong> Missing just the 10 best trading days across a 20-year horizon can cut total portfolio compounding by more than 50%. Staying invested through drawdowns is where enduring alpha is forged.
      </div>

      <h2>Three Pillars of Investment Discipline</h2>
      <p>True discipline is not an emotion; it is an engineered architecture that protects an investor from their own instinctual biases.</p>

      <ul>
        <li><strong>Automated Capital Deployment (SIPs & STP):</strong> Removing emotional discretion from regular inflows turns volatility from a hazard into a dollar-cost-averaging asset.</li>
        <li><strong>Asset Allocation Over Security Selection:</strong> Academic research confirms that over 90% of long-term return variance is determined by asset allocation, not individual stock picking.</li>
        <li><strong>Rebalancing Discipline:</strong> Systematically trimming assets that have surged above target allocations to reallocate into temporarily depressed asset classes.</li>
      </ul>

      <blockquote>
        "The stock market is a device for transferring money from the impatient to the patient." — Benjamin Graham
      </blockquote>

      <h2>Building Roots That Endure</h2>
      <p>At Green Shoots Wealth, we believe your wealth plan must resemble a resilient banyan tree—deep underground root networks of emergency reserves, pure term protection, and clear liability mapping, before branching into equity compounding.</p>
    `,
  },
  {
    title: "Understanding Asset Allocation in Volatile Markets",
    slug: "understanding-asset-allocation-volatile-markets",
    excerpt: "Why the mathematical relationship between uncorrelated asset classes is the ultimate free lunch in modern wealth architecture.",
    category: "Wealth Architecture",
    type: "BLOG",
    coverImage: "/img_insights_2.jpg",
    author: "Saloni Mehta",
    authorRole: "Founder & Wealth Architect",
    readTime: "5 min read",
    featured: false,
    published: true,
    content: `
      <h2>The Real Engine of Portfolio Health</h2>
      <p>Investors often spend 90% of their energy debating which mutual fund scheme or stock will outperform next quarter. However, extensive portfolio theory demonstrates that asset allocation—the balance between domestic equity, debt instruments, global equities, and cash equivalents—is the single greatest predictor of returns.</p>

      <div class="notion-callout">
        📌 <strong>Mathematical Principle:</strong> Combining two uncorrelated asset classes reduces overall portfolio volatility without necessarily diluting long-term compounded returns.
      </div>

      <h2>Structuring Across Life Stages</h2>
      <p>Asset allocation is not a static formula; it is an evolving framework tuned to human milestones:</p>
      <ol>
        <li><strong>Accumulation Phase (Ages 25–45):</strong> High equity exposure (70-80%) optimized for long-term purchasing power expansion and inflation resistance.</li>
        <li><strong>Transition Phase (Ages 45–55):</strong> Gradual debt de-risking and consolidation into goal-specific buckets (children's education, early independence).</li>
        <li><strong>Distribution & Estate Phase (Ages 55+):</strong> Capital protection, steady cash flow yields, and seamless intergenerational transfer structures.</li>
      </ol>
    `,
  },
  {
    title: "GIFT City IFSC: The Gateway to Dollar Wealth for Indians",
    slug: "gift-city-ifsc-gateway-dollar-wealth",
    excerpt: "How Gujarat International Finance Tec-City opens friction-free access to USD-denominated global funds, tax exemptions, and offshore trusts.",
    category: "Global & GIFT City",
    type: "BLOG",
    coverImage: "/img_insights_3.jpg",
    author: "Saloni Mehta",
    authorRole: "Founder & Wealth Architect",
    readTime: "6 min read",
    featured: false,
    published: true,
    content: `
      <h2>India's Global Financial Frontier</h2>
      <p>For decades, Indian resident investors and NRIs faced complex currency conversion costs and restrictive regulatory hurdles when seeking offshore diversification. The emergence of GIFT City IFSC (Gujarat International Finance Tec-City) has fundamentally restructured this landscape.</p>

      <div class="notion-callout">
        🌐 <strong>The IFSC Advantage:</strong> Deemed an offshore financial jurisdiction under Indian law, transactions within GIFT City operate in convertible foreign currency (primarily US Dollars) with streamlined compliance.
      </div>

      <h2>Key Pathways via GIFT City</h2>
      <ul>
        <li><strong>Liberalised Remittance Scheme (LRS) Route:</strong> Resident Indians can deploy capital directly into global index funds and USD treasury structures.</li>
        <li><strong>Inbound & Outbound Funds:</strong> Global institutional investors and family offices gain direct access to Indian markets with clear tax certainty.</li>
        <li><strong>Family Office & Trust Structuring:</strong> Cross-border succession planning designed to safeguard wealth across multiple international jurisdictions.</li>
      </ul>
    `,
  },
  {
    title: "How to Build a More Resilient Investment Portfolio",
    slug: "how-to-build-a-more-resilient-investment-portfolio",
    excerpt: "Five core principles to construct an enduring family balance sheet that withstands recessions, inflation spikes, and unexpected life turns.",
    category: "Wealth Architecture",
    type: "ARTICLE",
    coverImage: "/img_insights_4.jpg",
    author: "Saloni Mehta",
    authorRole: "Founder & Wealth Architect",
    readTime: "6 min read",
    featured: true,
    published: true,
    content: `
      <h2>The Difference Between Growth and Resilience</h2>
      <p>Anyone can generate returns during a roaring bull market. But true financial architecture is measured by how your portfolio behaves during drawdowns, black swan events, and sudden liquidity requirements.</p>

      <h2>The 5 Architecture Principles</h2>
      <p>1. <strong>Separation of Insurance from Investment:</strong> Traditional endowment and money-back policies combine protection with low returns. Pure term coverage combined with independent index mutual funds builds far superior long-term wealth.</p>
      <p>2. <strong>6-Month Sacred Liquidity Pool:</strong> Never force an equity redemption during a down market to pay for an emergency. Maintain a disciplined liquid reserve.</p>
      <p>3. <strong>Goal-Tagged Portfolio Buckets:</strong> Every asset must correspond to a distinct deadline.</p>
      <p>4. <strong>Global Currency Hedge:</strong> Domestic wealth is denominated in INR; having 15-25% offshore exposure in USD protects household purchasing power against currency depreciation.</p>
      <p>5. <strong>Regular Annual Stress Testing:</strong> Reviewing asset weightings, tax harvesting opportunities, and nomination updates.</p>
    `,
  },
  {
    title: "Women & Wealth: Taking Ownership of Your Financial Future",
    slug: "women-and-wealth-taking-ownership",
    excerpt: "Statistically, nearly 80% of women will become solely responsible for their finances at some point in their lives. Here is how to prepare today.",
    category: "Women & Wealth",
    type: "ARTICLE",
    coverImage: "/img_insights_5.jpg",
    author: "Saloni Mehta",
    authorRole: "Founder & Wealth Architect",
    readTime: "5 min read",
    featured: false,
    published: true,
    content: `
      <h2>The Longevity Factor in Financial Planning</h2>
      <p>Women around the world outlive men by an average of 4 to 5 years. In India, this reality translates to over 42 million women navigating widowhood and sole household financial management. Yet, financial conversations are too often left to male family members or deferred until life forces the issue.</p>

      <div class="notion-callout">
        👩‍💼 <strong>Key Insight:</strong> Financial confidence is not born of complex mathematical models—it begins with understanding what you own, why you own it, and what it is designed to achieve.
      </div>

      <h2>The 4-Step Action Framework</h2>
      <ul>
        <li><strong>Know Every Account:</strong> Conduct a comprehensive asset inventory of bank accounts, mutual fund folios, insurance policies, and property titles.</li>
        <li><strong>Independent Term Protection:</strong> Ensure health and life coverage are held independently, not solely through employer group plans.</li>
        <li><strong>Active Investment Participation:</strong> Move beyond static fixed deposits and gold jewelry into equity compounding vehicles.</li>
        <li><strong>Estate Alignment:</strong> Register clear wills, joint holdings with survivorship clauses, and up-to-date nominations.</li>
      </ul>
    `,
  },
  {
    title: "Tax Planning Beyond 80C: Strategic Wealth Preservation",
    slug: "tax-planning-beyond-80c-wealth-preservation",
    excerpt: "Tax efficiency is the silent compounder. How proactive asset placement, grandfathering rules, and long-term capital gains planning maximize your net wealth.",
    category: "Tax Planning",
    type: "ARTICLE",
    coverImage: "/img_insights_6.jpg",
    author: "Saloni Mehta",
    authorRole: "Founder & Wealth Architect",
    readTime: "7 min read",
    featured: false,
    published: true,
    content: `
      <h2>Net Return Is the Only Return That Matters</h2>
      <p>Gross portfolio returns make for good dinner conversation, but post-tax, post-inflation purchasing power is what pays for retirements, college educations, and generational bequests.</p>

      <div class="notion-callout">
        📈 <strong>Tax-Alpha Principle:</strong> A 1.5% annual tax optimization compounded across 20 years can increase your ending portfolio by up to 28% without taking an ounce of additional equity market risk.
      </div>

      <h2>Advanced Strategies</h2>
      <p>We work with clients to leverage tax-loss harvesting, annual ₹1.25 Lakh LTCG exemptions, sovereign gold bonds for tax-free maturity, and GIFT City offshore structures to ensure the tax drag on their compounding is minimized within full legal compliance.</p>
    `,
  },
];

async function seedBlogs() {
  console.log("Seeding blog posts and articles into Neon PostgreSQL...");

  for (const post of samplePosts) {
    const existing = await prisma.blogPost.findUnique({
      where: { slug: post.slug },
    });

    if (!existing) {
      await prisma.blogPost.create({
        data: post,
      });
      console.log(`✓ Created post: "${post.title}" (${post.type})`);
    } else {
      console.log(`• Post already exists: "${post.title}"`);
    }
  }

  console.log("Blog seeding complete!");
}

seedBlogs()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

