import type { Metadata } from "next";
import Link from "next/link";
import { IconArrow } from "@/components/LineIcons";

export const metadata: Metadata = {
  title: "Privacy Policy | Green Shoots Wealth",
  description:
    "Privacy Policy of Green Shoots Wealth Fintech LLP, an AMFI-registered mutual fund distributor (ARN-321729). Learn how we collect, use, share and protect your personal data.",
};

const SECTIONS = [
  { id: "introduction", label: "1. Introduction" },
  { id: "information-we-collect", label: "2. Information we collect" },
  { id: "how-and-why-we-use-it", label: "3. How and why we use it" },
  { id: "who-we-share-it-with", label: "4. Who we share it with" },
  { id: "retention-security-cookies", label: "5. Retention, security & cookies" },
  { id: "your-rights", label: "6. Your rights & contact" },
  { id: "changes", label: "7. Changes to this policy" },
];

export default function PrivacyPolicyPage() {
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
              <span className="text-[#c5a963]">Privacy Policy</span>
            </nav>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-medium tracking-wide uppercase bg-white/10 text-white/80 border border-white/15">
              AMFI ARN-321729
            </span>
          </div>

          <p className="text-[11px] sm:text-[12px] tracking-[0.22em] uppercase font-semibold text-[#c5a963]">
            Green Shoots Wealth Fintech LLP
          </p>
          <h1 className="font-cormorant font-normal text-[clamp(2.5rem,5.5vw,4.5rem)] leading-[1.02] tracking-[-0.02em] mt-3">
            Privacy <em className="text-[#c9d7b3]">Policy</em>
          </h1>
          <p className="text-sm sm:text-base text-white/70 mt-4 max-w-2xl font-sans">
            Green Shoots Wealth Fintech LLP · Last updated: Nov 20, 2026
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
          <section id="introduction" className="scroll-mt-28 bg-white/80 backdrop-blur-xs rounded-3xl p-6 sm:p-10 border border-[#ded8cb] shadow-xs space-y-4">
            <h2 className="font-cormorant text-2xl sm:text-3xl font-medium text-[#1F3A2C]">
              1. Introduction
            </h2>
            <p className="text-[15px] sm:text-[16px] text-[#283d31] leading-relaxed font-sans">
              This Privacy Policy explains how Green Shoots Wealth Fintech LLP (&ldquo;GSW&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;), an AMFI-registered mutual fund distributor (ARN-321729) with its registered office at 601, Sai Fortune Business Centre, Tilak Road, Ghatkopar East, Mumbai 400077, collects, uses, shares and protects your personal data when you visit our website <Link href="/" className="underline decoration-[#c5a963] hover:text-[#52704e] transition-colors">www.greenshootswealth.com</Link> or use our services. We process personal data in line with the Digital Personal Data Protection Act, 2023 and the Information Technology Act, 2000. By using our website or services, you agree to this policy.
            </p>
          </section>

          {/* Section 2 */}
          <section id="information-we-collect" className="scroll-mt-28 bg-white/80 backdrop-blur-xs rounded-3xl p-6 sm:p-10 border border-[#ded8cb] shadow-xs space-y-6">
            <h2 className="font-cormorant text-2xl sm:text-3xl font-medium text-[#1F3A2C]">
              2. Information we collect
            </h2>

            {/* Table */}
            <div className="overflow-hidden rounded-2xl border border-[#ded8cb] bg-white">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-[#1F3A2C] text-[#F5F1E8]">
                      <th className="px-5 py-3.5 text-xs font-semibold tracking-wider uppercase border-b border-[#1F3A2C]/20 sm:w-1/3">
                        Category
                      </th>
                      <th className="px-5 py-3.5 text-xs font-semibold tracking-wider uppercase border-b border-[#1F3A2C]/20">
                        Examples
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#ded8cb]/60 font-sans text-[#283d31]">
                    <tr className="hover:bg-[#F5F1E8]/50 transition-colors">
                      <td className="px-5 py-4 font-medium text-[#1F3A2C] align-top">
                        Identity and contact
                      </td>
                      <td className="px-5 py-4 leading-relaxed align-top">
                        Name, date of birth, address, email, phone number
                      </td>
                    </tr>
                    <tr className="hover:bg-[#F5F1E8]/50 transition-colors">
                      <td className="px-5 py-4 font-medium text-[#1F3A2C] align-top">
                        KYC details
                      </td>
                      <td className="px-5 py-4 leading-relaxed align-top">
                        PAN, Aadhaar (as permitted), proof of address, photograph, signature, FATCA/CRS declarations, residential status (including NRI and foreign national details)
                      </td>
                    </tr>
                    <tr className="hover:bg-[#F5F1E8]/50 transition-colors">
                      <td className="px-5 py-4 font-medium text-[#1F3A2C] align-top">
                        Financial and bank
                      </td>
                      <td className="px-5 py-4 leading-relaxed align-top">
                        Bank account details for payouts and mandates, income range, source of wealth, nominee details, investment holdings and transactions
                      </td>
                    </tr>
                    <tr className="hover:bg-[#F5F1E8]/50 transition-colors">
                      <td className="px-5 py-4 font-medium text-[#1F3A2C] align-top">
                        Website and device
                      </td>
                      <td className="px-5 py-4 leading-relaxed align-top">
                        IP address, browser, device type, pages visited, cookies and similar technologies
                      </td>
                    </tr>
                    <tr className="hover:bg-[#F5F1E8]/50 transition-colors">
                      <td className="px-5 py-4 font-medium text-[#1F3A2C] align-top">
                        Communications
                      </td>
                      <td className="px-5 py-4 leading-relaxed align-top">
                        Emails, calls, messages and form submissions you send us
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-[15px] sm:text-[16px] text-[#283d31] leading-relaxed font-sans">
              We collect this information from you directly, from AMCs, Registrars and Transfer Agents (RTAs), and from KYC Registration Agencies (KRAs).
            </p>
          </section>

          {/* Section 3 */}
          <section id="how-and-why-we-use-it" className="scroll-mt-28 bg-white/80 backdrop-blur-xs rounded-3xl p-6 sm:p-10 border border-[#ded8cb] shadow-xs space-y-4">
            <h2 className="font-cormorant text-2xl sm:text-3xl font-medium text-[#1F3A2C]">
              3. How and why we use it
            </h2>
            <p className="text-[15px] sm:text-[16px] text-[#283d31] leading-relaxed font-sans">
              We use your data only for purposes you have consented to or that the law permits:
            </p>
            <ul className="space-y-2.5 pt-1 text-[15px] sm:text-[16px] text-[#283d31] font-sans">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#52704e] mt-2.5 shrink-0" />
                <span>Completing KYC and onboarding you with AMCs</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#52704e] mt-2.5 shrink-0" />
                <span>Processing purchase, redemption, switch, SIP and other mutual fund transactions</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#52704e] mt-2.5 shrink-0" />
                <span>Sending transaction confirmations, statements, portfolio reviews and service updates</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#52704e] mt-2.5 shrink-0" />
                <span>Meeting legal duties under SEBI, AMFI, FATCA/CRS and anti-money-laundering rules</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#52704e] mt-2.5 shrink-0" />
                <span>Resolving queries and grievances</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#52704e] mt-2.5 shrink-0" />
                <span>Improving our website and services</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#52704e] mt-2.5 shrink-0" />
                <span>Sending educational content and updates, where you have agreed to receive them. You can opt out at any time.</span>
              </li>
            </ul>
            <p className="text-[15px] sm:text-[16px] font-semibold text-[#1F3A2C] pt-2">
              We do not sell your personal data.
            </p>
          </section>

          {/* Section 4 */}
          <section id="who-we-share-it-with" className="scroll-mt-28 bg-white/80 backdrop-blur-xs rounded-3xl p-6 sm:p-10 border border-[#ded8cb] shadow-xs space-y-4">
            <h2 className="font-cormorant text-2xl sm:text-3xl font-medium text-[#1F3A2C]">
              4. Who we share it with
            </h2>
            <p className="text-[15px] sm:text-[16px] text-[#283d31] leading-relaxed font-sans">
              We share data only as needed to deliver our services:
            </p>
            <ul className="space-y-2.5 pt-1 text-[15px] sm:text-[16px] text-[#283d31] font-sans">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#52704e] mt-2.5 shrink-0" />
                <span>Asset Management Companies, RTAs (such as CAMS and KFintech) and KRAs, to process your investments and KYC</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#52704e] mt-2.5 shrink-0" />
                <span>Banks, payment gateways and platform or technology providers acting on our behalf, under confidentiality obligations</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#52704e] mt-2.5 shrink-0" />
                <span>Regulators, courts and law enforcement agencies where required by law</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#52704e] mt-2.5 shrink-0" />
                <span>Professional advisers such as auditors and legal counsel, under confidentiality</span>
              </li>
            </ul>
            <p className="text-[15px] sm:text-[16px] text-[#283d31] leading-relaxed font-sans pt-2">
              If you are an NRI or foreign national, your data may be processed outside India as needed to serve you, subject to applicable law.
            </p>
          </section>

          {/* Section 5 */}
          <section id="retention-security-cookies" className="scroll-mt-28 bg-white/80 backdrop-blur-xs rounded-3xl p-6 sm:p-10 border border-[#ded8cb] shadow-xs space-y-5">
            <h2 className="font-cormorant text-2xl sm:text-3xl font-medium text-[#1F3A2C]">
              5. Retention, security and cookies
            </h2>
            <div className="space-y-4 text-[15px] sm:text-[16px] text-[#283d31] leading-relaxed font-sans">
              <p>
                <strong className="font-semibold text-[#1F3A2C]">Retention.</strong> We keep your data for as long as you are a client and afterwards for the period required by SEBI, AMFI, tax and other laws, then delete or anonymise it.
              </p>
              <p>
                <strong className="font-semibold text-[#1F3A2C]">Security.</strong> We use reasonable technical and organisational safeguards, including access controls and encrypted transmission. No online system is completely secure, so we cannot guarantee absolute security. Never share OTPs or passwords with anyone, and note that GSW does not hold your funds or units.
              </p>
              <p>
                <strong className="font-semibold text-[#1F3A2C]">Cookies.</strong> Our website uses cookies and analytics tools to make the site work and to understand how it is used. You can block cookies in your browser settings, though parts of the site may not work as intended.
              </p>
            </div>
          </section>

          {/* Section 6 */}
          <section id="your-rights" className="scroll-mt-28 bg-white/80 backdrop-blur-xs rounded-3xl p-6 sm:p-10 border border-[#ded8cb] shadow-xs space-y-6">
            <h2 className="font-cormorant text-2xl sm:text-3xl font-medium text-[#1F3A2C]">
              6. Your rights and how to reach us
            </h2>
            <p className="text-[15px] sm:text-[16px] text-[#283d31] leading-relaxed font-sans">
              You may ask us to access, correct, update or erase your personal data, withdraw consent, nominate another person to exercise your rights, or raise a grievance. We may need to keep some data where the law requires it, and withdrawing consent may limit the services we can offer.
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
                        Grievance / Data Protection contact
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
                        <a href="mailto:admin@greenshootswealth.com" className="text-[#1F3A2C] underline decoration-[#c5a963] hover:text-[#52704e] transition-colors">
                          admin@greenshootswealth.com
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
                        Address
                      </td>
                      <td className="px-5 py-4 leading-relaxed align-top">
                        601, Sai Fortune Business Centre, Tilak Road, Ghatkopar East, Mumbai 400077
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <p className="text-[15px] sm:text-[16px] text-[#283d31] leading-relaxed font-sans">
              If we do not resolve your concern, you may approach the Data Protection Board of India.
            </p>
          </section>

          {/* Section 7 */}
          <section id="changes" className="scroll-mt-28 bg-white/80 backdrop-blur-xs rounded-3xl p-6 sm:p-10 border border-[#ded8cb] shadow-xs space-y-4">
            <h2 className="font-cormorant text-2xl sm:text-3xl font-medium text-[#1F3A2C]">
              7. Changes to this policy
            </h2>
            <p className="text-[15px] sm:text-[16px] text-[#283d31] leading-relaxed font-sans">
              We may update this policy from time to time. The latest version is always on this page with its &ldquo;last updated&rdquo; date.
            </p>
          </section>

          {/* Regulatory Navigation Footer Bar */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#ded8cb]/80 text-sm">
            <Link
              href="/regulatory-disclosures"
              className="inline-flex items-center gap-2 font-medium text-[#1F3A2C] hover:text-[#52704e] transition-colors"
            >
              <span>View Regulatory Disclosures</span>
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
