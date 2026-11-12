"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { emitScroll, getLenis, setLenis, prefersReducedMotion } from "./scroll";

/**
 * Global motion layer:
 *  - Lenis smooth scrolling (skipped for prefers-reduced-motion)
 *  - publishes every scroll frame to the shared scroll store
 *  - resets scroll on route change
 *  - "auto-reveal" for pages that don't hand-author their motion
 *    (anything not inside [data-motion-managed]) plus a soft hero parallax
 */
export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const reduced = prefersReducedMotion();
    let raf = 0;
    let lenis: Lenis | null = null;
    let lastY = window.scrollY;

    const publishNative = () => {
      const y = window.scrollY;
      emitScroll(y, y - lastY, y > lastY ? 1 : y < lastY ? -1 : 0);
      lastY = y;
    };

    if (!reduced) {
      lenis = new Lenis({
        lerp: 0.085,
        smoothWheel: true,
        wheelMultiplier: 0.95,
        anchors: { offset: -90 },
        allowNestedScroll: true,
      });
      setLenis(lenis);
      document.documentElement.classList.add("lenis", "lenis-smooth");
      lenis.on("scroll", (l: Lenis) => emitScroll(l.scroll, l.velocity, l.direction as 1 | -1 | 0));
      const loop = (t: number) => {
        lenis?.raf(t);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    } else {
      window.addEventListener("scroll", publishNative, { passive: true });
    }

    const onResize = () => emitScroll(window.scrollY);
    window.addEventListener("resize", onResize);
    emitScroll(window.scrollY);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", publishNative);
      window.removeEventListener("resize", onResize);
      lenis?.destroy();
      setLenis(null);
      document.documentElement.classList.remove("lenis", "lenis-smooth");
    };
  }, []);

  // Route change: jump to top (unless navigating to a hash) and auto-enhance.
  useEffect(() => {
    const lenis = getLenis();
    if (!window.location.hash) {
      if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
      else window.scrollTo(0, 0);
    }
    emitScroll(window.scrollY);

    const cleanup = autoEnhance();
    return cleanup;
  }, [pathname]);

  return null;
}

/* ------------------------------------------------------------------ */
/* Auto-reveal for pages without hand-authored motion                  */
/* ------------------------------------------------------------------ */

const AUTO_SELECTOR = [
  "section h1",
  "section h2",
  "section [class*='grid-cols'] > *",
  "section > div > p",
  "section > div > div > p",
  "section > div > span",
  "section form",
  "article > *",
].join(",");

function autoEnhance() {
  const main = document.querySelector("main");
  if (!main) return () => {};

  const reduced = prefersReducedMotion();
  const seen = new WeakSet<Element>();

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target as HTMLElement;
        io.unobserve(el);
        el.classList.add("is-in");
        // Hand control back to the element's own transitions once revealed.
        window.setTimeout(() => {
          el.classList.remove("auto-rv", "is-in");
          el.style.removeProperty("--rv-delay");
        }, 1600);
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
  );

  const scan = () => {
    if (main.querySelector("[data-motion-managed]")) return;
    const nodes = Array.from(main.querySelectorAll<HTMLElement>(AUTO_SELECTOR));
    const fresh = nodes.filter((el) => !seen.has(el));
    // Skip nodes nested inside another target — the parent carries the motion.
    const set = new Set(fresh);
    fresh.forEach((el) => {
      seen.add(el);
      let p = el.parentElement;
      while (p && p !== main) {
        if (set.has(p)) return;
        p = p.parentElement;
      }
      if (el.closest("[data-no-reveal]")) return;
      if (reduced) return;
      const siblings = el.parentElement ? Array.from(el.parentElement.children) : [];
      const idx = Math.max(0, siblings.indexOf(el));
      el.style.setProperty("--rv-delay", `${Math.min(idx, 6) * 70}ms`);
      el.classList.add("auto-rv");
      io.observe(el);
    });
  };

  // Soft parallax on the first hero media layer of inner pages.
  let heroMedia: HTMLElement | null = null;
  let heroSection: HTMLElement | null = null;
  let raf = 0;
  const bindHero = () => {
    if (reduced || main.querySelector("[data-motion-managed]")) return;
    const first = main.querySelector<HTMLElement>("section");
    const media = first?.querySelector<HTMLElement>(":scope > .absolute.inset-0");
    if (first && media && first.classList.contains("overflow-hidden")) {
      heroSection = first;
      heroMedia = media;
      heroMedia.style.willChange = "transform";
    }
  };
  const onScroll = () => {
    if (!heroMedia || !heroSection) return;
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      if (!heroMedia || !heroSection) return;
      const r = heroSection.getBoundingClientRect();
      if (r.bottom < 0) return;
      const y = Math.max(0, -r.top);
      heroMedia.style.transform = `translate3d(0, ${y * 0.35}px, 0) scale(${1.04 + y * 0.00012})`;
    });
  };

  const t = window.setTimeout(() => {
    scan();
    bindHero();
    onScroll();
  }, 30);

  let mt = 0;
  const mo = new MutationObserver(() => {
    window.clearTimeout(mt);
    mt = window.setTimeout(scan, 120);
  });
  mo.observe(main, { childList: true, subtree: true });
  window.addEventListener("scroll", onScroll, { passive: true });

  return () => {
    window.clearTimeout(t);
    window.clearTimeout(mt);
    cancelAnimationFrame(raf);
    mo.disconnect();
    io.disconnect();
    window.removeEventListener("scroll", onScroll);
    if (heroMedia) heroMedia.style.transform = "";
  };
}
