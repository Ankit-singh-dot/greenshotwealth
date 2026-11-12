"use client";

import React, { useEffect, useRef, useState } from "react";
import { onScrollFrame, clamp, prefersReducedMotion } from "./scroll";

/* ------------------------------------------------------------------ */
/* useInView                                                           */
/* ------------------------------------------------------------------ */

export function useInView<T extends Element>(
  opts: { threshold?: number; rootMargin?: string; once?: boolean; observeParent?: boolean } = {}
) {
  const { threshold = 0.18, rootMargin = "0px 0px -6% 0px", once = true, observeParent = false } = opts;
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    // A fully clip-path'd element reports zero intersection in Chromium,
    // so clip reveals watch their parent box instead.
    const el = observeParent ? ref.current?.parentElement : ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) setInView(false);
      },
      { threshold, rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin, once, observeParent]);

  return [ref, inView] as const;
}

/* ------------------------------------------------------------------ */
/* Reveal — fade / rise / clip an element in when it enters             */
/* ------------------------------------------------------------------ */

type RevealProps = {
  as?: React.ElementType;
  variant?: "up" | "fade" | "clip" | "scale" | "left" | "right";
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  threshold?: number;
  children?: React.ReactNode;
  id?: string;
};

export function Reveal({
  as: Tag = "div",
  variant = "up",
  delay = 0,
  className = "",
  style,
  threshold,
  children,
  id,
}: RevealProps) {
  const clip = variant === "clip";
  const [ref, inView] = useInView<HTMLElement>(
    clip ? { threshold: 0, rootMargin: "0px 0px -18% 0px", observeParent: true } : { threshold }
  );
  return (
    <Tag
      ref={ref}
      id={id}
      className={`rv rv-${variant} ${inView ? "is-in" : ""} ${className}`}
      style={{ ...style, ["--rv-delay" as string]: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/* RevealLines — masked line-by-line headline reveal                    */
/* ------------------------------------------------------------------ */

export function RevealLines({
  as: Tag = "h2",
  lines,
  className = "",
  delay = 0,
  stagger = 90,
  play,
}: {
  as?: React.ElementType;
  lines: React.ReactNode[];
  className?: string;
  delay?: number;
  stagger?: number;
  /** When provided, the reveal is driven by this flag instead of visibility. */
  play?: boolean;
}) {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.2 });
  const on = play === undefined ? inView : play;
  return (
    <Tag ref={ref} className={`rl ${on ? "is-in" : ""} ${className}`}>
      {lines.map((line, i) => (
        <span className="rl-line" key={i}>
          <span className="rl-inner" style={{ transitionDelay: `${delay + i * stagger}ms` }}>
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/* RevealWords — word-by-word rise                                      */
/* ------------------------------------------------------------------ */

export function RevealWords({
  text,
  className = "",
  delay = 0,
  stagger = 28,
  as: Tag = "p",
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: React.ElementType;
}) {
  const [ref, inView] = useInView<HTMLElement>({ threshold: 0.3 });
  const words = text.split(" ");
  return (
    <Tag ref={ref} className={`rw ${inView ? "is-in" : ""} ${className}`} aria-label={text}>
      {words.map((w, i) => (
        <span className="rw-word" key={i} aria-hidden>
          <span className="rw-inner" style={{ transitionDelay: `${delay + i * stagger}ms` }}>
            {w}
          </span>{" "}
        </span>
      ))}
    </Tag>
  );
}

/* ------------------------------------------------------------------ */
/* Parallax — translate an element relative to viewport centre          */
/* ------------------------------------------------------------------ */

export function Parallax({
  speed = 0.15,
  className = "",
  children,
  scale,
  style,
}: {
  speed?: number;
  className?: string;
  children?: React.ReactNode;
  scale?: [number, number];
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const parent = el.parentElement ?? el;
    return onScrollFrame(({ vh }) => {
      const r = parent.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return;
      const centre = r.top + r.height / 2 - vh / 2;
      const y = -centre * speed;
      let s = "";
      if (scale) {
        const p = clamp(1 - (r.top + r.height) / (vh + r.height));
        s = ` scale(${scale[0] + (scale[1] - scale[0]) * p})`;
      }
      el.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)${s}`;
    });
  }, [speed, scale]);
  return (
    <div ref={ref} className={`will-change-transform ${className}`} style={style}>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Magnetic — element leans toward the pointer                         */
/* ------------------------------------------------------------------ */

export function Magnetic({
  children,
  strength = 0.28,
  className = "",
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || window.matchMedia("(hover: none)").matches) return;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate3d(${x * strength}px, ${y * strength}px, 0)`;
    };
    const leave = () => {
      el.style.transform = "";
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, [strength]);
  return (
    <span ref={ref} className={`magnetic inline-flex ${className}`}>
      {children}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Marquee — infinite ribbon, speeds up with scroll velocity             */
/* ------------------------------------------------------------------ */

export function Marquee({
  children,
  className = "",
  speed = 40,
  reverse = false,
}: {
  children: React.ReactNode;
  className?: string;
  speed?: number; // seconds per loop
  reverse?: boolean;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const track = trackRef.current;
    if (!track || prefersReducedMotion()) return;
    let x = 0;
    let boost = 0;
    let raf = 0;
    let last = performance.now();
    const unsub = onScrollFrame(({ velocity }) => {
      boost = Math.min(6, Math.abs(velocity) * 0.25);
    });
    const loop = (t: number) => {
      const dt = Math.min(64, t - last);
      last = t;
      const half = track.scrollWidth / 2 || 1;
      const pxPerMs = half / (speed * 1000);
      x += pxPerMs * dt * (1 + boost) * (reverse ? -1 : 1);
      boost *= 0.94;
      if (x >= half) x -= half;
      if (x < 0) x += half;
      track.style.transform = `translate3d(${-x}px,0,0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      unsub();
    };
  }, [speed, reverse]);
  return (
    <div className={`overflow-hidden ${className}`}>
      <div ref={trackRef} className="flex w-max will-change-transform">
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* ScrollWords — a statement that "lights up" word by word as you read   */
/* Wrap words in *asterisks* to accent them.                            */
/* ------------------------------------------------------------------ */

export function ScrollWords({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const tokens = text.split(" ").map((w) => {
    const accent = w.startsWith("*");
    return { w: w.replace(/\*/g, ""), accent };
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const spans = Array.from(el.querySelectorAll<HTMLSpanElement>(".sw-word"));
    if (prefersReducedMotion()) {
      spans.forEach((s) => (s.style.opacity = "1"));
      return;
    }
    const n = spans.length;
    return onScrollFrame(({ vh }) => {
      const r = el.getBoundingClientRect();
      // 0 when the paragraph top hits 85% of the viewport, 1 when its bottom hits 45%
      const p = clamp((vh * 0.85 - r.top) / (vh * 0.4 + r.height));
      const lit = p * (n + 2);
      spans.forEach((s, i) => {
        const o = clamp(lit - i);
        s.style.opacity = String(0.14 + 0.86 * o);
      });
    });
  }, [text]);

  return (
    <p ref={ref} className={className} aria-label={text.replace(/\*/g, "")}>
      {tokens.map((t, i) => (
        <span key={i} aria-hidden className={`sw-word ${t.accent ? "sw-accent" : ""}`}>
          {t.w}{" "}
        </span>
      ))}
    </p>
  );
}

/* ------------------------------------------------------------------ */
/* CountUp — number that counts when seen                               */
/* ------------------------------------------------------------------ */

export function CountUp({
  to,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1800,
  className = "",
}: {
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const [ref, inView] = useInView<HTMLSpanElement>({ threshold: 0.4 });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const e = 1 - Math.pow(1 - p, 4);
      setVal(to * e);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);
  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {prefix}
      {val.toLocaleString("en-IN", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
      {suffix}
    </span>
  );
}
