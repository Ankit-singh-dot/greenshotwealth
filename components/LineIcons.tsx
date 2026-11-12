import React from "react";

/**
 * Hairline icon set. Every stroke carries pathLength=1 so CSS can "draw" it
 * (see .draw and .gs-mega-ico in app/motion.css).
 */
type P = { className?: string; strokeWidth?: number };

function Svg({ className = "w-6 h-6", strokeWidth = 1.35, children }: P & { children: React.ReactNode }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {children}
    </svg>
  );
}

const L = { pathLength: 1 } as const;

export const IconSprout = (p: P) => (
  <Svg {...p}>
    <path {...L} d="M12 21v-8" />
    <path {...L} d="M12 13c0-4 3-6.5 7-6.5 0 4-3 6.5-7 6.5Z" />
    <path {...L} d="M12 15.5c0-3-2.4-5-5.6-5 0 3 2.4 5 5.6 5Z" />
    <path {...L} d="M7 21h10" />
  </Svg>
);

export const IconGrowth = (p: P) => (
  <Svg {...p}>
    <path {...L} d="M3 20h18" />
    <path {...L} d="M4 16l5-5 4 3 7-8" />
    <path {...L} d="M15 6h5v5" />
  </Svg>
);

export const IconVenus = (p: P) => (
  <Svg {...p}>
    <circle {...L} cx="12" cy="9" r="5.5" />
    <path {...L} d="M12 14.5V22" />
    <path {...L} d="M9 19h6" />
  </Svg>
);

export const IconBook = (p: P) => (
  <Svg {...p}>
    <path {...L} d="M12 6.5C10 5 7 4.5 3.5 5v13c3.5-.5 6.5 0 8.5 1.5" />
    <path {...L} d="M12 6.5C14 5 17 4.5 20.5 5v13c-3.5-.5-6.5 0-8.5 1.5" />
    <path {...L} d="M12 6.5v13" />
  </Svg>
);

export const IconPeople = (p: P) => (
  <Svg {...p}>
    <circle {...L} cx="9" cy="8" r="3.2" />
    <path {...L} d="M3 20c.6-3.6 3-5.6 6-5.6s5.4 2 6 5.6" />
    <circle {...L} cx="17" cy="9" r="2.4" />
    <path {...L} d="M16.5 14.4c2.4.2 4 1.9 4.5 4.6" />
  </Svg>
);

export const IconChat = (p: P) => (
  <Svg {...p}>
    <path {...L} d="M4 5.5h16v10H10l-4.5 3.5v-3.5H4z" />
    <path {...L} d="M8 9.5h8" />
    <path {...L} d="M8 12.5h5" />
  </Svg>
);

export const IconSeed = (p: P) => (
  <Svg {...p}>
    <ellipse {...L} cx="12" cy="13" rx="4.5" ry="6" />
    <path {...L} d="M12 7c.2 3 .2 9 0 12" />
    <path {...L} d="M12 7c0-2 1-3.4 3-4" />
  </Svg>
);

export const IconRoots = (p: P) => (
  <Svg {...p}>
    <path {...L} d="M12 3v9" />
    <path {...L} d="M3 12h18" />
    <path {...L} d="M12 12c0 3-1.5 5-4 6.5" />
    <path {...L} d="M12 12c0 3 1.5 5 4 6.5" />
    <path {...L} d="M12 12v9" />
    <path {...L} d="M8 15c-2 .4-3.5 1.6-4.5 3.4" />
    <path {...L} d="M16 15c2 .4 3.5 1.6 4.5 3.4" />
  </Svg>
);

export const IconSapling = (p: P) => (
  <Svg {...p}>
    <path {...L} d="M12 22V9" />
    <circle {...L} cx="12" cy="8" r="5" />
    <path {...L} d="M12 14l-3-3" />
    <path {...L} d="M12 12l3-3" />
    <path {...L} d="M8 22h8" />
  </Svg>
);

export const IconForest = (p: P) => (
  <Svg {...p}>
    <path {...L} d="M7 21v-4" />
    <path {...L} d="M7 4l-4 8h8z" />
    <path {...L} d="M7 9l-4 8h8z" />
    <path {...L} d="M17 21v-5" />
    <path {...L} d="M17 3l-4.5 9h9z" />
    <path {...L} d="M17 8l-4.5 8h9z" />
  </Svg>
);

