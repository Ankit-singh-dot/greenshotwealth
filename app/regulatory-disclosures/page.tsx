import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { IconArrow } from "@/components/LineIcons";

export const metadata: Metadata = {
  title: "Regulatory Disclosures | Green Shoots Wealth Fintech LLP",
  description:
    "Statutory and regulatory disclosures of Green Shoots Wealth Fintech LLP, an AMFI-registered mutual fund & SIF distributor (ARN-321729). What you should know before investing.",
};

const SECTIONS = [
  { id: "who-we-are", label: "1. Who we are" },
  { id: "products", label: "2. Mutual fund products" },
  { id: "risks", label: "3. Investment risks" },
  { id: "scheme-documents", label: "4. Scheme documents" },
  { id: "complaints", label: "5. How to raise a complaint" },
  { id: "guidelines", label: "6. Investor guidelines" },
  { id: "governing-regulations", label: "7. Governing regulations" },
  { id: "force-majeure", label: "8. Force majeure" },
  { id: "disclaimer", label: "9. Disclaimer" },
];

export default function RegulatoryDisclosuresPage() {
  return (
    <div className="w-full flex flex-col bg-[#F5F1E8] text-[#1F3A2C]" data-motion-managed>
      {/* ---------------- Hero Header ---------------- */}
      <section className="relative w-full bg-[#0f2219] text-[#F5F1E8] pt-32 sm:pt-40 pb-16 sm:pb-20 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(197,169,99,0.12),transparent_55%)] pointer-events-none" />
        <div className="gs-container relative z-10">
          {/* Breadcrumb & Regulatory Pill */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-white/60">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span className="text-white/30">/</span>
              <span className="text-[#c5a963]">Regulatory Disclosures</span>
            </nav>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-medium tracking-wide uppercase bg-white/10 text-white/80 border border-white/15">
              AMFI ARN-321729
            </span>
          </div>

          <p className="text-[11px] sm:text-[12px] tracking-[0.22em] uppercase font-semibold text-[#c5a963]">
            Green Shoots Wealth Fintech LLP
          </p>
          <h1 className="font-cormorant font-normal text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[1.02] tracking-[-0.02em] mt-3">
            Regulatory <em className="text-[#c9d7b3]">Disclosures</em>
          </h1>
          <p className="text-sm sm:text-base text-white/70 mt-4 max-w-2xl font-sans">
            What you should know before investing through Green Shoots Wealth · Last updated: Nov 20, 2026
          </p>

          {/* Quick jump navigation */}
          <div className="mt-10 pt-8 border-t border-white/10 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-white/50 mr-2 text-[11px] uppercase tracking-wider">Jump to:</span>
            {SECTIONS.map((sec) => (
              <a
                key={sec.id}
                href={`#${sec.id}`}
                className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/15 text-white/80 hover:text-white border border-white/10 transition-colors text-[12px]"
              >
                {sec.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Main Content ---------------- */}
      <div className="gs-container py-16 sm:py-24">
        <div className="max-w-4xl mx-auto space-y-10">

          {/* Section 1 */}
          <section id="who-we-are" className="scroll-mt-28 bg-white/80 backdrop-blur-xs rounded-3xl p-6 sm:p-10 border border-[#ded8cb] shadow-xs space-y-6">
            <h2 className="font-cormorant text-2xl sm:text-3xl font-medium text-[#1F3A2C]">
              1. Who we are
            </h2>
            <p className="text-[15px] sm:text-[16px] text-[#283d31] leading-relaxed font-sans">
              Green Shoots Wealth Fintech LLP (&ldquo;Green Shoots Wealth&rdquo;, &ldquo;GSW&rdquo;) is an AMFI-registered mutual fund &amp; SIF distributor (ARN-321729). We are NOT a SEBI-registered Investment Adviser and do not provide investment advice, portfolio management or any other regulated advisory service. All investments are placed directly with the respective Asset Management Companies (&ldquo;AMCs&rdquo;).
            </p>

            {/* Table */}
            <div className="overflow-hidden rounded-2xl border border-[#ded8cb] bg-white">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-[#1F3A2C] text-[#F5F1E8]">
                      <th className="px-5 py-3.5 text-xs font-semibold tracking-wider uppercase border-b border-[#1F3A2C]/20 sm:w-1/3">
                        Particular
                      </th>
                      <th className="px-5 py-3.5 text-xs font-semibold tracking-wider uppercase border-b border-[#1F3A2C]/20">
                        Details
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#ded8cb]/60 font-sans text-[#283d31]">
                    <tr className="hover:bg-[#F5F1E8]/50 transition-colors">
                      <td className="px-5 py-4 font-medium text-[#1F3A2C] align-top">
                        Name
                      </td>
                      <td className="px-5 py-4 leading-relaxed align-top font-medium text-[#1F3A2C]">
                        Green Shoots Wealth Fintech LLP
                      </td>
                    </tr>
                    <tr className="hover:bg-[#F5F1E8]/50 transition-colors">
                      <td className="px-5 py-4 font-medium text-[#1F3A2C] align-top">
                        AMFI ARN
                      </td>
                      <td className="px-5 py-4 leading-relaxed align-top font-semibold text-[#1F3A2C]">
                        321729
                      </td>
                    </tr>
                    <tr className="hover:bg-[#F5F1E8]/50 transition-colors">
                      <td className="px-5 py-4 font-medium text-[#1F3A2C] align-top">
                        ARN valid
                      </td>
                      <td className="px-5 py-4 leading-relaxed align-top text-[#1F3A2C]">
                        from 14.02.2025 to 13.02.2028
                      </td>
                    </tr>
                    <tr className="hover:bg-[#F5F1E8]/50 transition-colors">
                      <td className="px-5 py-4 font-medium text-[#1F3A2C] align-top">
                        Capacity
                      </td>
                      <td className="px-5 py-4 leading-relaxed align-top">
                        Mutual Fund &amp; SIF Distributor
                      </td>
                    </tr>
                    <tr className="hover:bg-[#F5F1E8]/50 transition-colors">
                      <td className="px-5 py-4 font-medium text-[#1F3A2C] align-top">
                        Registered office
                      </td>
                      <td className="px-5 py-4 leading-relaxed align-top">
                        601, Sai Fortune Business Centre, Tilak Road, Ghatkopar East, Mumbai 400077
                      </td>
                    </tr>
                    <tr className="hover:bg-[#F5F1E8]/50 transition-colors">
                      <td className="px-5 py-4 font-medium text-[#1F3A2C] align-top">
                        Support
                      </td>
                      <td className="px-5 py-4 leading-relaxed align-top">
                        <a href="mailto:admin@greenshootswealth.com" className="text-[#1F3A2C] underline decoration-[#c5a963] hover:text-[#52704e] transition-colors">
                          admin@greenshootswealth.com
                        </a> · <a href="tel:+919152153555" className="text-[#1F3A2C] underline decoration-[#c5a963] hover:text-[#52704e] transition-colors">
                          +91 91521 53555
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Official AMFI Certificate Letter */}
            <div className="pt-2">
              <div className="rounded-2xl border border-[#ded8cb] bg-white p-4 sm:p-6 shadow-xs max-w-xl">
                <div className="flex items-center justify-between pb-3 border-b border-[#ded8cb]/60 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#52704e]" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#1F3A2C]">
                      AMFI Registration &amp; Issuance Certificate
                    </span>
                  </div>
                  <span className="text-xs text-[#798e82] font-mono font-medium">ARN-321729</span>
                </div>
                <div className="relative w-full aspect-[593/806] rounded-xl overflow-hidden border border-[#ded8cb]/80 bg-[#fbf9f5]">
                  <Image
                    src="/images/amfi_registration_certificate.png"
                    alt="Official AMFI Registration and Issuance of AMFI Registration Number (ARN) Certificate - Green Shoots Wealth Fintech LLP (ARN-321729)"
                    fill
                    sizes="(min-width: 640px) 560px, 100vw"
                    className="object-contain"
                    priority
                  />
                </div>
                <p className="text-[12px] text-[#5d7064] mt-3 leading-relaxed text-center font-sans">
                  Official renewal letter issued by Association of Mutual Funds in India (AMFI) confirming registration of Green Shoots Wealth Fintech LLP (ARN-321729, Valid: 14-FEB-2025 to 13-FEB-2028).
                </p>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section id="products" className="scroll-mt-28 bg-white/80 backdrop-blur-xs rounded-3xl p-6 sm:p-10 border border-[#ded8cb] shadow-xs space-y-5">
            <h2 className="font-cormorant text-2xl sm:text-3xl font-medium text-[#1F3A2C]">
              2. Our mutual fund products
            </h2>
            <p className="text-[15px] sm:text-[16px] text-[#283d31] leading-relaxed font-sans">
              GSW offers only Regular Plans of mutual fund schemes and does not offer Direct Plans. When you invest through GSW, the AMC pays us a commission. This commission is embedded in the scheme&rsquo;s expense ratio and is not an additional charge deducted from your investment. Commission rates vary across AMCs and scheme categories, and our AMC-wise commission structure is available on request.
            </p>
            <div className="pt-2">
              <p className="text-[15px] sm:text-[16px] font-semibold text-[#1F3A2C] mb-3 font-sans">
                GSW does not:
              </p>
              <ul className="space-y-2.5 text-[15px] sm:text-[16px] text-[#283d31] font-sans">
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#52704e] mt-2.5 shrink-0" />
                  <span>Manage or operate mutual fund schemes</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#52704e] mt-2.5 shrink-0" />
                  <span>Guarantee returns, dividends or payouts</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#52704e] mt-2.5 shrink-0" />
                  <span>Guarantee liquidity, redemption or repayment of units</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#52704e] mt-2.5 shrink-0" />
                  <span>Make any offer to buy back units</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#52704e] mt-2.5 shrink-0" />
                  <span>Hold or manage investor funds or units</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#52704e] mt-2.5 shrink-0" />
                  <span>Subscribe to or collect payments for units on behalf of AMCs</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#52704e] mt-2.5 shrink-0" />
                  <span>Sign any document on an investor&rsquo;s behalf, unless authorised by an electronic mandate</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#52704e] mt-2.5 shrink-0" />
                  <span>Collect, receive or give receipts for dividends, interest or income from units</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#52704e] mt-2.5 shrink-0" />
                  <span>Provide investment advisory services</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section id="risks" className="scroll-mt-28 bg-white/80 backdrop-blur-xs rounded-3xl p-6 sm:p-10 border border-[#ded8cb] shadow-xs space-y-5">
            <h2 className="font-cormorant text-2xl sm:text-3xl font-medium text-[#1F3A2C]">
              3. Investment risks
            </h2>
            <p className="text-[15px] sm:text-[16px] text-[#283d31] leading-relaxed font-sans">
              Mutual fund investments are subject to market risks. Read all scheme related documents carefully. The NAV of schemes may go up or down, and there is no assurance that a scheme&rsquo;s investment objectives will be achieved. Investments made through GSW are not obligations of, or guaranteed or insured by, GSW, and the principal invested may be partly or wholly lost.
            </p>
            <ul className="space-y-3 pt-1 text-[15px] sm:text-[16px] text-[#283d31] font-sans">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#52704e] mt-2.5 shrink-0" />
                <span><strong className="font-semibold text-[#1F3A2C]">Market risk:</strong> returns depend on market volatility, political and economic conditions, and defaults, bankruptcy or insolvency of issuers in which a scheme invests.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#52704e] mt-2.5 shrink-0" />
                <span><strong className="font-semibold text-[#1F3A2C]">Liquidity risk:</strong> redemption may be temporarily suspended where a scheme faces liquidity constraints or as permitted by regulations.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#52704e] mt-2.5 shrink-0" />
                <span><strong className="font-semibold text-[#1F3A2C]">Scheme wind-up risk:</strong> schemes may be wound up due to illiquid investments, high redemptions or unforeseen market events.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#52704e] mt-2.5 shrink-0" />
                <span><strong className="font-semibold text-[#1F3A2C]">Regulatory risk:</strong> changes in SEBI or AMFI guidelines or in tax laws may affect returns or liquidity.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#52704e] mt-2.5 shrink-0" />
                <span><strong className="font-semibold text-[#1F3A2C]">Online transaction risk:</strong> cyber fraud, transmission errors, system or payment gateway failures and OTP delivery failures are inherent risks of transacting online.</span>
              </li>
            </ul>
          </section>

          {/* Section 4 */}
          <section id="scheme-documents" className="scroll-mt-28 bg-white/80 backdrop-blur-xs rounded-3xl p-6 sm:p-10 border border-[#ded8cb] shadow-xs space-y-4">
            <h2 className="font-cormorant text-2xl sm:text-3xl font-medium text-[#1F3A2C]">
              4. Read the scheme documents before you invest
            </h2>
            <p className="text-[15px] sm:text-[16px] text-[#283d31] leading-relaxed font-sans">
              Please read the Scheme Information Document (SID), Statement of Additional Information (SAI) and Key Information Memorandum (KIM) of each scheme before investing. These are available on the websites of the respective AMC and SEBI.
            </p>
            <ul className="space-y-2.5 pt-1 text-[15px] sm:text-[16px] text-[#283d31] font-sans">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#52704e] mt-2.5 shrink-0" />
                <span>Statement of Additional Information (SAI)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#52704e] mt-2.5 shrink-0" />
                <span>Scheme Information Document (SID)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#52704e] mt-2.5 shrink-0" />
                <span>Key Information Memorandum (KIM)</span>
              </li>
            </ul>
          </section>

          {/* Section 5 */}
          <section id="complaints" className="scroll-mt-28 bg-white/80 backdrop-blur-xs rounded-3xl p-6 sm:p-10 border border-[#ded8cb] shadow-xs space-y-6">
            <h2 className="font-cormorant text-2xl sm:text-3xl font-medium text-[#1F3A2C]">
              5. How to raise a complaint
            </h2>
            <p className="text-[15px] sm:text-[16px] text-[#283d31] leading-relaxed font-sans">
              Write to us first. All grievances will be acknowledged and resolved in accordance with applicable laws. If your complaint is unresolved or the response is unsatisfactory, you may approach the AMC directly, AMFI, SEBI (through SEBI SCORES), an Online Dispute Resolution (ODR) platform, or other legal forums.
            </p>

            {/* Table */}
            <div className="overflow-hidden rounded-2xl border border-[#ded8cb] bg-white">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-[#1F3A2C] text-[#F5F1E8]">
                      <th className="px-5 py-3.5 text-xs font-semibold tracking-wider uppercase border-b border-[#1F3A2C]/20 sm:w-1/3">
                        Contact
                      </th>
                      <th className="px-5 py-3.5 text-xs font-semibold tracking-wider uppercase border-b border-[#1F3A2C]/20">
                        Details
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#ded8cb]/60 font-sans text-[#283d31]">
                    <tr className="hover:bg-[#F5F1E8]/50 transition-colors">
                      <td className="px-5 py-4 font-medium text-[#1F3A2C] align-top">
                        Grievance Officer
                      </td>
                      <td className="px-5 py-4 leading-relaxed align-top font-medium text-[#1F3A2C]">
                        Saloni Mehta
                      </td>
                    </tr>
                    <tr className="hover:bg-[#F5F1E8]/50 transition-colors">
                      <td className="px-5 py-4 font-medium text-[#1F3A2C] align-top">
                        Email
                      </td>
                      <td className="px-5 py-4 leading-relaxed align-top">
                        <a href="mailto:saloni@greenshootswealth.com" className="text-[#1F3A2C] underline decoration-[#c5a963] hover:text-[#52704e] transition-colors">
                          saloni@greenshootswealth.com
                        </a>
                      </td>
                    </tr>
                    <tr className="hover:bg-[#F5F1E8]/50 transition-colors">
                      <td className="px-5 py-4 font-medium text-[#1F3A2C] align-top">
                        Phone
                      </td>
                      <td className="px-5 py-4 leading-relaxed align-top">
                        <a href="tel:+919152153555" className="text-[#1F3A2C] underline decoration-[#c5a963] hover:text-[#52704e] transition-colors">
                          +91 91521 53555
                        </a>
                      </td>
                    </tr>
                    <tr className="hover:bg-[#F5F1E8]/50 transition-colors">
                      <td className="px-5 py-4 font-medium text-[#1F3A2C] align-top">
                        SEBI SCORES
                      </td>
                      <td className="px-5 py-4 leading-relaxed align-top">
                        <a
                          href="https://scores.sebi.gov.in"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#1F3A2C] underline decoration-[#c5a963] hover:text-[#52704e] font-medium transition-colors"
                        >
                          scores.sebi.gov.in
                        </a>
                      </td>
                    </tr>
                    <tr className="hover:bg-[#F5F1E8]/50 transition-colors">
                      <td className="px-5 py-4 font-medium text-[#1F3A2C] align-top">
                        AMFI
                      </td>
                      <td className="px-5 py-4 leading-relaxed align-top">
                        <a
                          href="https://www.amfiindia.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#1F3A2C] underline decoration-[#c5a963] hover:text-[#52704e] font-medium transition-colors"
                        >
                          amfiindia.com
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Section 6 */}
          <section id="guidelines" className="scroll-mt-28 bg-white/80 backdrop-blur-xs rounded-3xl p-6 sm:p-10 border border-[#ded8cb] shadow-xs space-y-4">
            <h2 className="font-cormorant text-2xl sm:text-3xl font-medium text-[#1F3A2C]">
              6. Investor guidelines
            </h2>
            <p className="text-[15px] sm:text-[16px] text-[#283d31] leading-relaxed font-sans">
              Investors are encouraged to:
            </p>
            <ul className="space-y-2.5 pt-1 text-[15px] sm:text-[16px] text-[#283d31] font-sans">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#52704e] mt-2.5 shrink-0" />
                <span>Read and understand the SID, SAI and KIM of each scheme before investing.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#52704e] mt-2.5 shrink-0" />
                <span>Check that a scheme suits their objectives, financial circumstances and risk tolerance.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#52704e] mt-2.5 shrink-0" />
                <span>Seek independent financial, legal, tax or other professional advice where necessary.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#52704e] mt-2.5 shrink-0" />
                <span>Do their own assessment and due diligence before investing.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#52704e] mt-2.5 shrink-0" />
                <span>Remember that every investment decision is taken at their sole discretion, and they bear its outcome.</span>
              </li>
            </ul>
            <p className="text-[15px] sm:text-[16px] text-[#283d31] leading-relaxed font-sans pt-2">
              Please verify that all transaction confirmations and statements are received directly from the AMC or its Registrar and Transfer Agent (RTA).
            </p>
          </section>

          {/* Section 7 */}
          <section id="governing-regulations" className="scroll-mt-28 bg-white/80 backdrop-blur-xs rounded-3xl p-6 sm:p-10 border border-[#ded8cb] shadow-xs space-y-4">
            <h2 className="font-cormorant text-2xl sm:text-3xl font-medium text-[#1F3A2C]">
              7. Governing regulations
            </h2>
            <div className="space-y-4 text-[15px] sm:text-[16px] text-[#283d31] leading-relaxed font-sans">
              <p>
                Green Shoots Wealth is subject to the SEBI (Mutual Funds) Regulations and the SEBI Master Circular for Mutual Funds, each as amended from time to time, and adheres to the AMFI Code of Conduct for Mutual Fund Distributors. Changes in SEBI or AMFI regulations apply automatically.
              </p>
              <p>
                Accounts suspected of money laundering or terrorism financing may be suspended or reported to the regulatory authorities. These disclosures and any disputes are governed by the laws of India, subject to the exclusive jurisdiction of the courts in Mumbai, India.
              </p>
            </div>
          </section>

          {/* Section 8 */}
          <section id="force-majeure" className="scroll-mt-28 bg-white/80 backdrop-blur-xs rounded-3xl p-6 sm:p-10 border border-[#ded8cb] shadow-xs space-y-4">
            <h2 className="font-cormorant text-2xl sm:text-3xl font-medium text-[#1F3A2C]">
              8. Force majeure
            </h2>
            <p className="text-[15px] sm:text-[16px] text-[#283d31] leading-relaxed font-sans">
              Green Shoots Wealth is not liable for any delay or failure to perform its obligations due to events beyond its reasonable control, including:
            </p>
            <ul className="space-y-2.5 pt-1 text-[15px] sm:text-[16px] text-[#283d31] font-sans">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#52704e] mt-2.5 shrink-0" />
                <span>Acts of God (earthquakes, floods, cyclones, pandemics, epidemics)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#52704e] mt-2.5 shrink-0" />
                <span>War, terrorism, civil unrest, riots</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#52704e] mt-2.5 shrink-0" />
                <span>Government actions, regulatory changes, embargoes</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#52704e] mt-2.5 shrink-0" />
                <span>Strikes and labour disputes</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#52704e] mt-2.5 shrink-0" />
                <span>Failure of third-party systems (AMCs, RTAs, banks, payment gateways, internet service providers)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#52704e] mt-2.5 shrink-0" />
                <span>Power outages, system failures, cyber-attacks</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#52704e] mt-2.5 shrink-0" />
                <span>Any other event beyond our reasonable control</span>
              </li>
            </ul>
            <p className="text-[15px] sm:text-[16px] text-[#283d31] leading-relaxed font-sans pt-2">
              Our obligations are suspended during such an event and resume when it ends.
            </p>
          </section>

          {/* Section 9 */}
          <section id="disclaimer" className="scroll-mt-28 bg-[#1F3A2C] text-[#F5F1E8] rounded-3xl p-6 sm:p-10 border border-[#1F3A2C] shadow-md space-y-4">
            <h2 className="font-cormorant text-2xl sm:text-3xl font-medium text-[#F5F1E8]">
              9. Disclaimer
            </h2>
            <p className="text-[14px] sm:text-[15px] text-white/80 leading-relaxed font-sans">
              This document is for information only and does not constitute investment advice, a recommendation or a solicitation. Mutual fund investments are subject to market risks; read all scheme related documents carefully before investing. Green Shoots Wealth Fintech LLP is an AMFI-registered Mutual Fund Distributor (ARN-321729) and is not a SEBI-registered Investment Adviser. All investment decisions are the sole responsibility of the investor. This document is an electronic record under the Information Technology Act, 2000 and the rules made under it.
            </p>
          </section>

          {/* Regulatory Navigation Footer Bar */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#ded8cb]/80 text-sm">
            <Link
              href="/privacy-policy"
              className="inline-flex items-center gap-2 font-medium text-[#1F3A2C] hover:text-[#52704e] transition-colors"
            >
              <span>View Privacy Policy</span>
              <IconArrow className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-[#4a5f51] hover:text-[#1F3A2C] transition-colors"
            >
              <span>Contact our Compliance Team</span>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
