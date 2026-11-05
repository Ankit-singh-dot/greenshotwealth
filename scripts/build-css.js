const { compile } = require("@tailwindcss/node");
const { Scanner } = require("@tailwindcss/oxide");
const fs = require("fs");
const path = require("path");

async function buildCss() {
  const inputCss = `@import "tailwindcss";`;
  const res = await compile(inputCss, {
    base: process.cwd(),
    onDependency: () => {},
  });

  const scanner = new Scanner({
    sources: [
      { base: process.cwd(), pattern: "app/**/*.{tsx,ts,jsx,js}", negated: false },
      { base: process.cwd(), pattern: "components/**/*.{tsx,ts,jsx,js}", negated: false },
    ],
  });

  const candidates = scanner.scan();

  const fontImport = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap');\n`;

  const customTokens = `
/* Green Shoots Wealth Exact Figma Design Tokens */
:root {
  --color-primary-dark: #1F3A2C;
  --color-primary-darker: #172e23;
  --color-primary-forest: #1F3A2C;
  --color-accent-gold: #c7af75;
  --color-cream-bg: #F5F1E8;
  --color-cream-card: #F5F1E8;
  --color-sage-light: #EEF0D9;
  --font-serif: "Cormorant Garamond", Georgia, serif;
  --font-sans: "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

body {
  font-family: "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  background-color: #F5F1E8;
  color: #1F3A2C;
}

.font-serif, h1.font-serif, h2.font-serif, h3.font-serif, h4.font-serif {
  font-family: "Cormorant Garamond", Georgia, "Times New Roman", serif !important;
}

.font-cormorant {
  font-family: "Cormorant Garamond", Georgia, serif !important;
}

.font-editorial-heading {
  font-family: "Cormorant Garamond", Georgia, serif !important;
  font-weight: 700;
  font-style: italic;
  font-size: 60px;
  line-height: 63px;
  letter-spacing: 0;
}
@media (max-width: 1024px) {
  .font-editorial-heading {
    font-size: 48px;
    line-height: 52px;
  }
}
@media (max-width: 640px) {
  .font-editorial-heading {
    font-size: 36px;
    line-height: 40px;
  }
}

.font-sans {
  font-family: "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important;
}
`;

  const built = res.build(candidates);
  fs.writeFileSync(path.join(process.cwd(), "app/globals.css"), fontImport + built + "\n" + customTokens);
  console.log(`[build-css] Successfully built Tailwind CSS with ${candidates.length} utility candidates.`);
}

buildCss().catch(console.error);