export const IconRupee = (p: P) => (
  <Svg {...p}>
    <circle {...L} cx="12" cy="12" r="9" />
    <path {...L} d="M8.5 7.5h7" />
    <path {...L} d="M8.5 10.5h7" />
    <path {...L} d="M10 7.5c4 0 4 6 0 6H8.5l5.5 4" />
  </Svg>
);

export const IconGlobe = (p: P) => (
  <Svg {...p}>
    <circle {...L} cx="12" cy="12" r="9" />
    <path {...L} d="M3 12h18" />
    <path {...L} d="M12 3c2.6 2.6 3.8 5.6 3.8 9s-1.2 6.4-3.8 9" />
    <path {...L} d="M12 3c-2.6 2.6-3.8 5.6-3.8 9s1.2 6.4 3.8 9" />
  </Svg>
);

export const IconTowers = (p: P) => (
  <Svg {...p}>
    <path {...L} d="M3 21h18" />
    <path {...L} d="M6 21V8l4-2v15" />
    <path {...L} d="M14 21V4l4 2v15" />
    <path {...L} d="M10 12h4" />
    <path {...L} d="M10 15h4" />
  </Svg>
);

export const IconShield = (p: P) => (
  <Svg {...p}>
    <path {...L} d="M12 3l7.5 3v5.5c0 4.6-3.2 8.4-7.5 9.5-4.3-1.1-7.5-4.9-7.5-9.5V6z" />
    <path {...L} d="M8.8 12.2l2.2 2.2 4.4-4.6" />
  </Svg>
);

export const IconCompass = (p: P) => (
  <Svg {...p}>
    <circle {...L} cx="12" cy="12" r="9" />
    <path {...L} d="M15.5 8.5l-2 5-5 2 2-5z" />
  </Svg>
);

export const IconCalendar = (p: P) => (
  <Svg {...p}>
    <rect {...L} x="3.5" y="5" width="17" height="15" rx="2" />
    <path {...L} d="M3.5 9.5h17" />
    <path {...L} d="M8 3v4" />
    <path {...L} d="M16 3v4" />
  </Svg>
);

export const IconArrow = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M3 8h10" />
    <path d="M9 4l4 4-4 4" />
  </svg>
);

export const IconArrowUpRight = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M4.5 11.5l7-7" />
    <path d="M5.5 4.5h6v6" />
  </svg>
);

/* Goal glyphs */
export const IconSunset = (p: P) => (
  <Svg {...p}>
    <path {...L} d="M3 17h18" />
    <path {...L} d="M7 17a5 5 0 0110 0" />
    <path {...L} d="M12 5v3" />
    <path {...L} d="M5 9l2 2" />
    <path {...L} d="M19 9l-2 2" />
    <path {...L} d="M6 20.5h12" />
  </Svg>
);
export const IconCap = (p: P) => (
  <Svg {...p}>
    <path {...L} d="M2.5 9.5L12 5l9.5 4.5L12 14z" />
    <path {...L} d="M6.5 11.5V16c1.5 1.4 3.4 2 5.5 2s4-.6 5.5-2v-4.5" />
    <path {...L} d="M21.5 9.5V15" />
  </Svg>
);
export const IconHome = (p: P) => (
  <Svg {...p}>
    <path {...L} d="M3.5 11L12 4l8.5 7" />
    <path {...L} d="M5.5 9.5V20h13V9.5" />
    <path {...L} d="M10 20v-5.5h4V20" />
  </Svg>
);
export const IconUmbrella = (p: P) => (
  <Svg {...p}>
    <path {...L} d="M3 12a9 9 0 0118 0z" />
    <path {...L} d="M12 12v7a2 2 0 01-4 0" />
    <path {...L} d="M12 3v.5" />
  </Svg>
);
export const IconStream = (p: P) => (
  <Svg {...p}>
    <path {...L} d="M3 8c3 0 3 2 6 2s3-2 6-2 3 2 6 2" />
    <path {...L} d="M3 13c3 0 3 2 6 2s3-2 6-2 3 2 6 2" />
    <path {...L} d="M3 18c3 0 3 2 6 2s3-2 6-2 3 2 6 2" />
  </Svg>
);
export const IconLayers = (p: P) => (
  <Svg {...p}>
    <path {...L} d="M12 3l9 5-9 5-9-5z" />
    <path {...L} d="M3 12.5l9 5 9-5" />
    <path {...L} d="M3 16.5l9 5 9-5" />
  </Svg>
);
export const IconPlane = (p: P) => (
  <Svg {...p}>
    <path {...L} d="M2.5 13.5l19-8-5 15-4-6z" />
    <path {...L} d="M12.5 14.5l9-9" />
  </Svg>
);
