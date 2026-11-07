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

.brand-logo-text {
  font-family: "Playfair Display", Georgia, serif !important;
  font-weight: 500;
  font-size: 14px;
  line-height: 100%;
  letter-spacing: 0;
  font-variant: small-caps;
  font-feature-settings: "smcp" 1;
  text-transform: none !important;
}

/* Approach section: stage caption swap */
@keyframes stageIn {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: none; }
}
.stage-in { animation: stageIn 0.5s ease-out; }
@media (prefers-reduced-motion: reduce) { .stage-in { animation: none; } }

/* Notion-style Document Canvas & Reader Typography */
.notion-editor-canvas:empty:before {
  content: "Type '/' for commands or write your thought here...";
  color: #9ca3af;
  pointer-events: none;
}
.notion-editor-canvas h1, .notion-rendered-content h1 {
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 2.25rem;
  line-height: 1.2;
  font-weight: 600;
  color: #1F3A2C;
  margin-top: 2rem;
  margin-bottom: 0.75rem;
}
.notion-editor-canvas h2, .notion-rendered-content h2 {
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 1.75rem;
  line-height: 1.25;
  font-weight: 600;
  color: #1F3A2C;
  margin-top: 1.75rem;
  margin-bottom: 0.65rem;
}
.notion-editor-canvas h3, .notion-rendered-content h3 {
  font-family: "Cormorant Garamond", Georgia, serif;
  font-size: 1.35rem;
  line-height: 1.3;
  font-weight: 600;
  color: #1F3A2C;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
}
.notion-editor-canvas p, .notion-rendered-content p {
  font-family: "Plus Jakarta Sans", sans-serif;
  font-size: 1rem;
  line-height: 1.75;
  color: #2c4236;
  margin-bottom: 1rem;
}
.notion-editor-canvas ul, .notion-rendered-content ul {
  list-style-type: disc;
  padding-left: 1.5rem;
  margin-bottom: 1rem;
}
.notion-editor-canvas ol, .notion-rendered-content ol {
  list-style-type: decimal;
  padding-left: 1.5rem;
  margin-bottom: 1rem;
}
.notion-editor-canvas li, .notion-rendered-content li {
  margin-bottom: 0.35rem;
  line-height: 1.6;
}
.notion-editor-canvas a, .notion-rendered-content a {
  color: #1F3A2C;
  text-decoration: underline;
  text-underline-offset: 3px;
  font-weight: 500;
}
.notion-editor-canvas a:hover, .notion-rendered-content a:hover {
  color: #8fa868;
}
.notion-callout {
  background-color: #f2f5ee;
  border-left: 4px solid #8fa868;
  border-radius: 0.75rem;
  padding: 1rem 1.25rem;
  margin: 1.5rem 0;
  font-size: 0.95rem;
  line-height: 1.65;
  color: #1F3A2C;
  box-shadow: 0 1px 2px rgba(0,0,0,0.02);
}
.notion-editor-canvas blockquote, .notion-rendered-content blockquote {
  border-left: 4px solid #c7af75;
  background-color: rgba(245, 241, 232, 0.6);
  border-radius: 0 0.75rem 0.75rem 0;
  padding: 1rem 1.5rem;
  margin: 1.75rem 0;
  font-family: "Cormorant Garamond", Georgia, serif !important;
  font-style: italic;
  font-size: 1.35rem;
  line-height: 1.5;
  color: #1F3A2C;
}
.notion-hr {
  border: none;
  border-top: 1px solid #e0dad0;
  margin: 2.25rem 0;
}


`;

  const built = res.build(candidates);
  fs.writeFileSync(path.join(process.cwd(), "app/globals.css"), fontImport + built + "\n" + customTokens);
  console.log(`[build-css] Successfully built Tailwind CSS with ${candidates.length} utility candidates.`);
}

buildCss().catch(console.error);
