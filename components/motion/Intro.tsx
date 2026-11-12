"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

/** Set while the curtain is up so the hero can hold its entrance until it lifts. */
export const introState = { active: false, endsAt: 0 };

/** A short brand curtain, shown once per browser session. */
export default function Intro() {
  const [state, setState] = useState<"show" | "out" | "done">("show");

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("gs-intro") === "1";
      sessionStorage.setItem("gs-intro", "1");
    } catch {}
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || reduced) {
      const r = requestAnimationFrame(() => setState("done"));
      return () => cancelAnimationFrame(r);
    }
    introState.active = true;
    introState.endsAt = performance.now() + 1500;
    const t1 = window.setTimeout(() => setState("out"), 1500);
    const t2 = window.setTimeout(() => {
      introState.active = false;
      setState("done");
    }, 2700);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  if (state === "done") return null;

  return (
    <div className={`gs-intro ${state === "out" ? "is-out" : ""}`} aria-hidden>
      <div className="flex flex-col items-center gap-6">
        <Image src="/footer_logo.png" alt="" width={74} height={68} className="gs-intro-mark" priority />
        <div className="gs-intro-word font-cormorant italic text-[1.6rem] tracking-tight">
          <span>Strong roots. Enduring wealth.</span>
        </div>
        <div className="gs-intro-bar"><i /></div>
      </div>
    </div>
  );
}
