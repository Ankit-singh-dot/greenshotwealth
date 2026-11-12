import type { Metadata } from "next";
import "./globals.css";
import "./motion.css";
import LayoutWrapper from "@/components/LayoutWrapper";

export const metadata: Metadata = {
  title: "Green Shoots Wealth | Beyond Wealth Management",
  description:
    "India's First Wealth Experience Platform. Advice that starts with a conversation. Strong roots. Enduring wealth.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        {/* Hide the intro curtain before first paint for returning sessions / reduced motion */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(sessionStorage.getItem("gs-intro")==="1"||matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.classList.add("gs-no-intro")}catch(e){}`,
          }}
        />
        <noscript>
          <style>{`.gs-intro{display:none}.rv,.auto-rv,.rl-inner,.rw-inner{opacity:1!important;transform:none!important;clip-path:none!important}`}</style>
        </noscript>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-[#F5F1E8] text-[#1F3A2C]">
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
