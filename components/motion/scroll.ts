"use client";

import type Lenis from "lenis";

/**
 * A tiny shared scroll store. One Lenis instance (see SmoothScroll) drives a
 * single rAF loop and publishes a frame here; every parallax / scroll-scrubbed
 * component subscribes instead of attaching its own scroll listener.
 */
export type ScrollFrame = {
  y: number;
  vh: number;
  vw: number;
  velocity: number;
  direction: 1 | -1 | 0;
};

type Listener = (f: ScrollFrame) => void;

const listeners = new Set<Listener>();

let frame: ScrollFrame = { y: 0, vh: 800, vw: 1200, velocity: 0, direction: 0 };
let lenis: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
  lenis = instance;
}

export function getLenis() {
  return lenis;
}

export function emitScroll(y: number, velocity = 0, direction: 1 | -1 | 0 = 0) {
  if (typeof window === "undefined") return;
  frame = { y, vh: window.innerHeight, vw: window.innerWidth, velocity, direction };
  listeners.forEach((fn) => fn(frame));
}

export function onScrollFrame(fn: Listener) {
  listeners.add(fn);
  if (typeof window !== "undefined") {
    fn({ ...frame, y: window.scrollY, vh: window.innerHeight, vw: window.innerWidth });
  }
  return () => {
    listeners.delete(fn);
  };
}

export function lockScroll(locked: boolean) {
  if (lenis) {
    if (locked) lenis.stop();
    else lenis.start();
  }
  document.documentElement.style.overflow = locked ? "hidden" : "";
}

export function scrollToTarget(target: string | number | HTMLElement, offset = -90) {
  if (lenis) {
    lenis.scrollTo(target, { offset, duration: 1.4 });
    return;
  }
  if (typeof target === "number") window.scrollTo({ top: target, behavior: "smooth" });
  else {
    const el = typeof target === "string" ? document.querySelector(target) : target;
    el?.scrollIntoView({ behavior: "smooth" });
  }
}

/** Progress (0 → 1) of an element travelling through the viewport. */
export function elementProgress(
  el: HTMLElement,
  vh: number,
  start = 1, // element top at `start * vh` → 0
  end = 0 // element bottom at `end * vh` → 1
) {
  const r = el.getBoundingClientRect();
  const from = vh * start;
  const to = vh * end - r.height;
  const p = (from - r.top) / (from - to);
  return Math.min(1, Math.max(0, p));
}

export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const range = (p: number, s: number, e: number) => clamp((p - s) / (e - s));
export const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
export const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
